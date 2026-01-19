/**
 * NVRSS ERP - Login Page
 * Institutional login with UID + Password only
 */

import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function Login() {
    const { login, isAuthenticated, isLoading, user } = useAuth();

    const [uid, setUid] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Redirect if already authenticated
    if (isLoading) {
        return (
            <div className="login-container">
                <div className="login-loading">
                    <div className="spinner spinner-lg"></div>
                </div>
            </div>
        );
    }

    if (isAuthenticated) {
        if (user?.mustChangePassword) {
            return <Navigate to="/change-password" replace />;
        }
        const redirectPath = user?.role === 'student' ? '/student/dashboard' : '/admin/dashboard';
        return <Navigate to={redirectPath} replace />;
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
        } else {
            // Navigation will happen via the redirect above
        }
    };

    return (
        <div className="login-container">
            <div className="login-card">
                {/* Header */}
                <div className="login-header">
                    <div className="login-logo">
                        <span>NV</span>
                    </div>
                    <h1 className="login-title">NVRSS ERP</h1>
                    <p className="login-subtitle">New Vision Residential Secondary School</p>
                </div>

                {/* Form */}
                <form className="login-form" onSubmit={handleSubmit}>
                    {error && (
                        <div className="alert alert-error">
                            <svg className="alert-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <circle cx="12" cy="12" r="10"></circle>
                                <line x1="12" y1="8" x2="12" y2="12"></line>
                                <line x1="12" y1="16" x2="12.01" y2="16"></line>
                            </svg>
                            <span>{error}</span>
                        </div>
                    )}

                    <div className="form-group">
                        <label className="form-label form-label-required" htmlFor="uid">
                            User ID (UID)
                        </label>
                        <input
                            type="text"
                            id="uid"
                            className="form-input"
                            value={uid}
                            onChange={(e) => setUid(e.target.value.toUpperCase())}
                            placeholder="Enter your UID (e.g., ADM001)"
                            autoComplete="username"
                            autoFocus
                            disabled={isSubmitting}
                        />
                    </div>

                    <div className="form-group">
                        <label className="form-label form-label-required" htmlFor="password">
                            Password
                        </label>
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
                        className="btn btn-primary btn-lg w-full"
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

                {/* Footer */}
                <div className="login-footer">
                    <p>Contact administrator if you need assistance</p>
                </div>
            </div>

            {/* Additional styles for login page */}
            <style>{`
        .login-container {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, var(--color-primary-50) 0%, var(--color-neutral-100) 100%);
          padding: var(--spacing-4);
        }

        .login-loading {
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .login-card {
          background: var(--bg-card);
          border-radius: var(--radius-xl);
          box-shadow: var(--shadow-xl);
          width: 100%;
          max-width: 420px;
          padding: var(--spacing-8);
        }

        .login-header {
          text-align: center;
          margin-bottom: var(--spacing-6);
        }

        .login-logo {
          width: 72px;
          height: 72px;
          background: linear-gradient(135deg, var(--color-primary-600) 0%, var(--color-primary-700) 100%);
          border-radius: var(--radius-xl);
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto var(--spacing-4);
          box-shadow: 0 4px 14px rgba(37, 99, 235, 0.3);
        }

        .login-logo span {
          color: white;
          font-size: var(--text-2xl);
          font-weight: var(--font-bold);
          letter-spacing: -0.02em;
        }

        .login-title {
          font-size: var(--text-2xl);
          font-weight: var(--font-bold);
          color: var(--text-primary);
          margin-bottom: var(--spacing-1);
        }

        .login-subtitle {
          font-size: var(--text-sm);
          color: var(--text-secondary);
        }

        .login-form {
          margin-bottom: var(--spacing-4);
        }

        .login-form .alert {
          margin-bottom: var(--spacing-4);
          display: flex;
          align-items: center;
          gap: var(--spacing-2);
          padding: var(--spacing-3);
        }

        .login-footer {
          text-align: center;
          padding-top: var(--spacing-4);
          border-top: 1px solid var(--border-light);
        }

        .login-footer p {
          font-size: var(--text-xs);
          color: var(--text-muted);
        }
      `}</style>
        </div>
    );
}
