/**
 * NVRSS ERP - Teacher Dashboard
 * Teacher-specific dashboard with class management, attendance, and grading
 */

import { useState } from 'react';
import { Link, Outlet, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

export default function TeacherDashboard() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [sidebarOpen, setSidebarOpen] = useState(true);

    const handleLogout = async () => {
        await logout();
        navigate('/', { replace: true });
    };

    return (
        <div className="teacher-layout">
            {/* Sidebar */}
            <aside className={`teacher-sidebar ${sidebarOpen ? '' : 'collapsed'}`}>
                <div className="sidebar-header">
                    <div className="sidebar-logo">NV</div>
                    {sidebarOpen && <span className="sidebar-title">Teacher Portal</span>}
                </div>

                <nav className="sidebar-nav">
                    <NavLink to="/teacher/dashboard" end className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <rect x="3" y="3" width="7" height="7"></rect>
                            <rect x="14" y="3" width="7" height="7"></rect>
                            <rect x="14" y="14" width="7" height="7"></rect>
                            <rect x="3" y="14" width="7" height="7"></rect>
                        </svg>
                        {sidebarOpen && <span>Dashboard</span>}
                    </NavLink>

                    <NavLink to="/teacher/classes" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M22 10v6M2 10l10-5 10 5-10 5z"></path>
                            <path d="M6 12v5c3 3 9 3 12 0v-5"></path>
                        </svg>
                        {sidebarOpen && <span>My Classes</span>}
                    </NavLink>

                    <NavLink to="/teacher/attendance" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                            <line x1="16" y1="2" x2="16" y2="6"></line>
                            <line x1="8" y1="2" x2="8" y2="6"></line>
                            <line x1="3" y1="10" x2="21" y2="10"></line>
                        </svg>
                        {sidebarOpen && <span>Mark Attendance</span>}
                    </NavLink>

                    <NavLink to="/teacher/grades" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                            <polyline points="14 2 14 8 20 8"></polyline>
                            <line x1="16" y1="13" x2="8" y2="13"></line>
                            <line x1="16" y1="17" x2="8" y2="17"></line>
                        </svg>
                        {sidebarOpen && <span>Enter Grades</span>}
                    </NavLink>

                    <NavLink to="/teacher/timetable" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <circle cx="12" cy="12" r="10"></circle>
                            <polyline points="12 6 12 12 16 14"></polyline>
                        </svg>
                        {sidebarOpen && <span>Timetable</span>}
                    </NavLink>

                    <NavLink to="/teacher/students" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                            <circle cx="9" cy="7" r="4"></circle>
                            <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                            <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                        </svg>
                        {sidebarOpen && <span>Students</span>}
                    </NavLink>

                    <NavLink to="/teacher/profile" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                            <circle cx="12" cy="7" r="4"></circle>
                        </svg>
                        {sidebarOpen && <span>My Profile</span>}
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
            <main className="teacher-main">
                {/* Header */}
                <header className="teacher-header">
                    <div className="header-left">
                        <button className="menu-btn" onClick={() => setSidebarOpen(!sidebarOpen)}>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <line x1="3" y1="12" x2="21" y2="12"></line>
                                <line x1="3" y1="6" x2="21" y2="6"></line>
                                <line x1="3" y1="18" x2="21" y2="18"></line>
                            </svg>
                        </button>
                        <h1 className="page-title">Teacher Portal</h1>
                    </div>
                    <div className="header-right">
                        <div className="user-badge">
                            <div className="user-avatar">
                                {user?.firstName?.charAt(0)}{user?.lastName?.charAt(0)}
                            </div>
                            <div className="user-info">
                                <span className="user-name">{user?.firstName} {user?.lastName}</span>
                                <span className="user-meta">{user?.uid}</span>
                            </div>
                        </div>
                    </div>
                </header>

                {/* Page Content */}
                <div className="teacher-content">
                    <Outlet />

                    {/* Default Dashboard Content */}
                    {window.location.pathname === '/teacher/dashboard' && (
                        <TeacherDashboardHome user={user} />
                    )}
                </div>
            </main>

            {/* Styles */}
            <style>{`
        .teacher-layout {
          display: flex;
          min-height: 100vh;
          background: var(--bg-body);
        }

        .teacher-sidebar {
          width: 260px;
          background: linear-gradient(180deg, #16a34a 0%, #15803d 100%);
          color: white;
          display: flex;
          flex-direction: column;
          transition: width 0.3s ease;
        }

        .teacher-sidebar.collapsed {
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
          color: #16a34a;
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

        .teacher-main {
          flex: 1;
          display: flex;
          flex-direction: column;
        }

        .teacher-header {
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
          background: #16a34a;
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

        .teacher-content {
          flex: 1;
          padding: var(--spacing-6);
          overflow-y: auto;
        }
      `}</style>
        </div>
    );
}

// Dashboard Home Component
function TeacherDashboardHome({ user }: { user: any }) {
    return (
        <div className="dashboard-home">
            {/* Welcome Card */}
            <div className="welcome-card">
                <div className="welcome-text">
                    <h2>Good Morning, {user?.firstName}!</h2>
                    <p>You have 4 classes today</p>
                </div>
                <div className="teacher-id-card">
                    <span className="id-label">Teacher ID</span>
                    <span className="id-value">{user?.uid}</span>
                </div>
            </div>

            {/* Today's Schedule */}
            <div className="schedule-section">
                <h3>Today's Schedule</h3>
                <div className="schedule-grid">
                    {[
                        { time: '8:00 AM', class: 'Grade 10-A', subject: 'Mathematics', room: 'Room 101' },
                        { time: '9:00 AM', class: 'Grade 9-B', subject: 'Mathematics', room: 'Room 102' },
                        { time: '10:30 AM', class: 'Grade 11-A', subject: 'Physics', room: 'Lab 1' },
                        { time: '12:00 PM', class: 'Grade 8-C', subject: 'Mathematics', room: 'Room 105' },
                    ].map((item, index) => (
                        <div key={index} className="schedule-card">
                            <div className="schedule-time">{item.time}</div>
                            <div className="schedule-info">
                                <span className="schedule-class">{item.class}</span>
                                <span className="schedule-subject">{item.subject}</span>
                                <span className="schedule-room">{item.room}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Quick Actions */}
            <div className="quick-section">
                <h3>Quick Actions</h3>
                <div className="quick-grid">
                    <Link to="/teacher/attendance" className="quick-card">
                        <span className="quick-icon">✅</span>
                        <span>Mark Attendance</span>
                    </Link>
                    <Link to="/teacher/grades" className="quick-card">
                        <span className="quick-icon">📝</span>
                        <span>Enter Grades</span>
                    </Link>
                    <Link to="/teacher/students" className="quick-card">
                        <span className="quick-icon">👥</span>
                        <span>View Students</span>
                    </Link>
                    <Link to="/teacher/timetable" className="quick-card">
                        <span className="quick-icon">📅</span>
                        <span>View Timetable</span>
                    </Link>
                </div>
            </div>

            <style>{`
        .dashboard-home {
          max-width: 1200px;
        }

        .welcome-card {
          background: linear-gradient(135deg, #16a34a 0%, #15803d 100%);
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

        .teacher-id-card {
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

        .schedule-section, .quick-section {
          margin-bottom: var(--spacing-6);
        }

        .schedule-section h3, .quick-section h3 {
          margin-bottom: var(--spacing-4);
          font-size: 1.125rem;
        }

        .schedule-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: var(--spacing-4);
        }

        .schedule-card {
          background: white;
          border-radius: var(--radius-lg);
          padding: var(--spacing-4);
          box-shadow: var(--shadow-sm);
          border-left: 4px solid #16a34a;
        }

        .schedule-time {
          font-size: 0.875rem;
          font-weight: 600;
          color: #16a34a;
          margin-bottom: var(--spacing-2);
        }

        .schedule-info {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .schedule-class {
          font-weight: 600;
        }

        .schedule-subject {
          font-size: 0.875rem;
          color: var(--text-secondary);
        }

        .schedule-room {
          font-size: 0.75rem;
          color: var(--text-muted);
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
          .schedule-grid, .quick-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
      `}</style>
        </div>
    );
}
