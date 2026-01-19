/**
 * NVRSS ERP - Professional Teacher Dashboard
 * Complete teacher portal with class management, attendance, grades
 */

import React, { useState } from 'react';
import { Link, Routes, Route, NavLink, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

// Import child pages
import TeacherProfile from './Profile';
import TeacherTimetable from './Timetable';
import TeacherClasses from './Classes';
import TeacherAttendance from './Attendance';
import TeacherStudents from './Students';
import TeacherGrades from './Grades';
import TeacherLeave from './Leave';

export default function TeacherDashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const handleLogout = async () => {
    await logout();
    navigate('/', { replace: true });
  };


  const navItems = [
    { path: '/teacher/dashboard', icon: 'dashboard', label: 'Dashboard' },
    { path: '/teacher/profile', icon: 'profile', label: 'My Profile' },
    { path: '/teacher/timetable', icon: 'timetable', label: 'Time Table' },
    { path: '/teacher/classes', icon: 'classes', label: 'My Classes' },
    { path: '/teacher/attendance', icon: 'attendance', label: 'Mark Attendance' },
    { path: '/teacher/students', icon: 'students', label: 'Students' },
    { path: '/teacher/subjects', icon: 'subjects', label: 'Subjects' },
    { path: '/teacher/exams', icon: 'exams', label: 'Examinations' },
    { path: '/teacher/grades', icon: 'grades', label: 'Enter Grades' },
    { path: '/teacher/assignments', icon: 'assignments', label: 'Assignments' },
    { path: '/teacher/leave', icon: 'leave', label: 'Leave Management' },
    { path: '/teacher/notices', icon: 'notices', label: 'Notice Board' },
  ];

  const getIcon = (type: string): React.ReactNode => {
    const icons: Record<string, React.ReactNode> = {
      dashboard: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="9"></rect><rect x="14" y="3" width="7" height="5"></rect><rect x="14" y="12" width="7" height="9"></rect><rect x="3" y="16" width="7" height="5"></rect></svg>,
      profile: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>,
      timetable: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>,
      classes: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 10v6M2 10l10-5 10 5-10 5z"></path><path d="M6 12v5c3 3 9 3 12 0v-5"></path></svg>,
      attendance: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><path d="M9 16l2 2 4-4"></path></svg>,
      students: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>,
      subjects: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path></svg>,
      exams: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line></svg>,
      grades: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="20" x2="18" y2="10"></line><line x1="12" y1="20" x2="12" y2="4"></line><line x1="6" y1="20" x2="6" y2="14"></line></svg>,
      assignments: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path><rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect></svg>,
      leave: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>,
      notices: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg>,
    };
    return icons[type] || icons.dashboard;
  };

  return (
    <div className="dashboard-layout">
      {/* Sidebar */}
      <aside className={`sidebar ${sidebarOpen ? '' : 'collapsed'}`}>
        <div className="sidebar-header">
          <div className="sidebar-logo"><span>NV</span></div>
          {sidebarOpen && (
            <div className="sidebar-brand">
              <span className="brand-name">NVRSS</span>
              <span className="brand-portal">Teacher Portal</span>
            </div>
          )}
        </div>

        <nav className="sidebar-nav">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === '/teacher/dashboard'}
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
        <header className="main-header">
          <div className="header-left">
            <button className="toggle-btn" onClick={() => setSidebarOpen(!sidebarOpen)}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line>
              </svg>
            </button>
            <div className="breadcrumb">
              <span className="breadcrumb-home">Teacher</span>
              <span className="breadcrumb-sep">/</span>
              <span className="breadcrumb-current">{navItems.find(n => location.pathname.startsWith(n.path))?.label || 'Dashboard'}</span>
            </div>
          </div>

          <div className="header-right">
            <button className="header-btn">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
              </svg>
              <span className="notification-badge">5</span>
            </button>
            <div className="user-menu">
              <div className="user-avatar">{user?.firstName?.charAt(0)}{user?.lastName?.charAt(0)}</div>
              <div className="user-info">
                <span className="user-name">{user?.firstName} {user?.lastName}</span>
                <span className="user-role">Teacher • {user?.uid}</span>
              </div>
            </div>
          </div>
        </header>

        <div className="page-content">
          <Routes>
            <Route index element={<TeacherDashboardHome user={user} />} />
            <Route path="dashboard" element={<TeacherDashboardHome user={user} />} />
            <Route path="profile" element={<TeacherProfile />} />
            <Route path="timetable" element={<TeacherTimetable />} />
            <Route path="classes" element={<TeacherClasses />} />
            <Route path="attendance" element={<TeacherAttendance />} />
            <Route path="students" element={<TeacherStudents />} />
            <Route path="grades" element={<TeacherGrades />} />
            <Route path="leave" element={<TeacherLeave />} />
            <Route path="*" element={<div style={{ padding: '2rem', textAlign: 'center' }}><h2>🚧 Coming Soon</h2><p>This feature is under development.</p></div>} />
          </Routes>
        </div>
      </main>

      <style>{`
        .dashboard-layout { display: flex; min-height: 100vh; background: #f1f5f9; }
        .sidebar { width: 280px; background: linear-gradient(180deg, #1e40af 0%, #1e3a8a 100%); display: flex; flex-direction: column; transition: width 0.3s ease; position: fixed; height: 100vh; z-index: 100; }
        .sidebar.collapsed { width: 80px; }
        .sidebar-header { padding: 1.5rem 1rem; display: flex; align-items: center; gap: 0.75rem; border-bottom: 1px solid rgba(255,255,255,0.1); }
        .sidebar-logo { width: 48px; height: 48px; background: white; border-radius: 12px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
        .sidebar-logo span { font-size: 1.25rem; font-weight: 800; color: #1e40af; }
        .sidebar-brand { display: flex; flex-direction: column; color: white; }
        .brand-name { font-size: 1.25rem; font-weight: 700; }
        .brand-portal { font-size: 0.75rem; opacity: 0.8; }
        .sidebar-nav { flex: 1; padding: 1rem 0.75rem; overflow-y: auto; }
        .nav-item { display: flex; align-items: center; gap: 0.75rem; padding: 0.75rem 1rem; margin-bottom: 0.25rem; border-radius: 10px; color: rgba(255,255,255,0.7); text-decoration: none; transition: all 0.2s; font-size: 0.9rem; }
        .nav-item:hover { background: rgba(255,255,255,0.1); color: white; }
        .nav-item.active { background: rgba(255,255,255,0.2); color: white; font-weight: 500; }
        .sidebar-footer { padding: 1rem; border-top: 1px solid rgba(255,255,255,0.1); }
        .logout-btn { display: flex; align-items: center; gap: 0.75rem; padding: 0.75rem 1rem; width: 100%; border: none; background: rgba(255,255,255,0.1); border-radius: 10px; color: white; cursor: pointer; font-size: 0.9rem; transition: all 0.2s; }
        .logout-btn:hover { background: rgba(255,255,255,0.2); }
        .main-content { flex: 1; margin-left: 280px; transition: margin-left 0.3s ease; display: flex; flex-direction: column; }
        .sidebar.collapsed ~ .main-content { margin-left: 80px; }
        .main-header { background: white; padding: 1rem 1.5rem; display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #e2e8f0; position: sticky; top: 0; z-index: 50; }
        .header-left { display: flex; align-items: center; gap: 1rem; }
        .toggle-btn { padding: 0.5rem; border: none; background: none; cursor: pointer; color: #64748b; border-radius: 8px; }
        .toggle-btn:hover { background: #f1f5f9; }
        .breadcrumb { display: flex; align-items: center; gap: 0.5rem; font-size: 0.9rem; }
        .breadcrumb-home { color: #64748b; }
        .breadcrumb-sep { color: #cbd5e1; }
        .breadcrumb-current { color: #1e40af; font-weight: 500; }
        .header-right { display: flex; align-items: center; gap: 1rem; }
        .header-btn { padding: 0.5rem; border: none; background: #f1f5f9; border-radius: 10px; cursor: pointer; color: #64748b; position: relative; }
        .notification-badge { position: absolute; top: -4px; right: -4px; width: 18px; height: 18px; background: #ef4444; border-radius: 50%; font-size: 0.7rem; color: white; display: flex; align-items: center; justify-content: center; font-weight: 600; }
        .user-menu { display: flex; align-items: center; gap: 0.75rem; padding: 0.5rem 1rem; background: #f8fafc; border-radius: 12px; }
        .user-avatar { width: 40px; height: 40px; background: linear-gradient(135deg, #1e40af 0%, #3b82f6 100%); border-radius: 10px; display: flex; align-items: center; justify-content: center; color: white; font-weight: 600; font-size: 0.875rem; }
        .user-info { display: flex; flex-direction: column; }
        .user-name { font-weight: 500; font-size: 0.875rem; color: #1e293b; }
        .user-role { font-size: 0.75rem; color: #64748b; }
        .page-content { flex: 1; padding: 1.5rem; overflow-y: auto; }
      `}</style>
    </div>
  );
}

// Teacher Dashboard Home
function TeacherDashboardHome({ user }: { user: any }) {
  const currentTime = new Date();
  const greeting = currentTime.getHours() < 12 ? 'Good Morning' : currentTime.getHours() < 18 ? 'Good Afternoon' : 'Good Evening';

  return (
    <div className="teacher-home">
      {/* Welcome Banner */}
      <div className="welcome-banner">
        <div className="welcome-content">
          <h1>{greeting}, {user?.firstName}! 👨‍🏫</h1>
          <p>You have 5 classes scheduled for today</p>
        </div>
        <div className="teacher-card">
          <div className="card-label">Teacher ID</div>
          <div className="card-id">{user?.uid}</div>
          <div className="card-dept">Science Department</div>
        </div>
      </div>

      {/* Stats Row */}
      <div className="stats-row">
        <div className="stat-card">
          <div className="stat-icon blue"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 10v6M2 10l10-5 10 5-10 5z"></path><path d="M6 12v5c3 3 9 3 12 0v-5"></path></svg></div>
          <div className="stat-info"><span className="stat-value">6</span><span className="stat-label">Classes Today</span></div>
        </div>
        <div className="stat-card">
          <div className="stat-icon green"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg></div>
          <div className="stat-info"><span className="stat-value">247</span><span className="stat-label">Total Students</span></div>
        </div>
        <div className="stat-card">
          <div className="stat-icon purple"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path><rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect></svg></div>
          <div className="stat-info"><span className="stat-value">12</span><span className="stat-label">Pending Tasks</span></div>
        </div>
        <div className="stat-card">
          <div className="stat-icon orange"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line></svg></div>
          <div className="stat-info"><span className="stat-value">2</span><span className="stat-label">Leave Balance</span></div>
        </div>
      </div>

      {/* Main Grid */}
      <div className="main-grid">
        {/* Today's Schedule */}
        <div className="dashboard-card schedule-card">
          <div className="card-header">
            <h3>Today's Schedule</h3>
            <Link to="/teacher/timetable" className="view-all">Full Timetable →</Link>
          </div>
          <div className="schedule-list">
            {[
              { time: '8:00 - 8:45', class: 'Grade 10-A', subject: 'Mathematics', room: 'Room 101', status: 'completed' },
              { time: '9:00 - 9:45', class: 'Grade 9-B', subject: 'Mathematics', room: 'Room 102', status: 'completed' },
              { time: '10:00 - 10:45', class: 'Grade 11-A', subject: 'Physics', room: 'Lab 1', status: 'ongoing' },
              { time: '11:00 - 11:45', class: 'Grade 8-C', subject: 'Mathematics', room: 'Room 105', status: 'upcoming' },
              { time: '1:00 - 1:45', class: 'Grade 12-A', subject: 'Physics', room: 'Lab 2', status: 'upcoming' },
              { time: '2:00 - 2:45', class: 'Grade 10-B', subject: 'Mathematics', room: 'Room 103', status: 'upcoming' },
            ].map((item, i) => (
              <div key={i} className={`schedule-item ${item.status}`}>
                <div className="schedule-time">{item.time}</div>
                <div className="schedule-info">
                  <span className="schedule-class">{item.class}</span>
                  <span className="schedule-subject">{item.subject} • {item.room}</span>
                </div>
                <div className={`schedule-status ${item.status}`}>
                  {item.status === 'completed' && <span className="status-badge done">Done</span>}
                  {item.status === 'ongoing' && <span className="status-badge live">Live</span>}
                  {item.status === 'upcoming' && <span className="status-badge upcoming">Upcoming</span>}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="dashboard-card">
          <div className="card-header">
            <h3>Quick Actions</h3>
          </div>
          <div className="quick-actions-grid">
            <Link to="/teacher/attendance" className="quick-action">
              <div className="action-icon">✅</div>
              <span>Mark Attendance</span>
            </Link>
            <Link to="/teacher/grades" className="quick-action">
              <div className="action-icon">📝</div>
              <span>Enter Grades</span>
            </Link>
            <Link to="/teacher/assignments" className="quick-action">
              <div className="action-icon">📋</div>
              <span>Create Assignment</span>
            </Link>
            <Link to="/teacher/students" className="quick-action">
              <div className="action-icon">👥</div>
              <span>View Students</span>
            </Link>
            <Link to="/teacher/exams" className="quick-action">
              <div className="action-icon">📊</div>
              <span>Exam Schedule</span>
            </Link>
            <Link to="/teacher/leave" className="quick-action">
              <div className="action-icon">📅</div>
              <span>Apply Leave</span>
            </Link>
          </div>
        </div>

        {/* Pending Submissions */}
        <div className="dashboard-card">
          <div className="card-header">
            <h3>Assignment Submissions</h3>
            <Link to="/teacher/assignments" className="view-all">View All →</Link>
          </div>
          <div className="submissions-list">
            {[
              { title: 'Math Problem Set 4', class: 'Grade 10-A', submitted: 28, total: 35, deadline: 'Jan 18' },
              { title: 'Physics Lab Report', class: 'Grade 11-A', submitted: 22, total: 32, deadline: 'Jan 20' },
              { title: 'Weekly Quiz 3', class: 'Grade 9-B', submitted: 30, total: 38, deadline: 'Jan 21' },
            ].map((item, i) => (
              <div key={i} className="submission-item">
                <div className="submission-info">
                  <span className="submission-title">{item.title}</span>
                  <span className="submission-meta">{item.class} • Due: {item.deadline}</span>
                </div>
                <div className="submission-progress">
                  <div className="progress-bar">
                    <div className="progress-fill" style={{ width: `${(item.submitted / item.total) * 100}%` }}></div>
                  </div>
                  <span className="progress-text">{item.submitted}/{item.total}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Attendance Overview */}
        <div className="dashboard-card">
          <div className="card-header">
            <h3>Today's Attendance</h3>
            <Link to="/teacher/attendance" className="view-all">Mark Now →</Link>
          </div>
          <div className="attendance-grid">
            {[
              { class: 'Grade 10-A', present: 32, absent: 3, status: 'marked' },
              { class: 'Grade 9-B', present: 35, absent: 3, status: 'marked' },
              { class: 'Grade 11-A', present: 0, absent: 0, status: 'pending' },
              { class: 'Grade 8-C', present: 0, absent: 0, status: 'pending' },
            ].map((item, i) => (
              <div key={i} className={`attendance-item ${item.status}`}>
                <div className="attendance-class">{item.class}</div>
                {item.status === 'marked' ? (
                  <div className="attendance-stats">
                    <span className="present">✓ {item.present}</span>
                    <span className="absent">✗ {item.absent}</span>
                  </div>
                ) : (
                  <span className="pending-badge">Pending</span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .teacher-home { max-width: 1400px; }
        .welcome-banner { background: linear-gradient(135deg, #1e40af 0%, #3b82f6 100%); border-radius: 16px; padding: 2rem; display: flex; justify-content: space-between; align-items: center; color: white; margin-bottom: 1.5rem; }
        .welcome-content h1 { font-size: 1.5rem; margin-bottom: 0.5rem; }
        .welcome-content p { opacity: 0.9; }
        .teacher-card { background: rgba(255,255,255,0.15); backdrop-filter: blur(10px); padding: 1rem 2rem; border-radius: 12px; text-align: center; }
        .card-label { font-size: 0.75rem; opacity: 0.8; }
        .card-id { font-size: 1.5rem; font-weight: 700; font-family: monospace; }
        .card-dept { font-size: 0.875rem; opacity: 0.9; margin-top: 0.25rem; }

        .stats-row { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1rem; margin-bottom: 1.5rem; }
        .stat-card { background: white; border-radius: 12px; padding: 1.25rem; display: flex; align-items: center; gap: 1rem; box-shadow: 0 1px 3px rgba(0,0,0,0.1); }
        .stat-icon { width: 48px; height: 48px; border-radius: 12px; display: flex; align-items: center; justify-content: center; }
        .stat-icon.blue { background: #dbeafe; color: #1e40af; }
        .stat-icon.green { background: #dcfce7; color: #16a34a; }
        .stat-icon.purple { background: #ede9fe; color: #7c3aed; }
        .stat-icon.orange { background: #fef3c7; color: #d97706; }
        .stat-info { flex: 1; }
        .stat-value { display: block; font-size: 1.5rem; font-weight: 700; color: #1e293b; }
        .stat-label { font-size: 0.875rem; color: #64748b; }

        .main-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 1.5rem; }
        .dashboard-card { background: white; border-radius: 12px; padding: 1.25rem; box-shadow: 0 1px 3px rgba(0,0,0,0.1); }
        .schedule-card { grid-column: 1; grid-row: 1 / 3; }
        .card-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem; padding-bottom: 0.75rem; border-bottom: 1px solid #e2e8f0; }
        .card-header h3 { font-size: 1rem; font-weight: 600; color: #1e293b; }
        .view-all { font-size: 0.875rem; color: #3b82f6; text-decoration: none; }

        .schedule-list { display: flex; flex-direction: column; gap: 0.5rem; }
        .schedule-item { display: flex; align-items: center; padding: 0.75rem; border-radius: 8px; background: #f8fafc; }
        .schedule-item.ongoing { background: #eff6ff; border-left: 3px solid #3b82f6; }
        .schedule-time { width: 100px; font-size: 0.875rem; color: #64748b; font-weight: 500; }
        .schedule-info { flex: 1; }
        .schedule-class { display: block; font-weight: 500; color: #1e293b; }
        .schedule-subject { font-size: 0.75rem; color: #64748b; }
        .status-badge { font-size: 0.7rem; padding: 0.25rem 0.5rem; border-radius: 6px; font-weight: 500; }
        .status-badge.done { background: #dcfce7; color: #16a34a; }
        .status-badge.live { background: #fee2e2; color: #dc2626; animation: pulse 2s infinite; }
        .status-badge.upcoming { background: #f1f5f9; color: #64748b; }
        @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.5; } }

        .quick-actions-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 0.75rem; }
        .quick-action { display: flex; flex-direction: column; align-items: center; gap: 0.5rem; padding: 1rem; background: #f8fafc; border-radius: 10px; text-decoration: none; color: #1e293b; transition: all 0.2s; }
        .quick-action:hover { background: #eff6ff; transform: translateY(-2px); }
        .action-icon { font-size: 1.5rem; }
        .quick-action span { font-size: 0.8rem; text-align: center; }

        .submissions-list { display: flex; flex-direction: column; gap: 0.75rem; }
        .submission-item { display: flex; justify-content: space-between; align-items: center; padding: 0.75rem; background: #f8fafc; border-radius: 8px; }
        .submission-title { display: block; font-weight: 500; color: #1e293b; font-size: 0.9rem; }
        .submission-meta { font-size: 0.75rem; color: #64748b; }
        .submission-progress { display: flex; align-items: center; gap: 0.75rem; }
        .progress-bar { width: 80px; height: 6px; background: #e2e8f0; border-radius: 3px; overflow: hidden; }
        .progress-fill { height: 100%; background: linear-gradient(90deg, #1e40af 0%, #3b82f6 100%); border-radius: 3px; }
        .progress-text { font-size: 0.75rem; color: #64748b; width: 45px; }

        .attendance-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 0.75rem; }
        .attendance-item { padding: 1rem; background: #f8fafc; border-radius: 8px; }
        .attendance-item.pending { border: 2px dashed #e2e8f0; }
        .attendance-class { font-weight: 500; margin-bottom: 0.5rem; }
        .attendance-stats { display: flex; gap: 1rem; }
        .attendance-stats .present { color: #16a34a; font-size: 0.875rem; }
        .attendance-stats .absent { color: #dc2626; font-size: 0.875rem; }
        .pending-badge { font-size: 0.75rem; color: #d97706; background: #fef3c7; padding: 0.25rem 0.5rem; border-radius: 4px; }

        @media (max-width: 1200px) { .stats-row { grid-template-columns: repeat(2, 1fr); } .main-grid { grid-template-columns: 1fr; } .schedule-card { grid-row: auto; } }
        @media (max-width: 768px) { .welcome-banner { flex-direction: column; text-align: center; gap: 1rem; } .stats-row { grid-template-columns: 1fr; } .quick-actions-grid { grid-template-columns: repeat(2, 1fr); } }
      `}</style>
    </div>
  );
}
