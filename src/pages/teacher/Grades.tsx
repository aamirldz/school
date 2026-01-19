/**
 * NVRSS ERP - Teacher Enter Grades Page
 * Enter and manage student grades
 */

import { useState } from 'react';

export default function TeacherGrades() {
    const [selectedClass, setSelectedClass] = useState('G10A');
    const [selectedExam, setSelectedExam] = useState('midterm');
    const [isSaving, setIsSaving] = useState(false);
    const [saved, setSaved] = useState(false);

    const classes = [
        { id: 'G10A', name: 'Grade 10-A', subject: 'Physics', maxMarks: 100 },
        { id: 'G10B', name: 'Grade 10-B', subject: 'Physics', maxMarks: 100 },
        { id: 'G9A', name: 'Grade 9-A', subject: 'Science', maxMarks: 100 },
        { id: 'G9B', name: 'Grade 9-B', subject: 'Science', maxMarks: 100 },
        { id: 'G11A', name: 'Grade 11-A', subject: 'Physics', maxMarks: 100 },
        { id: 'G12A', name: 'Grade 12-A', subject: 'Physics', maxMarks: 100 },
    ];

    const exams = [
        { id: 'unit1', name: 'Unit Test 1', maxMarks: 50 },
        { id: 'midterm', name: 'Mid Term Exam', maxMarks: 100 },
        { id: 'unit2', name: 'Unit Test 2', maxMarks: 50 },
        { id: 'practical', name: 'Practical Exam', maxMarks: 30 },
        { id: 'final', name: 'Final Exam', maxMarks: 100 },
    ];

    const currentExam = exams.find(e => e.id === selectedExam) || exams[1];

    // Mock students with grades
    const [students, setStudents] = useState(() =>
        Array.from({ length: 35 }, (_, i) => ({
            id: `${selectedClass}${String(i + 1).padStart(3, '0')}`,
            rollNo: i + 1,
            name: ['Rahul Sharma', 'Priya Patel', 'Amit Kumar', 'Sneha Singh', 'Vikram Gupta', 'Pooja Verma', 'Arjun Reddy', 'Kavya Nair', 'Rohan Joshi', 'Ananya Iyer'][i % 10] + (i >= 10 ? ` ${Math.floor(i / 10) + 1}` : ''),
            marks: Math.floor(Math.random() * 40) + 60,
        }))
    );

    const handleMarksChange = (studentId: string, marks: number) => {
        setStudents(prev => prev.map(s => s.id === studentId ? { ...s, marks: Math.min(Math.max(0, marks), currentExam.maxMarks) } : s));
        setSaved(false);
    };

    const handleSave = async () => {
        setIsSaving(true);
        await new Promise(r => setTimeout(r, 1000));
        setIsSaving(false);
        setSaved(true);
    };

    const getGrade = (marks: number, maxMarks: number) => {
        const percent = (marks / maxMarks) * 100;
        if (percent >= 90) return { grade: 'A+', color: '#16a34a' };
        if (percent >= 80) return { grade: 'A', color: '#22c55e' };
        if (percent >= 70) return { grade: 'B+', color: '#3b82f6' };
        if (percent >= 60) return { grade: 'B', color: '#6366f1' };
        if (percent >= 50) return { grade: 'C', color: '#d97706' };
        if (percent >= 40) return { grade: 'D', color: '#ea580c' };
        return { grade: 'F', color: '#dc2626' };
    };

    // Stats
    const avgMarks = students.reduce((sum, s) => sum + s.marks, 0) / students.length;
    const highest = Math.max(...students.map(s => s.marks));
    const lowest = Math.min(...students.map(s => s.marks));
    const passCount = students.filter(s => (s.marks / currentExam.maxMarks) >= 0.4).length;

    return (
        <div className="grades-page">
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
                <div className="control-group">
                    <label>Select Exam</label>
                    <select value={selectedExam} onChange={e => setSelectedExam(e.target.value)}>
                        {exams.map(exam => (
                            <option key={exam.id} value={exam.id}>{exam.name} ({exam.maxMarks} marks)</option>
                        ))}
                    </select>
                </div>
                <div className="max-marks-badge">
                    Max Marks: <strong>{currentExam.maxMarks}</strong>
                </div>
            </div>

            {/* Stats */}
            <div className="stats-row">
                <div className="stat-card">
                    <span className="stat-value">{students.length}</span>
                    <span className="stat-label">Total Students</span>
                </div>
                <div className="stat-card">
                    <span className="stat-value">{avgMarks.toFixed(1)}</span>
                    <span className="stat-label">Average Marks</span>
                </div>
                <div className="stat-card highlight">
                    <span className="stat-value">{highest}</span>
                    <span className="stat-label">Highest</span>
                </div>
                <div className="stat-card danger">
                    <span className="stat-value">{lowest}</span>
                    <span className="stat-label">Lowest</span>
                </div>
                <div className="stat-card">
                    <span className="stat-value">{passCount}/{students.length}</span>
                    <span className="stat-label">Passed</span>
                </div>
            </div>

            {/* Grades Table */}
            <div className="grades-card">
                <div className="card-header">
                    <h3>Enter Marks - {classes.find(c => c.id === selectedClass)?.name} • {currentExam.name}</h3>
                    <button className={`save-btn ${saved ? 'saved' : ''}`} onClick={handleSave} disabled={isSaving || saved}>
                        {isSaving ? 'Saving...' : saved ? '✓ Saved' : 'Save Marks'}
                    </button>
                </div>

                <div className="table-container">
                    <table className="grades-table">
                        <thead>
                            <tr>
                                <th>Roll No</th>
                                <th>Student Name</th>
                                <th>Marks (/{currentExam.maxMarks})</th>
                                <th>Percentage</th>
                                <th>Grade</th>
                            </tr>
                        </thead>
                        <tbody>
                            {students.map(student => {
                                const gradeInfo = getGrade(student.marks, currentExam.maxMarks);
                                const percent = ((student.marks / currentExam.maxMarks) * 100).toFixed(1);
                                return (
                                    <tr key={student.id}>
                                        <td className="roll-no">{student.rollNo}</td>
                                        <td className="student-name">{student.name}</td>
                                        <td className="marks-cell">
                                            <input
                                                type="number"
                                                value={student.marks}
                                                onChange={e => handleMarksChange(student.id, parseInt(e.target.value) || 0)}
                                                min="0"
                                                max={currentExam.maxMarks}
                                            />
                                        </td>
                                        <td className="percent-cell">
                                            <div className="percent-bar">
                                                <div className="bar-fill" style={{ width: `${percent}%`, background: gradeInfo.color }}></div>
                                            </div>
                                            <span>{percent}%</span>
                                        </td>
                                        <td>
                                            <span className="grade-badge" style={{ background: gradeInfo.color }}>
                                                {gradeInfo.grade}
                                            </span>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Grade Distribution */}
            <div className="distribution-card">
                <h3>Grade Distribution</h3>
                <div className="distribution-grid">
                    {['A+', 'A', 'B+', 'B', 'C', 'D', 'F'].map(grade => {
                        const count = students.filter(s => getGrade(s.marks, currentExam.maxMarks).grade === grade).length;
                        const percent = (count / students.length) * 100;
                        return (
                            <div key={grade} className="dist-item">
                                <span className="dist-grade">{grade}</span>
                                <div className="dist-bar">
                                    <div className="dist-fill" style={{ width: `${percent}%` }}></div>
                                </div>
                                <span className="dist-count">{count}</span>
                            </div>
                        );
                    })}
                </div>
            </div>

            <style>{`
        .grades-page { max-width: 1200px; }

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

        .control-group select {
          padding: 0.75rem 1rem;
          border: 1px solid #e2e8f0;
          border-radius: 8px;
          font-size: 0.9rem;
          min-width: 200px;
        }

        .max-marks-badge {
          margin-left: auto;
          padding: 0.75rem 1.5rem;
          background: #eff6ff;
          color: #1e40af;
          border-radius: 8px;
          font-size: 0.9rem;
        }

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
        }

        .stat-card.highlight { border-left: 4px solid #16a34a; }
        .stat-card.danger { border-left: 4px solid #dc2626; }

        .stat-value { display: block; font-size: 1.5rem; font-weight: 700; color: #1e293b; }
        .stat-label { font-size: 0.75rem; color: #64748b; }

        .grades-card {
          background: white;
          border-radius: 12px;
          padding: 1.5rem;
          box-shadow: 0 1px 3px rgba(0,0,0,0.1);
          margin-bottom: 1.5rem;
        }

        .card-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1rem;
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
        }

        .save-btn:disabled { opacity: 0.7; cursor: not-allowed; }
        .save-btn.saved { background: #16a34a; }

        .table-container {
          overflow-x: auto;
        }

        .grades-table {
          width: 100%;
          border-collapse: collapse;
        }

        .grades-table th,
        .grades-table td {
          padding: 0.75rem;
          text-align: left;
          border-bottom: 1px solid #f1f5f9;
        }

        .grades-table th {
          background: #f8fafc;
          font-size: 0.75rem;
          font-weight: 600;
          color: #64748b;
          text-transform: uppercase;
        }

        .roll-no {
          width: 60px;
          font-weight: 600;
          color: #1e40af;
        }

        .student-name { font-weight: 500; }

        .marks-cell input {
          width: 80px;
          padding: 0.5rem;
          border: 1px solid #e2e8f0;
          border-radius: 6px;
          text-align: center;
          font-size: 0.9rem;
          font-weight: 600;
        }

        .marks-cell input:focus {
          outline: none;
          border-color: #3b82f6;
          box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
        }

        .percent-cell {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .percent-bar {
          width: 100px;
          height: 8px;
          background: #e2e8f0;
          border-radius: 4px;
          overflow: hidden;
        }

        .bar-fill {
          height: 100%;
          border-radius: 4px;
          transition: width 0.3s;
        }

        .grade-badge {
          padding: 0.25rem 0.75rem;
          color: white;
          border-radius: 20px;
          font-size: 0.75rem;
          font-weight: 600;
        }

        .distribution-card {
          background: white;
          border-radius: 12px;
          padding: 1.5rem;
          box-shadow: 0 1px 3px rgba(0,0,0,0.1);
        }

        .distribution-card h3 {
          font-size: 1rem;
          font-weight: 600;
          margin-bottom: 1rem;
        }

        .distribution-grid {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .dist-item {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .dist-grade {
          width: 30px;
          font-weight: 600;
          color: #1e293b;
        }

        .dist-bar {
          flex: 1;
          height: 20px;
          background: #f1f5f9;
          border-radius: 4px;
          overflow: hidden;
        }

        .dist-fill {
          height: 100%;
          background: #1e40af;
          border-radius: 4px;
        }

        .dist-count {
          width: 30px;
          text-align: right;
          font-weight: 500;
          color: #64748b;
        }

        @media (max-width: 768px) {
          .controls-row { flex-direction: column; align-items: stretch; }
          .control-group select { min-width: 100%; }
          .max-marks-badge { margin-left: 0; }
          .stats-row { grid-template-columns: repeat(2, 1fr); }
        }
      `}</style>
        </div>
    );
}
