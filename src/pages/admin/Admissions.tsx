/**
 * NVRSS ERP - Admissions Management Page
 * ERP-style table with filters, status badges, and action modals
 */

import { useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

interface Admission {
    id: number;
    status: string;
    firstName: string;
    lastName: string;
    dateOfBirth: string;
    gender: string;
    applyingForGrade: number;
    preferredSection: string | null;
    academicYear: string;
    phone: string;
    email: string | null;
    guardianName: string;
    guardianPhone: string;
    studentUid: string | null;
    createdAt: string;
    updatedAt: string;
    reviewer: string | null;
    approver: string | null;
}

interface Pagination {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
}

type StatusType = 'pending' | 'reviewing' | 'ready_for_approval' | 'approved' | 'rejected';

const statusConfig = {
    pending: { label: 'Pending', color: 'warning' },
    reviewing: { label: 'Reviewing', color: 'info' },
    ready_for_approval: { label: 'Ready for Approval', color: 'primary' },
    approved: { label: 'Approved', color: 'success' },
    rejected: { label: 'Rejected', color: 'error' },
};

export default function Admissions() {
    const { token, user } = useAuth();
    const [searchParams, setSearchParams] = useSearchParams();

    const [admissions, setAdmissions] = useState<Admission[]>([]);
    const [pagination, setPagination] = useState<Pagination>({ page: 1, limit: 20, total: 0, totalPages: 0 });
    const [isLoading, setIsLoading] = useState(true);

    // Filters
    const [statusFilter, setStatusFilter] = useState(searchParams.get('status') || '');
    const [gradeFilter, setGradeFilter] = useState(searchParams.get('grade') || '');
    const [searchTerm, setSearchTerm] = useState('');

    // Modal state
    const [selectedAdmission, setSelectedAdmission] = useState<Admission | null>(null);
    const [modalType, setModalType] = useState<'view' | 'review' | 'approve' | 'reject' | null>(null);
    const [modalData, setModalData] = useState<{ notes?: string; section?: string; reason?: string }>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [previewUid, setPreviewUid] = useState<string>('');

    const isAdmin = user?.role === 'admin';

    const fetchAdmissions = useCallback(async () => {
        if (!token) return;

        setIsLoading(true);
        try {
            const params = new URLSearchParams();
            params.set('page', pagination.page.toString());
            params.set('limit', '20');
            if (statusFilter) params.set('status', statusFilter);
            if (gradeFilter) params.set('grade', gradeFilter);
            if (searchTerm) params.set('search', searchTerm);

            const response = await fetch(`/api/admissions?${params.toString()}`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            if (response.ok) {
                const data = await response.json();
                setAdmissions(data.admissions);
                setPagination(data.pagination);
            }
        } catch (error) {
            console.error('Fetch admissions error:', error);
        } finally {
            setIsLoading(false);
        }
    }, [token, pagination.page, statusFilter, gradeFilter, searchTerm]);

    useEffect(() => {
        fetchAdmissions();
    }, [fetchAdmissions]);

    useEffect(() => {
        // Update URL params
        const params = new URLSearchParams();
        if (statusFilter) params.set('status', statusFilter);
        if (gradeFilter) params.set('grade', gradeFilter);
        setSearchParams(params, { replace: true });
    }, [statusFilter, gradeFilter, setSearchParams]);

    const fetchPreviewUid = async (admissionId: number, section: string) => {
        if (!token || !section) return;

        try {
            const response = await fetch(
                `/api/admissions/${admissionId}/preview-uid?section=${section}`,
                { headers: { Authorization: `Bearer ${token}` } }
            );
            if (response.ok) {
                const data = await response.json();
                setPreviewUid(data.previewUid);
            }
        } catch (error) {
            console.error('Preview UID error:', error);
        }
    };

    const handleReview = async () => {
        if (!token || !selectedAdmission) return;

        setIsSubmitting(true);
        try {
            const response = await fetch(`/api/admissions/${selectedAdmission.id}/review`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    status: 'ready_for_approval',
                    notes: modalData.notes,
                }),
            });

            if (response.ok) {
                closeModal();
                fetchAdmissions();
            }
        } catch (error) {
            console.error('Review error:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleApprove = async () => {
        if (!token || !selectedAdmission || !modalData.section) return;

        setIsSubmitting(true);
        try {
            const response = await fetch(`/api/admissions/${selectedAdmission.id}/approve`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    section: modalData.section,
                    notes: modalData.notes,
                }),
            });

            if (response.ok) {
                const data = await response.json();
                alert(`Student approved!\n\nUID: ${data.studentUid}\nDefault Password: ${data.defaultPassword}\n\nPlease save these credentials.`);
                closeModal();
                fetchAdmissions();
            }
        } catch (error) {
            console.error('Approve error:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleReject = async () => {
        if (!token || !selectedAdmission || !modalData.reason) return;

        setIsSubmitting(true);
        try {
            const response = await fetch(`/api/admissions/${selectedAdmission.id}/reject`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ reason: modalData.reason }),
            });

            if (response.ok) {
                closeModal();
                fetchAdmissions();
            }
        } catch (error) {
            console.error('Reject error:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const openModal = (admission: Admission, type: 'view' | 'review' | 'approve' | 'reject') => {
        setSelectedAdmission(admission);
        setModalType(type);
        setModalData({});
        setPreviewUid('');

        if (type === 'approve' && admission.preferredSection) {
            setModalData({ section: admission.preferredSection });
            fetchPreviewUid(admission.id, admission.preferredSection);
        }
    };

    const closeModal = () => {
        setSelectedAdmission(null);
        setModalType(null);
        setModalData({});
        setPreviewUid('');
    };

    const formatDate = (dateStr: string) => {
        return new Date(dateStr).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
        });
    };

    return (
        <div className="admissions-page">
            {/* Page Header */}
            <div className="page-header">
                <div>
                    <h1 className="page-title">Admissions</h1>
                    <p className="page-subtitle">Manage student admission applications</p>
                </div>
            </div>

            {/* Filters */}
            <div className="filters-bar">
                <div className="filters-left">
                    <div className="filter-group">
                        <select
                            className="form-input form-select"
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                        >
                            <option value="">All Statuses</option>
                            <option value="pending">Pending</option>
                            <option value="reviewing">Reviewing</option>
                            <option value="ready_for_approval">Ready for Approval</option>
                            <option value="approved">Approved</option>
                            <option value="rejected">Rejected</option>
                        </select>
                    </div>

                    <div className="filter-group">
                        <select
                            className="form-input form-select"
                            value={gradeFilter}
                            onChange={(e) => setGradeFilter(e.target.value)}
                        >
                            <option value="">All Grades</option>
                            {[...Array(12)].map((_, i) => (
                                <option key={i + 1} value={i + 1}>Grade {i + 1}</option>
                            ))}
                        </select>
                    </div>

                    <div className="filter-group search-group">
                        <input
                            type="text"
                            className="form-input"
                            placeholder="Search by name, phone..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>

                <div className="filters-right">
                    <span className="results-count">
                        {pagination.total} application{pagination.total !== 1 ? 's' : ''}
                    </span>
                </div>
            </div>

            {/* Table */}
            <div className="table-container">
                <table className="table">
                    <thead>
                        <tr>
                            <th>Applicant</th>
                            <th>Grade</th>
                            <th>Contact</th>
                            <th>Guardian</th>
                            <th>Status</th>
                            <th>Applied</th>
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
                        ) : admissions.length > 0 ? (
                            admissions.map((admission) => (
                                <tr key={admission.id}>
                                    <td>
                                        <div className="applicant-cell">
                                            <div className="applicant-name">{admission.firstName} {admission.lastName}</div>
                                            <div className="applicant-meta">{admission.gender} | {formatDate(admission.dateOfBirth)}</div>
                                        </div>
                                    </td>
                                    <td>
                                        <span className="font-medium">Grade {admission.applyingForGrade}</span>
                                        {admission.preferredSection && (
                                            <span className="text-muted"> ({admission.preferredSection})</span>
                                        )}
                                    </td>
                                    <td>
                                        <div>{admission.phone}</div>
                                        {admission.email && <div className="text-muted text-sm">{admission.email}</div>}
                                    </td>
                                    <td>
                                        <div>{admission.guardianName}</div>
                                        <div className="text-muted text-sm">{admission.guardianPhone}</div>
                                    </td>
                                    <td>
                                        <span className={`badge badge-${statusConfig[admission.status as StatusType]?.color || 'neutral'}`}>
                                            {statusConfig[admission.status as StatusType]?.label || admission.status}
                                        </span>
                                        {admission.studentUid && (
                                            <div className="uid-display">{admission.studentUid}</div>
                                        )}
                                    </td>
                                    <td className="text-muted">{formatDate(admission.createdAt)}</td>
                                    <td>
                                        <div className="table-actions">
                                            <button
                                                className="btn btn-ghost btn-sm"
                                                onClick={() => openModal(admission, 'view')}
                                                title="View Details"
                                            >
                                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                                                    <circle cx="12" cy="12" r="3"></circle>
                                                </svg>
                                            </button>

                                            {['pending', 'reviewing'].includes(admission.status) && (
                                                <button
                                                    className="btn btn-secondary btn-sm"
                                                    onClick={() => openModal(admission, 'review')}
                                                >
                                                    Review
                                                </button>
                                            )}

                                            {isAdmin && admission.status === 'ready_for_approval' && (
                                                <>
                                                    <button
                                                        className="btn btn-success btn-sm"
                                                        onClick={() => openModal(admission, 'approve')}
                                                    >
                                                        Approve
                                                    </button>
                                                    <button
                                                        className="btn btn-danger btn-sm"
                                                        onClick={() => openModal(admission, 'reject')}
                                                    >
                                                        Reject
                                                    </button>
                                                </>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={7}>
                                    <div className="empty-state">
                                        <svg className="empty-state-icon" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                                            <polyline points="14 2 14 8 20 8"></polyline>
                                        </svg>
                                        <div className="empty-state-title">No applications found</div>
                                        <p className="empty-state-description">Try adjusting your filters or check back later.</p>
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

            {/* Modals */}
            {modalType && selectedAdmission && (
                <div className="modal-overlay" onClick={closeModal}>
                    <div className={`modal ${modalType === 'view' ? 'modal-lg' : ''}`} onClick={(e) => e.stopPropagation()}>
                        <div className="modal-header">
                            <h3 className="modal-title">
                                {modalType === 'view' && 'Application Details'}
                                {modalType === 'review' && 'Review Application'}
                                {modalType === 'approve' && 'Approve Application'}
                                {modalType === 'reject' && 'Reject Application'}
                            </h3>
                            <button className="modal-close" onClick={closeModal}>
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <line x1="18" y1="6" x2="6" y2="18"></line>
                                    <line x1="6" y1="6" x2="18" y2="18"></line>
                                </svg>
                            </button>
                        </div>

                        <div className="modal-body">
                            {modalType === 'view' && (
                                <div className="admission-details">
                                    <div className="detail-section">
                                        <h4>Student Information</h4>
                                        <div className="detail-grid">
                                            <div><strong>Name:</strong> {selectedAdmission.firstName} {selectedAdmission.lastName}</div>
                                            <div><strong>Gender:</strong> {selectedAdmission.gender}</div>
                                            <div><strong>Date of Birth:</strong> {formatDate(selectedAdmission.dateOfBirth)}</div>
                                            <div><strong>Grade Applied:</strong> Grade {selectedAdmission.applyingForGrade}</div>
                                            <div><strong>Section Preference:</strong> {selectedAdmission.preferredSection || 'N/A'}</div>
                                            <div><strong>Academic Year:</strong> {selectedAdmission.academicYear}</div>
                                        </div>
                                    </div>

                                    <div className="detail-section">
                                        <h4>Contact Information</h4>
                                        <div className="detail-grid">
                                            <div><strong>Phone:</strong> {selectedAdmission.phone}</div>
                                            <div><strong>Email:</strong> {selectedAdmission.email || 'N/A'}</div>
                                            <div><strong>Guardian:</strong> {selectedAdmission.guardianName}</div>
                                            <div><strong>Guardian Phone:</strong> {selectedAdmission.guardianPhone}</div>
                                        </div>
                                    </div>

                                    <div className="detail-section">
                                        <h4>Status</h4>
                                        <div className="detail-grid">
                                            <div>
                                                <strong>Current Status:</strong>{' '}
                                                <span className={`badge badge-${statusConfig[selectedAdmission.status as StatusType]?.color}`}>
                                                    {statusConfig[selectedAdmission.status as StatusType]?.label}
                                                </span>
                                            </div>
                                            {selectedAdmission.studentUid && (
                                                <div><strong>Student UID:</strong> <code>{selectedAdmission.studentUid}</code></div>
                                            )}
                                            {selectedAdmission.reviewer && (
                                                <div><strong>Reviewed by:</strong> {selectedAdmission.reviewer}</div>
                                            )}
                                            {selectedAdmission.approver && (
                                                <div><strong>Approved by:</strong> {selectedAdmission.approver}</div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            )}

                            {modalType === 'review' && (
                                <div className="review-form">
                                    <p className="mb-4">
                                        Mark this application as <strong>Ready for Approval</strong> to allow admin approval.
                                    </p>
                                    <div className="form-group">
                                        <label className="form-label">Review Notes (optional)</label>
                                        <textarea
                                            className="form-input form-textarea"
                                            value={modalData.notes || ''}
                                            onChange={(e) => setModalData({ ...modalData, notes: e.target.value })}
                                            placeholder="Add any notes about this application..."
                                        />
                                    </div>
                                </div>
                            )}

                            {modalType === 'approve' && (
                                <div className="approve-form">
                                    <div className="alert alert-info mb-4">
                                        Approving will create a student account and generate a unique UID.
                                    </div>

                                    <div className="form-group">
                                        <label className="form-label form-label-required">Assign Section</label>
                                        <select
                                            className="form-input form-select"
                                            value={modalData.section || ''}
                                            onChange={(e) => {
                                                setModalData({ ...modalData, section: e.target.value });
                                                fetchPreviewUid(selectedAdmission.id, e.target.value);
                                            }}
                                        >
                                            <option value="">Select Section</option>
                                            {['A', 'B', 'C', 'D', 'E'].map((s) => (
                                                <option key={s} value={s}>Section {s}</option>
                                            ))}
                                        </select>
                                    </div>

                                    {previewUid && (
                                        <div className="uid-preview">
                                            <label>Generated UID Preview:</label>
                                            <div className="uid-value">{previewUid}</div>
                                        </div>
                                    )}

                                    <div className="form-group">
                                        <label className="form-label">Approval Notes (optional)</label>
                                        <textarea
                                            className="form-input form-textarea"
                                            value={modalData.notes || ''}
                                            onChange={(e) => setModalData({ ...modalData, notes: e.target.value })}
                                            placeholder="Add any notes..."
                                        />
                                    </div>
                                </div>
                            )}

                            {modalType === 'reject' && (
                                <div className="reject-form">
                                    <div className="alert alert-warning mb-4">
                                        This action cannot be undone. The applicant will be notified of the rejection.
                                    </div>

                                    <div className="form-group">
                                        <label className="form-label form-label-required">Rejection Reason</label>
                                        <textarea
                                            className="form-input form-textarea"
                                            value={modalData.reason || ''}
                                            onChange={(e) => setModalData({ ...modalData, reason: e.target.value })}
                                            placeholder="Please provide a reason for rejection..."
                                            required
                                        />
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="modal-footer">
                            <button className="btn btn-secondary" onClick={closeModal} disabled={isSubmitting}>
                                Cancel
                            </button>

                            {modalType === 'review' && (
                                <button className="btn btn-primary" onClick={handleReview} disabled={isSubmitting}>
                                    {isSubmitting ? 'Submitting...' : 'Mark as Ready'}
                                </button>
                            )}

                            {modalType === 'approve' && (
                                <button
                                    className="btn btn-success"
                                    onClick={handleApprove}
                                    disabled={isSubmitting || !modalData.section}
                                >
                                    {isSubmitting ? 'Approving...' : 'Approve & Create Student'}
                                </button>
                            )}

                            {modalType === 'reject' && (
                                <button
                                    className="btn btn-danger"
                                    onClick={handleReject}
                                    disabled={isSubmitting || !modalData.reason}
                                >
                                    {isSubmitting ? 'Rejecting...' : 'Reject Application'}
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            )}

            {/* Page Styles */}
            <style>{`
        .admissions-page {
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

        .filter-group {
          min-width: 160px;
        }

        .search-group {
          min-width: 240px;
        }

        .results-count {
          font-size: var(--text-sm);
          color: var(--text-secondary);
        }

        .applicant-cell {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .applicant-name {
          font-weight: var(--font-medium);
        }

        .applicant-meta {
          font-size: var(--text-xs);
          color: var(--text-muted);
          text-transform: capitalize;
        }

        .uid-display {
          font-family: var(--font-mono);
          font-size: var(--text-xs);
          color: var(--color-primary-600);
          margin-top: var(--spacing-1);
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

        .admission-details {
          display: flex;
          flex-direction: column;
          gap: var(--spacing-6);
        }

        .detail-section h4 {
          font-size: var(--text-sm);
          font-weight: var(--font-semibold);
          color: var(--text-secondary);
          text-transform: uppercase;
          letter-spacing: 0.05em;
          margin-bottom: var(--spacing-3);
          padding-bottom: var(--spacing-2);
          border-bottom: 1px solid var(--border-light);
        }

        .detail-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: var(--spacing-3);
        }

        .detail-grid div {
          font-size: var(--text-sm);
        }

        .uid-preview {
          background: var(--color-primary-50);
          border: 1px solid var(--color-primary-200);
          border-radius: var(--radius-lg);
          padding: var(--spacing-4);
          margin-bottom: var(--spacing-4);
        }

        .uid-preview label {
          display: block;
          font-size: var(--text-xs);
          color: var(--color-primary-600);
          margin-bottom: var(--spacing-1);
        }

        .uid-value {
          font-family: var(--font-mono);
          font-size: var(--text-xl);
          font-weight: var(--font-bold);
          color: var(--color-primary-700);
        }

        @media (max-width: 768px) {
          .detail-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
        </div>
    );
}
