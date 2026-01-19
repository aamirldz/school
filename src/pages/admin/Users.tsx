/**
 * NVRSS ERP - Users Management Page
 * Admin-only page for managing system users
 */

import React, { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../../contexts/AuthContext';

interface User {
    id: number;
    uid: string;
    role: string;
    firstName: string;
    lastName: string;
    email: string | null;
    phone: string | null;
    isActive: boolean;
    mustChangePassword: boolean;
    createdAt: string;
}

interface Pagination {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
}

const roleLabels: Record<string, string> = {
    admin: 'Administrator',
    admission_staff: 'Admission Staff',
    teacher: 'Teacher',
    staff: 'Staff',
    student: 'Student',
};

export default function Users() {
    const { token, user: currentUser } = useAuth();

    const [users, setUsers] = useState<User[]>([]);
    const [pagination, setPagination] = useState<Pagination>({ page: 1, limit: 20, total: 0, totalPages: 0 });
    const [isLoading, setIsLoading] = useState(true);

    // Filters
    const [roleFilter, setRoleFilter] = useState('');
    const [statusFilter, setStatusFilter] = useState('');
    const [searchTerm, setSearchTerm] = useState('');

    // Modals
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [showResetModal, setShowResetModal] = useState(false);
    const [selectedUser, setSelectedUser] = useState<User | null>(null);

    // Create form
    const [createForm, setCreateForm] = useState({
        firstName: '',
        lastName: '',
        role: 'admission_staff',
        email: '',
        phone: '',
    });
    const [createResult, setCreateResult] = useState<{ uid: string; password: string } | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const fetchUsers = useCallback(async () => {
        if (!token) return;

        setIsLoading(true);
        try {
            const params = new URLSearchParams();
            params.set('page', pagination.page.toString());
            params.set('limit', '20');
            if (roleFilter) params.set('role', roleFilter);
            if (statusFilter) params.set('status', statusFilter);
            if (searchTerm) params.set('search', searchTerm);

            const response = await fetch(`/api/users?${params.toString()}`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            if (response.ok) {
                const data = await response.json();
                setUsers(data.users);
                setPagination(data.pagination);
            }
        } catch (error) {
            console.error('Fetch users error:', error);
        } finally {
            setIsLoading(false);
        }
    }, [token, pagination.page, roleFilter, statusFilter, searchTerm]);

    useEffect(() => {
        fetchUsers();
    }, [fetchUsers]);

    const handleCreate = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!token) return;

        setIsSubmitting(true);
        try {
            const response = await fetch('/api/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(createForm),
            });

            const data = await response.json();

            if (response.ok) {
                setCreateResult({ uid: data.user.uid, password: data.user.defaultPassword });
                fetchUsers();
            }
        } catch (error) {
            console.error('Create user error:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleToggleActive = async (user: User) => {
        if (!token) return;

        try {
            const response = await fetch(`/api/users/${user.id}/toggle-active`, {
                method: 'POST',
                headers: { Authorization: `Bearer ${token}` },
            });

            if (response.ok) {
                fetchUsers();
            }
        } catch (error) {
            console.error('Toggle active error:', error);
        }
    };

    const handleResetPassword = async () => {
        if (!token || !selectedUser) return;

        setIsSubmitting(true);
        try {
            const response = await fetch(`/api/users/${selectedUser.id}/reset-password`, {
                method: 'POST',
                headers: { Authorization: `Bearer ${token}` },
            });

            const data = await response.json();

            if (response.ok) {
                alert(`Password reset successful!\n\nNew Password: ${data.newPassword}\n\nPlease save this password.`);
                setShowResetModal(false);
                setSelectedUser(null);
            }
        } catch (error) {
            console.error('Reset password error:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const closeCreateModal = () => {
        setShowCreateModal(false);
        setCreateForm({ firstName: '', lastName: '', role: 'admission_staff', email: '', phone: '' });
        setCreateResult(null);
    };

    const formatDate = (dateStr: string) => {
        return new Date(dateStr).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
        });
    };

    return (
        <div className="users-page">
            {/* Page Header */}
            <div className="page-header">
                <div>
                    <h1 className="page-title">Users</h1>
                    <p className="page-subtitle">Manage system users and access</p>
                </div>
                <div className="page-actions">
                    <button className="btn btn-primary" onClick={() => setShowCreateModal(true)}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <line x1="12" y1="5" x2="12" y2="19"></line>
                            <line x1="5" y1="12" x2="19" y2="12"></line>
                        </svg>
                        Add User
                    </button>
                </div>
            </div>

            {/* Filters */}
            <div className="filters-bar">
                <div className="filters-left">
                    <select
                        className="form-input form-select"
                        value={roleFilter}
                        onChange={(e) => setRoleFilter(e.target.value)}
                    >
                        <option value="">All Roles</option>
                        <option value="admin">Administrator</option>
                        <option value="admission_staff">Admission Staff</option>
                        <option value="teacher">Teacher</option>
                        <option value="staff">Staff</option>
                        <option value="student">Student</option>
                    </select>

                    <select
                        className="form-input form-select"
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                    >
                        <option value="">All Status</option>
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                    </select>

                    <input
                        type="text"
                        className="form-input"
                        placeholder="Search by UID, name..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        style={{ minWidth: '200px' }}
                    />
                </div>

                <span className="results-count">
                    {pagination.total} user{pagination.total !== 1 ? 's' : ''}
                </span>
            </div>

            {/* Table */}
            <div className="table-container">
                <table className="table">
                    <thead>
                        <tr>
                            <th>UID</th>
                            <th>Name</th>
                            <th>Role</th>
                            <th>Contact</th>
                            <th>Status</th>
                            <th>Created</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {isLoading ? (
                            <tr>
                                <td colSpan={7} style={{ textAlign: 'center', padding: '3rem' }}>
                                    <div className="spinner"></div>
                                </td>
                            </tr>
                        ) : users.length > 0 ? (
                            users.map((user) => (
                                <tr key={user.id}>
                                    <td>
                                        <code className="uid-code">{user.uid}</code>
                                    </td>
                                    <td>
                                        <span className="font-medium">{user.firstName} {user.lastName}</span>
                                    </td>
                                    <td>{roleLabels[user.role] || user.role}</td>
                                    <td>
                                        {user.email && <div className="text-sm">{user.email}</div>}
                                        {user.phone && <div className="text-muted text-sm">{user.phone}</div>}
                                        {!user.email && !user.phone && <span className="text-muted">-</span>}
                                    </td>
                                    <td>
                                        <span className={`badge badge-${user.isActive ? 'success' : 'error'}`}>
                                            {user.isActive ? 'Active' : 'Inactive'}
                                        </span>
                                        {user.mustChangePassword && (
                                            <span className="badge badge-warning ml-2">Password Change Required</span>
                                        )}
                                    </td>
                                    <td className="text-muted">{formatDate(user.createdAt)}</td>
                                    <td>
                                        <div className="table-actions">
                                            <button
                                                className="btn btn-ghost btn-sm"
                                                onClick={() => { setSelectedUser(user); setShowResetModal(true); }}
                                                title="Reset Password"
                                            >
                                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                    <path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4"></path>
                                                </svg>
                                            </button>

                                            {user.id !== currentUser?.id && (
                                                <button
                                                    className={`btn btn-sm ${user.isActive ? 'btn-danger' : 'btn-success'}`}
                                                    onClick={() => handleToggleActive(user)}
                                                >
                                                    {user.isActive ? 'Deactivate' : 'Activate'}
                                                </button>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={7}>
                                    <div className="empty-state">
                                        <div className="empty-state-title">No users found</div>
                                        <p className="empty-state-description">Try adjusting your filters.</p>
                                    </div>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            {pagination.totalPages > 1 && (
                <div className="pagination">
                    <button
                        className="btn btn-secondary btn-sm"
                        disabled={pagination.page === 1}
                        onClick={() => setPagination({ ...pagination, page: pagination.page - 1 })}
                    >
                        Previous
                    </button>
                    <span className="pagination-info">
                        Page {pagination.page} of {pagination.totalPages}
                    </span>
                    <button
                        className="btn btn-secondary btn-sm"
                        disabled={pagination.page === pagination.totalPages}
                        onClick={() => setPagination({ ...pagination, page: pagination.page + 1 })}
                    >
                        Next
                    </button>
                </div>
            )}

            {/* Create User Modal */}
            {showCreateModal && (
                <div className="modal-overlay" onClick={closeCreateModal}>
                    <div className="modal" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-header">
                            <h3 className="modal-title">{createResult ? 'User Created' : 'Add New User'}</h3>
                            <button className="modal-close" onClick={closeCreateModal}>
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <line x1="18" y1="6" x2="6" y2="18"></line>
                                    <line x1="6" y1="6" x2="18" y2="18"></line>
                                </svg>
                            </button>
                        </div>

                        <div className="modal-body">
                            {createResult ? (
                                <div className="create-success">
                                    <div className="alert alert-success mb-4">
                                        User created successfully! Please save the credentials below.
                                    </div>

                                    <div className="credentials-box">
                                        <div className="credential-item">
                                            <label>User ID (UID)</label>
                                            <div className="credential-value">{createResult.uid}</div>
                                        </div>
                                        <div className="credential-item">
                                            <label>Default Password</label>
                                            <div className="credential-value">{createResult.password}</div>
                                        </div>
                                    </div>

                                    <p className="text-muted text-sm mt-4">
                                        The user will be required to change their password on first login.
                                    </p>
                                </div>
                            ) : (
                                <form onSubmit={handleCreate}>
                                    <div className="form-row">
                                        <div className="form-group">
                                            <label className="form-label form-label-required">First Name</label>
                                            <input
                                                type="text"
                                                className="form-input"
                                                value={createForm.firstName}
                                                onChange={(e) => setCreateForm({ ...createForm, firstName: e.target.value })}
                                                required
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label className="form-label form-label-required">Last Name</label>
                                            <input
                                                type="text"
                                                className="form-input"
                                                value={createForm.lastName}
                                                onChange={(e) => setCreateForm({ ...createForm, lastName: e.target.value })}
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <label className="form-label form-label-required">Role</label>
                                        <select
                                            className="form-input form-select"
                                            value={createForm.role}
                                            onChange={(e) => setCreateForm({ ...createForm, role: e.target.value })}
                                        >
                                            <option value="admission_staff">Admission Staff</option>
                                            <option value="teacher">Teacher</option>
                                            <option value="staff">Staff</option>
                                            <option value="admin">Administrator</option>
                                        </select>
                                    </div>

                                    <div className="form-row">
                                        <div className="form-group">
                                            <label className="form-label">Email (optional)</label>
                                            <input
                                                type="email"
                                                className="form-input"
                                                value={createForm.email}
                                                onChange={(e) => setCreateForm({ ...createForm, email: e.target.value })}
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label className="form-label">Phone (optional)</label>
                                            <input
                                                type="tel"
                                                className="form-input"
                                                value={createForm.phone}
                                                onChange={(e) => setCreateForm({ ...createForm, phone: e.target.value })}
                                            />
                                        </div>
                                    </div>
                                </form>
                            )}
                        </div>

                        <div className="modal-footer">
                            {createResult ? (
                                <button className="btn btn-primary" onClick={closeCreateModal}>Done</button>
                            ) : (
                                <>
                                    <button className="btn btn-secondary" onClick={closeCreateModal} disabled={isSubmitting}>
                                        Cancel
                                    </button>
                                    <button className="btn btn-primary" onClick={handleCreate} disabled={isSubmitting}>
                                        {isSubmitting ? 'Creating...' : 'Create User'}
                                    </button>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            )}

            {/* Reset Password Modal */}
            {showResetModal && selectedUser && (
                <div className="modal-overlay" onClick={() => { setShowResetModal(false); setSelectedUser(null); }}>
                    <div className="modal" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-header">
                            <h3 className="modal-title">Reset Password</h3>
                            <button className="modal-close" onClick={() => { setShowResetModal(false); setSelectedUser(null); }}>
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <line x1="18" y1="6" x2="6" y2="18"></line>
                                    <line x1="6" y1="6" x2="18" y2="18"></line>
                                </svg>
                            </button>
                        </div>

                        <div className="modal-body">
                            <div className="alert alert-warning mb-4">
                                This will generate a new password and immediately invalidate all sessions for this user.
                            </div>
                            <p>
                                Reset password for <strong>{selectedUser.firstName} {selectedUser.lastName}</strong> ({selectedUser.uid})?
                            </p>
                        </div>

                        <div className="modal-footer">
                            <button className="btn btn-secondary" onClick={() => { setShowResetModal(false); setSelectedUser(null); }} disabled={isSubmitting}>
                                Cancel
                            </button>
                            <button className="btn btn-danger" onClick={handleResetPassword} disabled={isSubmitting}>
                                {isSubmitting ? 'Resetting...' : 'Reset Password'}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Page Styles */}
            <style>{`
        .users-page {
          max-width: 100%;
        }

        .filters-bar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: var(--spacing-4);
          gap: var(--spacing-4);
          flex-wrap: wrap;
        }

        .filters-left {
          display: flex;
          gap: var(--spacing-3);
          flex-wrap: wrap;
        }

        .results-count {
          font-size: var(--text-sm);
          color: var(--text-secondary);
        }

        .uid-code {
          font-family: var(--font-mono);
          font-size: var(--text-sm);
          background: var(--color-neutral-100);
          padding: 2px 6px;
          border-radius: var(--radius-sm);
        }

        .pagination {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: var(--spacing-4);
          margin-top: var(--spacing-6);
        }

        .pagination-info {
          font-size: var(--text-sm);
          color: var(--text-secondary);
        }

        .form-row {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: var(--spacing-4);
        }

        .credentials-box {
          background: var(--color-neutral-50);
          border: 1px solid var(--border-light);
          border-radius: var(--radius-lg);
          padding: var(--spacing-4);
        }

        .credential-item {
          margin-bottom: var(--spacing-3);
        }

        .credential-item:last-child {
          margin-bottom: 0;
        }

        .credential-item label {
          display: block;
          font-size: var(--text-xs);
          color: var(--text-muted);
          margin-bottom: var(--spacing-1);
        }

        .credential-value {
          font-family: var(--font-mono);
          font-size: var(--text-lg);
          font-weight: var(--font-semibold);
          color: var(--color-primary-600);
        }

        .page-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: var(--spacing-6);
        }

        .page-actions {
          display: flex;
          gap: var(--spacing-3);
        }
      `}</style>
        </div>
    );
}
