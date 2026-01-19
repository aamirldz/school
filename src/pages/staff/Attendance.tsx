/**
 * NVRSS ERP - Staff Attendance Page
 */
import { useState } from 'react';

export default function StaffAttendance() {
    const [currentMonth, setCurrentMonth] = useState(new Date());

    const attendanceData: Record<string, 'present' | 'absent' | 'late' | 'leave' | 'holiday'> = {
        '2026-01-02': 'present', '2026-01-03': 'present', '2026-01-06': 'present', '2026-01-07': 'present',
        '2026-01-08': 'late', '2026-01-09': 'present', '2026-01-10': 'present', '2026-01-13': 'present',
        '2026-01-14': 'present', '2026-01-15': 'present', '2026-01-16': 'leave', '2026-01-17': 'present', '2026-01-20': 'present',
    };

    const stats = { present: 12, absent: 0, late: 1, leaves: 1, percentage: 96 };
    const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    const getDaysInMonth = (date: Date) => {
        const year = date.getFullYear(), month = date.getMonth();
        const firstDay = new Date(year, month, 1), lastDay = new Date(year, month + 1, 0);
        const days: (Date | null)[] = [];
        for (let i = 0; i < firstDay.getDay(); i++) days.push(null);
        for (let i = 1; i <= lastDay.getDate(); i++) days.push(new Date(year, month, i));
        return days;
    };

    const getStatus = (date: Date) => attendanceData[date.toISOString().split('T')[0]] || null;

    return (
        <div className="attendance-page">
            <div className="stats-row">
                <div className="stat-card main">
                    <div className="stat-circle"><span>{stats.percentage}%</span></div>
                    <div className="stat-info"><span className="stat-label">Attendance Rate</span><span className="stat-detail">{stats.present} of {stats.present + stats.absent + stats.late} days</span></div>
                </div>
                <div className="stat-card"><div className="stat-icon green">✓</div><div className="stat-info"><span className="stat-value">{stats.present}</span><span className="stat-label">Present</span></div></div>
                <div className="stat-card"><div className="stat-icon yellow">⏰</div><div className="stat-info"><span className="stat-value">{stats.late}</span><span className="stat-label">Late</span></div></div>
                <div className="stat-card"><div className="stat-icon blue">📅</div><div className="stat-info"><span className="stat-value">{stats.leaves}</span><span className="stat-label">Leaves</span></div></div>
            </div>

            <div className="calendar-card">
                <div className="calendar-header">
                    <h3>Attendance Calendar</h3>
                    <div className="calendar-nav">
                        <button onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))}>←</button>
                        <span>{currentMonth.toLocaleDateString('en-IN', { month: 'long', year: 'numeric' })}</span>
                        <button onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))}>→</button>
                    </div>
                </div>
                <div className="calendar-grid">
                    {weekDays.map(day => <div key={day} className="calendar-weekday">{day}</div>)}
                    {getDaysInMonth(currentMonth).map((date, idx) => {
                        const status = date ? getStatus(date) : null;
                        return (
                            <div key={idx} className={`calendar-day ${date ? status || '' : 'empty'} ${date?.toDateString() === new Date().toDateString() ? 'today' : ''}`}>
                                {date && <><span className="day-number">{date.getDate()}</span>{status && <span className="day-status">{status === 'present' ? '✓' : status === 'late' ? '⏰' : status === 'leave' ? '📅' : ''}</span>}</>}
                            </div>
                        );
                    })}
                </div>
                <div className="calendar-legend">
                    <div className="legend-item"><span className="dot present"></span> Present</div>
                    <div className="legend-item"><span className="dot late"></span> Late</div>
                    <div className="legend-item"><span className="dot leave"></span> Leave</div>
                </div>
            </div>

            <style>{`
        .attendance-page { max-width: 1000px; }
        .stats-row { display: grid; grid-template-columns: 2fr repeat(3, 1fr); gap: 1rem; margin-bottom: 1.5rem; }
        .stat-card { background: white; border-radius: 12px; padding: 1.25rem; display: flex; align-items: center; gap: 1rem; box-shadow: 0 1px 3px rgba(0,0,0,0.1); }
        .stat-card.main { background: linear-gradient(135deg, #059669 0%, #10b981 100%); color: white; }
        .stat-circle { width: 60px; height: 60px; border: 4px solid rgba(255,255,255,0.3); border-radius: 50%; display: flex; align-items: center; justify-content: center; }
        .stat-circle span { font-size: 1.25rem; font-weight: 700; }
        .stat-icon { width: 40px; height: 40px; border-radius: 10px; display: flex; align-items: center; justify-content: center; font-size: 1rem; }
        .stat-icon.green { background: #dcfce7; }
        .stat-icon.yellow { background: #fef3c7; }
        .stat-icon.blue { background: #dbeafe; }
        .stat-info { display: flex; flex-direction: column; }
        .stat-value { font-size: 1.5rem; font-weight: 700; color: #1e293b; }
        .stat-label { font-size: 0.8rem; color: #64748b; }
        .stat-card.main .stat-label { color: rgba(255,255,255,0.9); }
        .stat-detail { font-size: 0.75rem; opacity: 0.8; }
        .calendar-card { background: white; border-radius: 12px; padding: 1.5rem; box-shadow: 0 1px 3px rgba(0,0,0,0.1); }
        .calendar-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem; }
        .calendar-header h3 { font-size: 1rem; font-weight: 600; }
        .calendar-nav { display: flex; align-items: center; gap: 1rem; }
        .calendar-nav button { width: 32px; height: 32px; border: 1px solid #e2e8f0; background: white; border-radius: 6px; cursor: pointer; }
        .calendar-nav span { font-weight: 500; min-width: 120px; text-align: center; }
        .calendar-grid { display: grid; grid-template-columns: repeat(7, 1fr); gap: 0.5rem; }
        .calendar-weekday { text-align: center; font-size: 0.75rem; font-weight: 600; color: #64748b; padding: 0.5rem; }
        .calendar-day { aspect-ratio: 1; display: flex; flex-direction: column; align-items: center; justify-content: center; border-radius: 8px; background: #f8fafc; font-size: 0.875rem; }
        .calendar-day.empty { background: transparent; }
        .calendar-day.today { border: 2px solid #059669; }
        .calendar-day.present { background: #dcfce7; }
        .calendar-day.late { background: #fef3c7; }
        .calendar-day.leave { background: #dbeafe; }
        .day-number { font-weight: 500; }
        .day-status { font-size: 0.7rem; }
        .calendar-legend { display: flex; justify-content: center; gap: 2rem; margin-top: 1rem; padding-top: 1rem; border-top: 1px solid #e2e8f0; }
        .legend-item { display: flex; align-items: center; gap: 0.5rem; font-size: 0.875rem; color: #64748b; }
        .dot { width: 12px; height: 12px; border-radius: 4px; }
        .dot.present { background: #16a34a; }
        .dot.late { background: #d97706; }
        .dot.leave { background: #2563eb; }
        @media (max-width: 768px) { .stats-row { grid-template-columns: 1fr 1fr; } .stat-card.main { grid-column: 1 / -1; } }
      `}</style>
        </div>
    );
}
