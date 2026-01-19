/**
 * NVRSS ERP - Teacher My Classes Page
 * View and manage assigned classes
 */

import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function TeacherClasses() {
  const [selectedClass] = useState<string | null>(null);

  const classes = [
    {
      id: 'G10A',
      name: 'Grade 10-A',
      subject: 'Physics',
      totalStudents: 35,
      periodsPerWeek: 6,
      classTeacher: 'Mrs. Patel',
      room: 'Room 101',
      attendance: { present: 32, absent: 3 },
      performance: { average: 78.5, toppers: 5, needsAttention: 4 },
    },
    {
      id: 'G10B',
      name: 'Grade 10-B',
      subject: 'Physics',
      totalStudents: 38,
      periodsPerWeek: 6,
      classTeacher: 'Mr. Kumar',
      room: 'Room 103',
      attendance: { present: 35, absent: 3 },
      performance: { average: 75.2, toppers: 4, needsAttention: 6 },
    },
    {
      id: 'G9A',
      name: 'Grade 9-A',
      subject: 'Science',
      totalStudents: 40,
      periodsPerWeek: 5,
      classTeacher: 'Mrs. Singh',
      room: 'Room 105',
      attendance: { present: 38, absent: 2 },
      performance: { average: 82.1, toppers: 8, needsAttention: 3 },
    },
    {
      id: 'G9B',
      name: 'Grade 9-B',
      subject: 'Science',
      totalStudents: 42,
      periodsPerWeek: 5,
      classTeacher: 'Mr. Verma',
      room: 'Room 102',
      attendance: { present: 40, absent: 2 },
      performance: { average: 79.8, toppers: 6, needsAttention: 5 },
    },
    {
      id: 'G11A',
      name: 'Grade 11-A',
      subject: 'Physics',
      totalStudents: 32,
      periodsPerWeek: 8,
      classTeacher: 'Dr. Sharma',
      room: 'Room 106',
      attendance: { present: 30, absent: 2 },
      performance: { average: 71.5, toppers: 4, needsAttention: 6 },
    },
    {
      id: 'G12A',
      name: 'Grade 12-A',
      subject: 'Physics',
      totalStudents: 28,
      periodsPerWeek: 8,
      classTeacher: 'Dr. Gupta',
      room: 'Room 104',
      attendance: { present: 26, absent: 2 },
      performance: { average: 73.8, toppers: 5, needsAttention: 4 },
    },
  ];

  const totalStudents = classes.reduce((sum, c) => sum + c.totalStudents, 0);
  const totalPeriods = classes.reduce((sum, c) => sum + c.periodsPerWeek, 0);

  return (
    <div className="classes-page">
      {/* Stats Overview */}
      <div className="stats-row">
        <div className="stat-card primary">
          <div className="stat-icon">📚</div>
          <div className="stat-info">
            <span className="stat-value">{classes.length}</span>
            <span className="stat-label">Total Classes</span>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">👥</div>
          <div className="stat-info">
            <span className="stat-value">{totalStudents}</span>
            <span className="stat-label">Total Students</span>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">📅</div>
          <div className="stat-info">
            <span className="stat-value">{totalPeriods}</span>
            <span className="stat-label">Periods/Week</span>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">📊</div>
          <div className="stat-info">
            <span className="stat-value">{(classes.reduce((sum, c) => sum + c.performance.average, 0) / classes.length).toFixed(1)}%</span>
            <span className="stat-label">Avg. Performance</span>
          </div>
        </div>
      </div>

      {/* Classes Grid */}
      <div className="classes-grid">
        {classes.map((cls) => (
          <div key={cls.id} className={`class-card ${selectedClass === cls.id ? 'selected' : ''}`}>
            <div className="class-header">
              <div className="class-title">
                <h3>{cls.name}</h3>
                <span className="subject-badge">{cls.subject}</span>
              </div>
              <div className="periods-badge">{cls.periodsPerWeek} periods/week</div>
            </div>

            <div className="class-stats">
              <div className="stat-item">
                <span className="stat-number">{cls.totalStudents}</span>
                <span className="stat-text">Students</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">{cls.performance.average.toFixed(0)}%</span>
                <span className="stat-text">Avg. Score</span>
              </div>
              <div className="stat-item">
                <span className="stat-number attendance">
                  {((cls.attendance.present / cls.totalStudents) * 100).toFixed(0)}%
                </span>
                <span className="stat-text">Today's Att.</span>
              </div>
            </div>

            <div className="class-info">
              <div className="info-row">
                <span className="info-label">📍 Room:</span>
                <span className="info-value">{cls.room}</span>
              </div>
              <div className="info-row">
                <span className="info-label">👩‍🏫 Class Teacher:</span>
                <span className="info-value">{cls.classTeacher}</span>
              </div>
            </div>

            <div className="class-actions">
              <Link to={`/teacher/attendance?class=${cls.id}`} className="action-btn">
                ✓ Mark Attendance
              </Link>
              <Link to={`/teacher/students?class=${cls.id}`} className="action-btn">
                👥 View Students
              </Link>
              <Link to={`/teacher/grades?class=${cls.id}`} className="action-btn primary">
                📝 Enter Grades
              </Link>
            </div>

            {/* Quick Stats Bar */}
            <div className="quick-stats">
              <div className="qs-item toppers">
                <span className="qs-icon">🌟</span>
                <span>{cls.performance.toppers} Toppers</span>
              </div>
              <div className="qs-item attention">
                <span className="qs-icon">⚠️</span>
                <span>{cls.performance.needsAttention} Need Attention</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <style>{`
        .classes-page { max-width: 1400px; }

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

        .stat-card.primary {
          background: linear-gradient(135deg, #1e40af 0%, #3b82f6 100%);
          color: white;
        }

        .stat-icon { font-size: 2rem; }
        .stat-info { display: flex; flex-direction: column; }
        .stat-value { font-size: 1.5rem; font-weight: 700; }
        .stat-card.primary .stat-label { opacity: 0.9; }
        .stat-label { font-size: 0.875rem; color: #64748b; }

        .classes-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.5rem;
        }

        .class-card {
          background: white;
          border-radius: 16px;
          padding: 1.5rem;
          box-shadow: 0 1px 3px rgba(0,0,0,0.1);
          border: 2px solid transparent;
          transition: all 0.2s;
        }

        .class-card:hover {
          border-color: #3b82f6;
          box-shadow: 0 8px 25px rgba(59, 130, 246, 0.15);
        }

        .class-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 1rem;
        }

        .class-title h3 {
          font-size: 1.125rem;
          font-weight: 600;
          margin-bottom: 0.25rem;
        }

        .subject-badge {
          display: inline-block;
          padding: 0.25rem 0.75rem;
          background: #eff6ff;
          color: #1e40af;
          border-radius: 20px;
          font-size: 0.75rem;
          font-weight: 500;
        }

        .periods-badge {
          padding: 0.25rem 0.5rem;
          background: #f1f5f9;
          border-radius: 6px;
          font-size: 0.7rem;
          color: #64748b;
        }

        .class-stats {
          display: flex;
          gap: 1rem;
          padding: 1rem;
          background: #f8fafc;
          border-radius: 10px;
          margin-bottom: 1rem;
        }

        .stat-item {
          flex: 1;
          text-align: center;
        }

        .stat-number {
          display: block;
          font-size: 1.25rem;
          font-weight: 700;
          color: #1e293b;
        }

        .stat-number.attendance { color: #16a34a; }

        .stat-text {
          font-size: 0.7rem;
          color: #64748b;
        }

        .class-info {
          margin-bottom: 1rem;
        }

        .info-row {
          display: flex;
          justify-content: space-between;
          padding: 0.5rem 0;
          border-bottom: 1px solid #f1f5f9;
          font-size: 0.875rem;
        }

        .info-label { color: #64748b; }
        .info-value { font-weight: 500; }

        .class-actions {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 0.5rem;
          margin-bottom: 1rem;
        }

        .action-btn {
          padding: 0.5rem;
          border: 1px solid #e2e8f0;
          background: white;
          border-radius: 8px;
          font-size: 0.7rem;
          text-align: center;
          cursor: pointer;
          text-decoration: none;
          color: #1e293b;
          transition: all 0.2s;
        }

        .action-btn:hover {
          background: #f8fafc;
          border-color: #3b82f6;
        }

        .action-btn.primary {
          background: #1e40af;
          color: white;
          border-color: #1e40af;
        }

        .action-btn.primary:hover {
          background: #1e3a8a;
        }

        .quick-stats {
          display: flex;
          gap: 1rem;
          padding-top: 1rem;
          border-top: 1px solid #e2e8f0;
        }

        .qs-item {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.75rem;
          color: #64748b;
        }

        .qs-item.toppers { color: #d97706; }
        .qs-item.attention { color: #dc2626; }

        .qs-icon { font-size: 1rem; }

        @media (max-width: 1200px) {
          .classes-grid { grid-template-columns: repeat(2, 1fr); }
        }

        @media (max-width: 768px) {
          .stats-row { grid-template-columns: repeat(2, 1fr); }
          .classes-grid { grid-template-columns: 1fr; }
          .class-actions { grid-template-columns: 1fr; }
        }
      `}</style>
    </div>
  );
}
