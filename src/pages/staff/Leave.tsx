/**
 * NVRSS ERP - Staff Leave Management
 */
import { useState } from 'react';

export default function StaffLeave() {
    const [showModal, setShowModal] = useState(false);
    const leaveBalance = { casual: { total: 12, used: 4, remaining: 8 }, sick: { total: 10, used: 2, remaining: 8 }, earned: { total: 15, used: 3, remaining: 12 } };
    const leaveHistory = [
        { id: 'LV001', type: 'Casual', from: '2025-12-20', to: '2025-12-21', days: 2, reason: 'Family function', status: 'approved' },
        { id: 'LV002', type: 'Sick', from: '2025-11-10', to: '2025-11-11', days: 2, reason: 'Medical', status: 'approved' },
        { id: 'LV003', type: 'Casual', from: '2026-01-25', to: '2026-01-26', days: 2, reason: 'Personal', status: 'pending' },
    ];

    return (
        <div className="leave-page">
            <div className="balance-row">
                {Object.entries(leaveBalance).map(([type, data]) => (
                    <div key={type} className="balance-card">
                        <div className="balance-header"><span className="balance-icon">{type === 'casual' ? '🏖️' : type === 'sick' ? '🏥' : '⭐'}</span><h4>{type.charAt(0).toUpperCase() + type.slice(1)} Leave</h4></div>
                        <div className="balance-stats"><span className="remaining">{data.remaining}</span><span className="total">/ {data.total}</span></div>
                    </div>
                ))}
                <button className="apply-card" onClick={() => setShowModal(true)}><span className="plus-icon">+</span>Apply Leave</button>
            </div>

            <div className="history-card">
                <h3>Leave History</h3>
                <div className="history-table">
                    {leaveHistory.map(leave => (
                        <div key={leave.id} className="table-row">
                            <span className="leave-id">{leave.id}</span>
                            <span className="leave-type">{leave.type}</span>
                            <span className="leave-date">{new Date(leave.from).toLocaleDateString('en-IN')} - {leave.days} days</span>
                            <span className="leave-reason">{leave.reason}</span>
                            <span className={`status-badge ${leave.status}`}>{leave.status}</span>
                        </div>
                    ))}
                </div>
            </div>

            {showModal && (
                <div className="modal-overlay"><div className="apply-modal">
                    <div className="modal-header"><h3>Apply Leave</h3><button className="close-btn" onClick={() => setShowModal(false)}>×</button></div>
                    <form className="modal-body" onSubmit={e => { e.preventDefault(); setShowModal(false); }}>
                        <div className="form-group"><label>Leave Type</label><select><option>Casual Leave</option><option>Sick Leave</option><option>Earned Leave</option></select></div>
                        <div className="form-row"><div className="form-group"><label>From</label><input type="date" required /></div><div className="form-group"><label>To</label><input type="date" required /></div></div>
                        <div className="form-group"><label>Reason</label><textarea rows={3} required></textarea></div>
                        <button type="submit" className="submit-btn">Submit</button>
                    </form>
                </div></div>
            )}

            <style>{`
        .leave-page { max-width: 1000px; }
        .balance-row { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1rem; margin-bottom: 1.5rem; }
        .balance-card { background: white; border-radius: 12px; padding: 1.25rem; box-shadow: 0 1px 3px rgba(0,0,0,0.1); }
        .balance-header { display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.75rem; }
        .balance-icon { font-size: 1.25rem; }
        .balance-header h4 { font-size: 0.9rem; font-weight: 600; }
        .balance-stats { display: flex; align-items: baseline; gap: 0.25rem; }
        .remaining { font-size: 2rem; font-weight: 700; color: #059669; }
        .total { color: #64748b; font-size: 0.9rem; }
        .apply-card { background: linear-gradient(135deg, #059669 0%, #10b981 100%); border: none; border-radius: 12px; color: white; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 0.5rem; cursor: pointer; font-weight: 600; }
        .plus-icon { font-size: 2rem; }
        .history-card { background: white; border-radius: 12px; padding: 1.5rem; box-shadow: 0 1px 3px rgba(0,0,0,0.1); }
        .history-card h3 { font-size: 1rem; font-weight: 600; margin-bottom: 1rem; padding-bottom: 0.75rem; border-bottom: 1px solid #e2e8f0; }
        .history-table { display: flex; flex-direction: column; gap: 0.5rem; }
        .table-row { display: grid; grid-template-columns: 80px 80px 1fr 1.5fr 80px; gap: 1rem; padding: 0.75rem; background: #f8fafc; border-radius: 8px; align-items: center; font-size: 0.875rem; }
        .leave-id { font-family: monospace; color: #059669; }
        .leave-type { font-weight: 500; }
        .leave-date, .leave-reason { color: #64748b; }
        .status-badge { padding: 0.25rem 0.5rem; border-radius: 4px; font-size: 0.7rem; font-weight: 500; text-transform: capitalize; }
        .status-badge.approved { background: #dcfce7; color: #16a34a; }
        .status-badge.pending { background: #fef3c7; color: #d97706; }
        .modal-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.5); display: flex; align-items: center; justify-content: center; z-index: 1000; }
        .apply-modal { background: white; border-radius: 16px; width: 100%; max-width: 450px; }
        .modal-header { display: flex; justify-content: space-between; align-items: center; padding: 1rem 1.5rem; border-bottom: 1px solid #e2e8f0; }
        .modal-header h3 { margin: 0; }
        .close-btn { width: 32px; height: 32px; border: none; background: #f1f5f9; border-radius: 50%; cursor: pointer; font-size: 1.25rem; }
        .modal-body { padding: 1.5rem; }
        .form-group { margin-bottom: 1rem; }
        .form-group label { display: block; font-size: 0.875rem; font-weight: 500; margin-bottom: 0.5rem; }
        .form-group input, .form-group select, .form-group textarea { width: 100%; padding: 0.75rem; border: 1px solid #e2e8f0; border-radius: 8px; }
        .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
        .submit-btn { width: 100%; padding: 0.75rem; background: #059669; color: white; border: none; border-radius: 8px; font-weight: 600; cursor: pointer; }
        @media (max-width: 768px) { .balance-row { grid-template-columns: 1fr 1fr; } .table-row { grid-template-columns: 1fr 1fr; } }
      `}</style>
        </div>
    );
}
