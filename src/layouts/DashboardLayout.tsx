/**
 * NVRSS ERP - Dashboard Layout
 * Main layout with sidebar, header, and content area
 */

import React, { useState } from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

// Icons as simple SVG components
const Icons = {
    Dashboard: () => (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="3" y="3" width="7" height="7"></rect>
            <rect x="14" y="3" width="7" height="7"></rect>
            <rect x="14" y="14" width="7" height="7"></rect>
            <rect x="3" y="14" width="7" height="7"></rect>
        </svg>
    ),
    Users: () => (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
            <circle cx="9" cy="7" r="4"></circle>
            <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
            <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
        </svg>
    ),
    Admissions: () => (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
            <polyline points="14 2 14 8 20 8"></polyline>
            <line x1="16" y1="13" x2="8" y2="13"></line>
            <line x1="16" y1="17" x2="8" y2="17"></line>
            <polyline points="10 9 9 9 8 9"></polyline>
        </svg>
    ),
    Students: () => (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M22 10v6M2 10l10-5 10 5-10 5z"></path>
            <path d="M6 12v5c3 3 9 3 12 0v-5"></path>
        </svg>
    ),
    Settings: () => (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="3"></circle>
            <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
        </svg>
    ),
    Menu: () => (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="3" y1="12" x2="21" y2="12"></line>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <line x1="3" y1="18" x2="21" y2="18"></line>
        </svg>
    ),
    Search: () => (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        </svg>
    ),
    Bell: () => (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
            <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
        </svg>
    ),
    LogOut: () => (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
            <polyline points="16 17 21 12 16 7"></polyline>
            <line x1="21" y1="12" x2="9" y2="12"></line>
        </svg>
    ),
    ChevronDown: () => (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="6 9 12 15 18 9"></polyline>
        </svg>
    ),
};

interface NavItem {
    path: string;
    label: string;
    icon: React.FC;
    roles?: string[];
}

const navItems: NavItem[] = [
    { path: '/admin/dashboard', label: 'Dashboard', icon: Icons.Dashboard, roles: ['admin', 'admission_staff'] },
    { path: '/admin/admissions', label: 'Admissions', icon: Icons.Admissions, roles: ['admin', 'admission_staff'] },
    { path: '/admin/students', label: 'Students', icon: Icons.Students, roles: ['admin'] },
    { path: '/admin/users', label: 'Users', icon: Icons.Users, roles: ['admin'] },
];

export default function DashboardLayout() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [userMenuOpen, setUserMenuOpen] = useState(false);

    const handleLogout = async () => {
        await logout();
        navigate('/login', { replace: true });
    };

    const filteredNavItems = navItems.filter(
        (item) => !item.roles || item.roles.includes(user?.role || '')
    );

    const userInitials = user
        ? `${user.firstName.charAt(0)}${user.lastName.charAt(0)}`.toUpperCase()
        : 'U';

    const roleLabels: Record<string, string> = {
        admin: 'Administrator',
        admission_staff: 'Admission Staff',
        teacher: 'Teacher',
        staff: 'Staff',
        student: 'Student',
    };

    return (
        <div className="dashboard-layout">
            {/* Sidebar */}
            <aside className={`sidebar ${sidebarOpen ? '' : 'collapsed'}`}>
                <div className="sidebar-header">
                    <div className="sidebar-logo">NV</div>
                    {sidebarOpen && (
                        <div className="sidebar-brand">
                            <span className="sidebar-brand-name">NVRSS ERP</span>
                        </div>
                    )}
                </div>

                <nav className="sidebar-nav">
                    <div className="nav-section">
                        {sidebarOpen && <div className="nav-section-title">Main Menu</div>}
                        {filteredNavItems.map((item) => (
                            <NavLink
                                key={item.path}
                                to={item.path}
                                className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
                            >
                                <span className="nav-item-icon"><item.icon /></span>
                                {sidebarOpen && <span className="nav-item-text">{item.label}</span>}
                            </NavLink>
                        ))}
                    </div>
                </nav>

                <div className="sidebar-footer">
                    {sidebarOpen && (
                        <div className="sidebar-user-info">
                            <div className="text-sm font-medium" style={{ color: 'var(--color-neutral-200)' }}>
                                {user?.firstName} {user?.lastName}
                            </div>
                            <div className="text-xs" style={{ color: 'var(--color-neutral-400)' }}>
                                {user?.uid}
                            </div>
                        </div>
                    )}
                </div>
            </aside>

            {/* Main Content Area */}
            <main className="dashboard-main">
                {/* Header */}
                <header className="header">
                    <div className="header-left">
                        <button
                            className="btn btn-ghost btn-icon"
                            onClick={() => setSidebarOpen(!sidebarOpen)}
                            aria-label="Toggle sidebar"
                        >
                            <Icons.Menu />
                        </button>

                        <div className="header-search">
                            <span className="header-search-icon"><Icons.Search /></span>
                            <input
                                type="text"
                                className="header-search-input"
                                placeholder="Search..."
                            />
                        </div>
                    </div>

                    <div className="header-right">
                        <button className="btn btn-ghost btn-icon" aria-label="Notifications">
                            <Icons.Bell />
                        </button>

                        <div className="user-menu-container">
                            <div
                                className="user-menu"
                                onClick={() => setUserMenuOpen(!userMenuOpen)}
                            >
                                <div className="user-avatar">{userInitials}</div>
                                <div className="user-info">
                                    <div className="user-name">{user?.firstName} {user?.lastName}</div>
                                    <div className="user-role">{roleLabels[user?.role || ''] || user?.role}</div>
                                </div>
                                <Icons.ChevronDown />
                            </div>

                            {userMenuOpen && (
                                <>
                                    <div className="user-menu-backdrop" onClick={() => setUserMenuOpen(false)} />
                                    <div className="user-menu-dropdown">
                                        <div className="user-menu-header">
                                            <div className="user-avatar user-avatar-lg">{userInitials}</div>
                                            <div>
                                                <div className="user-name">{user?.firstName} {user?.lastName}</div>
                                                <div className="user-role">{user?.uid}</div>
                                            </div>
                                        </div>
                                        <div className="user-menu-divider" />
                                        <NavLink to="/profile" className="user-menu-item" onClick={() => setUserMenuOpen(false)}>
                                            <Icons.Settings />
                                            <span>Settings</span>
                                        </NavLink>
                                        <button className="user-menu-item user-menu-item-danger" onClick={handleLogout}>
                                            <Icons.LogOut />
                                            <span>Sign Out</span>
                                        </button>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </header>

                {/* Page Content */}
                <div className="dashboard-content">
                    <Outlet />
                </div>
            </main>

            {/* Layout styles */}
            <style>{`
        .sidebar.collapsed {
          width: var(--sidebar-collapsed-width);
        }

        .sidebar.collapsed + .dashboard-main {
          margin-left: var(--sidebar-collapsed-width);
        }

        .sidebar.collapsed .sidebar-brand,
        .sidebar.collapsed .nav-section-title,
        .sidebar.collapsed .nav-item-text,
        .sidebar.collapsed .sidebar-user-info {
          display: none;
        }

        .sidebar.collapsed .nav-item {
          justify-content: center;
          padding: var(--spacing-3);
        }

        .user-menu-container {
          position: relative;
        }

        .user-menu-backdrop {
          position: fixed;
          inset: 0;
          z-index: 40;
        }

        .user-menu-dropdown {
          position: absolute;
          top: 100%;
          right: 0;
          margin-top: var(--spacing-2);
          background: var(--bg-card);
          border: 1px solid var(--border-light);
          border-radius: var(--radius-lg);
          box-shadow: var(--shadow-lg);
          min-width: 240px;
          z-index: 50;
          overflow: hidden;
          animation: slideDown 0.15s ease;
        }

        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-8px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .user-menu-header {
          padding: var(--spacing-4);
          display: flex;
          align-items: center;
          gap: var(--spacing-3);
          background: var(--color-neutral-50);
        }

        .user-avatar-lg {
          width: 48px;
          height: 48px;
          font-size: var(--text-lg);
        }

        .user-menu-divider {
          border-top: 1px solid var(--border-light);
        }

        .user-menu-item {
          display: flex;
          align-items: center;
          gap: var(--spacing-3);
          padding: var(--spacing-3) var(--spacing-4);
          width: 100%;
          border: none;
          background: none;
          color: var(--text-primary);
          font-size: var(--text-sm);
          cursor: pointer;
          transition: background var(--transition-fast);
          text-decoration: none;
        }

        .user-menu-item:hover {
          background: var(--color-neutral-50);
        }

        .user-menu-item-danger {
          color: var(--color-error-600);
        }

        .user-menu-item-danger:hover {
          background: var(--color-error-50);
        }

        @media (max-width: 1024px) {
          .sidebar {
            position: fixed;
            z-index: 200;
            transform: translateX(0);
          }

          .sidebar.collapsed {
            transform: translateX(-100%);
          }

          .dashboard-main {
            margin-left: 0 !important;
          }
        }
      `}</style>
        </div>
    );
}
