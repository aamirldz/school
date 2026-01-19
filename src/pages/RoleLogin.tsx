/**
 * NVRSS ERP - Role-Specific Login Page
 * Blue theme with role-specific accents
 */

import { useState } from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

type PortalType = 'student' | 'teacher' | 'staff' | 'admission' | 'admin';

interface PortalConfig {
    title: string;
    subtitle: string;
    placeholder: string;
    allowedRoles: string[];
}

const portalConfigs: Record<PortalType, PortalConfig> = {
    student: {
        title: 'Student Portal',
        subtitle: 'Access your academic dashboard',
        placeholder: 'Enter Student UID (e.g., 25G3B001)',
        allowedRoles: ['student'],
    },
    teacher: {
        title: 'Teacher Portal',
        subtitle: 'Manage classes and students',
        placeholder: 'Enter Teacher ID (e.g., TCH001)',
        allowedRoles: ['teacher'],
    },
    staff: {
        title: 'Staff Portal',
        subtitle: 'Access administrative services',
        placeholder: 'Enter Staff ID (e.g., STF001)',
        allowedRoles: ['staff'],
    },
    admission: {
        title: 'Admission Portal',
        subtitle: 'Process student admissions',
        placeholder: 'Enter Employee ID (e.g., ADS001)',
        allowedRoles: ['admission_staff', 'admin'],
    },
    admin: {
        title: 'Admin Portal',
        subtitle: 'System administration',
        placeholder: 'Enter Admin ID (e.g., ADM001)',
        allowedRoles: ['admin'],
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

    if (isLoading) {
        return (
            <div className="login-page">
                <div className="loading"><div className="spinner"></div></div>
            </div>
        );
    }

    if (isAuthenticated && user) {
        if (user.mustChangePassword) return <Navigate to="/change-password" replace />;
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
        <div className="login-page">
            <div className="login-container">
                {/* Left Panel */}
                <div className="login-panel-left">
                    <Link to="/" className="back-link">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <line x1="19" y1="12" x2="5" y2="12"></line>
                            <polyline points="12 19 5 12 12 5"></polyline>
                        </svg>
                        Back to Home
                    </Link>

                    <div className="brand">
                        <div className="brand-logo"><span>NV</span></div>
                        <h1>NVRSS</h1>
                        <p>New Vision Residential Secondary School</p>
                    </div>

                    <div className="features">
                        <div className="feature-item">
                            <span className="feature-icon">📊</span>
                            <span>Real-time Analytics</span>
                        </div>
                        <div className="feature-item">
                            <span className="feature-icon">🔒</span>
                            <span>Secure Access</span>
                        </div>
                        <div className="feature-item">
                            <span className="feature-icon">📱</span>
                            <span>Mobile Friendly</span>
                        </div>
                    </div>
                </div>

                {/* Right Panel - Login Form */}
                <div className="login-panel-right">
                    <div className="login-form-container">
                        <div className="form-header">
                            <h2>{portal.title}</h2>
                            <p>{portal.subtitle}</p>
                        </div>

                        <form onSubmit={handleSubmit} className="login-form">
                            {error && (
                                <div className="error-message">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <circle cx="12" cy="12" r="10"></circle>
                                        <line x1="12" y1="8" x2="12" y2="12"></line>
                                        <line x1="12" y1="16" x2="12.01" y2="16"></line>
                                    </svg>
                                    <span>{error}</span>
                                </div>
                            )}

                            <div className="form-group">
                                <label>User ID</label>
                                <input
                                    type="text"
                                    value={uid}
                                    onChange={(e) => setUid(e.target.value.toUpperCase())}
                                    placeholder={portal.placeholder}
                                    autoComplete="username"
                                    autoFocus
                                    disabled={isSubmitting}
                                />
                            </div>

                            <div className="form-group">
                                <label>Password</label>
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Enter your password"
                                    autoComplete="current-password"
                                    disabled={isSubmitting}
                                />
                            </div>

                            <button type="submit" className="submit-btn" disabled={isSubmitting}>
                                {isSubmitting ? (
                                    <><div className="btn-spinner"></div>Signing in...</>
                                ) : (
                                    <>Sign In<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg></>
                                )}
                            </button>
                        </form>

                        <div className="form-footer">
                            <p>Forgot password? <a href="#contact">Contact administrator</a></p>
                        </div>
                    </div>
                </div>
            </div>

            <style>{`
        .login-page {
          min-height: 100vh;
          background: #f1f5f9;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 1rem;
        }

        .loading {
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .spinner {
          width: 40px;
          height: 40px;
          border: 3px solid #e2e8f0;
          border-top-color: #1e40af;
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }

        @keyframes spin { to { transform: rotate(360deg); } }

        .login-container {
          display: flex;
          width: 100%;
          max-width: 1000px;
          min-height: 600px;
          background: white;
          border-radius: 24px;
          overflow: hidden;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.1);
        }

        .login-panel-left {
          flex: 1;
          background: linear-gradient(135deg, #1e40af 0%, #3b82f6 100%);
          color: white;
          padding: 2rem;
          display: flex;
          flex-direction: column;
          position: relative;
        }

        .back-link {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          color: rgba(255,255,255,0.8);
          text-decoration: none;
          font-size: 0.9rem;
          margin-bottom: 3rem;
          transition: color 0.2s;
        }

        .back-link:hover { color: white; }

        .brand {
          text-align: center;
          margin-bottom: auto;
        }

        .brand-logo {
          width: 80px;
          height: 80px;
          background: white;
          border-radius: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 1.5rem;
          box-shadow: 0 10px 30px rgba(0,0,0,0.2);
        }

        .brand-logo span {
          font-size: 2rem;
          font-weight: 800;
          color: #1e40af;
        }

        .brand h1 {
          font-size: 2rem;
          font-weight: 700;
          margin-bottom: 0.5rem;
        }

        .brand p {
          opacity: 0.9;
          font-size: 0.9rem;
        }

        .features {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          margin-top: auto;
        }

        .feature-item {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.75rem 1rem;
          background: rgba(255,255,255,0.1);
          border-radius: 10px;
          font-size: 0.9rem;
        }

        .feature-icon { font-size: 1.25rem; }

        .login-panel-right {
          flex: 1;
          padding: 3rem;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .login-form-container {
          width: 100%;
          max-width: 360px;
        }

        .form-header {
          text-align: center;
          margin-bottom: 2rem;
        }

        .form-header h2 {
          font-size: 1.75rem;
          font-weight: 700;
          color: #1e293b;
          margin-bottom: 0.5rem;
        }

        .form-header p {
          color: #64748b;
        }

        .login-form {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }

        .error-message {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.75rem 1rem;
          background: #fef2f2;
          border: 1px solid #fecaca;
          border-radius: 10px;
          color: #dc2626;
          font-size: 0.875rem;
        }

        .form-group label {
          display: block;
          font-size: 0.875rem;
          font-weight: 500;
          color: #374151;
          margin-bottom: 0.5rem;
        }

        .form-group input {
          width: 100%;
          padding: 0.875rem 1rem;
          border: 2px solid #e5e7eb;
          border-radius: 10px;
          font-size: 1rem;
          transition: all 0.2s;
        }

        .form-group input:focus {
          outline: none;
          border-color: #3b82f6;
          box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
        }

        .form-group input:disabled {
          background: #f9fafb;
        }

        .submit-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          width: 100%;
          padding: 1rem;
          background: linear-gradient(135deg, #1e40af 0%, #3b82f6 100%);
          color: white;
          border: none;
          border-radius: 10px;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
        }

        .submit-btn:hover:not(:disabled) {
          box-shadow: 0 4px 15px rgba(30, 64, 175, 0.4);
          transform: translateY(-1px);
        }

        .submit-btn:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }

        .btn-spinner {
          width: 20px;
          height: 20px;
          border: 2px solid rgba(255,255,255,0.3);
          border-top-color: white;
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }

        .form-footer {
          text-align: center;
          margin-top: 1.5rem;
          padding-top: 1.5rem;
          border-top: 1px solid #e5e7eb;
        }

        .form-footer p {
          color: #64748b;
          font-size: 0.875rem;
        }

        .form-footer a {
          color: #3b82f6;
          text-decoration: none;
          font-weight: 500;
        }

        .form-footer a:hover {
          text-decoration: underline;
        }

        @media (max-width: 768px) {
          .login-container {
            flex-direction: column;
            min-height: auto;
          }

          .login-panel-left {
            padding: 1.5rem;
          }

          .back-link {
            margin-bottom: 1.5rem;
          }

          .brand { margin-bottom: 1.5rem; }
          .brand-logo { width: 60px; height: 60px; }
          .brand-logo span { font-size: 1.5rem; }
          .brand h1 { font-size: 1.5rem; }



          .login-panel-right {
            padding: 2rem;
          }
        }
      `}</style>
        </div>
    );
}
