/**
 * NVRSS ERP - Role-Specific Login Page
 * Handles login for different user types with unique styling
 */

import { useState } from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

type PortalType = 'student' | 'teacher' | 'staff' | 'admission' | 'admin';

interface PortalConfig {
    title: string;
    subtitle: string;
    color: string;
    bgGradient: string;
    placeholder: string;
    allowedRoles: string[];
    redirectPath: string;
}

const portalConfigs: Record<PortalType, PortalConfig> = {
    student: {
        title: 'Student Portal',
        subtitle: 'Access your academic dashboard',
        color: '#dc2626',
        bgGradient: 'linear-gradient(135deg, #dc2626 0%, #b91c1c 100%)',
        placeholder: 'Enter Student UID (e.g., 25G3B001)',
        allowedRoles: ['student'],
        redirectPath: '/student/dashboard',
    },
    teacher: {
        title: 'Teacher Portal',
        subtitle: 'Manage classes and students',
        color: '#16a34a',
        bgGradient: 'linear-gradient(135deg, #16a34a 0%, #15803d 100%)',
        placeholder: 'Enter Teacher ID (e.g., TCH001)',
        allowedRoles: ['teacher'],
        redirectPath: '/teacher/dashboard',
    },
    staff: {
        title: 'Staff Portal',
        subtitle: 'Access staff services',
        color: '#2563eb',
        bgGradient: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)',
        placeholder: 'Enter Staff ID (e.g., STF001)',
        allowedRoles: ['staff'],
        redirectPath: '/staff/dashboard',
    },
    admission: {
        title: 'Admission Portal',
        subtitle: 'Manage student admissions',
        color: '#d97706',
        bgGradient: 'linear-gradient(135deg, #d97706 0%, #b45309 100%)',
        placeholder: 'Enter Employee ID (e.g., ADS001)',
        allowedRoles: ['admission_staff', 'admin'],
        redirectPath: '/admin/admissions',
    },
    admin: {
        title: 'Admin Portal',
        subtitle: 'System Administration',
        color: '#7c3aed',
        bgGradient: 'linear-gradient(135deg, #7c3aed 0%, #6d28d9 100%)',
        placeholder: 'Enter Admin ID (e.g., ADM001)',
        allowedRoles: ['admin'],
        redirectPath: '/admin/dashboard',
    },
};

export default function RoleLogin() {
    const { role } = useParams<{ role: PortalType }>();
    const { login, isAuthenticated, isLoading, user } = useAuth();

    const [uid, setUid] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const portal = portalConfigs[role as PortalType] || portalConfigs.student;

    // Redirect if already authenticated
    if (isLoading) {
        return (
            <div className="login-container" style={{ background: portal.bgGradient }}>
                <div className="login-loading">
                    <div className="spinner spinner-lg"></div>
                </div>
            </div>
        );
    }

    if (isAuthenticated && user) {
        if (user.mustChangePassword) {
            return <Navigate to="/change-password" replace />;
        }
        // Redirect based on role
        if (user.role === 'student') return <Navigate to="/student/dashboard" replace />;
        if (user.role === 'teacher') return <Navigate to="/teacher/dashboard" replace />;
        if (user.role === 'staff') return <Navigate to="/staff/dashboard" replace />;
        if (user.role === 'admission_staff') return <Navigate to="/admin/admissions" replace />;
        if (user.role === 'admin') return <Navigate to="/admin/dashboard" replace />;
        return <Navigate to="/" replace />;
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setIsSubmitting(true);

        if (!uid.trim() || !password.trim()) {
            setError('Please enter both UID and password');
            setIsSubmitting(false);
            return;
        }

        const result = await login(uid.trim().toUpperCase(), password);

        if (!result.success) {
            setError(result.error || 'Login failed');
            setIsSubmitting(false);
        }
    };

    return (
        <div className="role-login-page" style={{ background: portal.bgGradient }}>
            <div className="login-card">
                {/* Back to Home */}
                <Link to="/" className="back-link">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <line x1="19" y1="12" x2="5" y2="12"></line>
                        <polyline points="12 19 5 12 12 5"></polyline>
                    </svg>
                    Back to Portal
                </Link>

                {/* Header */}
                <div className="login-header">
                    <div className="login-icon" style={{ borderColor: portal.color }}>
                        <span style={{ color: portal.color }}>NV</span>
                    </div>
                    <h1 className="login-title" style={{ color: portal.color }}>{portal.title}</h1>
                    <p className="login-subtitle">{portal.subtitle}</p>
                </div>

                {/* Form */}
                <form className="login-form" onSubmit={handleSubmit}>
                    {error && (
                        <div className="alert alert-error">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <circle cx="12" cy="12" r="10"></circle>
                                <line x1="12" y1="8" x2="12" y2="12"></line>
                                <line x1="12" y1="16" x2="12.01" y2="16"></line>
                            </svg>
                            <span>{error}</span>
                        </div>
                    )}

                    <div className="form-group">
                        <label className="form-label" htmlFor="uid">User ID</label>
                        <input
                            type="text"
                            id="uid"
                            className="form-input"
                            value={uid}
                            onChange={(e) => setUid(e.target.value.toUpperCase())}
                            placeholder={portal.placeholder}
                            autoComplete="username"
                            autoFocus
                            disabled={isSubmitting}
                        />
                    </div>

                    <div className="form-group">
                        <label className="form-label" htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            className="form-input"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter your password"
                            autoComplete="current-password"
                            disabled={isSubmitting}
                        />
                    </div>

                    <button
                        type="submit"
                        className="btn-submit"
                        style={{ background: portal.color }}
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? (
                            <>
                                <div className="spinner"></div>
                                <span>Signing in...</span>
                            </>
                        ) : (
                            'Sign In'
                        )}
                    </button>
                </form>

                {/* Help */}
                <div className="login-help">
                    <p>Forgot password? Contact administrator</p>
                </div>
            </div>

            {/* Styles */}
            <style>{`
        .role-login-page {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: var(--spacing-4);
        }

        .login-card {
          background: white;
          border-radius: var(--radius-2xl);
          box-shadow: 0 25px 50px rgba(0, 0, 0, 0.25);
          width: 100%;
          max-width: 420px;
          padding: var(--spacing-8);
          position: relative;
        }

        .back-link {
          position: absolute;
          top: var(--spacing-4);
          left: var(--spacing-4);
          display: flex;
          align-items: center;
          gap: var(--spacing-1);
          color: var(--text-secondary);
          font-size: 0.875rem;
          text-decoration: none;
          transition: color 0.2s;
        }

        .back-link:hover {
          color: var(--text-primary);
        }

        .login-header {
          text-align: center;
          margin-bottom: var(--spacing-6);
          margin-top: var(--spacing-4);
        }

        .login-icon {
          width: 72px;
          height: 72px;
          border: 4px solid;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto var(--spacing-4);
          background: white;
        }

        .login-icon span {
          font-size: 1.75rem;
          font-weight: 800;
        }

        .login-title {
          font-size: 1.5rem;
          font-weight: 700;
          margin-bottom: var(--spacing-1);
        }

        .login-subtitle {
          font-size: 0.875rem;
          color: var(--text-secondary);
        }

        .login-form .alert {
          display: flex;
          align-items: center;
          gap: var(--spacing-2);
          padding: var(--spacing-3);
          margin-bottom: var(--spacing-4);
          background: #fee2e2;
          border-radius: var(--radius-md);
          color: #dc2626;
          font-size: 0.875rem;
        }

        .btn-submit {
          width: 100%;
          padding: var(--spacing-3) var(--spacing-4);
          border: none;
          border-radius: var(--radius-md);
          color: white;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: var(--spacing-2);
          transition: filter 0.2s;
        }

        .btn-submit:hover:not(:disabled) {
          filter: brightness(0.9);
        }

        .btn-submit:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }

        .login-help {
          margin-top: var(--spacing-6);
          padding-top: var(--spacing-4);
          border-top: 1px solid var(--border-light);
          text-align: center;
        }

        .login-help p {
          font-size: 0.75rem;
          color: var(--text-muted);
        }

        .login-loading {
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 4rem;
        }
      `}</style>
        </div>
    );
}
