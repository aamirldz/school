/**
 * NVRSS ERP - Authentication Routes
 */

import { Hono } from 'hono';
import { zValidator } from '@hono/zod-validator';
import { z } from 'zod';
import type { Env, Variables } from '../index';
import { createToken, verifyPassword, hashPassword, authMiddleware } from '../middleware/auth';

export const authRoutes = new Hono<{ Bindings: Env; Variables: Variables }>();

// Login schema
const loginSchema = z.object({
    uid: z.string().min(1, 'UID is required'),
    password: z.string().min(1, 'Password is required'),
});

// Change password schema
const changePasswordSchema = z.object({
    currentPassword: z.string().min(1, 'Current password is required'),
    newPassword: z.string()
        .min(8, 'Password must be at least 8 characters')
        .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
        .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
        .regex(/[0-9]/, 'Password must contain at least one number'),
    confirmPassword: z.string(),
}).refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
});

/**
 * POST /api/auth/login
 * Authenticate user with UID and password
 */
authRoutes.post('/login', zValidator('json', loginSchema), async (c) => {
    const { uid, password } = c.req.valid('json');

    // Find user by UID
    const user = await c.env.DB.prepare(`
    SELECT id, uid, password_hash, role, is_active, must_change_password, first_name, last_name
    FROM users WHERE uid = ?
  `).bind(uid.toUpperCase()).first();

    if (!user) {
        return c.json({ error: 'Invalid credentials', message: 'UID or password is incorrect' }, 401);
    }

    // Check if user is active
    if (!user.is_active) {
        return c.json({ error: 'Account inactive', message: 'Your account has been deactivated. Contact administrator.' }, 403);
    }

    // Verify password
    const isValid = await verifyPassword(password, user.password_hash as string);
    if (!isValid) {
        return c.json({ error: 'Invalid credentials', message: 'UID or password is incorrect' }, 401);
    }

    // Generate token
    const sessionDuration = parseInt(c.env.SESSION_DURATION_HOURS || '24', 10);
    const token = createToken({
        userId: user.id as number,
        uid: user.uid as string,
        role: user.role as string,
        firstName: user.first_name as string,
        lastName: user.last_name as string,
    }, c.env.JWT_SECRET, sessionDuration);

    // Store session in database
    const expiresAt = new Date(Date.now() + sessionDuration * 60 * 60 * 1000).toISOString();
    await c.env.DB.prepare(`
    INSERT INTO sessions (user_id, token, expires_at) VALUES (?, ?, ?)
  `).bind(user.id, token, expiresAt).run();

    // Log audit
    await c.env.DB.prepare(`
    INSERT INTO audit_log (user_id, action, entity_type, entity_id) 
    VALUES (?, 'login', 'user', ?)
  `).bind(user.id, user.id).run();

    return c.json({
        success: true,
        token,
        user: {
            id: user.id,
            uid: user.uid,
            role: user.role,
            firstName: user.first_name,
            lastName: user.last_name,
            mustChangePassword: Boolean(user.must_change_password),
        },
    });
});

/**
 * POST /api/auth/logout
 * Invalidate current session
 */
authRoutes.post('/logout', authMiddleware(), async (c) => {
    const authHeader = c.req.header('Authorization');
    const token = authHeader?.substring(7);

    if (token) {
        await c.env.DB.prepare('DELETE FROM sessions WHERE token = ?').bind(token).run();
    }

    const user = c.get('user');
    if (user) {
        await c.env.DB.prepare(`
      INSERT INTO audit_log (user_id, action, entity_type, entity_id) 
      VALUES (?, 'logout', 'user', ?)
    `).bind(user.id, user.id).run();
    }

    return c.json({ success: true, message: 'Logged out successfully' });
});

/**
 * POST /api/auth/change-password
 * Change user password (required on first login)
 */
authRoutes.post('/change-password', authMiddleware(), zValidator('json', changePasswordSchema), async (c) => {
    const user = c.get('user')!;
    const { currentPassword, newPassword } = c.req.valid('json');

    // Get current password hash
    const dbUser = await c.env.DB.prepare(
        'SELECT password_hash FROM users WHERE id = ?'
    ).bind(user.id).first();

    if (!dbUser) {
        return c.json({ error: 'User not found' }, 404);
    }

    // Verify current password
    const isValid = await verifyPassword(currentPassword, dbUser.password_hash as string);
    if (!isValid) {
        return c.json({ error: 'Invalid password', message: 'Current password is incorrect' }, 401);
    }

    // Hash new password
    const newHash = await hashPassword(newPassword);

    // Update password and clear must_change_password flag
    await c.env.DB.prepare(`
    UPDATE users 
    SET password_hash = ?, must_change_password = 0, updated_at = CURRENT_TIMESTAMP
    WHERE id = ?
  `).bind(newHash, user.id).run();

    // Invalidate all other sessions for this user
    const authHeader = c.req.header('Authorization');
    const currentToken = authHeader?.substring(7);

    await c.env.DB.prepare(`
    DELETE FROM sessions WHERE user_id = ? AND token != ?
  `).bind(user.id, currentToken).run();

    // Log audit
    await c.env.DB.prepare(`
    INSERT INTO audit_log (user_id, action, entity_type, entity_id)
    VALUES (?, 'change_password', 'user', ?)
  `).bind(user.id, user.id).run();

    return c.json({ success: true, message: 'Password changed successfully' });
});

/**
 * GET /api/auth/me
 * Get current authenticated user info
 */
authRoutes.get('/me', authMiddleware(), async (c) => {
    const user = c.get('user')!;

    const dbUser = await c.env.DB.prepare(`
    SELECT id, uid, role, first_name, last_name, email, phone, must_change_password, created_at
    FROM users WHERE id = ?
  `).bind(user.id).first();

    if (!dbUser) {
        return c.json({ error: 'User not found' }, 404);
    }

    return c.json({
        id: dbUser.id,
        uid: dbUser.uid,
        role: dbUser.role,
        firstName: dbUser.first_name,
        lastName: dbUser.last_name,
        email: dbUser.email,
        phone: dbUser.phone,
        mustChangePassword: Boolean(dbUser.must_change_password),
        createdAt: dbUser.created_at,
    });
});

/**
 * POST /api/auth/validate
 * Validate token without returning user data (for route guards)
 */
authRoutes.post('/validate', authMiddleware(), async (c) => {
    const user = c.get('user')!;
    return c.json({
        valid: true,
        role: user.role,
        mustChangePassword: false, // Would need DB lookup for accuracy
    });
});
