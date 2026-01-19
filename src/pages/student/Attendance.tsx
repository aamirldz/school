/**
 * NVRSS ERP - Student Attendance Page
 * Calendar view with attendance statistics
 */

import { useState } from 'react';

export default function StudentAttendance() {
    const [currentMonth, setCurrentMonth] = useState(new Date());

    // Mock attendance data
    const attendanceData: Record<string, 'present' | 'absent' | 'late' | 'holiday'> = {
        '2026-01-01': 'holiday',
        '2026-01-02': 'present',
        '2026-01-03': 'present',
        '2026-01-06': 'present',
        '2026-01-07': 'present',
        '2026-01-08': 'absent',
        '2026-01-09': 'present',
        '2026-01-10': 'present',
        '2026-01-13': 'present',
        '2026-01-14': 'late',
        '2026-01-15': 'present',
        '2026-01-16': 'present',
        '2026-01-17': 'present',
        '2026-01-20': 'present',
    };

    const stats = {
        totalDays: 180,
        present: 165,
        absent: 8,
        late: 5,
        holidays: 2,
        percentage: 91.7,
    };

    const getDaysInMonth = (date: Date) => {
        const year = date.getFullYear();
        const month = date.getMonth();
        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);
        const days = [];

        // Add empty cells for days before the first day of the month
        for (let i = 0; i < firstDay.getDay(); i++) {
            days.push(null);
        }

        // Add all days of the month
        for (let i = 1; i <= lastDay.getDate(); i++) {
            days.push(new Date(year, month, i));
        }

        return days;
    };

    const formatDate = (date: Date) => {
        return date.toISOString().split('T')[0];
    };

    const getAttendanceStatus = (date: Date) => {
        const dateStr = formatDate(date);
        return attendanceData[dateStr] || null;
    };

    const navigateMonth = (direction: number) => {
        setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + direction, 1));
    };

    const days = getDaysInMonth(currentMonth);
    const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    return (
        <div className="attendance-page">
            {/* Stats Cards */}
            <div className="stats-row">
                <div className="stat-card main">
                    <div className="stat-circle">
                        <svg viewBox="0 0 36 36">
                            <path
                                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                fill="none"
                                stroke="#e2e8f0"
                                strokeWidth="3"
                            />
                            <path
                                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                fill="none"
                                stroke="#1e40af"
                                strokeWidth="3"
                                strokeDasharray={`${stats.percentage}, 100`}
                            />
                        </svg>
                        <span className="stat-percentage">{stats.percentage}%</span>
                    </div>
                    <div className="stat-info">
                        <span className="stat-label">Overall Attendance</span>
                        <span className="stat-detail">{stats.present} of {stats.totalDays} days</span>
                    </div>
                </div>

                <div className="stat-card">
                    <div className="stat-icon present">✓</div>
                    <div className="stat-info">
                        <span className="stat-value">{stats.present}</span>
                        <span className="stat-label">Present</span>
                    </div>
                </div>

                <div className="stat-card">
                    <div className="stat-icon absent">✗</div>
                    <div className="stat-info">
                        <span className="stat-value">{stats.absent}</span>
                        <span className="stat-label">Absent</span>
                    </div>
                </div>

                <div className="stat-card">
                    <div className="stat-icon late">⏰</div>
                    <div className="stat-info">
                        <span className="stat-value">{stats.late}</span>
                        <span className="stat-label">Late</span>
                    </div>
                </div>
            </div>

            {/* Calendar */}
            <div className="calendar-card">
                <div className="calendar-header">
                    <h3>Attendance Calendar</h3>
                    <div className="calendar-nav">
                        <button onClick={() => navigateMonth(-1)}>←</button>
                        <span>{currentMonth.toLocaleDateString('en-IN', { month: 'long', year: 'numeric' })}</span>
                        <button onClick={() => navigateMonth(1)}>→</button>
                    </div>
                </div>

                <div className="calendar-grid">
                    {weekDays.map(day => (
                        <div key={day} className="calendar-weekday">{day}</div>
                    ))}
                    {days.map((date, index) => (
                        <div
                            key={index}
                            className={`calendar-day ${date ? getAttendanceStatus(date) || '' : 'empty'} ${date && date.toDateString() === new Date().toDateString() ? 'today' : ''
                                }`}
                        >
                            {date && (
                                <>
                                    <span className="day-number">{date.getDate()}</span>
                                    {getAttendanceStatus(date) && (
                                        <span className="day-status">
                                            {getAttendanceStatus(date) === 'present' && '✓'}
                                            {getAttendanceStatus(date) === 'absent' && '✗'}
                                            {getAttendanceStatus(date) === 'late' && '⏰'}
                                            {getAttendanceStatus(date) === 'holiday' && '🎉'}
                                        </span>
                                    )}
                                </>
                            )}
                        </div>
                    ))}
                </div>

                <div className="calendar-legend">
                    <div className="legend-item"><span className="dot present"></span> Present</div>
                    <div className="legend-item"><span className="dot absent"></span> Absent</div>
                    <div className="legend-item"><span className="dot late"></span> Late</div>
                    <div className="legend-item"><span className="dot holiday"></span> Holiday</div>
                </div>
            </div>

            {/* Monthly Summary */}
            <div className="summary-card">
                <h3>Monthly Summary</h3>
                <div className="summary-grid">
                    {['September', 'October', 'November', 'December', 'January'].map((month, i) => (
                        <div key={month} className="summary-item">
                            <span className="summary-month">{month}</span>
                            <div className="summary-bar">
                                <div className="bar-fill" style={{ width: `${85 + i * 2}%` }}></div>
                            </div>
                            <span className="summary-percent">{85 + i * 2}%</span>
                        </div>
                    ))}
                </div>
            </div>

            <style>{`
        .attendance-page { max-width: 1200px; }

        .stats-row {
          display: grid;
          grid-template-columns: 2fr repeat(3, 1fr);
          gap: 1rem;
          margin-bottom: 1.5rem;
        }

        .stat-card {
          background: white;
          border-radius: 12px;
          padding: 1.5rem;
          display: flex;
          align-items: center;
          gap: 1rem;
          box-shadow: 0 1px 3px rgba(0,0,0,0.1);
        }

        .stat-card.main {
          background: linear-gradient(135deg, #1e40af 0%, #3b82f6 100%);
          color: white;
        }

        .stat-circle {
          width: 80px;
          height: 80px;
          position: relative;
        }

        .stat-circle svg {
          transform: rotate(-90deg);
        }

        .stat-percentage {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          font-size: 1.25rem;
          font-weight: 700;
        }

        .stat-icon {
          width: 48px;
          height: 48px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.25rem;
        }

        .stat-icon.present { background: #dcfce7; }
        .stat-icon.absent { background: #fee2e2; }
        .stat-icon.late { background: #fef3c7; }

        .stat-info { display: flex; flex-direction: column; }
        .stat-value { font-size: 1.5rem; font-weight: 700; color: #1e293b; }
        .stat-label { font-size: 0.875rem; color: #64748b; }
        .stat-card.main .stat-label { color: rgba(255,255,255,0.9); }
        .stat-detail { font-size: 0.75rem; opacity: 0.8; }

        .calendar-card {
          background: white;
          border-radius: 12px;
          padding: 1.5rem;
          margin-bottom: 1.5rem;
          box-shadow: 0 1px 3px rgba(0,0,0,0.1);
        }

        .calendar-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1.5rem;
        }

        .calendar-header h3 {
          font-size: 1rem;
          font-weight: 600;
        }

        .calendar-nav {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .calendar-nav button {
          width: 32px;
          height: 32px;
          border: 1px solid #e2e8f0;
          background: white;
          border-radius: 8px;
          cursor: pointer;
          font-size: 1rem;
        }

        .calendar-nav button:hover {
          background: #f1f5f9;
        }

        .calendar-nav span {
          font-weight: 500;
          min-width: 150px;
          text-align: center;
        }

        .calendar-grid {
          display: grid;
          grid-template-columns: repeat(7, 1fr);
          gap: 0.5rem;
        }

        .calendar-weekday {
          text-align: center;
          font-size: 0.75rem;
          font-weight: 600;
          color: #64748b;
          padding: 0.5rem;
        }

        .calendar-day {
          aspect-ratio: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          border-radius: 8px;
          background: #f8fafc;
          font-size: 0.875rem;
          position: relative;
        }

        .calendar-day.empty {
          background: transparent;
        }

        .calendar-day.today {
          border: 2px solid #1e40af;
        }

        .calendar-day.present { background: #dcfce7; }
        .calendar-day.absent { background: #fee2e2; }
        .calendar-day.late { background: #fef3c7; }
        .calendar-day.holiday { background: #dbeafe; }

        .day-number { font-weight: 500; }
        .day-status { font-size: 0.7rem; }

        .calendar-legend {
          display: flex;
          justify-content: center;
          gap: 2rem;
          margin-top: 1.5rem;
          padding-top: 1rem;
          border-top: 1px solid #e2e8f0;
        }

        .legend-item {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.875rem;
          color: #64748b;
        }

        .dot {
          width: 12px;
          height: 12px;
          border-radius: 4px;
        }

        .dot.present { background: #16a34a; }
        .dot.absent { background: #dc2626; }
        .dot.late { background: #d97706; }
        .dot.holiday { background: #2563eb; }

        .summary-card {
          background: white;
          border-radius: 12px;
          padding: 1.5rem;
          box-shadow: 0 1px 3px rgba(0,0,0,0.1);
        }

        .summary-card h3 {
          font-size: 1rem;
          font-weight: 600;
          margin-bottom: 1rem;
        }

        .summary-grid {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .summary-item {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .summary-month {
          width: 80px;
          font-size: 0.875rem;
          color: #64748b;
        }

        .summary-bar {
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

        .summary-percent {
          width: 50px;
          text-align: right;
          font-weight: 600;
          color: #1e40af;
        }

        @media (max-width: 768px) {
          .stats-row {
            grid-template-columns: 1fr 1fr;
          }

          .stat-card.main {
            grid-column: 1 / -1;
          }

          .calendar-legend {
            flex-wrap: wrap;
            gap: 1rem;
          }
        }
      `}</style>
        </div>
    );
}
