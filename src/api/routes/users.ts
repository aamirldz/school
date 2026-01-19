/**
 * NVRSS ERP - User Management Routes
 */

import { Hono } from 'hono';
import { zValidator } from '@hono/zod-validator';
import { z } from 'zod';
import type { Env, Variables } from '../index';
import { authMiddleware, requireRole, hashPassword } from '../middleware/auth';
import { generateStaffUID, generateDefaultPassword } from '../services/uid-generator';

export const userRoutes = new Hono<{ Bindings: Env; Variables: Variables }>();

// Apply auth middleware to all routes
userRoutes.use('*', authMiddleware());

// Create user schema
const createUserSchema = z.object({
    firstName: z.string().min(1, 'First name is required'),
    lastName: z.string().min(1, 'Last name is required'),
    role: z.enum(['admin', 'admission_staff', 'teacher', 'staff']),
    email: z.string().email().optional().nullable(),
    phone: z.string().optional().nullable(),
});

// Update user schema
const updateUserSchema = z.object({
    firstName: z.string().min(1).optional(),
    lastName: z.string().min(1).optional(),
    email: z.string().email().optional().nullable(),
    phone: z.string().optional().nullable(),
});

/**
 * GET /api/users
 * List all users (admin only)
 */
userRoutes.get('/', requireRole('admin'), async (c) => {
    const role = c.req.query('role');
    const status = c.req.query('status');
    const search = c.req.query('search');
    const page = parseInt(c.req.query('page') || '1', 10);
    const limit = parseInt(c.req.query('limit') || '20', 10);
    const offset = (page - 1) * limit;

    let query = 'SELECT id, uid, role, first_name, last_name, email, phone, is_active, must_change_password, created_at FROM users WHERE 1=1';
    const params: any[] = [];

    if (role) {
        query += ' AND role = ?';
        params.push(role);
    }

    if (status === 'active') {
        query += ' AND is_active = 1';
    } else if (status === 'inactive') {
        query += ' AND is_active = 0';
    }

    if (search) {
        query += ' AND (uid LIKE ? OR first_name LIKE ? OR last_name LIKE ? OR email LIKE ?)';
        const searchPattern = `%${search}%`;
        params.push(searchPattern, searchPattern, searchPattern, searchPattern);
    }

    // Get total count
    const countQuery = query.replace('SELECT id, uid, role, first_name, last_name, email, phone, is_active, must_change_password, created_at', 'SELECT COUNT(*) as total');
    const countResult = await c.env.DB.prepare(countQuery).bind(...params).first();
    const total = (countResult?.total as number) || 0;

    // Get paginated results
    query += ' ORDER BY created_at DESC LIMIT ? OFFSET ?';
    params.push(limit, offset);

    const users = await c.env.DB.prepare(query).bind(...params).all();

    return c.json({
        users: users.results?.map((u) => ({
            id: u.id,
            uid: u.uid,
            role: u.role,
            firstName: u.first_name,
            lastName: u.last_name,
            email: u.email,
            phone: u.phone,
            isActive: Boolean(u.is_active),
            mustChangePassword: Boolean(u.must_change_password),
            createdAt: u.created_at,
        })) || [],
        pagination: {
            page,
            limit,
            total,
            totalPages: Math.ceil(total / limit),
        },
    });
});

/**
 * GET /api/users/:id
 * Get single user details
 */
userRoutes.get('/:id', requireRole('admin'), async (c) => {
    const id = c.req.param('id');

    const user = await c.env.DB.prepare(`
    SELECT id, uid, role, first_name, last_name, email, phone, is_active, must_change_password, created_at, updated_at
    FROM users WHERE id = ?
  `).bind(id).first();

    if (!user) {
        return c.json({ error: 'Not found', message: 'User not found' }, 404);
    }

    return c.json({
        id: user.id,
        uid: user.uid,
        role: user.role,
        firstName: user.first_name,
        lastName: user.last_name,
        email: user.email,
        phone: user.phone,
        isActive: Boolean(user.is_active),
        mustChangePassword: Boolean(user.must_change_password),
        createdAt: user.created_at,
        updatedAt: user.updated_at,
    });
});

/**
 * POST /api/users
 * Create new staff user (admin only)
 */
userRoutes.post('/', requireRole('admin'), zValidator('json', createUserSchema), async (c) => {
    const data = c.req.valid('json');
    const currentUser = c.get('user')!;

    // Generate UID
    const uid = await generateStaffUID(c.env.DB, data.role as any);

    // Generate default password
    const defaultPassword = generateDefaultPassword();
    const passwordHash = await hashPassword(defaultPassword);

    // Create user
    const result = await c.env.DB.prepare(`
    INSERT INTO users (uid, password_hash, role, first_name, last_name, email, phone, is_active, must_change_password)
    VALUES (?, ?, ?, ?, ?, ?, ?, 1, 1)
  `).bind(uid, passwordHash, data.role, data.firstName, data.lastName, data.email || null, data.phone || null).run();

    // Log audit
    await c.env.DB.prepare(`
    INSERT INTO audit_log (user_id, action, entity_type, entity_id, new_values)
    VALUES (?, 'create_user', 'user', ?, ?)
  `).bind(currentUser.id, result.meta.last_row_id, JSON.stringify({ uid, role: data.role })).run();

    return c.json({
        success: true,
        user: {
            id: result.meta.last_row_id,
            uid,
            role: data.role,
            firstName: data.firstName,
            lastName: data.lastName,
            defaultPassword, // Show once for admin to communicate to user
        },
        message: `User created with UID: ${uid}. Default password: ${defaultPassword}`,
    }, 201);
});

/**
 * PATCH /api/users/:id
 * Update user details
 */
userRoutes.patch('/:id', requireRole('admin'), zValidator('json', updateUserSchema), async (c) => {
    const id = c.req.param('id');
    const data = c.req.valid('json');
    const currentUser = c.get('user')!;

    // Check if user exists
    const existing = await c.env.DB.prepare('SELECT id, uid FROM users WHERE id = ?').bind(id).first();
    if (!existing) {
        return c.json({ error: 'Not found', message: 'User not found' }, 404);
    }

    // Build update query
    const updates: string[] = [];
    const values: any[] = [];

    if (data.firstName) {
        updates.push('first_name = ?');
        values.push(data.firstName);
    }
    if (data.lastName) {
        updates.push('last_name = ?');
        values.push(data.lastName);
    }
    if (data.email !== undefined) {
        updates.push('email = ?');
        values.push(data.email);
    }
    if (data.phone !== undefined) {
        updates.push('phone = ?');
        values.push(data.phone);
    }

    if (updates.length === 0) {
        return c.json({ error: 'No updates', message: 'No valid fields to update' }, 400);
    }

    updates.push('updated_at = CURRENT_TIMESTAMP');
    values.push(id);

    await c.env.DB.prepare(`
    UPDATE users SET ${updates.join(', ')} WHERE id = ?
  `).bind(...values).run();

    // Log audit
    await c.env.DB.prepare(`
    INSERT INTO audit_log (user_id, action, entity_type, entity_id, new_values)
    VALUES (?, 'update_user', 'user', ?, ?)
  `).bind(currentUser.id, id, JSON.stringify(data)).run();

    return c.json({ success: true, message: 'User updated successfully' });
});

/**
 * POST /api/users/:id/toggle-active
 * Enable or disable user account
 */
userRoutes.post('/:id/toggle-active', requireRole('admin'), async (c) => {
    const id = parseInt(c.req.param('id'), 10);
    const currentUser = c.get('user')!;

    // Prevent self-deactivation
    if (id === currentUser.id) {
        return c.json({ error: 'Forbidden', message: 'Cannot deactivate your own account' }, 403);
    }

    // Get current status
    const user = await c.env.DB.prepare('SELECT id, uid, is_active FROM users WHERE id = ?').bind(id).first();
    if (!user) {
        return c.json({ error: 'Not found', message: 'User not found' }, 404);
    }

    const newStatus = user.is_active ? 0 : 1;

    // Update status
    await c.env.DB.prepare(`
    UPDATE users SET is_active = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?
  `).bind(newStatus, id).run();

    // If deactivating, invalidate all sessions
    if (newStatus === 0) {
        await c.env.DB.prepare('DELETE FROM sessions WHERE user_id = ?').bind(id).run();
    }

    // Log audit
    await c.env.DB.prepare(`
    INSERT INTO audit_log (user_id, action, entity_type, entity_id, new_values)
    VALUES (?, ?, 'user', ?, ?)
  `).bind(currentUser.id, newStatus ? 'activate_user' : 'deactivate_user', id, JSON.stringify({ is_active: newStatus })).run();

    return c.json({
        success: true,
        isActive: Boolean(newStatus),
        message: newStatus ? 'User activated successfully' : 'User deactivated successfully',
    });
});

/**
 * POST /api/users/:id/reset-password
 * Reset user password (admin only)
 */
userRoutes.post('/:id/reset-password', requireRole('admin'), async (c) => {
    const id = parseInt(c.req.param('id'), 10);
    const currentUser = c.get('user')!;

    // Check if user exists
    const user = await c.env.DB.prepare('SELECT id, uid FROM users WHERE id = ?').bind(id).first();
    if (!user) {
        return c.json({ error: 'Not found', message: 'User not found' }, 404);
    }

    // Generate new password
    const newPassword = generateDefaultPassword();
    const passwordHash = await hashPassword(newPassword);

    // Update password and set must_change_password
    await c.env.DB.prepare(`
    UPDATE users SET password_hash = ?, must_change_password = 1, updated_at = CURRENT_TIMESTAMP WHERE id = ?
  `).bind(passwordHash, id).run();

    // Invalidate all sessions for this user
    await c.env.DB.prepare('DELETE FROM sessions WHERE user_id = ?').bind(id).run();

    // Log audit
    await c.env.DB.prepare(`
    INSERT INTO audit_log (user_id, action, entity_type, entity_id)
    VALUES (?, 'reset_password', 'user', ?)
  `).bind(currentUser.id, id).run();

    return c.json({
        success: true,
        newPassword,
        message: `Password reset for ${user.uid}. New password: ${newPassword}`,
    });
});

/**
 * DELETE /api/users/:id
 * Delete user (admin only, cannot delete self)
 */
userRoutes.delete('/:id', requireRole('admin'), async (c) => {
    const id = parseInt(c.req.param('id'), 10);
    const currentUser = c.get('user')!;

    // Prevent self-deletion
    if (id === currentUser.id) {
        return c.json({ error: 'Forbidden', message: 'Cannot delete your own account' }, 403);
    }

    // Check if user exists
    const user = await c.env.DB.prepare('SELECT id, uid FROM users WHERE id = ?').bind(id).first();
    if (!user) {
        return c.json({ error: 'Not found', message: 'User not found' }, 404);
    }

    // Delete user (cascades to sessions)
    await c.env.DB.prepare('DELETE FROM users WHERE id = ?').bind(id).run();

    // Log audit
    await c.env.DB.prepare(`
    INSERT INTO audit_log (user_id, action, entity_type, entity_id, old_values)
    VALUES (?, 'delete_user', 'user', ?, ?)
  `).bind(currentUser.id, id, JSON.stringify({ uid: user.uid })).run();

    return c.json({ success: true, message: 'User deleted successfully' });
});
