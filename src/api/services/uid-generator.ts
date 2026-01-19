/**
 * NVRSS ERP - UID Generation Service
 * 
 * UID Formats:
 * - Admin: ADM001, ADM002, ...
 * - Admission Staff: ADS001, ADS002, ...
 * - Teacher: TCH001, TCH002, ...
 * - Staff: STF001, STF002, ...
 * - Student: YYG{Grade}{Section}{Sequence} (e.g., 25G3B001)
 */

import type { D1Database } from '@cloudflare/workers-types';

export type UserRole = 'admin' | 'admission_staff' | 'teacher' | 'staff' | 'student';

interface StudentUIDParams {
    grade: number;
    section: string;
    academicYear?: number;
}

/**
 * Get the prefix for a given role
 */
function getRolePrefix(role: UserRole): string {
    const prefixes: Record<UserRole, string> = {
        admin: 'ADM',
        admission_staff: 'ADS',
        teacher: 'TCH',
        staff: 'STF',
        student: 'STU', // Not used directly for students
    };
    return prefixes[role];
}

/**
 * Generate UID for non-student roles
 */
export async function generateStaffUID(db: D1Database, role: Exclude<UserRole, 'student'>): Promise<string> {
    const prefix = getRolePrefix(role);

    // Get and increment sequence atomically
    const result = await db.prepare(`
    UPDATE uid_sequences 
    SET last_sequence = last_sequence + 1, updated_at = CURRENT_TIMESTAMP
    WHERE prefix = ?
    RETURNING last_sequence
  `).bind(prefix).first();

    if (!result) {
        // Initialize sequence if not exists
        await db.prepare(`
      INSERT INTO uid_sequences (prefix, last_sequence) VALUES (?, 1)
    `).bind(prefix).run();
        return `${prefix}001`;
    }

    const sequence = result.last_sequence as number;
    return `${prefix}${sequence.toString().padStart(3, '0')}`;
}

/**
 * Generate UID for students
 * Format: YYG{Grade}{Section}{Sequence}
 * Example: 25G3B001 = Year 2025, Grade 3, Section B, Sequence 001
 */
export async function generateStudentUID(
    db: D1Database,
    params: StudentUIDParams
): Promise<string> {
    const { grade, section, academicYear } = params;

    // Get current year (last 2 digits)
    const year = academicYear
        ? academicYear.toString().slice(-2)
        : new Date().getFullYear().toString().slice(-2);

    // Build prefix for this grade/section combination
    const yearGradeSection = `${year}G${grade}${section.toUpperCase()}`;

    // Check if we have a sequence for this combination
    let result = await db.prepare(`
    SELECT last_sequence FROM uid_sequences WHERE prefix = ?
  `).bind(yearGradeSection).first();

    if (!result) {
        // Initialize sequence for this combination
        await db.prepare(`
      INSERT INTO uid_sequences (prefix, last_sequence) VALUES (?, 1)
    `).bind(yearGradeSection).run();
        return `${yearGradeSection}001`;
    }

    // Increment sequence
    result = await db.prepare(`
    UPDATE uid_sequences 
    SET last_sequence = last_sequence + 1, updated_at = CURRENT_TIMESTAMP
    WHERE prefix = ?
    RETURNING last_sequence
  `).bind(yearGradeSection).first();

    const sequence = result!.last_sequence as number;
    return `${yearGradeSection}${sequence.toString().padStart(3, '0')}`;
}

/**
 * Validate UID format
 */
export function validateUID(uid: string): boolean {
    // Staff UID patterns
    const staffPattern = /^(ADM|ADS|TCH|STF)\d{3,}$/;
    // Student UID pattern: YYG{Grade}{Section}{Sequence}
    const studentPattern = /^\d{2}G\d{1,2}[A-Z]\d{3,}$/;

    return staffPattern.test(uid) || studentPattern.test(uid);
}

/**
 * Parse UID to extract information
 */
export function parseUID(uid: string): {
    type: 'staff' | 'student';
    role?: string;
    year?: string;
    grade?: number;
    section?: string;
    sequence: number;
} | null {
    // Try staff pattern first
    const staffMatch = uid.match(/^(ADM|ADS|TCH|STF)(\d{3,})$/);
    if (staffMatch) {
        const roleMap: Record<string, string> = {
            'ADM': 'admin',
            'ADS': 'admission_staff',
            'TCH': 'teacher',
            'STF': 'staff',
        };
        return {
            type: 'staff',
            role: roleMap[staffMatch[1]],
            sequence: parseInt(staffMatch[2], 10),
        };
    }

    // Try student pattern
    const studentMatch = uid.match(/^(\d{2})G(\d{1,2})([A-Z])(\d{3,})$/);
    if (studentMatch) {
        return {
            type: 'student',
            year: studentMatch[1],
            grade: parseInt(studentMatch[2], 10),
            section: studentMatch[3],
            sequence: parseInt(studentMatch[4], 10),
        };
    }

    return null;
}

/**
 * Generate a secure random password for new users
 */
export function generateDefaultPassword(): string {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789';
    const specialChars = '@#$%&*';
    let password = '';

    // Ensure at least one of each type
    password += chars[Math.floor(Math.random() * 26)]; // Uppercase
    password += chars[Math.floor(Math.random() * 26) + 26]; // Lowercase
    password += chars[Math.floor(Math.random() * 8) + 52]; // Number
    password += specialChars[Math.floor(Math.random() * specialChars.length)]; // Special

    // Fill remaining characters
    for (let i = 0; i < 4; i++) {
        password += chars[Math.floor(Math.random() * chars.length)];
    }

    // Shuffle
    return password.split('').sort(() => Math.random() - 0.5).join('');
}
