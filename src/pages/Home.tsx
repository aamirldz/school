/**
 * NVRSS ERP - Home Portal Page
 * Professional portal with blue theme and separate login cards
 */

import { Link } from 'react-router-dom';

export default function Home() {
  const portals = [
    {
      id: 'student',
      title: 'Student / Parent Login',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M22 10v6M2 10l10-5 10 5-10 5z"></path>
          <path d="M6 12v5c3 3 9 3 12 0v-5"></path>
        </svg>
      ),
      description: 'Access your academic portal to view attendance, results, timetable, fee details and more.',
      link: '/login/student',
    },
    {
      id: 'teacher',
      title: 'Teacher Login',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
          <line x1="8" y1="21" x2="16" y2="21"></line>
          <line x1="12" y1="17" x2="12" y2="21"></line>
        </svg>
      ),
      description: 'Manage your classes, mark attendance, enter grades and view your teaching schedule.',
      link: '/login/teacher',
    },
    {
      id: 'staff',
      title: 'Staff Login',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
          <circle cx="9" cy="7" r="4"></circle>
          <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
          <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
        </svg>
      ),
      description: 'Access staff services, manage records, and view administrative functions.',
      link: '/login/staff',
    },
    {
      id: 'admission',
      title: 'Admission Login',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
          <polyline points="14 2 14 8 20 8"></polyline>
          <line x1="12" y1="18" x2="12" y2="12"></line>
          <line x1="9" y1="15" x2="15" y2="15"></line>
        </svg>
      ),
      description: 'Process admission applications, review documents and manage student enrollments.',
      link: '/login/admission',
    },
  ];

  return (
    <div className="home-page">
      {/* Header */}
      <header className="home-header">
        <div className="header-content">
          <div className="logo-section">
            <div className="logo">
              <span>NV</span>
            </div>
            <div className="logo-text">
              <h1>NVRSS</h1>
              <p>New Vision Residential Secondary School</p>
            </div>
          </div>
          <nav className="header-nav">
            <Link to="/admission" className="nav-link">New Admission</Link>
            <a href="#contact" className="nav-link">Contact Us</a>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h2>School Management System</h2>
          <p>Complete digital platform for students, teachers, and staff</p>
        </div>
      </section>

      {/* Portal Cards */}
      <main className="portal-section">
        <div className="portal-grid">
          {portals.map((portal) => (
            <div key={portal.id} className="portal-card">
              <div className="portal-icon">{portal.icon}</div>
              <h3 className="portal-title">{portal.title}</h3>
              <p className="portal-description">{portal.description}</p>
              <Link to={portal.link} className="portal-btn">
                Login Now
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </Link>
            </div>
          ))}
        </div>
      </main>

      {/* Features Section */}
      <section className="features-section">
        <h3>Why Choose Our System?</h3>
        <div className="features-grid">
          <div className="feature">
            <div className="feature-icon">📊</div>
            <h4>Real-time Analytics</h4>
            <p>Track attendance, grades and performance in real-time</p>
          </div>
          <div className="feature">
            <div className="feature-icon">🔒</div>
            <h4>Secure Access</h4>
            <p>Role-based access with secure authentication</p>
          </div>
          <div className="feature">
            <div className="feature-icon">📱</div>
            <h4>Mobile Friendly</h4>
            <p>Access from any device, anywhere, anytime</p>
          </div>
          <div className="feature">
            <div className="feature-icon">⚡</div>
            <h4>Fast & Reliable</h4>
            <p>Lightning-fast performance with 99.9% uptime</p>
          </div>
        </div>
      </section>

      {/* Quick Links */}
      <section className="quick-section">
        <Link to="/admission" className="quick-link primary">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="8" x2="12" y2="16"></line>
            <line x1="8" y1="12" x2="16" y2="12"></line>
          </svg>
          Apply for New Admission
        </Link>
      </section>

      {/* Footer */}
      <footer className="home-footer">
        <div className="footer-content">
          <div className="footer-info">
            <div className="footer-logo">
              <div className="logo small"><span>NV</span></div>
              <span>NVRSS</span>
            </div>
            <p>New Vision Residential Secondary School</p>
            <p className="address">123 Education Street, Knowledge City</p>
          </div>
          <div className="footer-links">
            <a href="#about">About Us</a>
            <a href="#contact">Contact</a>
            <a href="#privacy">Privacy Policy</a>
            <a href="#terms">Terms of Service</a>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2025 NVRSS. All Rights Reserved.</p>
        </div>
      </footer>

      <style>{`
        * { box-sizing: border-box; }

        .home-page {
          min-height: 100vh;
          background: #f8fafc;
          display: flex;
          flex-direction: column;
        }

        .home-header {
          background: white;
          border-bottom: 1px solid #e2e8f0;
          position: sticky;
          top: 0;
          z-index: 100;
        }

        .header-content {
          max-width: 1400px;
          margin: 0 auto;
          padding: 1rem 2rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .logo-section {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .logo {
          width: 56px;
          height: 56px;
          background: linear-gradient(135deg, #1e40af 0%, #3b82f6 100%);
          border-radius: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 12px rgba(30, 64, 175, 0.3);
        }

        .logo span {
          font-size: 1.5rem;
          font-weight: 800;
          color: white;
        }

        .logo.small {
          width: 36px;
          height: 36px;
          border-radius: 8px;
        }

        .logo.small span {
          font-size: 1rem;
        }

        .logo-text h1 {
          font-size: 1.5rem;
          font-weight: 700;
          color: #1e40af;
          margin: 0;
        }

        .logo-text p {
          font-size: 0.75rem;
          color: #64748b;
          margin: 0;
        }

        .header-nav {
          display: flex;
          gap: 1.5rem;
        }

        .nav-link {
          color: #64748b;
          text-decoration: none;
          font-size: 0.9rem;
          font-weight: 500;
          transition: color 0.2s;
        }

        .nav-link:hover {
          color: #1e40af;
        }

        .hero-section {
          background: linear-gradient(135deg, #1e40af 0%, #3b82f6 50%, #60a5fa 100%);
          color: white;
          padding: 4rem 2rem;
          text-align: center;
        }

        .hero-content h2 {
          font-size: 2.5rem;
          font-weight: 700;
          margin-bottom: 0.5rem;
        }

        .hero-content p {
          font-size: 1.125rem;
          opacity: 0.9;
        }

        .portal-section {
          max-width: 1400px;
          margin: -3rem auto 0;
          padding: 0 2rem 3rem;
          position: relative;
          z-index: 10;
        }

        .portal-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1.5rem;
        }

        .portal-card {
          background: white;
          border-radius: 16px;
          padding: 2rem;
          text-align: center;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
          transition: all 0.3s ease;
          border: 1px solid #e2e8f0;
        }

        .portal-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 12px 40px rgba(30, 64, 175, 0.2);
          border-color: #3b82f6;
        }

        .portal-icon {
          width: 72px;
          height: 72px;
          margin: 0 auto 1.5rem;
          background: linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%);
          border-radius: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 1rem;
        }

        .portal-icon svg {
          width: 100%;
          height: 100%;
          color: #1e40af;
        }

        .portal-title {
          font-size: 1.125rem;
          font-weight: 600;
          color: #1e293b;
          margin-bottom: 0.75rem;
        }

        .portal-description {
          font-size: 0.875rem;
          color: #64748b;
          line-height: 1.6;
          margin-bottom: 1.5rem;
          min-height: 60px;
        }

        .portal-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          background: linear-gradient(135deg, #1e40af 0%, #3b82f6 100%);
          color: white;
          padding: 0.75rem 1.5rem;
          border-radius: 10px;
          text-decoration: none;
          font-weight: 600;
          font-size: 0.9rem;
          transition: all 0.2s;
        }

        .portal-btn:hover {
          transform: translateX(4px);
          box-shadow: 0 4px 12px rgba(30, 64, 175, 0.3);
        }

        .features-section {
          max-width: 1400px;
          margin: 0 auto;
          padding: 3rem 2rem;
          text-align: center;
        }

        .features-section h3 {
          font-size: 1.5rem;
          color: #1e293b;
          margin-bottom: 2rem;
        }

        .features-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1.5rem;
        }

        .feature {
          padding: 1.5rem;
          background: white;
          border-radius: 12px;
          border: 1px solid #e2e8f0;
        }

        .feature-icon {
          font-size: 2rem;
          margin-bottom: 0.75rem;
        }

        .feature h4 {
          font-size: 1rem;
          color: #1e293b;
          margin-bottom: 0.5rem;
        }

        .feature p {
          font-size: 0.875rem;
          color: #64748b;
        }

        .quick-section {
          text-align: center;
          padding: 2rem;
        }

        .quick-link {
          display: inline-flex;
          align-items: center;
          gap: 0.75rem;
          padding: 1rem 2rem;
          border-radius: 12px;
          text-decoration: none;
          font-weight: 600;
          transition: all 0.2s;
        }

        .quick-link.primary {
          background: linear-gradient(135deg, #1e40af 0%, #3b82f6 100%);
          color: white;
          box-shadow: 0 4px 12px rgba(30, 64, 175, 0.3);
        }

        .quick-link.primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(30, 64, 175, 0.4);
        }

        .home-footer {
          margin-top: auto;
          background: #1e293b;
          color: white;
        }

        .footer-content {
          max-width: 1400px;
          margin: 0 auto;
          padding: 2rem;
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
        }

        .footer-logo {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          margin-bottom: 0.5rem;
        }

        .footer-logo span {
          font-size: 1.25rem;
          font-weight: 700;
        }

        .footer-info p {
          color: #94a3b8;
          font-size: 0.875rem;
          margin: 0.25rem 0;
        }

        .footer-info .address {
          font-size: 0.75rem;
        }

        .footer-links {
          display: flex;
          gap: 2rem;
        }

        .footer-links a {
          color: #94a3b8;
          text-decoration: none;
          font-size: 0.875rem;
          transition: color 0.2s;
        }

        .footer-links a:hover {
          color: white;
        }

        .footer-bottom {
          border-top: 1px solid #334155;
          padding: 1rem 2rem;
          text-align: center;
        }

        .footer-bottom p {
          color: #64748b;
          font-size: 0.75rem;
          margin: 0;
        }

        @media (max-width: 1200px) {
          .portal-grid, .features-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 768px) {
          .header-content {
            flex-direction: column;
            gap: 1rem;
          }

          .hero-content h2 {
            font-size: 1.75rem;
          }

          .portal-grid, .features-grid {
            grid-template-columns: 1fr;
          }

          .portal-section {
            margin-top: -2rem;
          }

          .footer-content {
            flex-direction: column;
            gap: 1.5rem;
          }

          .footer-links {
            flex-wrap: wrap;
            gap: 1rem;
          }
        }
      `}</style>
    </div>
  );
}
