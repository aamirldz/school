/**
 * NVRSS ERP - Teacher Students Page
 * View and manage students in assigned classes
 */

import { useState } from 'react';

export default function TeacherStudents() {
    const [selectedClass, setSelectedClass] = useState('G10A');
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedStudent, setSelectedStudent] = useState<string | null>(null);

    const classes = [
        { id: 'G10A', name: 'Grade 10-A', subject: 'Physics' },
        { id: 'G10B', name: 'Grade 10-B', subject: 'Physics' },
        { id: 'G9A', name: 'Grade 9-A', subject: 'Science' },
        { id: 'G9B', name: 'Grade 9-B', subject: 'Science' },
        { id: 'G11A', name: 'Grade 11-A', subject: 'Physics' },
        { id: 'G12A', name: 'Grade 12-A', subject: 'Physics' },
    ];

    // Mock students
    const students = Array.from({ length: 35 }, (_, i) => ({
        id: `25G10A${String(i + 1).padStart(3, '0')}`,
        rollNo: i + 1,
        name: ['Rahul Sharma', 'Priya Patel', 'Amit Kumar', 'Sneha Singh', 'Vikram Gupta', 'Pooja Verma', 'Arjun Reddy', 'Kavya Nair', 'Rohan Joshi', 'Ananya Iyer'][i % 10] + (i >= 10 ? ` ${Math.floor(i / 10) + 1}` : ''),
        attendance: Math.floor(Math.random() * 15) + 85,
        avgMarks: Math.floor(Math.random() * 25) + 65,
        lastExam: Math.floor(Math.random() * 30) + 60,
        parentPhone: `+91 98765 ${43210 + i}`,
        status: ['regular', 'regular', 'regular', 'needs-attention', 'regular'][Math.floor(Math.random() * 5)] as 'regular' | 'needs-attention',
    }));

    const filteredStudents = students.filter(s =>
        s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.id.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const selectedStudentData = students.find(s => s.id === selectedStudent);

    return (
        <div className="students-page">
            {/* Controls */}
            <div className="controls-row">
                <div className="control-group">
                    <label>Select Class</label>
                    <select value={selectedClass} onChange={e => setSelectedClass(e.target.value)}>
                        {classes.map(cls => (
                            <option key={cls.id} value={cls.id}>{cls.name} - {cls.subject}</option>
                        ))}
                    </select>
                </div>
                <div className="search-box">
                    <input
                        type="text"
                        placeholder="Search students by name or ID..."
                        value={searchQuery}
                        onChange={e => setSearchQuery(e.target.value)}
                    />
                    <span className="search-icon">🔍</span>
                </div>
            </div>

            {/* Stats */}
            <div className="stats-row">
                <div className="stat-card"><span className="stat-value">{students.length}</span><span className="stat-label">Total Students</span></div>
                <div className="stat-card"><span className="stat-value">{(students.reduce((sum, s) => sum + s.attendance, 0) / students.length).toFixed(1)}%</span><span className="stat-label">Avg Attendance</span></div>
                <div className="stat-card"><span className="stat-value">{(students.reduce((sum, s) => sum + s.avgMarks, 0) / students.length).toFixed(1)}%</span><span className="stat-label">Avg Performance</span></div>
                <div className="stat-card danger"><span className="stat-value">{students.filter(s => s.status === 'needs-attention').length}</span><span className="stat-label">Need Attention</span></div>
            </div>

            <div className="content-grid">
                {/* Students List */}
                <div className="students-card">
                    <div className="card-header">
                        <h3>Students - {classes.find(c => c.id === selectedClass)?.name}</h3>
                        <span className="count">{filteredStudents.length} students</span>
                    </div>
                    <div className="students-list">
                        {filteredStudents.map(student => (
                            <div
                                key={student.id}
                                className={`student-row ${selectedStudent === student.id ? 'selected' : ''} ${student.status}`}
                                onClick={() => setSelectedStudent(student.id)}
                            >
                                <div className="student-avatar">{student.name.split(' ').map(n => n[0]).join('')}</div>
                                <div className="student-info">
                                    <span className="student-name">{student.name}</span>
                                    <span className="student-id">Roll #{student.rollNo} • {student.id}</span>
                                </div>
                                <div className="student-stats">
                                    <span className={`stat ${student.attendance >= 90 ? 'good' : student.attendance >= 80 ? 'ok' : 'bad'}`}>
                                        {student.attendance}%
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Student Details */}
                <div className="details-card">
                    {selectedStudentData ? (
                        <>
                            <div className="detail-header">
                                <div className="detail-avatar">{selectedStudentData.name.split(' ').map(n => n[0]).join('')}</div>
                                <div className="detail-info">
                                    <h3>{selectedStudentData.name}</h3>
                                    <p>Roll No: {selectedStudentData.rollNo} • {selectedStudentData.id}</p>
                                </div>
                                {selectedStudentData.status === 'needs-attention' && (
                                    <span className="attention-badge">⚠️ Needs Attention</span>
                                )}
                            </div>

                            <div className="detail-stats">
                                <div className="dstat">
                                    <span className="dstat-value">{selectedStudentData.attendance}%</span>
                                    <span className="dstat-label">Attendance</span>
                                </div>
                                <div className="dstat">
                                    <span className="dstat-value">{selectedStudentData.avgMarks}%</span>
                                    <span className="dstat-label">Avg. Marks</span>
                                </div>
                                <div className="dstat">
                                    <span className="dstat-value">{selectedStudentData.lastExam}%</span>
                                    <span className="dstat-label">Last Exam</span>
                                </div>
                            </div>

                            <div className="detail-section">
                                <h4>Contact Information</h4>
                                <div className="contact-info">
                                    <span>📞 Parent: {selectedStudentData.parentPhone}</span>
                                </div>
                            </div>

                            <div className="detail-section">
                                <h4>Recent Performance</h4>
                                <div className="performance-list">
                                    {[
                                        { exam: 'Mid Term', marks: selectedStudentData.lastExam, total: 100 },
                                        { exam: 'Unit Test 1', marks: Math.floor(selectedStudentData.avgMarks * 0.5), total: 50 },
                                        { exam: 'Assignment 1', marks: Math.floor(Math.random() * 10) + 15, total: 25 },
                                    ].map((item, i) => (
                                        <div key={i} className="perf-item">
                                            <span className="perf-name">{item.exam}</span>
                                            <div className="perf-bar">
                                                <div className="perf-fill" style={{ width: `${(item.marks / item.total) * 100}%` }}></div>
                                            </div>
                                            <span className="perf-marks">{item.marks}/{item.total}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="detail-actions">
                                <button className="action-btn">📝 Add Remark</button>
                                <button className="action-btn">📧 Message Parent</button>
                                <button className="action-btn primary">📊 Full Report</button>
                            </div>
                        </>
                    ) : (
                        <div className="no-selection">
                            <span className="no-icon">👈</span>
                            <h4>Select a Student</h4>
                            <p>Click on a student from the list to view their details</p>
                        </div>
                    )}
                </div>
            </div>

            <style>{`
        .students-page { max-width: 1400px; }

        .controls-row {
          display: flex;
          gap: 1rem;
          margin-bottom: 1.5rem;
          background: white;
          padding: 1rem 1.5rem;
          border-radius: 12px;
          box-shadow: 0 1px 3px rgba(0,0,0,0.1);
        }

        .control-group { display: flex; flex-direction: column; gap: 0.5rem; }
        .control-group label { font-size: 0.75rem; font-weight: 600; color: #64748b; text-transform: uppercase; }
        .control-group select { padding: 0.75rem 1rem; border: 1px solid #e2e8f0; border-radius: 8px; font-size: 0.9rem; }

        .search-box {
          flex: 1;
          position: relative;
          align-self: flex-end;
        }

        .search-box input {
          width: 100%;
          padding: 0.75rem 1rem 0.75rem 2.5rem;
          border: 1px solid #e2e8f0;
          border-radius: 8px;
          font-size: 0.9rem;
        }

        .search-icon { position: absolute; left: 0.75rem; top: 50%; transform: translateY(-50%); }

        .stats-row { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1rem; margin-bottom: 1.5rem; }
        .stat-card { background: white; border-radius: 12px; padding: 1rem; text-align: center; box-shadow: 0 1px 3px rgba(0,0,0,0.1); }
        .stat-card.danger { border-left: 4px solid #dc2626; }
        .stat-value { display: block; font-size: 1.5rem; font-weight: 700; color: #1e293b; }
        .stat-label { font-size: 0.75rem; color: #64748b; }

        .content-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; }

        .students-card, .details-card {
          background: white;
          border-radius: 12px;
          box-shadow: 0 1px 3px rgba(0,0,0,0.1);
        }

        .card-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1rem 1.5rem;
          border-bottom: 1px solid #e2e8f0;
        }

        .card-header h3 { font-size: 1rem; font-weight: 600; }
        .count { font-size: 0.875rem; color: #64748b; }

        .students-list { max-height: 600px; overflow-y: auto; }

        .student-row {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 0.75rem 1.5rem;
          cursor: pointer;
          border-left: 3px solid transparent;
          transition: all 0.2s;
        }

        .student-row:hover { background: #f8fafc; }
        .student-row.selected { background: #eff6ff; border-left-color: #1e40af; }
        .student-row.needs-attention { background: #fef2f2; }

        .student-avatar {
          width: 40px;
          height: 40px;
          background: linear-gradient(135deg, #1e40af 0%, #3b82f6 100%);
          color: white;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 600;
          font-size: 0.75rem;
        }

        .student-info { flex: 1; }
        .student-name { display: block; font-weight: 500; }
        .student-id { font-size: 0.75rem; color: #64748b; }

        .student-stats .stat { padding: 0.25rem 0.5rem; border-radius: 6px; font-size: 0.75rem; font-weight: 600; }
        .stat.good { background: #dcfce7; color: #16a34a; }
        .stat.ok { background: #fef3c7; color: #d97706; }
        .stat.bad { background: #fee2e2; color: #dc2626; }

        .details-card { padding: 1.5rem; min-height: 600px; }

        .detail-header { display: flex; align-items: center; gap: 1rem; margin-bottom: 1.5rem; }

        .detail-avatar {
          width: 64px;
          height: 64px;
          background: linear-gradient(135deg, #1e40af 0%, #3b82f6 100%);
          color: white;
          border-radius: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          font-size: 1.25rem;
        }

        .detail-info h3 { font-size: 1.25rem; margin-bottom: 0.25rem; }
        .detail-info p { color: #64748b; font-size: 0.875rem; }

        .attention-badge {
          margin-left: auto;
          padding: 0.5rem 1rem;
          background: #fee2e2;
          color: #dc2626;
          border-radius: 8px;
          font-size: 0.75rem;
          font-weight: 600;
        }

        .detail-stats { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem; margin-bottom: 1.5rem; }

        .dstat {
          padding: 1rem;
          background: #f8fafc;
          border-radius: 10px;
          text-align: center;
        }

        .dstat-value { display: block; font-size: 1.5rem; font-weight: 700; color: #1e40af; }
        .dstat-label { font-size: 0.75rem; color: #64748b; }

        .detail-section { margin-bottom: 1.5rem; }
        .detail-section h4 { font-size: 0.875rem; font-weight: 600; margin-bottom: 0.75rem; color: #64748b; }

        .contact-info span { display: block; padding: 0.5rem 0; font-size: 0.9rem; }

        .performance-list { display: flex; flex-direction: column; gap: 0.5rem; }

        .perf-item { display: flex; align-items: center; gap: 1rem; }
        .perf-name { width: 100px; font-size: 0.875rem; }
        .perf-bar { flex: 1; height: 8px; background: #e2e8f0; border-radius: 4px; overflow: hidden; }
        .perf-fill { height: 100%; background: #1e40af; border-radius: 4px; }
        .perf-marks { width: 50px; font-size: 0.875rem; color: #64748b; text-align: right; }

        .detail-actions { display: flex; gap: 0.5rem; }

        .action-btn {
          flex: 1;
          padding: 0.75rem;
          border: 1px solid #e2e8f0;
          background: white;
          border-radius: 8px;
          font-size: 0.8rem;
          cursor: pointer;
        }

        .action-btn.primary { background: #1e40af; color: white; border-color: #1e40af; }

        .no-selection {
          height: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          color: #64748b;
        }

        .no-icon { font-size: 3rem; margin-bottom: 1rem; }
        .no-selection h4 { margin-bottom: 0.5rem; color: #1e293b; }

        @media (max-width: 1024px) { .content-grid { grid-template-columns: 1fr; } }
        @media (max-width: 768px) { .controls-row { flex-direction: column; } .stats-row { grid-template-columns: repeat(2, 1fr); } }
      `}</style>
        </div>
    );
}
