-- NVRSS ERP Database Schema
-- Cloudflare D1 (SQLite-compatible)

-- ============================================
-- USERS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    uid TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    role TEXT NOT NULL CHECK(role IN ('admin', 'admission_staff', 'teacher', 'staff', 'student')),
    is_active INTEGER DEFAULT 1,
    must_change_password INTEGER DEFAULT 1,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    email TEXT,
    phone TEXT,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT DEFAULT CURRENT_TIMESTAMP
);

-- ============================================
-- SESSIONS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS sessions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    token TEXT UNIQUE NOT NULL,
    expires_at TEXT NOT NULL,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- ============================================
-- ADMISSIONS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS admissions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    status TEXT NOT NULL DEFAULT 'pending' CHECK(status IN ('pending', 'reviewing', 'ready_for_approval', 'approved', 'rejected')),
    
    -- Student Information
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    date_of_birth TEXT NOT NULL,
    gender TEXT NOT NULL CHECK(gender IN ('male', 'female', 'other')),
    
    -- Grade/Class Information
    applying_for_grade INTEGER NOT NULL,
    preferred_section TEXT,
    academic_year TEXT NOT NULL,
    
    -- Contact Information
    email TEXT,
    phone TEXT NOT NULL,
    address TEXT NOT NULL,
    city TEXT NOT NULL,
    state TEXT NOT NULL,
    postal_code TEXT,
    
    -- Guardian Information
    guardian_name TEXT NOT NULL,
    guardian_relation TEXT NOT NULL,
    guardian_phone TEXT NOT NULL,
    guardian_email TEXT,
    guardian_occupation TEXT,
    
    -- Previous Education
    previous_school TEXT,
    previous_grade TEXT,
    previous_percentage TEXT,
    
    -- Additional Information
    medical_conditions TEXT,
    special_requirements TEXT,
    
    -- Workflow Fields
    reviewed_by INTEGER,
    review_notes TEXT,
    reviewed_at TEXT,
    approved_by INTEGER,
    approval_notes TEXT,
    approved_at TEXT,
    rejected_reason TEXT,
    
    -- Generated UID (after approval)
    student_uid TEXT,
    
    created_at TEXT DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (reviewed_by) REFERENCES users(id),
    FOREIGN KEY (approved_by) REFERENCES users(id)
);

-- ============================================
-- DOCUMENTS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS documents (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER,
    admission_id INTEGER,
    document_type TEXT NOT NULL CHECK(document_type IN ('birth_certificate', 'previous_marksheet', 'transfer_certificate', 'photo', 'address_proof', 'guardian_id', 'medical_certificate', 'other')),
    file_name TEXT NOT NULL,
    file_path TEXT NOT NULL,
    file_size INTEGER,
    mime_type TEXT,
    verification_status TEXT DEFAULT 'pending' CHECK(verification_status IN ('pending', 'verified', 'rejected')),
    verified_by INTEGER,
    verified_at TEXT,
    verification_notes TEXT,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (admission_id) REFERENCES admissions(id) ON DELETE CASCADE,
    FOREIGN KEY (verified_by) REFERENCES users(id)
);

-- ============================================
-- UID SEQUENCES TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS uid_sequences (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    prefix TEXT UNIQUE NOT NULL,
    last_sequence INTEGER DEFAULT 0,
    updated_at TEXT DEFAULT CURRENT_TIMESTAMP
);

-- Initialize sequences
INSERT OR IGNORE INTO uid_sequences (prefix, last_sequence) VALUES ('ADM', 0);
INSERT OR IGNORE INTO uid_sequences (prefix, last_sequence) VALUES ('ADS', 0);
INSERT OR IGNORE INTO uid_sequences (prefix, last_sequence) VALUES ('TCH', 0);
INSERT OR IGNORE INTO uid_sequences (prefix, last_sequence) VALUES ('STF', 0);

-- ============================================
-- AUDIT LOG TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS audit_log (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER,
    action TEXT NOT NULL,
    entity_type TEXT NOT NULL,
    entity_id INTEGER,
    old_values TEXT,
    new_values TEXT,
    ip_address TEXT,
    user_agent TEXT,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (user_id) REFERENCES users(id)
);

-- ============================================
-- INDEXES
-- ============================================
CREATE INDEX IF NOT EXISTS idx_users_uid ON users(uid);
CREATE INDEX IF NOT EXISTS idx_users_role ON users(role);
CREATE INDEX IF NOT EXISTS idx_users_is_active ON users(is_active);
CREATE INDEX IF NOT EXISTS idx_sessions_token ON sessions(token);
CREATE INDEX IF NOT EXISTS idx_sessions_expires ON sessions(expires_at);
CREATE INDEX IF NOT EXISTS idx_admissions_status ON admissions(status);
CREATE INDEX IF NOT EXISTS idx_admissions_student_uid ON admissions(student_uid);
CREATE INDEX IF NOT EXISTS idx_documents_user ON documents(user_id);
CREATE INDEX IF NOT EXISTS idx_documents_admission ON documents(admission_id);
CREATE INDEX IF NOT EXISTS idx_audit_log_user ON audit_log(user_id);
CREATE INDEX IF NOT EXISTS idx_audit_log_entity ON audit_log(entity_type, entity_id);

-- ============================================
-- SEED DATA (Default Admin)
-- ============================================
-- Password: Admin@123 (bcrypt hash)
INSERT OR IGNORE INTO users (uid, password_hash, role, is_active, must_change_password, first_name, last_name)
VALUES ('ADM001', '$2a$10$rQqLqB8vGa0R1vVZ3M8kAeWr5Q0nYz9D4H6J8K2L5M7N0P3R5T7V9', 'admin', 1, 1, 'System', 'Administrator');

-- Update ADM sequence
UPDATE uid_sequences SET last_sequence = 1 WHERE prefix = 'ADM';
