/**
 * NVRSS ERP - Professional Staff Dashboard
 * Complete staff portal for administrative functions
 */

import React, { useState } from 'react';
import { Link, Routes, Route, NavLink, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

// Import child pages
import StaffProfile from './Profile';
import StaffAttendance from './Attendance';
import StaffLeave from './Leave';
import StaffStudentRecords from './StudentRecords';
import StaffFeeCollection from './FeeCollection';
import StaffInventory from './Inventory';
import StaffVisitors from './Visitors';

export default function StaffDashboard() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const [sidebarOpen, setSidebarOpen] = useState(true);

    const handleLogout = async () => {
        await logout();
        navigate('/', { replace: true });
    };

    const navItems = [
        { path: '/staff/dashboard', icon: 'dashboard', label: 'Dashboard' },
        { path: '/staff/profile', icon: 'profile', label: 'My Profile' },
        { path: '/staff/attendance', icon: 'attendance', label: 'My Attendance' },
        { path: '/staff/leave', icon: 'leave', label: 'Leave Management' },
        { path: '/staff/students', icon: 'students', label: 'Student Records' },
        { path: '/staff/fees', icon: 'fees', label: 'Fee Collection' },
        { path: '/staff/inventory', icon: 'inventory', label: 'Inventory' },
        { path: '/staff/visitors', icon: 'visitors', label: 'Visitor Log' },
        { path: '/staff/tasks', icon: 'tasks', label: 'My Tasks' },
        { path: '/staff/notices', icon: 'notices', label: 'Notice Board' },
    ];

    const getIcon = (type: string): React.ReactNode => {
        const icons: Record<string, React.ReactNode> = {
            dashboard: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="9"></rect><rect x="14" y="3" width="7" height="5"></rect><rect x="14" y="12" width="7" height="9"></rect><rect x="3" y="16" width="7" height="5"></rect></svg>,
            profile: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>,
            attendance: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><path d="M9 16l2 2 4-4"></path></svg>,
            leave: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>,
            students: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>,
            fees: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="1" x2="12" y2="23"></line><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>,
            inventory: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg>,
            visitors: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>,
            tasks: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 11l3 3L22 4"></path><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path></svg>,
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
                            <span className="brand-portal">Staff Portal</span>
                        </div>
                    )}
                </div>

                <nav className="sidebar-nav">
                    {navItems.map((item) => (
                        <NavLink
                            key={item.path}
                            to={item.path}
                            end={item.path === '/staff/dashboard'}
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
                            <span className="breadcrumb-home">Staff</span>
                            <span className="breadcrumb-sep">/</span>
                            <span className="breadcrumb-current">{navItems.find(n => location.pathname.startsWith(n.path))?.label || 'Dashboard'}</span>
                        </div>
                    </div>

                    <div className="header-right">
                        <button className="header-btn">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
                            </svg>
                            <span className="notification-badge">4</span>
                        </button>
                        <div className="user-menu">
                            <div className="user-avatar">{user?.firstName?.charAt(0)}{user?.lastName?.charAt(0)}</div>
                            <div className="user-info">
                                <span className="user-name">{user?.firstName} {user?.lastName}</span>
                                <span className="user-role">Staff • {user?.uid}</span>
                            </div>
                        </div>
                    </div>
                </header>

                <div className="page-content">
                    <Routes>
                        <Route index element={<StaffDashboardHome user={user} />} />
                        <Route path="dashboard" element={<StaffDashboardHome user={user} />} />
                        <Route path="profile" element={<StaffProfile />} />
                        <Route path="attendance" element={<StaffAttendance />} />
                        <Route path="leave" element={<StaffLeave />} />
                        <Route path="students" element={<StaffStudentRecords />} />
                        <Route path="fees" element={<StaffFeeCollection />} />
                        <Route path="inventory" element={<StaffInventory />} />
                        <Route path="visitors" element={<StaffVisitors />} />
                        <Route path="*" element={<div style={{ padding: '2rem', textAlign: 'center' }}><h2>🚧 Coming Soon</h2><p>This feature is under development.</p></div>} />
                    </Routes>
                </div>
            </main>

            <style>{`
        .dashboard-layout { display: flex; min-height: 100vh; background: #f1f5f9; }
        .sidebar { width: 280px; background: linear-gradient(180deg, #059669 0%, #047857 100%); display: flex; flex-direction: column; transition: width 0.3s ease; position: fixed; height: 100vh; z-index: 100; }
        .sidebar.collapsed { width: 80px; }
        .sidebar-header { padding: 1.5rem 1rem; display: flex; align-items: center; gap: 0.75rem; border-bottom: 1px solid rgba(255,255,255,0.1); }
        .sidebar-logo { width: 48px; height: 48px; background: white; border-radius: 12px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
        .sidebar-logo span { font-size: 1.25rem; font-weight: 800; color: #059669; }
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
        .breadcrumb-current { color: #059669; font-weight: 500; }
        .header-right { display: flex; align-items: center; gap: 1rem; }
        .header-btn { padding: 0.5rem; border: none; background: #f1f5f9; border-radius: 10px; cursor: pointer; color: #64748b; position: relative; }
        .notification-badge { position: absolute; top: -4px; right: -4px; width: 18px; height: 18px; background: #ef4444; border-radius: 50%; font-size: 0.7rem; color: white; display: flex; align-items: center; justify-content: center; font-weight: 600; }
        .user-menu { display: flex; align-items: center; gap: 0.75rem; padding: 0.5rem 1rem; background: #f8fafc; border-radius: 12px; }
        .user-avatar { width: 40px; height: 40px; background: linear-gradient(135deg, #059669 0%, #10b981 100%); border-radius: 10px; display: flex; align-items: center; justify-content: center; color: white; font-weight: 600; font-size: 0.875rem; }
        .user-info { display: flex; flex-direction: column; }
        .user-name { font-weight: 500; font-size: 0.875rem; color: #1e293b; }
        .user-role { font-size: 0.75rem; color: #64748b; }
        .page-content { flex: 1; padding: 1.5rem; overflow-y: auto; }
      `}</style>
        </div>
    );
}

// Staff Dashboard Home
function StaffDashboardHome({ user }: { user: any }) {
    const currentTime = new Date();
    const greeting = currentTime.getHours() < 12 ? 'Good Morning' : currentTime.getHours() < 18 ? 'Good Afternoon' : 'Good Evening';

    // Mock data
    const todayStats = {
        pendingTasks: 8,
        completedTasks: 12,
        visitorsToday: 15,
        feesCollected: 125000,
    };

    const recentTasks = [
        { id: 1, title: 'Update student records - Grade 10', priority: 'high', due: 'Today', status: 'pending' },
        { id: 2, title: 'Process fee collection for new admissions', priority: 'high', due: 'Today', status: 'in-progress' },
        { id: 3, title: 'Inventory check - Lab equipment', priority: 'medium', due: 'Tomorrow', status: 'pending' },
        { id: 4, title: 'Update visitor log entries', priority: 'low', due: 'Jan 22', status: 'pending' },
    ];

    const recentVisitors = [
        { name: 'Mr. Ramesh Kumar', purpose: 'Parent Meeting', student: 'Class 8-A', time: '10:30 AM', status: 'checked-out' },
        { name: 'Ms. Priya Sharma', purpose: 'Fee Payment', student: 'Class 5-B', time: '11:00 AM', status: 'in-premises' },
        { name: 'Mr. Vendor Supplies', purpose: 'Delivery', student: '-', time: '11:45 AM', status: 'in-premises' },
    ];

    return (
        <div className="staff-home">
            {/* Welcome Banner */}
            <div className="welcome-banner">
                <div className="welcome-content">
                    <h1>{greeting}, {user?.firstName}! 👋</h1>
                    <p>You have {todayStats.pendingTasks} pending tasks for today</p>
                </div>
                <div className="staff-card">
                    <div className="card-label">Staff ID</div>
                    <div className="card-id">{user?.uid}</div>
                    <div className="card-dept">Administrative Staff</div>
                </div>
            </div>

            {/* Quick Stats */}
            <div className="stats-row">
                <div className="stat-card">
                    <div className="stat-icon orange"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 11l3 3L22 4"></path><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path></svg></div>
                    <div className="stat-info"><span className="stat-value">{todayStats.pendingTasks}</span><span className="stat-label">Pending Tasks</span></div>
                </div>
                <div className="stat-card">
                    <div className="stat-icon green"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 11 12 14 22 4"></polyline><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path></svg></div>
                    <div className="stat-info"><span className="stat-value">{todayStats.completedTasks}</span><span className="stat-label">Completed Today</span></div>
                </div>
                <div className="stat-card">
                    <div className="stat-icon blue"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg></div>
                    <div className="stat-info"><span className="stat-value">{todayStats.visitorsToday}</span><span className="stat-label">Visitors Today</span></div>
                </div>
                <div className="stat-card">
                    <div className="stat-icon purple"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="1" x2="12" y2="23"></line><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg></div>
                    <div className="stat-info"><span className="stat-value">₹{(todayStats.feesCollected / 1000).toFixed(0)}K</span><span className="stat-label">Fees Collected</span></div>
                </div>
            </div>

            <div className="main-grid">
                {/* Quick Actions */}
                <div className="dashboard-card">
                    <div className="card-header"><h3>Quick Actions</h3></div>
                    <div className="quick-actions-grid">
                        <Link to="/staff/students" className="quick-action"><div className="action-icon">📋</div><span>Student Records</span></Link>
                        <Link to="/staff/fees" className="quick-action"><div className="action-icon">💰</div><span>Collect Fee</span></Link>
                        <Link to="/staff/visitors" className="quick-action"><div className="action-icon">👥</div><span>Register Visitor</span></Link>
                        <Link to="/staff/inventory" className="quick-action"><div className="action-icon">📦</div><span>Inventory</span></Link>
                        <Link to="/staff/attendance" className="quick-action"><div className="action-icon">✅</div><span>My Attendance</span></Link>
                        <Link to="/staff/leave" className="quick-action"><div className="action-icon">📅</div><span>Apply Leave</span></Link>
                    </div>
                </div>

                {/* My Tasks */}
                <div className="dashboard-card">
                    <div className="card-header"><h3>My Tasks</h3><Link to="/staff/tasks" className="view-all">View All →</Link></div>
                    <div className="tasks-list">
                        {recentTasks.map(task => (
                            <div key={task.id} className={`task-item ${task.status}`}>
                                <div className="task-checkbox">{task.status === 'in-progress' ? '🔄' : '○'}</div>
                                <div className="task-info">
                                    <span className="task-title">{task.title}</span>
                                    <span className="task-meta">Due: {task.due}</span>
                                </div>
                                <span className={`priority-badge ${task.priority}`}>{task.priority}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Recent Visitors */}
                <div className="dashboard-card">
                    <div className="card-header"><h3>Recent Visitors</h3><Link to="/staff/visitors" className="view-all">View All →</Link></div>
                    <div className="visitors-list">
                        {recentVisitors.map((visitor, i) => (
                            <div key={i} className="visitor-item">
                                <div className="visitor-avatar">{visitor.name.charAt(0)}</div>
                                <div className="visitor-info">
                                    <span className="visitor-name">{visitor.name}</span>
                                    <span className="visitor-meta">{visitor.purpose} • {visitor.time}</span>
                                </div>
                                <span className={`visitor-status ${visitor.status}`}>{visitor.status.replace('-', ' ')}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Announcements */}
                <div className="dashboard-card">
                    <div className="card-header"><h3>Announcements</h3></div>
                    <div className="announcements-list">
                        {[
                            { title: 'Staff Meeting Tomorrow', desc: 'All staff to attend the monthly review meeting at 4 PM', type: 'important' },
                            { title: 'Holiday Notice', desc: 'School will remain closed on 26th January for Republic Day', type: 'info' },
                            { title: 'New Admission Drive', desc: 'Admission counters to be set up from Feb 1st', type: 'info' },
                        ].map((item, i) => (
                            <div key={i} className={`announcement-item ${item.type}`}>
                                <div className="announcement-icon">{item.type === 'important' ? '🔔' : '📢'}</div>
                                <div className="announcement-content">
                                    <span className="announcement-title">{item.title}</span>
                                    <span className="announcement-desc">{item.desc}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <style>{`
        .staff-home { max-width: 1400px; }
        .welcome-banner { background: linear-gradient(135deg, #059669 0%, #10b981 100%); border-radius: 16px; padding: 2rem; display: flex; justify-content: space-between; align-items: center; color: white; margin-bottom: 1.5rem; }
        .welcome-content h1 { font-size: 1.5rem; margin-bottom: 0.5rem; }
        .welcome-content p { opacity: 0.9; }
        .staff-card { background: rgba(255,255,255,0.15); backdrop-filter: blur(10px); padding: 1rem 2rem; border-radius: 12px; text-align: center; }
        .card-label { font-size: 0.75rem; opacity: 0.8; }
        .card-id { font-size: 1.5rem; font-weight: 700; font-family: monospace; }
        .card-dept { font-size: 0.875rem; opacity: 0.9; margin-top: 0.25rem; }

        .stats-row { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1rem; margin-bottom: 1.5rem; }
        .stat-card { background: white; border-radius: 12px; padding: 1.25rem; display: flex; align-items: center; gap: 1rem; box-shadow: 0 1px 3px rgba(0,0,0,0.1); }
        .stat-icon { width: 48px; height: 48px; border-radius: 12px; display: flex; align-items: center; justify-content: center; }
        .stat-icon.orange { background: #fef3c7; color: #d97706; }
        .stat-icon.green { background: #dcfce7; color: #16a34a; }
        .stat-icon.blue { background: #dbeafe; color: #2563eb; }
        .stat-icon.purple { background: #ede9fe; color: #7c3aed; }
        .stat-info { flex: 1; }
        .stat-value { display: block; font-size: 1.5rem; font-weight: 700; color: #1e293b; }
        .stat-label { font-size: 0.875rem; color: #64748b; }

        .main-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 1.5rem; }
        .dashboard-card { background: white; border-radius: 12px; padding: 1.25rem; box-shadow: 0 1px 3px rgba(0,0,0,0.1); }
        .card-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem; padding-bottom: 0.75rem; border-bottom: 1px solid #e2e8f0; }
        .card-header h3 { font-size: 1rem; font-weight: 600; color: #1e293b; }
        .view-all { font-size: 0.875rem; color: #059669; text-decoration: none; }

        .quick-actions-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 0.75rem; }
        .quick-action { display: flex; flex-direction: column; align-items: center; gap: 0.5rem; padding: 1rem; background: #f8fafc; border-radius: 10px; text-decoration: none; color: #1e293b; transition: all 0.2s; }
        .quick-action:hover { background: #ecfdf5; transform: translateY(-2px); }
        .action-icon { font-size: 1.5rem; }
        .quick-action span { font-size: 0.8rem; text-align: center; }

        .tasks-list { display: flex; flex-direction: column; gap: 0.5rem; }
        .task-item { display: flex; align-items: center; gap: 0.75rem; padding: 0.75rem; background: #f8fafc; border-radius: 8px; }
        .task-item.in-progress { background: #ecfdf5; border-left: 3px solid #10b981; }
        .task-checkbox { width: 24px; height: 24px; display: flex; align-items: center; justify-content: center; font-size: 1rem; color: #64748b; }
        .task-info { flex: 1; }
        .task-title { display: block; font-size: 0.9rem; font-weight: 500; }
        .task-meta { font-size: 0.75rem; color: #64748b; }
        .priority-badge { padding: 0.25rem 0.5rem; border-radius: 4px; font-size: 0.7rem; font-weight: 500; text-transform: uppercase; }
        .priority-badge.high { background: #fee2e2; color: #dc2626; }
        .priority-badge.medium { background: #fef3c7; color: #d97706; }
        .priority-badge.low { background: #dbeafe; color: #2563eb; }

        .visitors-list { display: flex; flex-direction: column; gap: 0.5rem; }
        .visitor-item { display: flex; align-items: center; gap: 0.75rem; padding: 0.75rem; background: #f8fafc; border-radius: 8px; }
        .visitor-avatar { width: 36px; height: 36px; background: linear-gradient(135deg, #059669 0%, #10b981 100%); color: white; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 600; font-size: 0.875rem; }
        .visitor-info { flex: 1; }
        .visitor-name { display: block; font-weight: 500; font-size: 0.9rem; }
        .visitor-meta { font-size: 0.75rem; color: #64748b; }
        .visitor-status { padding: 0.25rem 0.5rem; border-radius: 4px; font-size: 0.7rem; font-weight: 500; text-transform: capitalize; }
        .visitor-status.in-premises { background: #dcfce7; color: #16a34a; }
        .visitor-status.checked-out { background: #f1f5f9; color: #64748b; }

        .announcements-list { display: flex; flex-direction: column; gap: 0.75rem; }
        .announcement-item { display: flex; gap: 0.75rem; padding: 0.75rem; background: #f8fafc; border-radius: 8px; }
        .announcement-item.important { background: #fef2f2; border-left: 3px solid #ef4444; }
        .announcement-icon { font-size: 1.25rem; }
        .announcement-content { flex: 1; }
        .announcement-title { display: block; font-weight: 500; font-size: 0.9rem; margin-bottom: 0.25rem; }
        .announcement-desc { font-size: 0.8rem; color: #64748b; }

        @media (max-width: 1200px) { .stats-row { grid-template-columns: repeat(2, 1fr); } .main-grid { grid-template-columns: 1fr; } }
        @media (max-width: 768px) { .welcome-banner { flex-direction: column; text-align: center; gap: 1rem; } .stats-row { grid-template-columns: 1fr; } .quick-actions-grid { grid-template-columns: repeat(2, 1fr); } }
      `}</style>
        </div>
    );
}
