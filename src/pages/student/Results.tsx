/**
 * NVRSS ERP - Student Results Page
 * View exam results and report cards
 */

import { useState } from 'react';

export default function StudentResults() {
    const [selectedExam, setSelectedExam] = useState('midterm');

    const exams = [
        { id: 'unit1', name: 'Unit Test 1', date: 'August 2025' },
        { id: 'midterm', name: 'Mid Term Exam', date: 'October 2025' },
        { id: 'unit2', name: 'Unit Test 2', date: 'December 2025' },
        { id: 'final', name: 'Final Exam', date: 'March 2026' },
    ];

    const results: Record<string, any[]> = {
        unit1: [
            { subject: 'Mathematics', marks: 45, total: 50, grade: 'A+', rank: 3 },
            { subject: 'Science', marks: 42, total: 50, grade: 'A', rank: 5 },
            { subject: 'English', marks: 44, total: 50, grade: 'A+', rank: 2 },
            { subject: 'Hindi', marks: 40, total: 50, grade: 'A', rank: 8 },
            { subject: 'Social Studies', marks: 38, total: 50, grade: 'B+', rank: 12 },
        ],
        midterm: [
            { subject: 'Mathematics', marks: 92, total: 100, grade: 'A+', rank: 2 },
            { subject: 'Science', marks: 88, total: 100, grade: 'A', rank: 4 },
            { subject: 'English', marks: 90, total: 100, grade: 'A+', rank: 1 },
            { subject: 'Hindi', marks: 82, total: 100, grade: 'A', rank: 7 },
            { subject: 'Social Studies', marks: 78, total: 100, grade: 'B+', rank: 10 },
            { subject: 'Computer Science', marks: 95, total: 100, grade: 'A+', rank: 1 },
        ],
        unit2: [
            { subject: 'Mathematics', marks: 48, total: 50, grade: 'A+', rank: 1 },
            { subject: 'Science', marks: 45, total: 50, grade: 'A+', rank: 3 },
            { subject: 'English', marks: 46, total: 50, grade: 'A+', rank: 2 },
            { subject: 'Hindi', marks: 43, total: 50, grade: 'A', rank: 5 },
            { subject: 'Social Studies', marks: 41, total: 50, grade: 'A', rank: 8 },
        ],
        final: [],
    };

    const currentResults = results[selectedExam] || [];
    const totalMarks = currentResults.reduce((sum, r) => sum + r.marks, 0);
    const totalMax = currentResults.reduce((sum, r) => sum + r.total, 0);
    const percentage = totalMax > 0 ? ((totalMarks / totalMax) * 100).toFixed(1) : 0;

    const getGradeColor = (grade: string) => {
        if (grade.includes('A+')) return '#16a34a';
        if (grade.includes('A')) return '#2563eb';
        if (grade.includes('B+')) return '#d97706';
        if (grade.includes('B')) return '#ea580c';
        return '#dc2626';
    };

    return (
        <div className="results-page">
            {/* Exam Selector */}
            <div className="exam-tabs">
                {exams.map(exam => (
                    <button
                        key={exam.id}
                        className={`exam-tab ${selectedExam === exam.id ? 'active' : ''} ${results[exam.id]?.length === 0 ? 'disabled' : ''}`}
                        onClick={() => results[exam.id]?.length > 0 && setSelectedExam(exam.id)}
                    >
                        <span className="tab-name">{exam.name}</span>
                        <span className="tab-date">{exam.date}</span>
                    </button>
                ))}
            </div>

            {currentResults.length > 0 ? (
                <>
                    {/* Summary Card */}
                    <div className="summary-card">
                        <div className="summary-main">
                            <div className="summary-circle">
                                <svg viewBox="0 0 36 36">
                                    <path
                                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                        fill="none"
                                        stroke="rgba(255,255,255,0.2)"
                                        strokeWidth="3"
                                    />
                                    <path
                                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                        fill="none"
                                        stroke="white"
                                        strokeWidth="3"
                                        strokeDasharray={`${percentage}, 100`}
                                    />
                                </svg>
                                <span className="percentage">{percentage}%</span>
                            </div>
                            <div className="summary-info">
                                <h2>{exams.find(e => e.id === selectedExam)?.name}</h2>
                                <p>Total Marks: {totalMarks} / {totalMax}</p>
                            </div>
                        </div>
                        <div className="summary-stats">
                            <div className="stats-item">
                                <span className="stats-value">3rd</span>
                                <span className="stats-label">Class Rank</span>
                            </div>
                            <div className="stats-item">
                                <span className="stats-value">A+</span>
                                <span className="stats-label">Overall Grade</span>
                            </div>
                            <div className="stats-item">
                                <span className="stats-value">Excellent</span>
                                <span className="stats-label">Remarks</span>
                            </div>
                        </div>
                    </div>

                    {/* Subject-wise Results */}
                    <div className="results-card">
                        <div className="card-header">
                            <h3>Subject-wise Results</h3>
                            <button className="download-btn">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                                    <polyline points="7 10 12 15 17 10"></polyline>
                                    <line x1="12" y1="15" x2="12" y2="3"></line>
                                </svg>
                                Download Report Card
                            </button>
                        </div>

                        <div className="results-table">
                            <div className="table-header">
                                <span>Subject</span>
                                <span>Marks</span>
                                <span>Grade</span>
                                <span>Rank</span>
                            </div>
                            {currentResults.map((result, i) => (
                                <div key={i} className="table-row">
                                    <span className="subject-name">{result.subject}</span>
                                    <span className="marks">
                                        <div className="marks-bar">
                                            <div className="bar-fill" style={{ width: `${(result.marks / result.total) * 100}%` }}></div>
                                        </div>
                                        <span className="marks-text">{result.marks}/{result.total}</span>
                                    </span>
                                    <span className="grade" style={{ color: getGradeColor(result.grade) }}>{result.grade}</span>
                                    <span className="rank">#{result.rank}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Performance Analysis */}
                    <div className="analysis-card">
                        <h3>Performance Analysis</h3>
                        <div className="analysis-grid">
                            <div className="analysis-item">
                                <span className="analysis-label">Highest Scoring Subject</span>
                                <span className="analysis-value">Computer Science (95%)</span>
                            </div>
                            <div className="analysis-item">
                                <span className="analysis-label">Needs Improvement</span>
                                <span className="analysis-value">Social Studies (78%)</span>
                            </div>
                            <div className="analysis-item">
                                <span className="analysis-label">Compared to Last Exam</span>
                                <span className="analysis-value positive">↑ 4.2% improvement</span>
                            </div>
                            <div className="analysis-item">
                                <span className="analysis-label">Class Average</span>
                                <span className="analysis-value">72.5% (You're above average)</span>
                            </div>
                        </div>
                    </div>
                </>
            ) : (
                <div className="no-results">
                    <div className="no-results-icon">📊</div>
                    <h3>Results Not Yet Available</h3>
                    <p>The results for this exam will be published soon.</p>
                </div>
            )}

            <style>{`
        .results-page { max-width: 1000px; }

        .exam-tabs {
          display: flex;
          gap: 0.75rem;
          margin-bottom: 1.5rem;
          overflow-x: auto;
          padding-bottom: 0.5rem;
        }

        .exam-tab {
          padding: 1rem 1.5rem;
          background: white;
          border: 2px solid #e2e8f0;
          border-radius: 12px;
          cursor: pointer;
          display: flex;
          flex-direction: column;
          align-items: center;
          min-width: 140px;
          transition: all 0.2s;
        }

        .exam-tab:hover:not(.disabled) {
          border-color: #3b82f6;
        }

        .exam-tab.active {
          background: linear-gradient(135deg, #1e40af 0%, #3b82f6 100%);
          border-color: transparent;
          color: white;
        }

        .exam-tab.disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .tab-name { font-weight: 600; font-size: 0.9rem; }
        .tab-date { font-size: 0.75rem; opacity: 0.7; margin-top: 0.25rem; }

        .summary-card {
          background: linear-gradient(135deg, #1e40af 0%, #3b82f6 100%);
          border-radius: 16px;
          padding: 2rem;
          color: white;
          margin-bottom: 1.5rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .summary-main {
          display: flex;
          align-items: center;
          gap: 1.5rem;
        }

        .summary-circle {
          width: 100px;
          height: 100px;
          position: relative;
        }

        .summary-circle svg { transform: rotate(-90deg); }

        .percentage {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          font-size: 1.5rem;
          font-weight: 700;
        }

        .summary-info h2 { font-size: 1.25rem; margin-bottom: 0.25rem; }
        .summary-info p { opacity: 0.9; }

        .summary-stats {
          display: flex;
          gap: 2rem;
        }

        .stats-item {
          text-align: center;
          padding: 0 1rem;
          border-left: 1px solid rgba(255,255,255,0.2);
        }

        .stats-item:first-child { border: none; }
        .stats-value { display: block; font-size: 1.25rem; font-weight: 700; }
        .stats-label { font-size: 0.75rem; opacity: 0.8; }

        .results-card, .analysis-card {
          background: white;
          border-radius: 12px;
          padding: 1.5rem;
          margin-bottom: 1.5rem;
          box-shadow: 0 1px 3px rgba(0,0,0,0.1);
        }

        .card-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1rem;
        }

        .card-header h3 { font-size: 1rem; font-weight: 600; }

        .download-btn {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.5rem 1rem;
          background: #1e40af;
          color: white;
          border: none;
          border-radius: 8px;
          font-size: 0.875rem;
          cursor: pointer;
        }

        .download-btn:hover { background: #1e3a8a; }

        .results-table {
          display: flex;
          flex-direction: column;
        }

        .table-header {
          display: grid;
          grid-template-columns: 2fr 3fr 1fr 1fr;
          padding: 0.75rem 1rem;
          background: #f8fafc;
          border-radius: 8px;
          font-size: 0.75rem;
          font-weight: 600;
          color: #64748b;
          text-transform: uppercase;
        }

        .table-row {
          display: grid;
          grid-template-columns: 2fr 3fr 1fr 1fr;
          padding: 1rem;
          border-bottom: 1px solid #f1f5f9;
          align-items: center;
        }

        .subject-name { font-weight: 500; }

        .marks {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .marks-bar {
          flex: 1;
          height: 8px;
          background: #e2e8f0;
          border-radius: 4px;
          overflow: hidden;
        }

        .bar-fill {
          height: 100%;
          background: linear-gradient(90deg, #1e40af 0%, #3b82f6 100%);
          border-radius: 4px;
        }

        .marks-text {
          font-size: 0.875rem;
          color: #64748b;
          min-width: 60px;
        }

        .grade {
          font-weight: 700;
          font-size: 1rem;
        }

        .rank {
          color: #64748b;
          font-size: 0.875rem;
        }

        .analysis-card h3 {
          font-size: 1rem;
          font-weight: 600;
          margin-bottom: 1rem;
        }

        .analysis-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1rem;
        }

        .analysis-item {
          padding: 1rem;
          background: #f8fafc;
          border-radius: 8px;
        }

        .analysis-label {
          display: block;
          font-size: 0.75rem;
          color: #64748b;
          margin-bottom: 0.25rem;
        }

        .analysis-value {
          font-weight: 500;
          color: #1e293b;
        }

        .analysis-value.positive { color: #16a34a; }

        .no-results {
          background: white;
          border-radius: 12px;
          padding: 4rem;
          text-align: center;
          box-shadow: 0 1px 3px rgba(0,0,0,0.1);
        }

        .no-results-icon { font-size: 4rem; margin-bottom: 1rem; }
        .no-results h3 { font-size: 1.25rem; color: #1e293b; margin-bottom: 0.5rem; }
        .no-results p { color: #64748b; }

        @media (max-width: 768px) {
          .summary-card { flex-direction: column; gap: 1.5rem; text-align: center; }
          .summary-main { flex-direction: column; }
          .summary-stats { justify-content: center; }
          .table-header, .table-row { grid-template-columns: 2fr 2fr 1fr; }
          .table-header span:last-child, .table-row .rank { display: none; }
          .analysis-grid { grid-template-columns: 1fr; }
        }
      `}</style>
        </div>
    );
}
