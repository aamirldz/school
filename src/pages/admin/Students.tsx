/**
 * NVRSS ERP - Students Management Page
 */

import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../../contexts/AuthContext';

interface Student {
    id: number;
    uid: string;
    firstName: string;
    lastName: string;
    email: string | null;
    phone: string | null;
    isActive: boolean;
    createdAt: string;
}

interface Pagination {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
}

export default function Students() {
    const { token } = useAuth();

    const [students, setStudents] = useState<Student[]>([]);
    const [pagination, setPagination] = useState<Pagination>({ page: 1, limit: 20, total: 0, totalPages: 0 });
    const [isLoading, setIsLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    const fetchStudents = useCallback(async () => {
        if (!token) return;

        setIsLoading(true);
        try {
            const params = new URLSearchParams();
            params.set('page', pagination.page.toString());
            params.set('limit', '20');
            params.set('role', 'student');
            if (searchTerm) params.set('search', searchTerm);

            const response = await fetch(`/api/users?${params.toString()}`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            if (response.ok) {
                const data = await response.json();
                setStudents(data.users);
                setPagination(data.pagination);
            }
        } catch (error) {
            console.error('Fetch students error:', error);
        } finally {
            setIsLoading(false);
        }
    }, [token, pagination.page, searchTerm]);

    useEffect(() => {
        fetchStudents();
    }, [fetchStudents]);

    const handleToggleActive = async (student: Student) => {
        if (!token) return;

        try {
            const response = await fetch(`/api/users/${student.id}/toggle-active`, {
                method: 'POST',
                headers: { Authorization: `Bearer ${token}` },
            });

            if (response.ok) {
                fetchStudents();
            }
        } catch (error) {
            console.error('Toggle active error:', error);
        }
    };

    const handleResetPassword = async (student: Student) => {
        if (!token) return;

        if (!confirm(`Reset password for ${student.firstName} ${student.lastName} (${student.uid})?`)) {
            return;
        }

        try {
            const response = await fetch(`/api/users/${student.id}/reset-password`, {
                method: 'POST',
                headers: { Authorization: `Bearer ${token}` },
            });

            const data = await response.json();

            if (response.ok) {
                alert(`Password reset successful!\n\nNew Password: ${data.newPassword}\n\nPlease save this password.`);
            }
        } catch (error) {
            console.error('Reset password error:', error);
        }
    };

    const formatDate = (dateStr: string) => {
        return new Date(dateStr).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
        });
    };

    // Parse student UID to extract info
    const parseStudentUid = (uid: string) => {
        const match = uid.match(/^(\d{2})G(\d{1,2})([A-Z])(\d{3,})$/);
        if (match) {
            return {
                year: `20${match[1]}`,
                grade: match[2],
                section: match[3],
                sequence: match[4],
            };
        }
        return null;
    };

    return (
        <div className="students-page">
            {/* Page Header */}
            <div className="page-header">
                <div>
                    <h1 className="page-title">Students</h1>
                    <p className="page-subtitle">View and manage enrolled students</p>
                </div>
            </div>

            {/* Filters */}
            <div className="filters-bar">
                <div className="filters-left">
                    <input
                        type="text"
                        className="form-input"
                        placeholder="Search by UID, name..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        style={{ minWidth: '280px' }}
                    />
                </div>

                <span className="results-count">
                    {pagination.total} student{pagination.total !== 1 ? 's' : ''}
                </span>
            </div>

            {/* Table */}
            <div className="table-container">
                <table className="table">
                    <thead>
                        <tr>
                            <th>UID</th>
                            <th>Name</th>
                            <th>Grade/Section</th>
                            <th>Contact</th>
                            <th>Status</th>
                            <th>Enrolled</th>
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
                        ) : students.length > 0 ? (
                            students.map((student) => {
                                const uidInfo = parseStudentUid(student.uid);
                                return (
                                    <tr key={student.id}>
                                        <td>
                                            <code className="uid-code">{student.uid}</code>
                                        </td>
                                        <td>
                                            <span className="font-medium">{student.firstName} {student.lastName}</span>
                                        </td>
                                        <td>
                                            {uidInfo ? (
                                                <span>Grade {uidInfo.grade} - Section {uidInfo.section}</span>
                                            ) : (
                                                <span className="text-muted">-</span>
                                            )}
                                        </td>
                                        <td>
                                            {student.phone && <div className="text-sm">{student.phone}</div>}
                                            {student.email && <div className="text-muted text-sm">{student.email}</div>}
                                            {!student.email && !student.phone && <span className="text-muted">-</span>}
                                        </td>
                                        <td>
                                            <span className={`badge badge-${student.isActive ? 'success' : 'error'}`}>
                                                {student.isActive ? 'Active' : 'Inactive'}
                                            </span>
                                        </td>
                                        <td className="text-muted">{formatDate(student.createdAt)}</td>
                                        <td>
                                            <div className="table-actions">
                                                <button
                                                    className="btn btn-ghost btn-sm"
                                                    onClick={() => handleResetPassword(student)}
                                                    title="Reset Password"
                                                >
                                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                        <path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4"></path>
                                                    </svg>
                                                </button>

                                                <button
                                                    className={`btn btn-sm ${student.isActive ? 'btn-danger' : 'btn-success'}`}
                                                    onClick={() => handleToggleActive(student)}
                                                >
                                                    {student.isActive ? 'Deactivate' : 'Activate'}
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })
                        ) : (
                            <tr>
                                <td colSpan={7}>
                                    <div className="empty-state">
                                        <svg className="empty-state-icon" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                            <path d="M22 10v6M2 10l10-5 10 5-10 5z"></path>
                                            <path d="M6 12v5c3 3 9 3 12 0v-5"></path>
                                        </svg>
                                        <div className="empty-state-title">No students found</div>
                                        <p className="empty-state-description">
                                            {searchTerm ? 'Try adjusting your search.' : 'Students will appear here once admissions are approved.'}
                                        </p>
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

            {/* Page Styles */}
            <style>{`
        .students-page {
          max-width: 100%;
        }

        .filters-bar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: var(--spacing-4);
          gap: var(--spacing-4);
        }

        .filters-left {
          display: flex;
          gap: var(--spacing-3);
        }

        .results-count {
          font-size: var(--text-sm);
          color: var(--text-secondary);
        }

        .uid-code {
          font-family: var(--font-mono);
          font-size: var(--text-sm);
          background: var(--color-primary-50);
          color: var(--color-primary-700);
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

        .page-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: var(--spacing-6);
        }
      `}</style>
        </div>
    );
}
