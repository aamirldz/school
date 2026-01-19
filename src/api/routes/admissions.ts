/**
 * NVRSS ERP - Admission Routes
 */

import { Hono } from 'hono';
import { zValidator } from '@hono/zod-validator';
import { z } from 'zod';
import type { Env, Variables } from '../index';
import { authMiddleware, requireRole, hashPassword } from '../middleware/auth';
import { generateStudentUID, generateDefaultPassword } from '../services/uid-generator';

export const admissionRoutes = new Hono<{ Bindings: Env; Variables: Variables }>();

// Admission form schema
const admissionFormSchema = z.object({
    // Student Information
    firstName: z.string().min(1, 'First name is required'),
    lastName: z.string().min(1, 'Last name is required'),
    dateOfBirth: z.string().min(1, 'Date of birth is required'),
    gender: z.enum(['male', 'female', 'other']),

    // Grade/Class
    applyingForGrade: z.number().min(1).max(12),
    preferredSection: z.string().optional(),
    academicYear: z.string().min(1, 'Academic year is required'),

    // Contact
    email: z.string().email().optional().nullable(),
    phone: z.string().min(10, 'Phone number is required'),
    address: z.string().min(1, 'Address is required'),
    city: z.string().min(1, 'City is required'),
    state: z.string().min(1, 'State is required'),
    postalCode: z.string().optional(),

    // Guardian
    guardianName: z.string().min(1, 'Guardian name is required'),
    guardianRelation: z.string().min(1, 'Guardian relation is required'),
    guardianPhone: z.string().min(10, 'Guardian phone is required'),
    guardianEmail: z.string().email().optional().nullable(),
    guardianOccupation: z.string().optional(),

    // Previous Education
    previousSchool: z.string().optional(),
    previousGrade: z.string().optional(),
    previousPercentage: z.string().optional(),

    // Additional
    medicalConditions: z.string().optional(),
    specialRequirements: z.string().optional(),
});

// Review schema
const reviewSchema = z.object({
    notes: z.string().optional(),
    status: z.enum(['reviewing', 'ready_for_approval', 'pending']),
});

// Approval schema
const approvalSchema = z.object({
    section: z.string().min(1, 'Section is required'),
    notes: z.string().optional(),
});

// Rejection schema
const rejectSchema = z.object({
    reason: z.string().min(1, 'Rejection reason is required'),
});

/**
 * POST /api/admissions
 * Submit new admission form (public, no auth required)
 */
admissionRoutes.post('/', zValidator('json', admissionFormSchema), async (c) => {
    const data = c.req.valid('json');

    const result = await c.env.DB.prepare(`
    INSERT INTO admissions (
      status, first_name, last_name, date_of_birth, gender,
      applying_for_grade, preferred_section, academic_year,
      email, phone, address, city, state, postal_code,
      guardian_name, guardian_relation, guardian_phone, guardian_email, guardian_occupation,
      previous_school, previous_grade, previous_percentage,
      medical_conditions, special_requirements
    ) VALUES (
      'pending', ?, ?, ?, ?,
      ?, ?, ?,
      ?, ?, ?, ?, ?, ?,
      ?, ?, ?, ?, ?,
      ?, ?, ?,
      ?, ?
    )
  `).bind(
        data.firstName, data.lastName, data.dateOfBirth, data.gender,
        data.applyingForGrade, data.preferredSection || null, data.academicYear,
        data.email || null, data.phone, data.address, data.city, data.state, data.postalCode || null,
        data.guardianName, data.guardianRelation, data.guardianPhone, data.guardianEmail || null, data.guardianOccupation || null,
        data.previousSchool || null, data.previousGrade || null, data.previousPercentage || null,
        data.medicalConditions || null, data.specialRequirements || null
    ).run();

    return c.json({
        success: true,
        applicationId: result.meta.last_row_id,
        message: 'Application submitted successfully. You will be notified once reviewed.',
    }, 201);
});

/**
 * GET /api/admissions
 * List all admissions (staff/admin only)
 */
admissionRoutes.get('/', authMiddleware(), requireRole('admin', 'admission_staff'), async (c) => {
    const status = c.req.query('status');
    const grade = c.req.query('grade');
    const search = c.req.query('search');
    const page = parseInt(c.req.query('page') || '1', 10);
    const limit = parseInt(c.req.query('limit') || '20', 10);
    const offset = (page - 1) * limit;

    let query = `
    SELECT 
      a.id, a.status, a.first_name, a.last_name, a.date_of_birth, a.gender,
      a.applying_for_grade, a.preferred_section, a.academic_year,
      a.phone, a.email, a.guardian_name, a.guardian_phone,
      a.student_uid, a.created_at, a.updated_at,
      reviewer.first_name as reviewer_first_name, reviewer.last_name as reviewer_last_name,
      approver.first_name as approver_first_name, approver.last_name as approver_last_name
    FROM admissions a
    LEFT JOIN users reviewer ON a.reviewed_by = reviewer.id
    LEFT JOIN users approver ON a.approved_by = approver.id
    WHERE 1=1
  `;
    const params: any[] = [];

    if (status) {
        query += ' AND a.status = ?';
        params.push(status);
    }

    if (grade) {
        query += ' AND a.applying_for_grade = ?';
        params.push(parseInt(grade, 10));
    }

    if (search) {
        query += ' AND (a.first_name LIKE ? OR a.last_name LIKE ? OR a.phone LIKE ? OR a.student_uid LIKE ?)';
        const pattern = `%${search}%`;
        params.push(pattern, pattern, pattern, pattern);
    }

    // Count
    const countQuery = query.replace(/SELECT[\s\S]*?FROM/, 'SELECT COUNT(*) as total FROM');
    const countResult = await c.env.DB.prepare(countQuery).bind(...params).first();
    const total = (countResult?.total as number) || 0;

    // Paginate
    query += ' ORDER BY a.created_at DESC LIMIT ? OFFSET ?';
    params.push(limit, offset);

    const admissions = await c.env.DB.prepare(query).bind(...params).all();

    return c.json({
        admissions: admissions.results?.map((a) => ({
            id: a.id,
            status: a.status,
            firstName: a.first_name,
            lastName: a.last_name,
            dateOfBirth: a.date_of_birth,
            gender: a.gender,
            applyingForGrade: a.applying_for_grade,
            preferredSection: a.preferred_section,
            academicYear: a.academic_year,
            phone: a.phone,
            email: a.email,
            guardianName: a.guardian_name,
            guardianPhone: a.guardian_phone,
            studentUid: a.student_uid,
            createdAt: a.created_at,
            updatedAt: a.updated_at,
            reviewer: a.reviewer_first_name ? `${a.reviewer_first_name} ${a.reviewer_last_name}` : null,
            approver: a.approver_first_name ? `${a.approver_first_name} ${a.approver_last_name}` : null,
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
 * GET /api/admissions/:id
 * Get admission details
 */
admissionRoutes.get('/:id', authMiddleware(), requireRole('admin', 'admission_staff'), async (c) => {
    const id = c.req.param('id');

    const admission = await c.env.DB.prepare(`
    SELECT a.*, 
      reviewer.uid as reviewer_uid, reviewer.first_name as reviewer_first_name, reviewer.last_name as reviewer_last_name,
      approver.uid as approver_uid, approver.first_name as approver_first_name, approver.last_name as approver_last_name
    FROM admissions a
    LEFT JOIN users reviewer ON a.reviewed_by = reviewer.id
    LEFT JOIN users approver ON a.approved_by = approver.id
    WHERE a.id = ?
  `).bind(id).first();

    if (!admission) {
        return c.json({ error: 'Not found', message: 'Admission not found' }, 404);
    }

    // Get documents
    const documents = await c.env.DB.prepare(`
    SELECT id, document_type, file_name, verification_status, created_at
    FROM documents WHERE admission_id = ?
  `).bind(id).all();

    return c.json({
        id: admission.id,
        status: admission.status,
        firstName: admission.first_name,
        lastName: admission.last_name,
        dateOfBirth: admission.date_of_birth,
        gender: admission.gender,
        applyingForGrade: admission.applying_for_grade,
        preferredSection: admission.preferred_section,
        academicYear: admission.academic_year,
        email: admission.email,
        phone: admission.phone,
        address: admission.address,
        city: admission.city,
        state: admission.state,
        postalCode: admission.postal_code,
        guardianName: admission.guardian_name,
        guardianRelation: admission.guardian_relation,
        guardianPhone: admission.guardian_phone,
        guardianEmail: admission.guardian_email,
        guardianOccupation: admission.guardian_occupation,
        previousSchool: admission.previous_school,
        previousGrade: admission.previous_grade,
        previousPercentage: admission.previous_percentage,
        medicalConditions: admission.medical_conditions,
        specialRequirements: admission.special_requirements,
        reviewNotes: admission.review_notes,
        reviewedAt: admission.reviewed_at,
        reviewer: admission.reviewer_uid ? {
            uid: admission.reviewer_uid,
            name: `${admission.reviewer_first_name} ${admission.reviewer_last_name}`,
        } : null,
        approvalNotes: admission.approval_notes,
        approvedAt: admission.approved_at,
        approver: admission.approver_uid ? {
            uid: admission.approver_uid,
            name: `${admission.approver_first_name} ${admission.approver_last_name}`,
        } : null,
        rejectedReason: admission.rejected_reason,
        studentUid: admission.student_uid,
        documents: documents.results?.map((d) => ({
            id: d.id,
            type: d.document_type,
            fileName: d.file_name,
            verificationStatus: d.verification_status,
            createdAt: d.created_at,
        })) || [],
        createdAt: admission.created_at,
        updatedAt: admission.updated_at,
    });
});

/**
 * PATCH /api/admissions/:id/review
 * Review admission (admission staff)
 */
admissionRoutes.patch('/:id/review', authMiddleware(), requireRole('admin', 'admission_staff'), zValidator('json', reviewSchema), async (c) => {
    const id = c.req.param('id');
    const data = c.req.valid('json');
    const user = c.get('user')!;

    // Check admission exists and is in reviewable state
    const admission = await c.env.DB.prepare('SELECT id, status FROM admissions WHERE id = ?').bind(id).first();
    if (!admission) {
        return c.json({ error: 'Not found', message: 'Admission not found' }, 404);
    }

    if (!['pending', 'reviewing'].includes(admission.status as string)) {
        return c.json({ error: 'Invalid status', message: 'This admission cannot be reviewed in its current state' }, 400);
    }

    await c.env.DB.prepare(`
    UPDATE admissions 
    SET status = ?, review_notes = ?, reviewed_by = ?, reviewed_at = CURRENT_TIMESTAMP, updated_at = CURRENT_TIMESTAMP
    WHERE id = ?
  `).bind(data.status, data.notes || null, user.id, id).run();

    // Log audit
    await c.env.DB.prepare(`
    INSERT INTO audit_log (user_id, action, entity_type, entity_id, new_values)
    VALUES (?, 'review_admission', 'admission', ?, ?)
  `).bind(user.id, id, JSON.stringify({ status: data.status })).run();

    return c.json({ success: true, message: 'Admission reviewed successfully' });
});

/**
 * POST /api/admissions/:id/approve
 * Approve admission and create student (admin only)
 */
admissionRoutes.post('/:id/approve', authMiddleware(), requireRole('admin'), zValidator('json', approvalSchema), async (c) => {
    const id = c.req.param('id');
    const data = c.req.valid('json');
    const user = c.get('user')!;

    // Get admission
    const admission = await c.env.DB.prepare(`
    SELECT * FROM admissions WHERE id = ?
  `).bind(id).first();

    if (!admission) {
        return c.json({ error: 'Not found', message: 'Admission not found' }, 404);
    }

    if (admission.status !== 'ready_for_approval') {
        return c.json({ error: 'Invalid status', message: 'This admission is not ready for approval' }, 400);
    }

    // Generate student UID
    const academicYear = parseInt((admission.academic_year as string).substring(0, 4), 10);
    const studentUid = await generateStudentUID(c.env.DB, {
        grade: admission.applying_for_grade as number,
        section: data.section,
        academicYear,
    });

    // Generate default password
    const defaultPassword = generateDefaultPassword();
    const passwordHash = await hashPassword(defaultPassword);

    // Create student user
    const studentResult = await c.env.DB.prepare(`
    INSERT INTO users (uid, password_hash, role, first_name, last_name, email, phone, is_active, must_change_password)
    VALUES (?, ?, 'student', ?, ?, ?, ?, 1, 1)
  `).bind(
        studentUid, passwordHash,
        admission.first_name, admission.last_name,
        admission.email, admission.phone
    ).run();

    // Update admission
    await c.env.DB.prepare(`
    UPDATE admissions 
    SET status = 'approved', student_uid = ?, approved_by = ?, approval_notes = ?, approved_at = CURRENT_TIMESTAMP, updated_at = CURRENT_TIMESTAMP
    WHERE id = ?
  `).bind(studentUid, user.id, data.notes || null, id).run();

    // Transfer documents to user
    await c.env.DB.prepare(`
    UPDATE documents SET user_id = ? WHERE admission_id = ?
  `).bind(studentResult.meta.last_row_id, id).run();

    // Log audit
    await c.env.DB.prepare(`
    INSERT INTO audit_log (user_id, action, entity_type, entity_id, new_values)
    VALUES (?, 'approve_admission', 'admission', ?, ?)
  `).bind(user.id, id, JSON.stringify({ studentUid, section: data.section })).run();

    return c.json({
        success: true,
        studentUid,
        defaultPassword,
        message: `Student approved. UID: ${studentUid}, Password: ${defaultPassword}`,
    });
});

/**
 * POST /api/admissions/:id/reject
 * Reject admission (admin only)
 */
admissionRoutes.post('/:id/reject', authMiddleware(), requireRole('admin'), zValidator('json', rejectSchema), async (c) => {
    const id = c.req.param('id');
    const data = c.req.valid('json');
    const user = c.get('user')!;

    const admission = await c.env.DB.prepare('SELECT id, status FROM admissions WHERE id = ?').bind(id).first();
    if (!admission) {
        return c.json({ error: 'Not found', message: 'Admission not found' }, 404);
    }

    if (admission.status === 'approved' || admission.status === 'rejected') {
        return c.json({ error: 'Invalid status', message: 'This admission has already been processed' }, 400);
    }

    await c.env.DB.prepare(`
    UPDATE admissions
    SET status = 'rejected', rejected_reason = ?, approved_by = ?, approved_at = CURRENT_TIMESTAMP, updated_at = CURRENT_TIMESTAMP
    WHERE id = ?
  `).bind(data.reason, user.id, id).run();

    // Log audit
    await c.env.DB.prepare(`
    INSERT INTO audit_log (user_id, action, entity_type, entity_id, new_values)
    VALUES (?, 'reject_admission', 'admission', ?, ?)
  `).bind(user.id, id, JSON.stringify({ reason: data.reason })).run();

    return c.json({ success: true, message: 'Admission rejected' });
});

/**
 * GET /api/admissions/:id/preview-uid
 * Preview what UID would be generated for an admission (admin only)
 */
admissionRoutes.get('/:id/preview-uid', authMiddleware(), requireRole('admin'), async (c) => {
    const id = c.req.param('id');
    const section = c.req.query('section');

    if (!section) {
        return c.json({ error: 'Missing parameter', message: 'Section is required' }, 400);
    }

    const admission = await c.env.DB.prepare(`
    SELECT applying_for_grade, academic_year FROM admissions WHERE id = ?
  `).bind(id).first();

    if (!admission) {
        return c.json({ error: 'Not found', message: 'Admission not found' }, 404);
    }

    const academicYear = parseInt((admission.academic_year as string).substring(0, 4), 10);
    const yearPrefix = academicYear.toString().slice(-2);
    const grade = admission.applying_for_grade;

    // Get current sequence
    const seqPrefix = `${yearPrefix}G${grade}${section.toUpperCase()}`;
    const seqResult = await c.env.DB.prepare(
        'SELECT last_sequence FROM uid_sequences WHERE prefix = ?'
    ).bind(seqPrefix).first();

    const nextSeq = ((seqResult?.last_sequence as number) || 0) + 1;
    const previewUid = `${seqPrefix}${nextSeq.toString().padStart(3, '0')}`;

    return c.json({ previewUid, section: section.toUpperCase() });
});
