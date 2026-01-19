/**
 * NVRSS ERP - Teacher Timetable Page
 * Weekly teaching schedule with class details
 */

import { useState } from 'react';

export default function TeacherTimetable() {
    const [viewMode, setViewMode] = useState<'week' | 'day'>('week');
    const [selectedDay, setSelectedDay] = useState(new Date().getDay() || 1);

    // Full week timetable data
    const timetable: Record<number, Array<{ time: string; class: string; subject: string; room: string; type: string }>> = {
        1: [ // Monday
            { time: '8:00 - 8:45', class: 'Grade 10-A', subject: 'Physics', room: 'Room 101', type: 'theory' },
            { time: '8:45 - 9:30', class: 'Grade 9-B', subject: 'Science', room: 'Room 102', type: 'theory' },
            { time: '9:30 - 10:15', class: '-', subject: 'Free Period', room: '-', type: 'free' },
            { time: '10:15 - 10:30', class: '-', subject: 'Break', room: '-', type: 'break' },
            { time: '10:30 - 11:15', class: 'Grade 11-A', subject: 'Physics', room: 'Lab 1', type: 'practical' },
            { time: '11:15 - 12:00', class: 'Grade 11-A', subject: 'Physics', room: 'Lab 1', type: 'practical' },
            { time: '12:00 - 12:45', class: '-', subject: 'Lunch Break', room: '-', type: 'break' },
            { time: '12:45 - 1:30', class: 'Grade 10-B', subject: 'Physics', room: 'Room 103', type: 'theory' },
            { time: '1:30 - 2:15', class: 'Grade 12-A', subject: 'Physics', room: 'Room 104', type: 'theory' },
        ],
        2: [ // Tuesday
            { time: '8:00 - 8:45', class: 'Grade 12-A', subject: 'Physics', room: 'Room 104', type: 'theory' },
            { time: '8:45 - 9:30', class: 'Grade 12-A', subject: 'Physics', room: 'Lab 2', type: 'practical' },
            { time: '9:30 - 10:15', class: 'Grade 12-A', subject: 'Physics', room: 'Lab 2', type: 'practical' },
            { time: '10:15 - 10:30', class: '-', subject: 'Break', room: '-', type: 'break' },
            { time: '10:30 - 11:15', class: 'Grade 10-A', subject: 'Physics', room: 'Room 101', type: 'theory' },
            { time: '11:15 - 12:00', class: 'Grade 9-A', subject: 'Science', room: 'Room 105', type: 'theory' },
            { time: '12:00 - 12:45', class: '-', subject: 'Lunch Break', room: '-', type: 'break' },
            { time: '12:45 - 1:30', class: '-', subject: 'Free Period', room: '-', type: 'free' },
            { time: '1:30 - 2:15', class: 'Grade 10-B', subject: 'Physics', room: 'Room 103', type: 'theory' },
        ],
        3: [ // Wednesday
            { time: '8:00 - 8:45', class: 'Grade 9-A', subject: 'Science', room: 'Room 105', type: 'theory' },
            { time: '8:45 - 9:30', class: 'Grade 9-B', subject: 'Science', room: 'Room 102', type: 'theory' },
            { time: '9:30 - 10:15', class: 'Grade 10-A', subject: 'Physics', room: 'Lab 1', type: 'practical' },
            { time: '10:15 - 10:30', class: '-', subject: 'Break', room: '-', type: 'break' },
            { time: '10:30 - 11:15', class: 'Grade 10-A', subject: 'Physics', room: 'Lab 1', type: 'practical' },
            { time: '11:15 - 12:00', class: 'Grade 11-A', subject: 'Physics', room: 'Room 106', type: 'theory' },
            { time: '12:00 - 12:45', class: '-', subject: 'Lunch Break', room: '-', type: 'break' },
            { time: '12:45 - 1:30', class: 'Grade 12-A', subject: 'Physics', room: 'Room 104', type: 'theory' },
            { time: '1:30 - 2:15', class: '-', subject: 'Staff Meeting', room: 'Conference Hall', type: 'meeting' },
        ],
        4: [ // Thursday
            { time: '8:00 - 8:45', class: 'Grade 10-B', subject: 'Physics', room: 'Room 103', type: 'theory' },
            { time: '8:45 - 9:30', class: 'Grade 11-A', subject: 'Physics', room: 'Room 106', type: 'theory' },
            { time: '9:30 - 10:15', class: 'Grade 10-B', subject: 'Physics', room: 'Lab 1', type: 'practical' },
            { time: '10:15 - 10:30', class: '-', subject: 'Break', room: '-', type: 'break' },
            { time: '10:30 - 11:15', class: 'Grade 10-B', subject: 'Physics', room: 'Lab 1', type: 'practical' },
            { time: '11:15 - 12:00', class: 'Grade 9-A', subject: 'Science', room: 'Room 105', type: 'theory' },
            { time: '12:00 - 12:45', class: '-', subject: 'Lunch Break', room: '-', type: 'break' },
            { time: '12:45 - 1:30', class: 'Grade 9-B', subject: 'Science', room: 'Room 102', type: 'theory' },
            { time: '1:30 - 2:15', class: '-', subject: 'Free Period', room: '-', type: 'free' },
        ],
        5: [ // Friday
            { time: '8:00 - 8:45', class: 'Grade 11-A', subject: 'Physics', room: 'Lab 2', type: 'practical' },
            { time: '8:45 - 9:30', class: 'Grade 11-A', subject: 'Physics', room: 'Lab 2', type: 'practical' },
            { time: '9:30 - 10:15', class: 'Grade 12-A', subject: 'Physics', room: 'Room 104', type: 'theory' },
            { time: '10:15 - 10:30', class: '-', subject: 'Break', room: '-', type: 'break' },
            { time: '10:30 - 11:15', class: 'Grade 10-A', subject: 'Physics', room: 'Room 101', type: 'theory' },
            { time: '11:15 - 12:00', class: 'Grade 10-B', subject: 'Physics', room: 'Room 103', type: 'theory' },
            { time: '12:00 - 12:45', class: '-', subject: 'Lunch Break', room: '-', type: 'break' },
            { time: '12:45 - 1:30', class: 'Grade 9-A', subject: 'Science', room: 'Lab 1', type: 'practical' },
            { time: '1:30 - 2:15', class: 'Grade 9-B', subject: 'Science', room: 'Lab 1', type: 'practical' },
        ],
        6: [ // Saturday
            { time: '8:00 - 8:45', class: 'Grade 12-A', subject: 'Physics', room: 'Room 104', type: 'theory' },
            { time: '8:45 - 9:30', class: 'Grade 11-A', subject: 'Physics', room: 'Room 106', type: 'theory' },
            { time: '9:30 - 10:15', class: 'Grade 10-A', subject: 'Physics', room: 'Room 101', type: 'theory' },
            { time: '10:15 - 10:30', class: '-', subject: 'Break', room: '-', type: 'break' },
            { time: '10:30 - 11:15', class: '-', subject: 'Exam Duty', room: 'Exam Hall', type: 'duty' },
            { time: '11:15 - 12:00', class: '-', subject: 'Exam Duty', room: 'Exam Hall', type: 'duty' },
        ],
    };

    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const timeSlots = ['8:00', '8:45', '9:30', '10:15', '10:30', '11:15', '12:00', '12:45', '1:30'];

    const getTypeColor = (type: string) => {
        switch (type) {
            case 'theory': return { bg: '#dbeafe', color: '#1e40af' };
            case 'practical': return { bg: '#dcfce7', color: '#16a34a' };
            case 'free': return { bg: '#f1f5f9', color: '#64748b' };
            case 'break': return { bg: '#fef3c7', color: '#d97706' };
            case 'meeting': return { bg: '#ede9fe', color: '#7c3aed' };
            case 'duty': return { bg: '#fee2e2', color: '#dc2626' };
            default: return { bg: '#f1f5f9', color: '#64748b' };
        }
    };

    // Calculate stats
    const stats = {
        totalPeriods: Object.values(timetable).flat().filter(p => p.type === 'theory' || p.type === 'practical').length,
        theoryPeriods: Object.values(timetable).flat().filter(p => p.type === 'theory').length,
        practicalPeriods: Object.values(timetable).flat().filter(p => p.type === 'practical').length,
        freePeriods: Object.values(timetable).flat().filter(p => p.type === 'free').length,
    };

    return (
        <div className="timetable-page">
            {/* Header */}
            <div className="page-header">
                <div className="header-left">
                    <h2>My Timetable</h2>
                    <p>Academic Year 2025-26</p>
                </div>
                <div className="header-right">
                    <div className="view-toggle">
                        <button className={viewMode === 'week' ? 'active' : ''} onClick={() => setViewMode('week')}>Week View</button>
                        <button className={viewMode === 'day' ? 'active' : ''} onClick={() => setViewMode('day')}>Day View</button>
                    </div>
                    <button className="print-btn">🖨️ Print</button>
                </div>
            </div>

            {/* Stats */}
            <div className="stats-row">
                <div className="stat-card"><span className="stat-value">{stats.totalPeriods}</span><span className="stat-label">Total Classes</span></div>
                <div className="stat-card"><span className="stat-value">{stats.theoryPeriods}</span><span className="stat-label">Theory</span></div>
                <div className="stat-card"><span className="stat-value">{stats.practicalPeriods}</span><span className="stat-label">Practical</span></div>
                <div className="stat-card"><span className="stat-value">{stats.freePeriods}</span><span className="stat-label">Free Periods</span></div>
            </div>

            {viewMode === 'week' ? (
                /* Week View - Grid */
                <div className="week-view">
                    <div className="timetable-grid">
                        <div className="grid-header">
                            <div className="time-header">Time</div>
                            {[1, 2, 3, 4, 5, 6].map(day => (
                                <div key={day} className={`day-header ${day === new Date().getDay() ? 'today' : ''}`}>
                                    {days[day].slice(0, 3)}
                                </div>
                            ))}
                        </div>
                        {timeSlots.map((time, i) => (
                            <div key={i} className="grid-row">
                                <div className="time-cell">{time}</div>
                                {[1, 2, 3, 4, 5, 6].map(day => {
                                    const period = timetable[day]?.find(p => p.time.startsWith(time));
                                    if (!period) return <div key={day} className="period-cell empty"></div>;
                                    const colors = getTypeColor(period.type);
                                    return (
                                        <div
                                            key={day}
                                            className={`period-cell ${period.type}`}
                                            style={{ background: colors.bg, color: colors.color }}
                                        >
                                            {period.type !== 'break' && period.type !== 'free' && (
                                                <>
                                                    <span className="period-class">{period.class}</span>
                                                    <span className="period-subject">{period.subject}</span>
                                                    <span className="period-room">{period.room}</span>
                                                </>
                                            )}
                                            {(period.type === 'break' || period.type === 'free') && (
                                                <span className="period-break">{period.subject}</span>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                /* Day View - Timeline */
                <div className="day-view">
                    <div className="day-selector">
                        {[1, 2, 3, 4, 5, 6].map(day => (
                            <button
                                key={day}
                                className={`day-btn ${selectedDay === day ? 'active' : ''} ${day === new Date().getDay() ? 'today' : ''}`}
                                onClick={() => setSelectedDay(day)}
                            >
                                {days[day]}
                            </button>
                        ))}
                    </div>
                    <div className="timeline">
                        {(timetable[selectedDay] || []).map((period, i) => {
                            const colors = getTypeColor(period.type);
                            return (
                                <div key={i} className="timeline-item" style={{ borderLeftColor: colors.color }}>
                                    <div className="timeline-time">{period.time}</div>
                                    <div className="timeline-content" style={{ background: colors.bg }}>
                                        <div className="timeline-main">
                                            <h4>{period.subject}</h4>
                                            {period.class !== '-' && <p>{period.class} • {period.room}</p>}
                                        </div>
                                        <span className="type-badge" style={{ background: colors.color }}>{period.type}</span>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}

            {/* Legend */}
            <div className="legend">
                {[
                    { type: 'theory', label: 'Theory Class' },
                    { type: 'practical', label: 'Practical/Lab' },
                    { type: 'free', label: 'Free Period' },
                    { type: 'meeting', label: 'Meeting' },
                    { type: 'duty', label: 'Exam/Duty' },
                ].map(item => (
                    <div key={item.type} className="legend-item">
                        <span className="legend-dot" style={{ background: getTypeColor(item.type).color }}></span>
                        {item.label}
                    </div>
                ))}
            </div>

            <style>{`
        .timetable-page { max-width: 1400px; }

        .page-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1.5rem;
        }

        .header-left h2 { font-size: 1.25rem; margin-bottom: 0.25rem; }
        .header-left p { color: #64748b; font-size: 0.875rem; }

        .header-right { display: flex; gap: 1rem; }

        .view-toggle {
          display: flex;
          background: white;
          border-radius: 8px;
          overflow: hidden;
          box-shadow: 0 1px 3px rgba(0,0,0,0.1);
        }

        .view-toggle button {
          padding: 0.5rem 1rem;
          border: none;
          background: white;
          cursor: pointer;
          font-size: 0.875rem;
        }

        .view-toggle button.active { background: #1e40af; color: white; }

        .print-btn {
          padding: 0.5rem 1rem;
          background: white;
          border: 1px solid #e2e8f0;
          border-radius: 8px;
          cursor: pointer;
        }

        .stats-row {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
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

        .stat-value { display: block; font-size: 1.5rem; font-weight: 700; color: #1e40af; }
        .stat-label { font-size: 0.75rem; color: #64748b; }

        .week-view {
          background: white;
          border-radius: 12px;
          padding: 1rem;
          overflow-x: auto;
          box-shadow: 0 1px 3px rgba(0,0,0,0.1);
        }

        .timetable-grid { min-width: 800px; }

        .grid-header {
          display: grid;
          grid-template-columns: 80px repeat(6, 1fr);
          gap: 0.5rem;
          margin-bottom: 0.5rem;
        }

        .time-header, .day-header {
          padding: 0.75rem;
          font-weight: 600;
          text-align: center;
          font-size: 0.875rem;
        }

        .day-header { background: #f8fafc; border-radius: 8px; }
        .day-header.today { background: #1e40af; color: white; }

        .grid-row {
          display: grid;
          grid-template-columns: 80px repeat(6, 1fr);
          gap: 0.5rem;
          margin-bottom: 0.5rem;
        }

        .time-cell {
          padding: 0.75rem 0.5rem;
          font-size: 0.75rem;
          color: #64748b;
          text-align: center;
        }

        .period-cell {
          padding: 0.5rem;
          border-radius: 8px;
          min-height: 60px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          font-size: 0.75rem;
        }

        .period-cell.empty { background: #f8fafc; }

        .period-class { font-weight: 600; }
        .period-subject { opacity: 0.9; }
        .period-room { opacity: 0.7; font-size: 0.65rem; }
        .period-break { text-align: center; font-style: italic; }

        .day-view { background: white; border-radius: 12px; padding: 1.5rem; box-shadow: 0 1px 3px rgba(0,0,0,0.1); }

        .day-selector { display: flex; gap: 0.5rem; margin-bottom: 1.5rem; }

        .day-btn {
          flex: 1;
          padding: 0.75rem;
          border: 1px solid #e2e8f0;
          background: white;
          border-radius: 8px;
          cursor: pointer;
          font-weight: 500;
        }

        .day-btn.active { background: #1e40af; color: white; border-color: #1e40af; }
        .day-btn.today:not(.active) { border-color: #1e40af; color: #1e40af; }

        .timeline { display: flex; flex-direction: column; gap: 0.75rem; }

        .timeline-item {
          display: flex;
          gap: 1rem;
          border-left: 4px solid;
          padding-left: 1rem;
        }

        .timeline-time {
          width: 100px;
          font-size: 0.875rem;
          color: #64748b;
          flex-shrink: 0;
        }

        .timeline-content {
          flex: 1;
          padding: 1rem;
          border-radius: 8px;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .timeline-main h4 { margin-bottom: 0.25rem; }
        .timeline-main p { font-size: 0.875rem; color: #64748b; }

        .type-badge {
          padding: 0.25rem 0.75rem;
          border-radius: 20px;
          font-size: 0.7rem;
          color: white;
          text-transform: uppercase;
        }

        .legend {
          display: flex;
          justify-content: center;
          gap: 2rem;
          margin-top: 1.5rem;
          padding-top: 1rem;
        }

        .legend-item {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.875rem;
          color: #64748b;
        }

        .legend-dot {
          width: 12px;
          height: 12px;
          border-radius: 4px;
        }

        @media (max-width: 768px) {
          .page-header { flex-direction: column; gap: 1rem; }
          .stats-row { grid-template-columns: repeat(2, 1fr); }
          .day-selector { flex-wrap: wrap; }
          .day-btn { flex: none; width: calc(33.33% - 0.33rem); }
        }
      `}</style>
        </div>
    );
}
