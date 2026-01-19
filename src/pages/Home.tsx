/**
 * NVRSS ERP - Home Portal Page
 * CUIMS-style portal with separate login cards for different user types
 */

import { Link } from 'react-router-dom';

export default function Home() {
    const portals = [
        {
            id: 'student',
            title: 'Student/Parent Login',
            icon: (
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M22 10v6M2 10l10-5 10 5-10 5z"></path>
                    <path d="M6 12v5c3 3 9 3 12 0v-5"></path>
                </svg>
            ),
            description: 'Login with your UID and Password to access your Student Services and Account. Track your progress and stay updated.',
            link: '/login/student',
            color: 'primary',
        },
        {
            id: 'teacher',
            title: 'Teacher Login',
            icon: (
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
                    <line x1="8" y1="21" x2="16" y2="21"></line>
                    <line x1="12" y1="17" x2="12" y2="21"></line>
                </svg>
            ),
            description: 'Login using your Teacher ID and Password to access class management, attendance, grades, and other academic services.',
            link: '/login/teacher',
            color: 'success',
        },
        {
            id: 'staff',
            title: 'Staff Login',
            icon: (
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                    <circle cx="9" cy="7" r="4"></circle>
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                    <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                </svg>
            ),
            description: 'Login using your Employee Code and Password to access your account, track progress and other official services.',
            link: '/login/staff',
            color: 'info',
        },
        {
            id: 'admission',
            title: 'Admission Login',
            icon: (
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                    <polyline points="14 2 14 8 20 8"></polyline>
                    <line x1="16" y1="13" x2="8" y2="13"></line>
                    <line x1="16" y1="17" x2="8" y2="17"></line>
                    <polyline points="10 9 9 9 8 9"></polyline>
                </svg>
            ),
            description: 'For Admission Staff only. Use your Employee Code and Password to log in for admission related services.',
            link: '/login/admission',
            color: 'warning',
        },
    ];

    return (
        <div className="home-page">
            {/* Header */}
            <header className="home-header">
                <div className="home-logo">
                    <div className="logo-circle">
                        <span>NV</span>
                    </div>
                    <div className="logo-text">
                        <span className="logo-name">NVRSS</span>
                        <span className="logo-tagline">New Vision Residential Secondary School</span>
                        <span className="logo-system">School Management System</span>
                    </div>
                </div>
            </header>

            {/* Portal Cards */}
            <main className="home-main">
                <div className="portal-grid">
                    {portals.map((portal) => (
                        <div key={portal.id} className={`portal-card portal-${portal.color}`}>
                            <div className="portal-icon">{portal.icon}</div>
                            <h2 className="portal-title">{portal.title}</h2>
                            <p className="portal-description">{portal.description}</p>
                            <Link to={portal.link} className={`portal-btn btn-${portal.color}`}>
                                Login Now
                            </Link>
                        </div>
                    ))}
                </div>

                {/* Quick Links */}
                <div className="quick-links">
                    <Link to="/admission" className="quick-link">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <circle cx="12" cy="12" r="10"></circle>
                            <line x1="12" y1="8" x2="12" y2="16"></line>
                            <line x1="8" y1="12" x2="16" y2="12"></line>
                        </svg>
                        New Admission Application
                    </Link>
                    <a href="#contact" className="quick-link">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                        </svg>
                        Contact Support
                    </a>
                </div>
            </main>

            {/* Footer */}
            <footer className="home-footer">
                <div className="footer-info">
                    <p>&copy; 2025 New Vision Residential Secondary School. All Rights Reserved.</p>
                </div>
            </footer>

            {/* Styles */}
            <style>{`
        .home-page {
          min-height: 100vh;
          background: linear-gradient(180deg, #b91c1c 0%, #dc2626 50%, #991b1b 100%);
          display: flex;
          flex-direction: column;
        }

        .home-header {
          padding: var(--spacing-8) var(--spacing-4);
          display: flex;
          justify-content: center;
        }

        .home-logo {
          display: flex;
          align-items: center;
          gap: var(--spacing-4);
        }

        .logo-circle {
          width: 80px;
          height: 80px;
          background: white;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 4px solid #dc2626;
        }

        .logo-circle span {
          font-size: 2rem;
          font-weight: 800;
          color: #dc2626;
        }

        .logo-text {
          display: flex;
          flex-direction: column;
          color: white;
        }

        .logo-name {
          font-size: 2.5rem;
          font-weight: 800;
          letter-spacing: -0.02em;
        }

        .logo-tagline {
          font-size: 0.875rem;
          opacity: 0.9;
        }

        .logo-system {
          font-size: 0.75rem;
          opacity: 0.7;
          text-transform: uppercase;
          letter-spacing: 0.1em;
        }

        .home-main {
          flex: 1;
          padding: var(--spacing-4);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: var(--spacing-8);
        }

        .portal-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: var(--spacing-6);
          max-width: 1200px;
          width: 100%;
        }

        .portal-card {
          background: white;
          border-radius: var(--radius-xl);
          padding: var(--spacing-6);
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .portal-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 20px 50px rgba(0, 0, 0, 0.3);
        }

        .portal-icon {
          width: 80px;
          height: 80px;
          border-radius: var(--radius-lg);
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: var(--spacing-4);
          background: var(--color-neutral-100);
          color: var(--text-primary);
        }

        .portal-primary .portal-icon { background: #fee2e2; color: #dc2626; }
        .portal-success .portal-icon { background: #dcfce7; color: #16a34a; }
        .portal-info .portal-icon { background: #dbeafe; color: #2563eb; }
        .portal-warning .portal-icon { background: #fef3c7; color: #d97706; }

        .portal-title {
          font-size: 1.125rem;
          font-weight: 700;
          margin-bottom: var(--spacing-3);
          color: var(--text-primary);
        }

        .portal-description {
          font-size: 0.875rem;
          color: var(--text-secondary);
          line-height: 1.6;
          margin-bottom: var(--spacing-5);
          flex: 1;
        }

        .portal-btn {
          display: inline-block;
          padding: var(--spacing-3) var(--spacing-6);
          border-radius: var(--radius-md);
          font-weight: 600;
          font-size: 0.875rem;
          text-decoration: none;
          transition: all 0.2s ease;
        }

        .btn-primary { background: #dc2626; color: white; }
        .btn-primary:hover { background: #b91c1c; }
        .btn-success { background: #16a34a; color: white; }
        .btn-success:hover { background: #15803d; }
        .btn-info { background: #2563eb; color: white; }
        .btn-info:hover { background: #1d4ed8; }
        .btn-warning { background: #d97706; color: white; }
        .btn-warning:hover { background: #b45309; }

        .quick-links {
          display: flex;
          gap: var(--spacing-4);
        }

        .quick-link {
          display: flex;
          align-items: center;
          gap: var(--spacing-2);
          padding: var(--spacing-3) var(--spacing-5);
          background: rgba(255, 255, 255, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: var(--radius-full);
          color: white;
          font-size: 0.875rem;
          font-weight: 500;
          text-decoration: none;
          transition: all 0.2s ease;
        }

        .quick-link:hover {
          background: rgba(255, 255, 255, 0.2);
          transform: translateY(-2px);
        }

        .home-footer {
          padding: var(--spacing-4);
          text-align: center;
          color: rgba(255, 255, 255, 0.7);
          font-size: 0.75rem;
        }

        @media (max-width: 1024px) {
          .portal-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 640px) {
          .portal-grid {
            grid-template-columns: 1fr;
          }

          .home-logo {
            flex-direction: column;
            text-align: center;
          }

          .logo-text {
            align-items: center;
          }

          .quick-links {
            flex-direction: column;
            width: 100%;
            max-width: 300px;
          }
        }
      `}</style>
        </div>
    );
}
