/**
 * NVRSS ERP - Professional Student Dashboard
 * Complete student portal with all academic features
 */

import React, { useState } from 'react';
import { Link, Routes, Route, NavLink, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

// Import child pages
import StudentProfile from './Profile';
import StudentAttendance from './Attendance';
import StudentTimetable from './Timetable';
import StudentResults from './Results';
import StudentFees from './Fees';

export default function StudentDashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    navigate('/', { replace: true });
  };

  // Parse student UID
  const parseStudentUid = (uid: string) => {
    const match = uid?.match(/^(\d{2})G(\d{1,2})([A-Z])(\d{3,})$/);
    if (match) {
      return { year: `20${match[1]}`, grade: match[2], section: match[3], rollNo: match[4] };
    }
    return null;
  };

  const studentInfo = parseStudentUid(user?.uid || '');

  const navItems = [
    { path: '/student/dashboard', icon: 'dashboard', label: 'Dashboard' },
    { path: '/student/profile', icon: 'profile', label: 'My Profile' },
    { path: '/student/attendance', icon: 'attendance', label: 'Attendance' },
    { path: '/student/timetable', icon: 'timetable', label: 'Time Table' },
    { path: '/student/subjects', icon: 'subjects', label: 'Subjects' },
    { path: '/student/exams', icon: 'exams', label: 'Examinations' },
    { path: '/student/results', icon: 'results', label: 'Results' },
    { path: '/student/assignments', icon: 'assignments', label: 'Assignments' },
    { path: '/student/fees', icon: 'fees', label: 'Fee Details' },
    { path: '/student/library', icon: 'library', label: 'Library' },
    { path: '/student/documents', icon: 'documents', label: 'Documents' },
    { path: '/student/notices', icon: 'notices', label: 'Notice Board' },
  ];

  const getIcon = (type: string): React.ReactNode => {
    const icons: Record<string, React.ReactNode> = {
      dashboard: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="9"></rect><rect x="14" y="3" width="7" height="5"></rect><rect x="14" y="12" width="7" height="9"></rect><rect x="3" y="16" width="7" height="5"></rect></svg>,
      profile: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>,
      attendance: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line><path d="M9 16l2 2 4-4"></path></svg>,
      timetable: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>,
      subjects: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path></svg>,
      exams: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>,
      results: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="20" x2="18" y2="10"></line><line x1="12" y1="20" x2="12" y2="4"></line><line x1="6" y1="20" x2="6" y2="14"></line></svg>,
      assignments: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path><rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect></svg>,
      fees: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="1" x2="12" y2="23"></line><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>,
      library: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path><line x1="12" y1="6" x2="12" y2="13"></line><line x1="9" y1="10" x2="15" y2="10"></line></svg>,
      documents: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"></path><polyline points="13 2 13 9 20 9"></polyline></svg>,
      notices: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg>,
    };
    return icons[type] || icons.dashboard;
  };

  return (
    <div className="dashboard-layout">
      {/* Sidebar */}
      <aside className={`sidebar ${sidebarOpen ? '' : 'collapsed'}`}>
        <div className="sidebar-header">
          <div className="sidebar-logo">
            <span>NV</span>
          </div>
          {sidebarOpen && (
            <div className="sidebar-brand">
              <span className="brand-name">NVRSS</span>
              <span className="brand-portal">Student Portal</span>
            </div>
          )}
        </div>

        <nav className="sidebar-nav">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === '/student/dashboard'}
              className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
            >
              {getIcon(item.icon)}
              {sidebarOpen && <span>{item.label}</span>}
            </NavLink>
          ))}
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
      <main className="main-content">
        {/* Header */}
        <header className="main-header">
          <div className="header-left">
            <button className="toggle-btn" onClick={() => setSidebarOpen(!sidebarOpen)}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="3" y1="12" x2="21" y2="12"></line>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <line x1="3" y1="18" x2="21" y2="18"></line>
              </svg>
            </button>
            <div className="breadcrumb">
              <span className="breadcrumb-home">Student</span>
              <span className="breadcrumb-sep">/</span>
              <span className="breadcrumb-current">{navItems.find(n => location.pathname.startsWith(n.path))?.label || 'Dashboard'}</span>
            </div>
          </div>

          <div className="header-right">
            <button className="header-btn notification-btn" onClick={() => setNotificationsOpen(!notificationsOpen)}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
                <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
              </svg>
              <span className="notification-badge">3</span>
            </button>

            <div className="user-menu">
              <div className="user-avatar">{user?.firstName?.charAt(0)}{user?.lastName?.charAt(0)}</div>
              <div className="user-info">
                <span className="user-name">{user?.firstName} {user?.lastName}</span>
                <span className="user-role">{studentInfo ? `Grade ${studentInfo.grade} - Section ${studentInfo.section}` : user?.uid}</span>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="page-content">
          <Routes>
            <Route index element={<StudentDashboardHome studentInfo={studentInfo} user={user} />} />
            <Route path="dashboard" element={<StudentDashboardHome studentInfo={studentInfo} user={user} />} />
            <Route path="profile" element={<StudentProfile />} />
            <Route path="attendance" element={<StudentAttendance />} />
            <Route path="timetable" element={<StudentTimetable />} />
            <Route path="results" element={<StudentResults />} />
            <Route path="fees" element={<StudentFees />} />
            <Route path="*" element={<div style={{ padding: '2rem', textAlign: 'center' }}><h2>🚧 Coming Soon</h2><p>This feature is under development.</p></div>} />
          </Routes>
        </div>
      </main>

      <style>{`
        .dashboard-layout {
          display: flex;
          min-height: 100vh;
          background: #f1f5f9;
        }

        .sidebar {
          width: 280px;
          background: linear-gradient(180deg, #1e40af 0%, #1e3a8a 100%);
          display: flex;
          flex-direction: column;
          transition: width 0.3s ease;
          position: fixed;
          height: 100vh;
          z-index: 100;
        }

        .sidebar.collapsed { width: 80px; }

        .sidebar-header {
          padding: 1.5rem 1rem;
          display: flex;
          align-items: center;
          gap: 0.75rem;
          border-bottom: 1px solid rgba(255,255,255,0.1);
        }

        .sidebar-logo {
          width: 48px;
          height: 48px;
          background: white;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .sidebar-logo span {
          font-size: 1.25rem;
          font-weight: 800;
          color: #1e40af;
        }

        .sidebar-brand {
          display: flex;
          flex-direction: column;
          color: white;
        }

        .brand-name { font-size: 1.25rem; font-weight: 700; }
        .brand-portal { font-size: 0.75rem; opacity: 0.8; }

        .sidebar-nav {
          flex: 1;
          padding: 1rem 0.75rem;
          overflow-y: auto;
        }

        .nav-item {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.75rem 1rem;
          margin-bottom: 0.25rem;
          border-radius: 10px;
          color: rgba(255,255,255,0.7);
          text-decoration: none;
          transition: all 0.2s;
          font-size: 0.9rem;
        }

        .nav-item:hover { background: rgba(255,255,255,0.1); color: white; }
        .nav-item.active { background: rgba(255,255,255,0.2); color: white; font-weight: 500; }

        .sidebar-footer {
          padding: 1rem;
          border-top: 1px solid rgba(255,255,255,0.1);
        }

        .logout-btn {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.75rem 1rem;
          width: 100%;
          border: none;
          background: rgba(255,255,255,0.1);
          border-radius: 10px;
          color: white;
          cursor: pointer;
          font-size: 0.9rem;
          transition: all 0.2s;
        }

        .logout-btn:hover { background: rgba(255,255,255,0.2); }

        .main-content {
          flex: 1;
          margin-left: 280px;
          transition: margin-left 0.3s ease;
          display: flex;
          flex-direction: column;
        }

        .sidebar.collapsed ~ .main-content { margin-left: 80px; }

        .main-header {
          background: white;
          padding: 1rem 1.5rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-bottom: 1px solid #e2e8f0;
          position: sticky;
          top: 0;
          z-index: 50;
        }

        .header-left {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .toggle-btn {
          padding: 0.5rem;
          border: none;
          background: none;
          cursor: pointer;
          color: #64748b;
          border-radius: 8px;
        }

        .toggle-btn:hover { background: #f1f5f9; }

        .breadcrumb {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.9rem;
        }

        .breadcrumb-home { color: #64748b; }
        .breadcrumb-sep { color: #cbd5e1; }
        .breadcrumb-current { color: #1e40af; font-weight: 500; }

        .header-right {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .header-btn {
          padding: 0.5rem;
          border: none;
          background: #f1f5f9;
          border-radius: 10px;
          cursor: pointer;
          color: #64748b;
          position: relative;
        }

        .notification-badge {
          position: absolute;
          top: -4px;
          right: -4px;
          width: 18px;
          height: 18px;
          background: #ef4444;
          border-radius: 50%;
          font-size: 0.7rem;
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 600;
        }

        .user-menu {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.5rem 1rem;
          background: #f8fafc;
          border-radius: 12px;
        }

        .user-avatar {
          width: 40px;
          height: 40px;
          background: linear-gradient(135deg, #1e40af 0%, #3b82f6 100%);
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-weight: 600;
          font-size: 0.875rem;
        }

        .user-info { display: flex; flex-direction: column; }
        .user-name { font-weight: 500; font-size: 0.875rem; color: #1e293b; }
        .user-role { font-size: 0.75rem; color: #64748b; }

        .page-content {
          flex: 1;
          padding: 1.5rem;
          overflow-y: auto;
        }

        @media (max-width: 1024px) {
          .sidebar { transform: translateX(-100%); }
          .sidebar.open { transform: translateX(0); }
          .main-content { margin-left: 0 !important; }
        }
      `}</style>
    </div>
  );
}

// Student Dashboard Home
function StudentDashboardHome({ studentInfo, user }: { studentInfo: any; user: any }) {
  return (
    <div className="student-home">
      {/* Welcome Banner */}
      <div className="welcome-banner">
        <div className="welcome-content">
          <h1>Welcome back, {user?.firstName}! 👋</h1>
          <p>Here's what's happening with your academics today</p>
        </div>
        <div className="student-card">
          <div className="card-label">Student ID</div>
          <div className="card-id">{user?.uid}</div>
          <div className="card-class">
            {studentInfo ? `Class ${studentInfo.grade} - Section ${studentInfo.section}` : 'Student'}
          </div>
        </div>
      </div>

      {/* Stats Row */}
      <div className="stats-row">
        <div className="stat-card">
          <div className="stat-icon blue"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg></div>
          <div className="stat-info">
            <span className="stat-value">92.5%</span>
            <span className="stat-label">Attendance</span>
          </div>
          <div className="stat-trend up">↑ 2.5%</div>
        </div>

        <div className="stat-card">
          <div className="stat-icon green"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="20" x2="18" y2="10"></line><line x1="12" y1="20" x2="12" y2="4"></line><line x1="6" y1="20" x2="6" y2="14"></line></svg></div>
          <div className="stat-info">
            <span className="stat-value">87.3%</span>
            <span className="stat-label">Overall Grade</span>
          </div>
          <div className="stat-trend up">↑ 4.2%</div>
        </div>

        <div className="stat-card">
          <div className="stat-icon purple"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path><rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect></svg></div>
          <div className="stat-info">
            <span className="stat-value">5</span>
            <span className="stat-label">Pending Tasks</span>
          </div>
          <div className="stat-trend down">2 due today</div>
        </div>

        <div className="stat-card">
          <div className="stat-icon orange"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="1" x2="12" y2="23"></line><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg></div>
          <div className="stat-info">
            <span className="stat-value">₹0</span>
            <span className="stat-label">Pending Fees</span>
          </div>
          <div className="stat-trend neutral">All paid</div>
        </div>
      </div>

      {/* Main Grid */}
      <div className="main-grid">
        {/* Today's Classes */}
        <div className="dashboard-card">
          <div className="card-header">
            <h3>Today's Classes</h3>
            <Link to="/student/timetable" className="view-all">View Full Timetable →</Link>
          </div>
          <div className="class-list">
            {[
              { time: '8:00 AM', subject: 'Mathematics', teacher: 'Mr. Sharma', room: 'Room 101', status: 'completed' },
              { time: '9:00 AM', subject: 'Physics', teacher: 'Mrs. Gupta', room: 'Lab 2', status: 'completed' },
              { time: '10:30 AM', subject: 'English', teacher: 'Ms. Patel', room: 'Room 103', status: 'ongoing' },
              { time: '11:30 AM', subject: 'Chemistry', teacher: 'Mr. Kumar', room: 'Lab 1', status: 'upcoming' },
              { time: '1:00 PM', subject: 'Computer Science', teacher: 'Mrs. Singh', room: 'Computer Lab', status: 'upcoming' },
            ].map((cls, i) => (
              <div key={i} className={`class-item ${cls.status}`}>
                <div className="class-time">{cls.time}</div>
                <div className="class-details">
                  <span className="class-subject">{cls.subject}</span>
                  <span className="class-meta">{cls.teacher} • {cls.room}</span>
                </div>
                <div className={`class-status ${cls.status}`}>
                  {cls.status === 'completed' ? '✓' : cls.status === 'ongoing' ? '●' : '○'}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Exams */}
        <div className="dashboard-card">
          <div className="card-header">
            <h3>Upcoming Exams</h3>
            <Link to="/student/exams" className="view-all">View All →</Link>
          </div>
          <div className="exam-list">
            {[
              { subject: 'Mathematics', date: 'Jan 25, 2026', type: 'Unit Test', days: 5 },
              { subject: 'Physics', date: 'Jan 28, 2026', type: 'Mid Term', days: 8 },
              { subject: 'Chemistry', date: 'Feb 1, 2026', type: 'Unit Test', days: 12 },
            ].map((exam, i) => (
              <div key={i} className="exam-item">
                <div className="exam-days">
                  <span className="days-count">{exam.days}</span>
                  <span className="days-label">days</span>
                </div>
                <div className="exam-details">
                  <span className="exam-subject">{exam.subject}</span>
                  <span className="exam-meta">{exam.type} • {exam.date}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Results */}
        <div className="dashboard-card">
          <div className="card-header">
            <h3>Recent Results</h3>
            <Link to="/student/results" className="view-all">View All →</Link>
          </div>
          <div className="results-list">
            {[
              { subject: 'Mathematics', marks: 92, total: 100, grade: 'A+' },
              { subject: 'Physics', marks: 88, total: 100, grade: 'A' },
              { subject: 'English', marks: 85, total: 100, grade: 'A' },
              { subject: 'Chemistry', marks: 79, total: 100, grade: 'B+' },
            ].map((result, i) => (
              <div key={i} className="result-item">
                <div className="result-subject">{result.subject}</div>
                <div className="result-bar">
                  <div className="bar-fill" style={{ width: `${result.marks}%` }}></div>
                </div>
                <div className="result-marks">{result.marks}/{result.total}</div>
                <div className={`result-grade grade-${result.grade.replace('+', 'plus')}`}>{result.grade}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Pending Assignments */}
        <div className="dashboard-card">
          <div className="card-header">
            <h3>Pending Assignments</h3>
            <Link to="/student/assignments" className="view-all">View All →</Link>
          </div>
          <div className="assignment-list">
            {[
              { title: 'Physics Lab Report', subject: 'Physics', due: 'Today', urgent: true },
              { title: 'Math Problem Set 5', subject: 'Mathematics', due: 'Tomorrow', urgent: true },
              { title: 'Essay on Climate Change', subject: 'English', due: 'Jan 23', urgent: false },
              { title: 'Chemistry Worksheet', subject: 'Chemistry', due: 'Jan 25', urgent: false },
            ].map((item, i) => (
              <div key={i} className={`assignment-item ${item.urgent ? 'urgent' : ''}`}>
                <div className="assignment-checkbox">
                  <input type="checkbox" />
                </div>
                <div className="assignment-details">
                  <span className="assignment-title">{item.title}</span>
                  <span className="assignment-meta">{item.subject}</span>
                </div>
                <div className={`assignment-due ${item.urgent ? 'urgent' : ''}`}>{item.due}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="quick-actions">
        <h3>Quick Actions</h3>
        <div className="actions-grid">
          <Link to="/student/attendance" className="action-card">
            <div className="action-icon">📅</div>
            <span>View Attendance</span>
          </Link>
          <Link to="/student/results" className="action-card">
            <div className="action-icon">📊</div>
            <span>Check Results</span>
          </Link>
          <Link to="/student/fees" className="action-card">
            <div className="action-icon">💰</div>
            <span>Pay Fees</span>
          </Link>
          <Link to="/student/timetable" className="action-card">
            <div className="action-icon">🕐</div>
            <span>Time Table</span>
          </Link>
          <Link to="/student/library" className="action-card">
            <div className="action-icon">📚</div>
            <span>Library</span>
          </Link>
          <Link to="/student/documents" className="action-card">
            <div className="action-icon">📄</div>
            <span>Documents</span>
          </Link>
        </div>
      </div>

      <style>{`
        .student-home { max-width: 1400px; }

        .welcome-banner {
          background: linear-gradient(135deg, #1e40af 0%, #3b82f6 100%);
          border-radius: 16px;
          padding: 2rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          color: white;
          margin-bottom: 1.5rem;
        }

        .welcome-content h1 { font-size: 1.5rem; margin-bottom: 0.5rem; }
        .welcome-content p { opacity: 0.9; }

        .student-card {
          background: rgba(255,255,255,0.15);
          backdrop-filter: blur(10px);
          padding: 1rem 2rem;
          border-radius: 12px;
          text-align: center;
        }

        .card-label { font-size: 0.75rem; opacity: 0.8; margin-bottom: 0.25rem; }
        .card-id { font-size: 1.5rem; font-weight: 700; font-family: monospace; }
        .card-class { font-size: 0.875rem; opacity: 0.9; margin-top: 0.25rem; }

        .stats-row {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1rem;
          margin-bottom: 1.5rem;
        }

        .stat-card {
          background: white;
          border-radius: 12px;
          padding: 1.25rem;
          display: flex;
          align-items: center;
          gap: 1rem;
          box-shadow: 0 1px 3px rgba(0,0,0,0.1);
        }

        .stat-icon {
          width: 48px;
          height: 48px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .stat-icon.blue { background: #dbeafe; color: #1e40af; }
        .stat-icon.green { background: #dcfce7; color: #16a34a; }
        .stat-icon.purple { background: #ede9fe; color: #7c3aed; }
        .stat-icon.orange { background: #fef3c7; color: #d97706; }

        .stat-info { flex: 1; }
        .stat-value { display: block; font-size: 1.5rem; font-weight: 700; color: #1e293b; }
        .stat-label { font-size: 0.875rem; color: #64748b; }

        .stat-trend {
          font-size: 0.75rem;
          padding: 0.25rem 0.5rem;
          border-radius: 6px;
        }

        .stat-trend.up { background: #dcfce7; color: #16a34a; }
        .stat-trend.down { background: #fee2e2; color: #dc2626; }
        .stat-trend.neutral { background: #f1f5f9; color: #64748b; }

        .main-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1.5rem;
          margin-bottom: 1.5rem;
        }

        .dashboard-card {
          background: white;
          border-radius: 12px;
          padding: 1.25rem;
          box-shadow: 0 1px 3px rgba(0,0,0,0.1);
        }

        .card-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1rem;
          padding-bottom: 0.75rem;
          border-bottom: 1px solid #e2e8f0;
        }

        .card-header h3 { font-size: 1rem; font-weight: 600; color: #1e293b; }
        .view-all { font-size: 0.875rem; color: #3b82f6; text-decoration: none; }

        .class-list { display: flex; flex-direction: column; gap: 0.5rem; }

        .class-item {
          display: flex;
          align-items: center;
          padding: 0.75rem;
          border-radius: 8px;
          background: #f8fafc;
        }

        .class-item.ongoing { background: #eff6ff; border-left: 3px solid #3b82f6; }
        .class-time { width: 70px; font-size: 0.875rem; color: #64748b; font-weight: 500; }
        .class-details { flex: 1; }
        .class-subject { display: block; font-weight: 500; color: #1e293b; }
        .class-meta { font-size: 0.75rem; color: #64748b; }
        .class-status { width: 24px; text-align: center; }
        .class-status.completed { color: #16a34a; }
        .class-status.ongoing { color: #3b82f6; }
        .class-status.upcoming { color: #94a3b8; }

        .exam-list { display: flex; flex-direction: column; gap: 0.75rem; }

        .exam-item {
          display: flex;
          align-items: center;
          padding: 0.75rem;
          background: #f8fafc;
          border-radius: 8px;
          gap: 1rem;
        }

        .exam-days {
          width: 50px;
          height: 50px;
          background: linear-gradient(135deg, #1e40af 0%, #3b82f6 100%);
          border-radius: 10px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          color: white;
        }

        .days-count { font-size: 1.25rem; font-weight: 700; line-height: 1; }
        .days-label { font-size: 0.6rem; opacity: 0.9; }
        .exam-subject { display: block; font-weight: 500; color: #1e293b; }
        .exam-meta { font-size: 0.75rem; color: #64748b; }

        .results-list { display: flex; flex-direction: column; gap: 0.75rem; }

        .result-item {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .result-subject { width: 100px; font-size: 0.875rem; color: #1e293b; }

        .result-bar {
          flex: 1;
          height: 8px;
          background: #e2e8f0;
          border-radius: 4px;
          overflow: hidden;
        }

        .bar-fill {
          height: 100%;
          background: linear-gradient(90deg, #1e40af 0%, #3b82f6 100%);
          border-radius: 4px;
        }

        .result-marks { font-size: 0.875rem; color: #64748b; width: 60px; text-align: right; }

        .result-grade {
          width: 36px;
          height: 24px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 6px;
          font-size: 0.75rem;
          font-weight: 600;
        }

        .grade-Aplus { background: #dcfce7; color: #16a34a; }
        .grade-A { background: #dbeafe; color: #1e40af; }
        .grade-Bplus { background: #fef3c7; color: #d97706; }

        .assignment-list { display: flex; flex-direction: column; gap: 0.5rem; }

        .assignment-item {
          display: flex;
          align-items: center;
          padding: 0.75rem;
          background: #f8fafc;
          border-radius: 8px;
          gap: 0.75rem;
        }

        .assignment-item.urgent { background: #fef2f2; border-left: 3px solid #ef4444; }
        .assignment-checkbox input { width: 18px; height: 18px; }
        .assignment-details { flex: 1; }
        .assignment-title { display: block; font-weight: 500; color: #1e293b; font-size: 0.9rem; }
        .assignment-meta { font-size: 0.75rem; color: #64748b; }
        .assignment-due { font-size: 0.75rem; padding: 0.25rem 0.5rem; border-radius: 6px; background: #f1f5f9; color: #64748b; }
        .assignment-due.urgent { background: #fee2e2; color: #dc2626; font-weight: 500; }

        .quick-actions { margin-top: 1.5rem; }
        .quick-actions h3 { font-size: 1rem; font-weight: 600; margin-bottom: 1rem; color: #1e293b; }

        .actions-grid {
          display: grid;
          grid-template-columns: repeat(6, 1fr);
          gap: 1rem;
        }

        .action-card {
          background: white;
          border-radius: 12px;
          padding: 1.25rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.5rem;
          text-decoration: none;
          color: #1e293b;
          box-shadow: 0 1px 3px rgba(0,0,0,0.1);
          transition: all 0.2s;
        }

        .action-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 8px 25px rgba(0,0,0,0.15);
        }

        .action-icon { font-size: 2rem; }
        .action-card span { font-size: 0.875rem; text-align: center; }

        @media (max-width: 1200px) {
          .stats-row { grid-template-columns: repeat(2, 1fr); }
          .main-grid { grid-template-columns: 1fr; }
          .actions-grid { grid-template-columns: repeat(3, 1fr); }
        }

        @media (max-width: 768px) {
          .welcome-banner { flex-direction: column; text-align: center; gap: 1rem; }
          .stats-row { grid-template-columns: 1fr; }
          .actions-grid { grid-template-columns: repeat(2, 1fr); }
        }
      `}</style>
    </div>
  );
}
