/**
 * NVRSS ERP - Student Timetable Page
 * Weekly schedule grid with class details
 */

import { useState } from 'react';

export default function StudentTimetable() {
    const [selectedDay, setSelectedDay] = useState(new Date().getDay() || 1);

    // Mock timetable data
    const timetable = {
        1: [ // Monday
            { time: '8:00 - 8:45', subject: 'Mathematics', teacher: 'Mr. Sharma', room: 'Room 101', type: 'theory' },
            { time: '8:45 - 9:30', subject: 'English', teacher: 'Ms. Patel', room: 'Room 102', type: 'theory' },
            { time: '9:30 - 10:15', subject: 'Science', teacher: 'Mr. Kumar', room: 'Lab 1', type: 'lab' },
            { time: '10:15 - 10:30', subject: 'Break', teacher: '', room: '', type: 'break' },
            { time: '10:30 - 11:15', subject: 'Hindi', teacher: 'Mrs. Singh', room: 'Room 103', type: 'theory' },
            { time: '11:15 - 12:00', subject: 'Social Studies', teacher: 'Mr. Verma', room: 'Room 104', type: 'theory' },
            { time: '12:00 - 12:45', subject: 'Lunch Break', teacher: '', room: '', type: 'break' },
            { time: '12:45 - 1:30', subject: 'Computer Science', teacher: 'Mrs. Gupta', room: 'Computer Lab', type: 'lab' },
            { time: '1:30 - 2:15', subject: 'Physical Education', teacher: 'Mr. Yadav', room: 'Sports Ground', type: 'sports' },
        ],
        2: [ // Tuesday
            { time: '8:00 - 8:45', subject: 'English', teacher: 'Ms. Patel', room: 'Room 102', type: 'theory' },
            { time: '8:45 - 9:30', subject: 'Mathematics', teacher: 'Mr. Sharma', room: 'Room 101', type: 'theory' },
            { time: '9:30 - 10:15', subject: 'Hindi', teacher: 'Mrs. Singh', room: 'Room 103', type: 'theory' },
            { time: '10:15 - 10:30', subject: 'Break', teacher: '', room: '', type: 'break' },
            { time: '10:30 - 11:15', subject: 'Science', teacher: 'Mr. Kumar', room: 'Lab 1', type: 'lab' },
            { time: '11:15 - 12:00', subject: 'Art & Craft', teacher: 'Mrs. Mehta', room: 'Art Room', type: 'activity' },
            { time: '12:00 - 12:45', subject: 'Lunch Break', teacher: '', room: '', type: 'break' },
            { time: '12:45 - 1:30', subject: 'Social Studies', teacher: 'Mr. Verma', room: 'Room 104', type: 'theory' },
            { time: '1:30 - 2:15', subject: 'Music', teacher: 'Mrs. Joshi', room: 'Music Room', type: 'activity' },
        ],
        3: [ // Wednesday
            { time: '8:00 - 8:45', subject: 'Science', teacher: 'Mr. Kumar', room: 'Lab 1', type: 'lab' },
            { time: '8:45 - 9:30', subject: 'Mathematics', teacher: 'Mr. Sharma', room: 'Room 101', type: 'theory' },
            { time: '9:30 - 10:15', subject: 'English', teacher: 'Ms. Patel', room: 'Room 102', type: 'theory' },
            { time: '10:15 - 10:30', subject: 'Break', teacher: '', room: '', type: 'break' },
            { time: '10:30 - 11:15', subject: 'Computer Science', teacher: 'Mrs. Gupta', room: 'Computer Lab', type: 'lab' },
            { time: '11:15 - 12:00', subject: 'Hindi', teacher: 'Mrs. Singh', room: 'Room 103', type: 'theory' },
            { time: '12:00 - 12:45', subject: 'Lunch Break', teacher: '', room: '', type: 'break' },
            { time: '12:45 - 1:30', subject: 'Physical Education', teacher: 'Mr. Yadav', room: 'Sports Ground', type: 'sports' },
            { time: '1:30 - 2:15', subject: 'Library', teacher: 'Mrs. Das', room: 'Library', type: 'activity' },
        ],
        4: [ // Thursday
            { time: '8:00 - 8:45', subject: 'Hindi', teacher: 'Mrs. Singh', room: 'Room 103', type: 'theory' },
            { time: '8:45 - 9:30', subject: 'English', teacher: 'Ms. Patel', room: 'Room 102', type: 'theory' },
            { time: '9:30 - 10:15', subject: 'Mathematics', teacher: 'Mr. Sharma', room: 'Room 101', type: 'theory' },
            { time: '10:15 - 10:30', subject: 'Break', teacher: '', room: '', type: 'break' },
            { time: '10:30 - 11:15', subject: 'Social Studies', teacher: 'Mr. Verma', room: 'Room 104', type: 'theory' },
            { time: '11:15 - 12:00', subject: 'Science', teacher: 'Mr. Kumar', room: 'Lab 1', type: 'lab' },
            { time: '12:00 - 12:45', subject: 'Lunch Break', teacher: '', room: '', type: 'break' },
            { time: '12:45 - 1:30', subject: 'Art & Craft', teacher: 'Mrs. Mehta', room: 'Art Room', type: 'activity' },
            { time: '1:30 - 2:15', subject: 'General Knowledge', teacher: 'Mr. Roy', room: 'Room 105', type: 'theory' },
        ],
        5: [ // Friday
            { time: '8:00 - 8:45', subject: 'Mathematics', teacher: 'Mr. Sharma', room: 'Room 101', type: 'theory' },
            { time: '8:45 - 9:30', subject: 'Science', teacher: 'Mr. Kumar', room: 'Lab 1', type: 'lab' },
            { time: '9:30 - 10:15', subject: 'English', teacher: 'Ms. Patel', room: 'Room 102', type: 'theory' },
            { time: '10:15 - 10:30', subject: 'Break', teacher: '', room: '', type: 'break' },
            { time: '10:30 - 11:15', subject: 'Hindi', teacher: 'Mrs. Singh', room: 'Room 103', type: 'theory' },
            { time: '11:15 - 12:00', subject: 'Computer Science', teacher: 'Mrs. Gupta', room: 'Computer Lab', type: 'lab' },
            { time: '12:00 - 12:45', subject: 'Lunch Break', teacher: '', room: '', type: 'break' },
            { time: '12:45 - 1:30', subject: 'Social Studies', teacher: 'Mr. Verma', room: 'Room 104', type: 'theory' },
            { time: '1:30 - 2:15', subject: 'Assembly/Activities', teacher: 'All Teachers', room: 'Assembly Hall', type: 'activity' },
        ],
        6: [ // Saturday
            { time: '8:00 - 8:45', subject: 'English', teacher: 'Ms. Patel', room: 'Room 102', type: 'theory' },
            { time: '8:45 - 9:30', subject: 'Mathematics', teacher: 'Mr. Sharma', room: 'Room 101', type: 'theory' },
            { time: '9:30 - 10:15', subject: 'Science', teacher: 'Mr. Kumar', room: 'Lab 1', type: 'lab' },
            { time: '10:15 - 10:30', subject: 'Break', teacher: '', room: '', type: 'break' },
            { time: '10:30 - 11:15', subject: 'Sports/Games', teacher: 'Mr. Yadav', room: 'Sports Ground', type: 'sports' },
            { time: '11:15 - 12:00', subject: 'Club Activities', teacher: 'Various', room: 'Various', type: 'activity' },
        ],
    };

    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const today = new Date().getDay();

    const getTypeColor = (type: string) => {
        switch (type) {
            case 'theory': return '#1e40af';
            case 'lab': return '#7c3aed';
            case 'break': return '#64748b';
            case 'sports': return '#16a34a';
            case 'activity': return '#d97706';
            default: return '#64748b';
        }
    };

    return (
        <div className="timetable-page">
            {/* Day Selector */}
            <div className="day-selector">
                {[1, 2, 3, 4, 5, 6].map(day => (
                    <button
                        key={day}
                        className={`day-btn ${selectedDay === day ? 'active' : ''} ${today === day ? 'today' : ''}`}
                        onClick={() => setSelectedDay(day)}
                    >
                        <span className="day-name">{days[day].slice(0, 3)}</span>
                        <span className="day-full">{days[day]}</span>
                    </button>
                ))}
            </div>

            {/* Schedule */}
            <div className="schedule-card">
                <div className="schedule-header">
                    <h2>{days[selectedDay]}'s Schedule</h2>
                    <span className="date">
                        {new Date(new Date().setDate(new Date().getDate() - today + selectedDay)).toLocaleDateString('en-IN', {
                            day: 'numeric',
                            month: 'long',
                            year: 'numeric',
                        })}
                    </span>
                </div>

                <div className="schedule-timeline">
                    {(timetable[selectedDay as keyof typeof timetable] || []).map((period, index) => (
                        <div
                            key={index}
                            className={`period-item ${period.type}`}
                            style={{ '--type-color': getTypeColor(period.type) } as React.CSSProperties}
                        >
                            <div className="period-time">
                                <span>{period.time.split(' - ')[0]}</span>
                                <span className="time-end">{period.time.split(' - ')[1]}</span>
                            </div>
                            <div className="period-content">
                                <div className="period-main">
                                    <h4>{period.subject}</h4>
                                    {period.teacher && (
                                        <p className="period-teacher">{period.teacher}</p>
                                    )}
                                </div>
                                {period.room && (
                                    <div className="period-room">
                                        <span>📍 {period.room}</span>
                                    </div>
                                )}
                            </div>
                            <div className="period-type">
                                <span className="type-badge">{period.type}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Legend */}
            <div className="legend-card">
                <h3>Subject Types</h3>
                <div className="legend-grid">
                    <div className="legend-item" style={{ '--color': '#1e40af' } as React.CSSProperties}>
                        <span className="legend-dot"></span> Theory
                    </div>
                    <div className="legend-item" style={{ '--color': '#7c3aed' } as React.CSSProperties}>
                        <span className="legend-dot"></span> Practical/Lab
                    </div>
                    <div className="legend-item" style={{ '--color': '#16a34a' } as React.CSSProperties}>
                        <span className="legend-dot"></span> Sports
                    </div>
                    <div className="legend-item" style={{ '--color': '#d97706' } as React.CSSProperties}>
                        <span className="legend-dot"></span> Activity
                    </div>
                    <div className="legend-item" style={{ '--color': '#64748b' } as React.CSSProperties}>
                        <span className="legend-dot"></span> Break
                    </div>
                </div>
            </div>

            <style>{`
        .timetable-page { max-width: 900px; }

        .day-selector {
          display: flex;
          gap: 0.5rem;
          margin-bottom: 1.5rem;
          background: white;
          padding: 0.5rem;
          border-radius: 12px;
          box-shadow: 0 1px 3px rgba(0,0,0,0.1);
        }

        .day-btn {
          flex: 1;
          padding: 0.75rem;
          border: none;
          background: transparent;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.2s;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .day-btn:hover { background: #f1f5f9; }

        .day-btn.active {
          background: linear-gradient(135deg, #1e40af 0%, #3b82f6 100%);
          color: white;
        }

        .day-btn.today:not(.active) {
          border: 2px solid #1e40af;
        }

        .day-name {
          font-size: 0.75rem;
          text-transform: uppercase;
          font-weight: 600;
        }

        .day-full {
          font-size: 0.7rem;
          opacity: 0.7;
          display: none;
        }

        .schedule-card {
          background: white;
          border-radius: 12px;
          padding: 1.5rem;
          margin-bottom: 1.5rem;
          box-shadow: 0 1px 3px rgba(0,0,0,0.1);
        }

        .schedule-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1.5rem;
          padding-bottom: 1rem;
          border-bottom: 1px solid #e2e8f0;
        }

        .schedule-header h2 {
          font-size: 1.25rem;
          font-weight: 600;
          color: #1e293b;
        }

        .date {
          color: #64748b;
          font-size: 0.875rem;
        }

        .schedule-timeline {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .period-item {
          display: flex;
          align-items: stretch;
          background: #f8fafc;
          border-radius: 12px;
          overflow: hidden;
          border-left: 4px solid var(--type-color);
        }

        .period-item.break {
          background: #f1f5f9;
          opacity: 0.7;
        }

        .period-time {
          width: 80px;
          padding: 1rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
          background: rgba(0,0,0,0.02);
          text-align: center;
          font-size: 0.875rem;
          font-weight: 500;
          color: #64748b;
        }

        .time-end {
          font-size: 0.75rem;
          opacity: 0.7;
        }

        .period-content {
          flex: 1;
          padding: 1rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .period-main h4 {
          font-size: 1rem;
          font-weight: 600;
          color: #1e293b;
          margin-bottom: 0.25rem;
        }

        .period-teacher {
          font-size: 0.875rem;
          color: #64748b;
        }

        .period-room {
          font-size: 0.875rem;
          color: #64748b;
        }

        .period-type {
          padding: 1rem;
          display: flex;
          align-items: center;
        }

        .type-badge {
          padding: 0.25rem 0.75rem;
          background: var(--type-color);
          color: white;
          border-radius: 20px;
          font-size: 0.7rem;
          text-transform: uppercase;
          font-weight: 600;
        }

        .legend-card {
          background: white;
          border-radius: 12px;
          padding: 1.25rem;
          box-shadow: 0 1px 3px rgba(0,0,0,0.1);
        }

        .legend-card h3 {
          font-size: 0.875rem;
          font-weight: 600;
          margin-bottom: 1rem;
          color: #64748b;
        }

        .legend-grid {
          display: flex;
          flex-wrap: wrap;
          gap: 1.5rem;
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
          background: var(--color);
        }

        @media (max-width: 768px) {
          .period-item {
            flex-direction: column;
            border-left: none;
            border-top: 4px solid var(--type-color);
          }

          .period-time {
            width: 100%;
            flex-direction: row;
            justify-content: center;
            gap: 0.5rem;
          }

          .period-content {
            flex-direction: column;
            align-items: flex-start;
            gap: 0.5rem;
          }

          .period-type {
            width: 100%;
            justify-content: flex-end;
            padding-top: 0;
          }
        }
      `}</style>
        </div>
    );
}
