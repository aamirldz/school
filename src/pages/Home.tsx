/**
 * NVRSS ERP - Home Portal Page
 * Ultra-premium landing page with glassmorphism and modern UI/UX
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
      description: 'Access academic portal for attendance, results, timetable, and fee details.',
      link: '/login/student',
      color: 'blue'
    },
    {
      id: 'teacher',
      title: 'Teacher Login',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
          <path d="M8 21h8"></path>
          <path d="M12 17v4"></path>
        </svg>
      ),
      description: 'Manage classes, attendance, grades, and view teaching schedules.',
      link: '/login/teacher',
      color: 'green'
    },
    {
      id: 'staff',
      title: 'Staff Login',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
          <circle cx="12" cy="7" r="4"></circle>
        </svg>
      ),
      description: 'Access staff services, manage records, and administrative functions.',
      link: '/login/staff',
      color: 'orange'
    },
    {
      id: 'admission',
      title: 'Admission Login',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
          <polyline points="14 2 14 8 20 8"></polyline>
          <path d="M12 18v-6"></path>
          <path d="M9 15h6"></path>
        </svg>
      ),
      description: 'Process admission applications and manage student enrollments.',
      link: '/login/admission',
      color: 'purple'
    },
  ];

  return (
    <div className="home-page">
      {/* Header */}
      <header className="home-header">
        <div className="header-glass">
          <div className="header-content">
            <div className="logo-section">
              <div className="logo"><span>NV</span></div>
              <div className="logo-text">
                <h1>NVRSS</h1>
                <p>New Vision Residential Secondary School</p>
              </div>
            </div>
            <nav className="header-nav">
              <Link to="/admission" className="nav-link highlight">New Admission</Link>
              <a href="#contact" className="nav-link">Contact Us</a>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-background"></div>
        <div className="hero-content">
          <h2 className="animate-fade-in-up">School Management System</h2>
          <p className="animate-fade-in-up delay-1">Complete digital platform for students, teachers, and staff</p>
        </div>
      </section>

      {/* Portal Cards */}
      <main className="portal-section">
        <div className="portal-grid">
          {portals.map((portal, index) => (
            <div key={portal.id} className={`portal-card ${portal.color} animate-fade-in-up delay-${index + 1}`}>
              <div className="card-bg-decoration"></div>
              <div className="portal-icon">{portal.icon}</div>
              <h3 className="portal-title">{portal.title}</h3>
              <p className="portal-description">{portal.description}</p>
              <Link to={portal.link} className="portal-btn">
                <span>Login Now</span>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14"></path>
                  <path d="M12 5l7 7-7 7"></path>
                </svg>
              </Link>
            </div>
          ))}
        </div>
      </main>

      {/* Features Section */}
      <section className="features-section">
        <h3 className="section-title">Why Choose Our System?</h3>
        <div className="features-grid">
          {[
            { icon: '📊', title: 'Real-time Analytics', desc: 'Track attendance, grades and performance in real-time' },
            { icon: '🔒', title: 'Secure Access', desc: 'Role-based access with secure authentication' },
            { icon: '📱', title: 'Mobile Friendly', desc: 'Access from any device, anywhere, anytime' },
            { icon: '⚡', title: 'Fast & Reliable', desc: 'Lightning-fast performance with 99.9% uptime' },
          ].map((feature, i) => (
            <div key={i} className="feature-card">
              <div className="feature-icon">{feature.icon}</div>
              <h4>{feature.title}</h4>
              <p>{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Apply CTA */}
      <section className="cta-section">
        <div className="cta-content">
          <h2>Ready to Join Us?</h2>
          <p>Start your journey with New Vision Residential Secondary School today.</p>
          <Link to="/admission" className="cta-btn">
            Apply for New Admission
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
              <polyline points="22 4 12 14.01 9 11.01"></polyline>
            </svg>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="home-footer">
        <div className="footer-content">
          <div className="footer-brand">
            <div className="footer-logo"><span>NV</span></div>
            <div>
              <h4>NVRSS</h4>
              <p>New Vision Residential Secondary School</p>
            </div>
          </div>
          <div className="footer-info">
            <p>123 Education Street, Knowledge City</p>
            <div className="footer-links">
              <a href="#about">About Us</a>
              <a href="#contact">Contact</a>
              <a href="#privacy">Privacy Policy</a>
              <a href="#terms">Terms of Service</a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2025 NVRSS. All Rights Reserved.</p>
        </div>
      </footer>

      <style>{`
        :root {
          --primary: #2563eb;
          --primary-dark: #1d4ed8;
          --secondary: #64748b;
          --bg-light: #f8fafc;
          --text-main: #1e293b;
          --text-muted: #64748b;
        }

        .home-page {
          min-height: 100vh;
          background: var(--bg-light);
          font-family: 'Inter', system-ui, sans-serif;
          display: flex;
          flex-direction: column;
        }

        /* Header */
        .home-header {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 1000;
          padding: 1rem;
        }

        .header-glass {
          background: rgba(255, 255, 255, 0.85);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(255, 255, 255, 0.5);
          border-radius: 16px;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
          max-width: 1400px;
          margin: 0 auto;
        }

        .header-content {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0.75rem 1.5rem;
        }

        .logo-section {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .logo {
          width: 42px;
          height: 42px;
          background: linear-gradient(135deg, #2563eb, #1d4ed8);
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-weight: 800;
          font-size: 1.25rem;
          box-shadow: 0 4px 12px rgba(37, 99, 235, 0.2);
        }

        .logo-text h1 {
          font-size: 1.25rem;
          font-weight: 700;
          color: var(--text-main);
          letter-spacing: -0.025em;
          margin: 0;
        }

        .logo-text p {
          font-size: 0.75rem;
          color: var(--text-muted);
          margin: 0;
          font-weight: 500;
        }

        .header-nav {
          display: flex;
          align-items: center;
          gap: 1.5rem;
        }

        .nav-link {
          text-decoration: none;
          color: var(--text-muted);
          font-weight: 500;
          font-size: 0.9rem;
          transition: 0.2s;
        }

        .nav-link:hover {
          color: var(--primary);
        }

        .nav-link.highlight {
          color: var(--primary);
          background: rgba(37, 99, 235, 0.08); /* Transparent blue bg */
          padding: 0.5rem 1rem;
          border-radius: 99px;
          font-weight: 600;
        }
        
        .nav-link.highlight:hover {
            background: rgba(37, 99, 235, 0.15);
        }

        /* Hero */
        .hero-section {
          position: relative;
          padding: 160px 2rem 100px;
          text-align: center;
          /* overflow: hidden; */
        }
        
        .hero-background {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 100%;
          z-index: 0;
          background: 
            radial-gradient(circle at 10% 20%, rgba(37, 99, 235, 0.08) 0%, transparent 20%),
            radial-gradient(circle at 90% 50%, rgba(59, 130, 246, 0.08) 0%, transparent 25%);
        }

        .hero-content {
          position: relative;
          z-index: 1;
          max-width: 800px;
          margin: 0 auto;
        }

        .hero-content h2 {
          font-size: 3.5rem;
          font-weight: 800;
          background: linear-gradient(135deg, #1e293b 0%, #334155 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          letter-spacing: -0.05em;
          margin-bottom: 1rem;
          line-height: 1.1;
        }

        .hero-content p {
          font-size: 1.25rem;
          color: var(--text-muted);
          max-width: 600px;
          margin: 0 auto;
        }

        /* Portal Cards */
        .portal-section {
          max-width: 1400px;
          margin: -20px auto 0;
          padding: 0 2rem 4rem;
          position: relative;
          z-index: 10;
        }

        .portal-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 2rem;
        }

        .portal-card {
          background: white;
          border-radius: 20px;
          padding: 2.5rem 2rem;
          text-align: center;
          border: 1px solid rgba(226, 232, 240, 0.8);
          box-shadow: 0 10px 30px -4px rgba(0, 0, 0, 0.04);
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
          overflow: hidden;
          display: flex;
          flex-direction: column;
        }

        .card-bg-decoration {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 6px;
          background: var(--primary);
          opacity: 0;
          transition: 0.3s;
        }

        .portal-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 20px 40px -4px rgba(0, 0, 0, 0.08);
          border-color: transparent;
        }

        .portal-card:hover .card-bg-decoration {
          opacity: 1;
        }
        
        /* Color themes for cards */
        .portal-card.blue .portal-icon { color: #2563eb; background: #eff6ff; }
        .portal-card.blue:hover .card-bg-decoration { background: #2563eb; }
        .portal-card.blue .portal-btn { background: #2563eb; }
        
        .portal-card.green .portal-icon { color: #16a34a; background: #dcfce7; }
        .portal-card.green:hover .card-bg-decoration { background: #16a34a; }
        .portal-card.green .portal-btn { background: #16a34a; }
        
        .portal-card.orange .portal-icon { color: #d97706; background: #fef3c7; }
        .portal-card.orange:hover .card-bg-decoration { background: #d97706; }
        .portal-card.orange .portal-btn { background: #d97706; }
        
        .portal-card.purple .portal-icon { color: #7c3aed; background: #ede9fe; }
        .portal-card.purple:hover .card-bg-decoration { background: #7c3aed; }
        .portal-card.purple .portal-btn { background: #7c3aed; }

        .portal-icon {
          width: 64px;
          height: 64px;
          border-radius: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 1.5rem;
          font-size: 2rem;
          transition: 0.3s;
        }
        
        .portal-icon svg { width: 32px; height: 32px; stroke-width: 2; }

        .portal-card:hover .portal-icon {
          transform: scale(1.1) rotate(3deg);
        }

        .portal-title {
          font-size: 1.25rem;
          font-weight: 700;
          color: var(--text-main);
          margin-bottom: 0.5rem;
        }

        .portal-description {
          font-size: 0.9rem;
          color: var(--text-muted);
          line-height: 1.5;
          margin-bottom: 2rem;
          flex-grow: 1;
        }

        .portal-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          width: 100%;
          padding: 0.875rem;
          color: white;
          text-decoration: none;
          border-radius: 12px;
          font-weight: 600;
          font-size: 0.95rem;
          transition: 0.2s;
          opacity: 0.9;
        }

        .portal-btn:hover {
          opacity: 1;
          transform: scale(1.02);
        }

        /* Features */
        .features-section {
          max-width: 1400px;
          margin: 0 auto;
          padding: 4rem 2rem;
        }

        .section-title {
          text-align: center;
          font-size: 1.75rem;
          font-weight: 700;
          margin-bottom: 3rem;
          color: var(--text-main);
        }

        .features-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 2rem;
        }

        .feature-card {
          text-align: center;
          padding: 1.5rem;
          border-radius: 16px;
          transition: 0.3s;
        }

        .feature-card:hover {
          background: white;
          box-shadow: 0 10px 30px rgba(0,0,0,0.05);
        }

        .feature-icon {
          font-size: 2.5rem;
          margin-bottom: 1rem;
          display: inline-block;
        }

        .feature-card h4 {
          font-size: 1.1rem;
          font-weight: 700;
          margin-bottom: 0.5rem;
          color: var(--text-main);
        }

        .feature-card p {
          font-size: 0.9rem;
          color: var(--text-muted);
          line-height: 1.5;
        }

        /* CTA */
        .cta-section {
          padding: 5rem 2rem;
          background: white;
          text-align: center;
        }

        .cta-content {
          max-width: 600px;
          margin: 0 auto;
        }

        .cta-content h2 {
          font-size: 2rem;
          font-weight: 700;
          margin-bottom: 1rem;
        }

        .cta-content p {
          color: var(--text-muted);
          margin-bottom: 2rem;
          font-size: 1.125rem;
        }

        .cta-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.75rem;
          background: var(--text-main);
          color: white;
          padding: 1rem 2rem;
          border-radius: 12px;
          text-decoration: none;
          font-weight: 600;
          font-size: 1rem;
          transition: 0.2s;
        }

        .cta-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(0,0,0,0.15);
        }

        /* Footer */
        .home-footer {
          background: #111827; /* Darker clean background */
          color: #f3f4f6;
          padding-top: 4rem;
        }

        .footer-content {
          max-width: 1400px;
          margin: 0 auto;
          padding: 0 2rem 4rem;
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          flex-wrap: wrap;
          gap: 2rem;
        }

        .footer-brand {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .footer-logo {
          width: 40px;
          height: 40px;
          background: white;
          color: #111827;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 800;
        }

        .footer-brand h4 { margin: 0; font-size: 1.25rem; }
        .footer-brand p { margin: 0; opacity: 0.7; font-size: 0.85rem; }

        .footer-info {
          text-align: right;
        }
        
        .footer-links {
          display: flex;
          gap: 1.5rem;
          margin-top: 1rem;
          justify-content: flex-end;
        }

        .footer-links a {
          color: #9ca3af;
          text-decoration: none;
          font-size: 0.9rem;
          transition: 0.2s;
        }

        .footer-links a:hover { color: white; }

        .footer-bottom {
          border-top: 1px solid #1f2937;
          padding: 1.5rem;
          text-align: center;
          font-size: 0.85rem;
          color: #6b7280;
        }

        /* Animations */
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .animate-fade-in-up {
          animation: fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          opacity: 0;
        }

        .delay-1 { animation-delay: 0.1s; }
        .delay-2 { animation-delay: 0.2s; }
        .delay-3 { animation-delay: 0.3s; }
        .delay-4 { animation-delay: 0.4s; }

        @media (max-width: 1024px) {
          .portal-grid { grid-template-columns: repeat(2, 1fr); }
        }

        @media (max-width: 768px) {
          .header-content { flex-direction: column; gap: 1rem; }
          .hero-content h2 { font-size: 2.25rem; }
          .portal-grid, .features-grid { grid-template-columns: 1fr; }
          .footer-content { flex-direction: column; align-items: center; text-align: center; }
          .footer-info { text-align: center; }
          .footer-links { justify-content: center; }
        }
      `}</style>
    </div>
  );
}
