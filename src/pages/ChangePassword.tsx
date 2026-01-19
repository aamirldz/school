/**
 * NVRSS ERP - Change Password Page
 * Forced password change on first login
 */

import React, { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function ChangePassword() {
    const { changePassword, user, isAuthenticated, isLoading, logout } = useAuth();
    const navigate = useNavigate();

    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Redirect if not authenticated
    if (isLoading) {
        return (
            <div className="change-password-container">
                <div className="spinner spinner-lg"></div>
            </div>
        );
    }

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    // If password doesn't need to be changed, redirect to dashboard
    if (!user?.mustChangePassword) {
        const redirectPath = user?.role === 'student' ? '/student/dashboard' : '/admin/dashboard';
        return <Navigate to={redirectPath} replace />;
    }

    const validatePassword = () => {
        if (newPassword.length < 8) {
            return 'Password must be at least 8 characters';
        }
        if (!/[A-Z]/.test(newPassword)) {
            return 'Password must contain at least one uppercase letter';
        }
        if (!/[a-z]/.test(newPassword)) {
            return 'Password must contain at least one lowercase letter';
        }
        if (!/[0-9]/.test(newPassword)) {
            return 'Password must contain at least one number';
        }
        if (newPassword !== confirmPassword) {
            return 'Passwords do not match';
        }
        return null;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        const validationError = validatePassword();
        if (validationError) {
            setError(validationError);
            return;
        }

        setIsSubmitting(true);

        const result = await changePassword(currentPassword, newPassword, confirmPassword);

        if (!result.success) {
            setError(result.error || 'Password change failed');
            setIsSubmitting(false);
        } else {
            // Redirect to appropriate dashboard
            const redirectPath = user?.role === 'student' ? '/student/dashboard' : '/admin/dashboard';
            navigate(redirectPath, { replace: true });
        }
    };

    const handleLogout = async () => {
        await logout();
        navigate('/login', { replace: true });
    };

    return (
        <div className="change-password-container">
            <div className="change-password-card">
                {/* Header */}
                <div className="change-password-header">
                    <div className="change-password-icon">
                        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                            <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                        </svg>
                    </div>
                    <h1 className="change-password-title">Change Your Password</h1>
                    <p className="change-password-subtitle">
                        Welcome, <strong>{user?.firstName} {user?.lastName}</strong> ({user?.uid}).<br />
                        You must change your password before continuing.
                    </p>
                </div>

                {/* Form */}
                <form className="change-password-form" onSubmit={handleSubmit}>
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
                        <label className="form-label form-label-required" htmlFor="currentPassword">
                            Current Password
                        </label>
                        <input
                            type="password"
                            id="currentPassword"
                            className="form-input"
                            value={currentPassword}
                            onChange={(e) => setCurrentPassword(e.target.value)}
                            placeholder="Enter your current password"
                            autoComplete="current-password"
                            disabled={isSubmitting}
                            autoFocus
                        />
                    </div>

                    <div className="form-group">
                        <label className="form-label form-label-required" htmlFor="newPassword">
                            New Password
                        </label>
                        <input
                            type="password"
                            id="newPassword"
                            className="form-input"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            placeholder="Enter new password"
                            autoComplete="new-password"
                            disabled={isSubmitting}
                        />
                        <p className="form-helper">
                            At least 8 characters with uppercase, lowercase, and number
                        </p>
                    </div>

                    <div className="form-group">
                        <label className="form-label form-label-required" htmlFor="confirmPassword">
                            Confirm New Password
                        </label>
                        <input
                            type="password"
                            id="confirmPassword"
                            className="form-input"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            placeholder="Confirm new password"
                            autoComplete="new-password"
                            disabled={isSubmitting}
                        />
                    </div>

                    <div className="change-password-actions">
                        <button
                            type="button"
                            className="btn btn-secondary"
                            onClick={handleLogout}
                            disabled={isSubmitting}
                        >
                            Sign Out
                        </button>
                        <button
                            type="submit"
                            className="btn btn-primary"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? (
                                <>
                                    <div className="spinner"></div>
                                    <span>Updating...</span>
                                </>
                            ) : (
                                'Update Password'
                            )}
                        </button>
                    </div>
                </form>
            </div>

            {/* Styles */}
            <style>{`
        .change-password-container {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, var(--color-primary-50) 0%, var(--color-neutral-100) 100%);
          padding: var(--spacing-4);
        }

        .change-password-card {
          background: var(--bg-card);
          border-radius: var(--radius-xl);
          box-shadow: var(--shadow-xl);
          width: 100%;
          max-width: 480px;
          padding: var(--spacing-8);
        }

        .change-password-header {
          text-align: center;
          margin-bottom: var(--spacing-6);
        }

        .change-password-icon {
          width: 64px;
          height: 64px;
          background: var(--color-warning-100);
          color: var(--color-warning-600);
          border-radius: var(--radius-xl);
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto var(--spacing-4);
        }

        .change-password-title {
          font-size: var(--text-xl);
          font-weight: var(--font-bold);
          color: var(--text-primary);
          margin-bottom: var(--spacing-2);
        }

        .change-password-subtitle {
          font-size: var(--text-sm);
          color: var(--text-secondary);
          line-height: 1.6;
        }

        .change-password-form .alert {
          margin-bottom: var(--spacing-4);
          display: flex;
          align-items: center;
          gap: var(--spacing-2);
          padding: var(--spacing-3);
        }

        .change-password-actions {
          display: flex;
          gap: var(--spacing-3);
          margin-top: var(--spacing-6);
        }

        .change-password-actions .btn {
          flex: 1;
        }
      `}</style>
        </div>
    );
}
