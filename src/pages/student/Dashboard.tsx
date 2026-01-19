/**
 * NVRSS ERP - Student Dashboard
 * Student-specific dashboard with academic info, attendance, and profile
 */

import { useState } from 'react';
import { Link, Outlet, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

export default function StudentDashboard() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [sidebarOpen, setSidebarOpen] = useState(true);

    const handleLogout = async () => {
        await logout();
        navigate('/', { replace: true });
    };

    // Parse student UID to extract info
    const parseStudentUid = (uid: string) => {
        const match = uid?.match(/^(\d{2})G(\d{1,2})([A-Z])(\d{3,})$/);
        if (match) {
            return {
                year: `20${match[1]}`,
                grade: match[2],
                section: match[3],
                rollNo: match[4],
            };
        }
        return null;
    };

    const studentInfo = parseStudentUid(user?.uid || '');

    return (
        <div className="student-layout">
            {/* Sidebar */}
            <aside className={`student-sidebar ${sidebarOpen ? '' : 'collapsed'}`}>
                <div className="sidebar-header">
                    <div className="sidebar-logo">NV</div>
                    {sidebarOpen && <span className="sidebar-title">Student Portal</span>}
                </div>

                <nav className="sidebar-nav">
                    <NavLink to="/student/dashboard" end className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <rect x="3" y="3" width="7" height="7"></rect>
                            <rect x="14" y="3" width="7" height="7"></rect>
                            <rect x="14" y="14" width="7" height="7"></rect>
                            <rect x="3" y="14" width="7" height="7"></rect>
                        </svg>
                        {sidebarOpen && <span>Dashboard</span>}
                    </NavLink>

                    <NavLink to="/student/profile" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                            <circle cx="12" cy="7" r="4"></circle>
                        </svg>
                        {sidebarOpen && <span>My Profile</span>}
                    </NavLink>

                    <NavLink to="/student/attendance" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                            <line x1="16" y1="2" x2="16" y2="6"></line>
                            <line x1="8" y1="2" x2="8" y2="6"></line>
                            <line x1="3" y1="10" x2="21" y2="10"></line>
                        </svg>
                        {sidebarOpen && <span>Attendance</span>}
                    </NavLink>

                    <NavLink to="/student/results" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                            <polyline points="14 2 14 8 20 8"></polyline>
                            <line x1="16" y1="13" x2="8" y2="13"></line>
                            <line x1="16" y1="17" x2="8" y2="17"></line>
                        </svg>
                        {sidebarOpen && <span>Results</span>}
                    </NavLink>

                    <NavLink to="/student/fees" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <line x1="12" y1="1" x2="12" y2="23"></line>
                            <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
                        </svg>
                        {sidebarOpen && <span>Fee Details</span>}
                    </NavLink>

                    <NavLink to="/student/documents" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"></path>
                            <polyline points="13 2 13 9 20 9"></polyline>
                        </svg>
                        {sidebarOpen && <span>Documents</span>}
                    </NavLink>
                </nav>

                <div className="sidebar-footer">
                    <button className="logout-btn" onClick={handleLogout}>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                            <polyline points="16 17 21 12 16 7"></polyline>
                            <line x1="21" y1="12" x2="9" y2="12"></line>
                        </svg>
                        {sidebarOpen && <span>Logout</span>}
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="student-main">
                {/* Header */}
                <header className="student-header">
                    <div className="header-left">
                        <button className="menu-btn" onClick={() => setSidebarOpen(!sidebarOpen)}>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <line x1="3" y1="12" x2="21" y2="12"></line>
                                <line x1="3" y1="6" x2="21" y2="6"></line>
                                <line x1="3" y1="18" x2="21" y2="18"></line>
                            </svg>
                        </button>
                        <h1 className="page-title">Student Portal</h1>
                    </div>
                    <div className="header-right">
                        <div className="user-badge">
                            <div className="user-avatar">
                                {user?.firstName?.charAt(0)}{user?.lastName?.charAt(0)}
                            </div>
                            <div className="user-info">
                                <span className="user-name">{user?.firstName} {user?.lastName}</span>
                                <span className="user-meta">
                                    {studentInfo ? `Grade ${studentInfo.grade} - Section ${studentInfo.section}` : user?.uid}
                                </span>
                            </div>
                        </div>
                    </div>
                </header>

                {/* Page Content */}
                <div className="student-content">
                    <Outlet />

                    {/* Default Dashboard Content */}
                    {!window.location.pathname.includes('/student/') || window.location.pathname === '/student/dashboard' ? (
                        <StudentDashboardHome studentInfo={studentInfo} user={user} />
                    ) : null}
                </div>
            </main>

            {/* Styles */}
            <style>{`
        .student-layout {
          display: flex;
          min-height: 100vh;
          background: var(--bg-body);
        }

        .student-sidebar {
          width: 260px;
          background: linear-gradient(180deg, #dc2626 0%, #b91c1c 100%);
          color: white;
          display: flex;
          flex-direction: column;
          transition: width 0.3s ease;
        }

        .student-sidebar.collapsed {
          width: 70px;
        }

        .sidebar-header {
          padding: var(--spacing-4);
          display: flex;
          align-items: center;
          gap: var(--spacing-3);
          border-bottom: 1px solid rgba(255,255,255,0.1);
        }

        .sidebar-logo {
          width: 40px;
          height: 40px;
          background: white;
          border-radius: var(--radius-lg);
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 800;
          color: #dc2626;
          flex-shrink: 0;
        }

        .sidebar-title {
          font-weight: 600;
          font-size: 1rem;
        }

        .sidebar-nav {
          flex: 1;
          padding: var(--spacing-4);
          display: flex;
          flex-direction: column;
          gap: var(--spacing-2);
        }

        .nav-item {
          display: flex;
          align-items: center;
          gap: var(--spacing-3);
          padding: var(--spacing-3);
          border-radius: var(--radius-md);
          color: rgba(255,255,255,0.8);
          text-decoration: none;
          transition: all 0.2s;
        }

        .nav-item:hover, .nav-item.active {
          background: rgba(255,255,255,0.15);
          color: white;
        }

        .sidebar-footer {
          padding: var(--spacing-4);
          border-top: 1px solid rgba(255,255,255,0.1);
        }

        .logout-btn {
          display: flex;
          align-items: center;
          gap: var(--spacing-3);
          padding: var(--spacing-3);
          width: 100%;
          border: none;
          background: rgba(255,255,255,0.1);
          border-radius: var(--radius-md);
          color: white;
          cursor: pointer;
          transition: all 0.2s;
        }

        .logout-btn:hover {
          background: rgba(255,255,255,0.2);
        }

        .student-main {
          flex: 1;
          display: flex;
          flex-direction: column;
        }

        .student-header {
          padding: var(--spacing-4) var(--spacing-6);
          background: white;
          border-bottom: 1px solid var(--border-light);
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .header-left {
          display: flex;
          align-items: center;
          gap: var(--spacing-3);
        }

        .menu-btn {
          padding: var(--spacing-2);
          border: none;
          background: none;
          cursor: pointer;
          color: var(--text-secondary);
        }

        .page-title {
          font-size: 1.25rem;
          font-weight: 600;
        }

        .user-badge {
          display: flex;
          align-items: center;
          gap: var(--spacing-3);
        }

        .user-avatar {
          width: 40px;
          height: 40px;
          background: #dc2626;
          border-radius: var(--radius-full);
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-weight: 600;
          font-size: 0.875rem;
        }

        .user-info {
          display: flex;
          flex-direction: column;
        }

        .user-name {
          font-weight: 500;
          font-size: 0.875rem;
        }

        .user-meta {
          font-size: 0.75rem;
          color: var(--text-muted);
        }

        .student-content {
          flex: 1;
          padding: var(--spacing-6);
          overflow-y: auto;
        }
      `}</style>
        </div>
    );
}

// Dashboard Home Component
function StudentDashboardHome({ studentInfo, user }: { studentInfo: any; user: any }) {
    return (
        <div className="dashboard-home">
            {/* Welcome Card */}
            <div className="welcome-card">
                <div className="welcome-text">
                    <h2>Welcome back, {user?.firstName}!</h2>
                    <p>Here's your academic overview</p>
                </div>
                <div className="student-id-card">
                    <span className="id-label">Student ID</span>
                    <span className="id-value">{user?.uid}</span>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="stats-grid">
                <div className="stat-card">
                    <div className="stat-icon attendance">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                            <line x1="16" y1="2" x2="16" y2="6"></line>
                            <line x1="8" y1="2" x2="8" y2="6"></line>
                        </svg>
                    </div>
                    <div className="stat-content">
                        <span className="stat-value">92%</span>
                        <span className="stat-label">Attendance</span>
                    </div>
                </div>

                <div className="stat-card">
                    <div className="stat-icon grades">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <line x1="18" y1="20" x2="18" y2="10"></line>
                            <line x1="12" y1="20" x2="12" y2="4"></line>
                            <line x1="6" y1="20" x2="6" y2="14"></line>
                        </svg>
                    </div>
                    <div className="stat-content">
                        <span className="stat-value">A+</span>
                        <span className="stat-label">Last Result</span>
                    </div>
                </div>

                <div className="stat-card">
                    <div className="stat-icon fees">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <line x1="12" y1="1" x2="12" y2="23"></line>
                            <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
                        </svg>
                    </div>
                    <div className="stat-content">
                        <span className="stat-value">Paid</span>
                        <span className="stat-label">Fee Status</span>
                    </div>
                </div>

                <div className="stat-card">
                    <div className="stat-icon class">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M22 10v6M2 10l10-5 10 5-10 5z"></path>
                            <path d="M6 12v5c3 3 9 3 12 0v-5"></path>
                        </svg>
                    </div>
                    <div className="stat-content">
                        <span className="stat-value">{studentInfo ? `${studentInfo.grade}-${studentInfo.section}` : '-'}</span>
                        <span className="stat-label">Class</span>
                    </div>
                </div>
            </div>

            {/* Quick Actions */}
            <div className="quick-section">
                <h3>Quick Actions</h3>
                <div className="quick-grid">
                    <Link to="/student/attendance" className="quick-card">
                        <span className="quick-icon">📅</span>
                        <span>View Attendance</span>
                    </Link>
                    <Link to="/student/results" className="quick-card">
                        <span className="quick-icon">📊</span>
                        <span>Check Results</span>
                    </Link>
                    <Link to="/student/fees" className="quick-card">
                        <span className="quick-icon">💰</span>
                        <span>Pay Fees</span>
                    </Link>
                    <Link to="/student/documents" className="quick-card">
                        <span className="quick-icon">📄</span>
                        <span>Download Documents</span>
                    </Link>
                </div>
            </div>

            <style>{`
        .dashboard-home {
          max-width: 1200px;
        }

        .welcome-card {
          background: linear-gradient(135deg, #dc2626 0%, #b91c1c 100%);
          border-radius: var(--radius-xl);
          padding: var(--spacing-6);
          color: white;
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: var(--spacing-6);
        }

        .welcome-text h2 {
          font-size: 1.5rem;
          margin-bottom: var(--spacing-1);
        }

        .welcome-text p {
          opacity: 0.9;
        }

        .student-id-card {
          background: rgba(255,255,255,0.15);
          padding: var(--spacing-3) var(--spacing-5);
          border-radius: var(--radius-lg);
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .id-label {
          font-size: 0.75rem;
          opacity: 0.8;
        }

        .id-value {
          font-size: 1.25rem;
          font-weight: 700;
          font-family: var(--font-mono);
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: var(--spacing-4);
          margin-bottom: var(--spacing-6);
        }

        .stat-card {
          background: white;
          border-radius: var(--radius-lg);
          padding: var(--spacing-5);
          display: flex;
          align-items: center;
          gap: var(--spacing-4);
          box-shadow: var(--shadow-sm);
        }

        .stat-icon {
          width: 50px;
          height: 50px;
          border-radius: var(--radius-lg);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .stat-icon.attendance { background: #dbeafe; color: #2563eb; }
        .stat-icon.grades { background: #dcfce7; color: #16a34a; }
        .stat-icon.fees { background: #fef3c7; color: #d97706; }
        .stat-icon.class { background: #fee2e2; color: #dc2626; }

        .stat-content {
          display: flex;
          flex-direction: column;
        }

        .stat-value {
          font-size: 1.5rem;
          font-weight: 700;
        }

        .stat-label {
          font-size: 0.875rem;
          color: var(--text-secondary);
        }

        .quick-section h3 {
          margin-bottom: var(--spacing-4);
          font-size: 1.125rem;
        }

        .quick-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: var(--spacing-4);
        }

        .quick-card {
          background: white;
          border-radius: var(--radius-lg);
          padding: var(--spacing-5);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: var(--spacing-2);
          text-decoration: none;
          color: var(--text-primary);
          box-shadow: var(--shadow-sm);
          transition: all 0.2s;
        }

        .quick-card:hover {
          transform: translateY(-4px);
          box-shadow: var(--shadow-md);
        }

        .quick-icon {
          font-size: 2rem;
        }

        @media (max-width: 768px) {
          .stats-grid, .quick-grid {
            grid-template-columns: repeat(2, 1fr);
          }

          .welcome-card {
            flex-direction: column;
            gap: var(--spacing-4);
            text-align: center;
          }
        }
      `}</style>
        </div>
    );
}
