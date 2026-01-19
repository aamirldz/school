/**
 * NVRSS ERP - Admin Dashboard
 * Main dashboard with KPIs, recent activity, and quick actions
 */

import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

interface DashboardStats {
    students: { total: number; label: string };
    teachers: { total: number; label: string };
    staff: { total: number; label: string };
    admissions: { pending: number; approvedThisMonth: number; label: string };
    documents: { pendingVerification: number; label: string };
}

interface AdmissionSummary {
    pending: number;
    reviewing: number;
    ready_for_approval: number;
    approved: number;
    rejected: number;
}

interface RecentAdmission {
    id: number;
    status: string;
    name: string;
    grade: number;
    academicYear: string;
    createdAt: string;
}

type StatusType = 'pending' | 'reviewing' | 'ready_for_approval' | 'approved' | 'rejected';

const statusColors: Record<StatusType, string> = {
    pending: 'warning',
    reviewing: 'info',
    ready_for_approval: 'primary',
    approved: 'success',
    rejected: 'error',
};

const statusLabels: Record<StatusType, string> = {
    pending: 'Pending',
    reviewing: 'Reviewing',
    ready_for_approval: 'Ready',
    approved: 'Approved',
    rejected: 'Rejected',
};

export default function AdminDashboard() {
    const { token, user } = useAuth();
    const [stats, setStats] = useState<DashboardStats | null>(null);
    const [admissionSummary, setAdmissionSummary] = useState<AdmissionSummary | null>(null);
    const [recentAdmissions, setRecentAdmissions] = useState<RecentAdmission[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchDashboardData = async () => {
            if (!token) return;

            try {
                const headers = { Authorization: `Bearer ${token}` };

                // Fetch stats
                const statsRes = await fetch('/api/dashboard/stats', { headers });
                if (statsRes.ok) {
                    setStats(await statsRes.json());
                }

                // Fetch admission summary
                const summaryRes = await fetch('/api/dashboard/admissions-summary', { headers });
                if (summaryRes.ok) {
                    setAdmissionSummary(await summaryRes.json());
                }

                // Fetch recent admissions
                const recentRes = await fetch('/api/dashboard/recent-admissions?limit=5', { headers });
                if (recentRes.ok) {
                    const data = await recentRes.json();
                    setRecentAdmissions(data.admissions);
                }
            } catch (error) {
                console.error('Dashboard fetch error:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchDashboardData();
    }, [token]);

    const formatDate = (dateStr: string) => {
        return new Date(dateStr).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
        });
    };

    if (isLoading) {
        return (
            <div className="dashboard-loading">
                <div className="spinner spinner-lg"></div>
                <p>Loading dashboard...</p>
            </div>
        );
    }

    return (
        <div className="admin-dashboard">
            {/* Page Header */}
            <div className="page-header">
                <div>
                    <h1 className="page-title">Dashboard</h1>
                    <p className="page-subtitle">Welcome back, {user?.firstName}. Here's what's happening today.</p>
                </div>
                <div className="page-actions">
                    <Link to="/admin/admissions" className="btn btn-primary">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <circle cx="12" cy="12" r="10"></circle>
                            <line x1="12" y1="8" x2="12" y2="16"></line>
                            <line x1="8" y1="12" x2="16" y2="12"></line>
                        </svg>
                        Manage Admissions
                    </Link>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-4 mb-6">
                <div className="stat-card">
                    <div className="stat-icon primary">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M22 10v6M2 10l10-5 10 5-10 5z"></path>
                            <path d="M6 12v5c3 3 9 3 12 0v-5"></path>
                        </svg>
                    </div>
                    <div className="stat-content">
                        <div className="stat-label">Total Students</div>
                        <div className="stat-value">{stats?.students.total || 0}</div>
                    </div>
                </div>

                <div className="stat-card">
                    <div className="stat-icon success">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                            <circle cx="9" cy="7" r="4"></circle>
                            <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                            <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                        </svg>
                    </div>
                    <div className="stat-content">
                        <div className="stat-label">Total Staff</div>
                        <div className="stat-value">{stats?.staff.total || 0}</div>
                    </div>
                </div>

                <div className="stat-card">
                    <div className="stat-icon warning">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                            <polyline points="14 2 14 8 20 8"></polyline>
                            <line x1="16" y1="13" x2="8" y2="13"></line>
                            <line x1="16" y1="17" x2="8" y2="17"></line>
                        </svg>
                    </div>
                    <div className="stat-content">
                        <div className="stat-label">Pending Admissions</div>
                        <div className="stat-value">{stats?.admissions.pending || 0}</div>
                    </div>
                </div>

                <div className="stat-card">
                    <div className="stat-icon info">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"></path>
                            <polyline points="13 2 13 9 20 9"></polyline>
                        </svg>
                    </div>
                    <div className="stat-content">
                        <div className="stat-label">Documents Pending</div>
                        <div className="stat-value">{stats?.documents.pendingVerification || 0}</div>
                    </div>
                </div>
            </div>

            {/* Main Content Grid */}
            <div className="dashboard-grid">
                {/* Admission Status Overview */}
                <div className="card">
                    <div className="card-header">
                        <h3 className="card-title">Admission Status Overview</h3>
                        <Link to="/admin/admissions" className="btn btn-ghost btn-sm">View All</Link>
                    </div>
                    <div className="card-body">
                        {admissionSummary && (
                            <div className="status-overview">
                                {(Object.keys(admissionSummary) as StatusType[]).map((status) => (
                                    <div key={status} className="status-item">
                                        <div className="status-bar">
                                            <div
                                                className={`status-bar-fill ${statusColors[status]}`}
                                                style={{
                                                    width: `${Math.min(100, (admissionSummary[status] / Math.max(1, Object.values(admissionSummary).reduce((a, b) => a + b, 0))) * 100)}%`
                                                }}
                                            />
                                        </div>
                                        <div className="status-info">
                                            <span className={`badge badge-${statusColors[status]}`}>{statusLabels[status]}</span>
                                            <span className="status-count">{admissionSummary[status]}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* Recent Admissions */}
                <div className="card">
                    <div className="card-header">
                        <h3 className="card-title">Recent Applications</h3>
                        <Link to="/admin/admissions" className="btn btn-ghost btn-sm">View All</Link>
                    </div>
                    <div className="card-body p-0">
                        <div className="table-container" style={{ border: 'none', borderRadius: 0 }}>
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th>Applicant</th>
                                        <th>Grade</th>
                                        <th>Status</th>
                                        <th>Date</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {recentAdmissions.length > 0 ? (
                                        recentAdmissions.map((admission) => (
                                            <tr key={admission.id}>
                                                <td>
                                                    <Link to={`/admin/admissions/${admission.id}`} className="text-link">
                                                        {admission.name}
                                                    </Link>
                                                </td>
                                                <td>Grade {admission.grade}</td>
                                                <td>
                                                    <span className={`badge badge-${statusColors[admission.status as StatusType]}`}>
                                                        {statusLabels[admission.status as StatusType] || admission.status}
                                                    </span>
                                                </td>
                                                <td className="text-muted">{formatDate(admission.createdAt)}</td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan={4} className="text-center text-muted" style={{ padding: '2rem' }}>
                                                No recent applications
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="card">
                    <div className="card-header">
                        <h3 className="card-title">Quick Actions</h3>
                    </div>
                    <div className="card-body">
                        <div className="quick-actions">
                            <Link to="/admin/users" className="quick-action-item">
                                <div className="quick-action-icon">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                                        <circle cx="8.5" cy="7" r="4"></circle>
                                        <line x1="20" y1="8" x2="20" y2="14"></line>
                                        <line x1="23" y1="11" x2="17" y2="11"></line>
                                    </svg>
                                </div>
                                <span>Add New User</span>
                            </Link>

                            <Link to="/admin/admissions?status=ready_for_approval" className="quick-action-item">
                                <div className="quick-action-icon">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <polyline points="9 11 12 14 22 4"></polyline>
                                        <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path>
                                    </svg>
                                </div>
                                <span>Approve Admissions</span>
                            </Link>

                            <Link to="/admin/students" className="quick-action-item">
                                <div className="quick-action-icon">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M22 10v6M2 10l10-5 10 5-10 5z"></path>
                                        <path d="M6 12v5c3 3 9 3 12 0v-5"></path>
                                    </svg>
                                </div>
                                <span>View Students</span>
                            </Link>

                            <Link to="/admin/reports" className="quick-action-item">
                                <div className="quick-action-icon">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <line x1="18" y1="20" x2="18" y2="10"></line>
                                        <line x1="12" y1="20" x2="12" y2="4"></line>
                                        <line x1="6" y1="20" x2="6" y2="14"></line>
                                    </svg>
                                </div>
                                <span>View Reports</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* Dashboard Styles */}
            <style>{`
        .admin-dashboard {
          max-width: 1400px;
        }

        .dashboard-loading {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          min-height: 400px;
          gap: var(--spacing-4);
          color: var(--text-secondary);
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

        .dashboard-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: var(--spacing-6);
        }

        .dashboard-grid .card:last-child {
          grid-column: span 2;
        }

        @media (max-width: 1024px) {
          .dashboard-grid {
            grid-template-columns: 1fr;
          }

          .dashboard-grid .card:last-child {
            grid-column: span 1;
          }
        }

        .status-overview {
          display: flex;
          flex-direction: column;
          gap: var(--spacing-4);
        }

        .status-item {
          display: flex;
          flex-direction: column;
          gap: var(--spacing-2);
        }

        .status-bar {
          height: 8px;
          background: var(--color-neutral-100);
          border-radius: var(--radius-full);
          overflow: hidden;
        }

        .status-bar-fill {
          height: 100%;
          border-radius: var(--radius-full);
          transition: width 0.5s ease;
        }

        .status-bar-fill.primary { background: var(--color-primary-500); }
        .status-bar-fill.success { background: var(--color-success-500); }
        .status-bar-fill.warning { background: var(--color-warning-500); }
        .status-bar-fill.error { background: var(--color-error-500); }
        .status-bar-fill.info { background: var(--color-info-500); }

        .status-info {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .status-count {
          font-weight: var(--font-semibold);
          color: var(--text-primary);
        }

        .text-link {
          color: var(--text-primary);
          font-weight: var(--font-medium);
        }

        .text-link:hover {
          color: var(--color-primary-600);
        }

        .quick-actions {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: var(--spacing-4);
        }

        .quick-action-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: var(--spacing-2);
          padding: var(--spacing-4);
          border-radius: var(--radius-lg);
          border: 1px solid var(--border-light);
          color: var(--text-primary);
          text-decoration: none;
          transition: all var(--transition-fast);
          text-align: center;
        }

        .quick-action-item:hover {
          border-color: var(--color-primary-300);
          background: var(--color-primary-50);
        }

        .quick-action-icon {
          width: 48px;
          height: 48px;
          border-radius: var(--radius-lg);
          background: var(--color-neutral-100);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--color-primary-600);
          transition: all var(--transition-fast);
        }

        .quick-action-item:hover .quick-action-icon {
          background: var(--color-primary-100);
        }

        .quick-action-item span {
          font-size: var(--text-sm);
          font-weight: var(--font-medium);
        }

        @media (max-width: 768px) {
          .quick-actions {
            grid-template-columns: repeat(2, 1fr);
          }

          .page-header {
            flex-direction: column;
            gap: var(--spacing-4);
          }
        }
      `}</style>
        </div>
    );
}
