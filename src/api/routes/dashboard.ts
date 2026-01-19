/**
 * NVRSS ERP - Dashboard Routes
 */

import { Hono } from 'hono';
import type { Env, Variables } from '../index';
import { authMiddleware, requireRole } from '../middleware/auth';

export const dashboardRoutes = new Hono<{ Bindings: Env; Variables: Variables }>();

// Apply auth middleware
dashboardRoutes.use('*', authMiddleware());

/**
 * GET /api/dashboard/stats
 * Get dashboard statistics (admin only)
 */
dashboardRoutes.get('/stats', requireRole('admin'), async (c) => {
    // Total students
    const studentsResult = await c.env.DB.prepare(
        "SELECT COUNT(*) as count FROM users WHERE role = 'student' AND is_active = 1"
    ).first();

    // Total teachers
    const teachersResult = await c.env.DB.prepare(
        "SELECT COUNT(*) as count FROM users WHERE role = 'teacher' AND is_active = 1"
    ).first();

    // Total staff (all non-students)
    const staffResult = await c.env.DB.prepare(
        "SELECT COUNT(*) as count FROM users WHERE role NOT IN ('student') AND is_active = 1"
    ).first();

    // Pending admissions
    const pendingResult = await c.env.DB.prepare(
        "SELECT COUNT(*) as count FROM admissions WHERE status IN ('pending', 'reviewing', 'ready_for_approval')"
    ).first();

    // Admissions this month
    const thisMonthResult = await c.env.DB.prepare(
        "SELECT COUNT(*) as count FROM admissions WHERE status = 'approved' AND approved_at >= date('now', 'start of month')"
    ).first();

    // Documents pending verification
    const docsResult = await c.env.DB.prepare(
        "SELECT COUNT(*) as count FROM documents WHERE verification_status = 'pending'"
    ).first();

    return c.json({
        students: {
            total: studentsResult?.count || 0,
            label: 'Total Students',
        },
        teachers: {
            total: teachersResult?.count || 0,
            label: 'Teachers',
        },
        staff: {
            total: staffResult?.count || 0,
            label: 'Total Staff',
        },
        admissions: {
            pending: pendingResult?.count || 0,
            approvedThisMonth: thisMonthResult?.count || 0,
            label: 'Pending Admissions',
        },
        documents: {
            pendingVerification: docsResult?.count || 0,
            label: 'Documents Pending',
        },
    });
});

/**
 * GET /api/dashboard/admissions-summary
 * Get admission status breakdown
 */
dashboardRoutes.get('/admissions-summary', requireRole('admin', 'admission_staff'), async (c) => {
    const result = await c.env.DB.prepare(`
    SELECT status, COUNT(*) as count
    FROM admissions
    GROUP BY status
  `).all();

    const summary: Record<string, number> = {
        pending: 0,
        reviewing: 0,
        ready_for_approval: 0,
        approved: 0,
        rejected: 0,
    };

    result.results?.forEach((row) => {
        summary[row.status as string] = row.count as number;
    });

    return c.json(summary);
});

/**
 * GET /api/dashboard/recent-admissions
 * Get recent admission applications
 */
dashboardRoutes.get('/recent-admissions', requireRole('admin', 'admission_staff'), async (c) => {
    const limit = parseInt(c.req.query('limit') || '5', 10);

    const result = await c.env.DB.prepare(`
    SELECT id, status, first_name, last_name, applying_for_grade, academic_year, created_at
    FROM admissions
    ORDER BY created_at DESC
    LIMIT ?
  `).bind(limit).all();

    return c.json({
        admissions: result.results?.map((a) => ({
            id: a.id,
            status: a.status,
            name: `${a.first_name} ${a.last_name}`,
            grade: a.applying_for_grade,
            academicYear: a.academic_year,
            createdAt: a.created_at,
        })) || [],
    });
});

/**
 * GET /api/dashboard/recent-activity
 * Get recent audit log activity
 */
dashboardRoutes.get('/recent-activity', requireRole('admin'), async (c) => {
    const limit = parseInt(c.req.query('limit') || '10', 10);

    const result = await c.env.DB.prepare(`
    SELECT al.*, u.uid, u.first_name, u.last_name
    FROM audit_log al
    LEFT JOIN users u ON al.user_id = u.id
    ORDER BY al.created_at DESC
    LIMIT ?
  `).bind(limit).all();

    return c.json({
        activities: result.results?.map((a) => ({
            id: a.id,
            action: a.action,
            entityType: a.entity_type,
            entityId: a.entity_id,
            user: a.uid ? {
                uid: a.uid,
                name: `${a.first_name} ${a.last_name}`,
            } : null,
            createdAt: a.created_at,
        })) || [],
    });
});

/**
 * GET /api/dashboard/students-by-grade
 * Get student count by grade
 */
dashboardRoutes.get('/students-by-grade', requireRole('admin'), async (c) => {
    const result = await c.env.DB.prepare(`
    SELECT applying_for_grade as grade, COUNT(*) as count
    FROM admissions
    WHERE status = 'approved'
    GROUP BY applying_for_grade
    ORDER BY applying_for_grade
  `).all();

    return c.json({
        grades: result.results?.map((g) => ({
            grade: g.grade,
            count: g.count,
        })) || [],
    });
});
