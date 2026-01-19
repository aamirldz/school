/**
 * NVRSS ERP - Teacher Mark Attendance Page
 * Mark attendance for assigned classes
 */

import { useState } from 'react';

export default function TeacherAttendance() {
    const [selectedClass, setSelectedClass] = useState('G10A');
    const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
    const [isSaving, setIsSaving] = useState(false);
    const [saved, setSaved] = useState(false);

    const classes = [
        { id: 'G10A', name: 'Grade 10-A', subject: 'Physics', students: 35 },
        { id: 'G10B', name: 'Grade 10-B', subject: 'Physics', students: 38 },
        { id: 'G9A', name: 'Grade 9-A', subject: 'Science', students: 40 },
        { id: 'G9B', name: 'Grade 9-B', subject: 'Science', students: 42 },
        { id: 'G11A', name: 'Grade 11-A', subject: 'Physics', students: 32 },
        { id: 'G12A', name: 'Grade 12-A', subject: 'Physics', students: 28 },
    ];

    // Generate mock students
    const [students, setStudents] = useState(() =>
        Array.from({ length: 35 }, (_, i) => ({
            id: `${selectedClass}${String(i + 1).padStart(3, '0')}`,
            rollNo: i + 1,
            name: ['Rahul Sharma', 'Priya Patel', 'Amit Kumar', 'Sneha Singh', 'Vikram Gupta', 'Pooja Verma', 'Arjun Reddy', 'Kavya Nair', 'Rohan Joshi', 'Ananya Iyer'][i % 10] + (i >= 10 ? ` ${Math.floor(i / 10) + 1}` : ''),
            status: 'present' as 'present' | 'absent' | 'late',
        }))
    );

    const stats = {
        present: students.filter(s => s.status === 'present').length,
        absent: students.filter(s => s.status === 'absent').length,
        late: students.filter(s => s.status === 'late').length,
    };

    const handleStatusChange = (studentId: string, status: 'present' | 'absent' | 'late') => {
        setStudents(prev => prev.map(s => s.id === studentId ? { ...s, status } : s));
        setSaved(false);
    };

    const markAll = (status: 'present' | 'absent') => {
        setStudents(prev => prev.map(s => ({ ...s, status })));
        setSaved(false);
    };

    const handleSave = async () => {
        setIsSaving(true);
        // Simulate API call
        await new Promise(r => setTimeout(r, 1000));
        setIsSaving(false);
        setSaved(true);
    };

    return (
        <div className="attendance-page">
            {/* Header Controls */}
            <div className="controls-row">
                <div className="control-group">
                    <label>Select Class</label>
                    <select value={selectedClass} onChange={e => setSelectedClass(e.target.value)}>
                        {classes.map(cls => (
                            <option key={cls.id} value={cls.id}>{cls.name} - {cls.subject}</option>
                        ))}
                    </select>
                </div>
                <div className="control-group">
                    <label>Select Date</label>
                    <input type="date" value={selectedDate} onChange={e => setSelectedDate(e.target.value)} />
                </div>
                <div className="quick-actions">
                    <button className="quick-btn present" onClick={() => markAll('present')}>Mark All Present</button>
                    <button className="quick-btn absent" onClick={() => markAll('absent')}>Mark All Absent</button>
                </div>
            </div>

            {/* Stats */}
            <div className="stats-row">
                <div className="stat-card total">
                    <span className="stat-value">{students.length}</span>
                    <span className="stat-label">Total Students</span>
                </div>
                <div className="stat-card present">
                    <span className="stat-value">{stats.present}</span>
                    <span className="stat-label">Present</span>
                </div>
                <div className="stat-card absent">
                    <span className="stat-value">{stats.absent}</span>
                    <span className="stat-label">Absent</span>
                </div>
                <div className="stat-card late">
                    <span className="stat-value">{stats.late}</span>
                    <span className="stat-label">Late</span>
                </div>
                <div className="stat-card percentage">
                    <span className="stat-value">{((stats.present / students.length) * 100).toFixed(0)}%</span>
                    <span className="stat-label">Attendance</span>
                </div>
            </div>

            {/* Students Table */}
            <div className="attendance-card">
                <div className="card-header">
                    <h3>Student List - {classes.find(c => c.id === selectedClass)?.name}</h3>
                    <div className="header-actions">
                        <button className={`save-btn ${saved ? 'saved' : ''}`} onClick={handleSave} disabled={isSaving || saved}>
                            {isSaving ? 'Saving...' : saved ? '✓ Saved' : 'Save Attendance'}
                        </button>
                    </div>
                </div>

                <div className="students-grid">
                    {students.map(student => (
                        <div key={student.id} className={`student-card ${student.status}`}>
                            <div className="student-info">
                                <span className="roll-no">{student.rollNo}</span>
                                <span className="student-name">{student.name}</span>
                            </div>
                            <div className="status-buttons">
                                <button
                                    className={`status-btn present ${student.status === 'present' ? 'active' : ''}`}
                                    onClick={() => handleStatusChange(student.id, 'present')}
                                    title="Present"
                                >
                                    ✓
                                </button>
                                <button
                                    className={`status-btn absent ${student.status === 'absent' ? 'active' : ''}`}
                                    onClick={() => handleStatusChange(student.id, 'absent')}
                                    title="Absent"
                                >
                                    ✗
                                </button>
                                <button
                                    className={`status-btn late ${student.status === 'late' ? 'active' : ''}`}
                                    onClick={() => handleStatusChange(student.id, 'late')}
                                    title="Late"
                                >
                                    ⏰
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <style>{`
        .attendance-page { max-width: 1400px; }

        .controls-row {
          display: flex;
          gap: 1rem;
          margin-bottom: 1.5rem;
          background: white;
          padding: 1rem 1.5rem;
          border-radius: 12px;
          box-shadow: 0 1px 3px rgba(0,0,0,0.1);
          align-items: flex-end;
        }

        .control-group {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .control-group label {
          font-size: 0.75rem;
          font-weight: 600;
          color: #64748b;
          text-transform: uppercase;
        }

        .control-group select,
        .control-group input {
          padding: 0.75rem 1rem;
          border: 1px solid #e2e8f0;
          border-radius: 8px;
          font-size: 0.9rem;
          min-width: 200px;
        }

        .quick-actions {
          display: flex;
          gap: 0.5rem;
          margin-left: auto;
        }

        .quick-btn {
          padding: 0.75rem 1rem;
          border: none;
          border-radius: 8px;
          font-size: 0.875rem;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s;
        }

        .quick-btn.present {
          background: #dcfce7;
          color: #16a34a;
        }

        .quick-btn.absent {
          background: #fee2e2;
          color: #dc2626;
        }

        .quick-btn:hover { filter: brightness(0.95); }

        .stats-row {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: 1rem;
          margin-bottom: 1.5rem;
        }

        .stat-card {
          background: white;
          border-radius: 12px;
          padding: 1rem;
          text-align: center;
          box-shadow: 0 1px 3px rgba(0,0,0,0.1);
          border-top: 4px solid;
        }

        .stat-card.total { border-color: #1e40af; }
        .stat-card.present { border-color: #16a34a; }
        .stat-card.absent { border-color: #dc2626; }
        .stat-card.late { border-color: #d97706; }
        .stat-card.percentage { border-color: #7c3aed; }

        .stat-value {
          display: block;
          font-size: 1.5rem;
          font-weight: 700;
          color: #1e293b;
        }

        .stat-label { font-size: 0.75rem; color: #64748b; }

        .attendance-card {
          background: white;
          border-radius: 12px;
          padding: 1.5rem;
          box-shadow: 0 1px 3px rgba(0,0,0,0.1);
        }

        .card-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1.5rem;
          padding-bottom: 1rem;
          border-bottom: 1px solid #e2e8f0;
        }

        .card-header h3 { font-size: 1rem; font-weight: 600; }

        .save-btn {
          padding: 0.75rem 1.5rem;
          background: linear-gradient(135deg, #1e40af 0%, #3b82f6 100%);
          color: white;
          border: none;
          border-radius: 8px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
        }

        .save-btn:hover:not(:disabled) { filter: brightness(1.1); }
        .save-btn:disabled { opacity: 0.7; cursor: not-allowed; }
        .save-btn.saved { background: #16a34a; }

        .students-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 0.75rem;
        }

        .student-card {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0.75rem 1rem;
          border-radius: 10px;
          background: #f8fafc;
          border: 2px solid transparent;
        }

        .student-card.present { border-color: #dcfce7; background: #f8fafc; }
        .student-card.absent { border-color: #fee2e2; background: #fef2f2; }
        .student-card.late { border-color: #fef3c7; background: #fffbeb; }

        .student-info {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .roll-no {
          width: 28px;
          height: 28px;
          background: #1e40af;
          color: white;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.75rem;
          font-weight: 600;
        }

        .student-name {
          font-weight: 500;
          font-size: 0.9rem;
        }

        .status-buttons {
          display: flex;
          gap: 0.25rem;
        }

        .status-btn {
          width: 32px;
          height: 32px;
          border: 2px solid #e2e8f0;
          background: white;
          border-radius: 8px;
          cursor: pointer;
          font-size: 0.875rem;
          transition: all 0.2s;
        }

        .status-btn:hover { background: #f1f5f9; }

        .status-btn.present.active {
          background: #16a34a;
          border-color: #16a34a;
          color: white;
        }

        .status-btn.absent.active {
          background: #dc2626;
          border-color: #dc2626;
          color: white;
        }

        .status-btn.late.active {
          background: #d97706;
          border-color: #d97706;
          color: white;
        }

        @media (max-width: 768px) {
          .controls-row { flex-direction: column; align-items: stretch; }
          .control-group select, .control-group input { min-width: 100%; }
          .quick-actions { margin-left: 0; }
          .stats-row { grid-template-columns: repeat(3, 1fr); }
          .stats-row .stat-card:nth-child(4),
          .stats-row .stat-card:nth-child(5) { grid-column: span 1; }
        }
      `}</style>
        </div>
    );
}
