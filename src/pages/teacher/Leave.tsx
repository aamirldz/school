/**
 * NVRSS ERP - Teacher Leave Management Page
 * Apply for leave and view leave history
 */

import { useState } from 'react';

export default function TeacherLeave() {
    const [showApplyModal, setShowApplyModal] = useState(false);
    const [leaveType, setLeaveType] = useState('casual');
    const [fromDate, setFromDate] = useState('');
    const [toDate, setToDate] = useState('');
    const [reason, setReason] = useState('');

    const leaveBalance = {
        casual: { total: 12, used: 4, remaining: 8 },
        sick: { total: 10, used: 2, remaining: 8 },
        earned: { total: 15, used: 3, remaining: 12 },
    };

    const leaveHistory = [
        { id: 'LV001', type: 'Casual', from: '2025-12-20', to: '2025-12-21', days: 2, reason: 'Family function', status: 'approved', appliedOn: '2025-12-15' },
        { id: 'LV002', type: 'Sick', from: '2025-11-10', to: '2025-11-11', days: 2, reason: 'Medical appointment', status: 'approved', appliedOn: '2025-11-08' },
        { id: 'LV003', type: 'Casual', from: '2026-01-25', to: '2026-01-27', days: 3, reason: 'Personal work', status: 'pending', appliedOn: '2026-01-18' },
        { id: 'LV004', type: 'Earned', from: '2025-10-01', to: '2025-10-03', days: 3, reason: 'Vacation', status: 'approved', appliedOn: '2025-09-20' },
    ];

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'approved': return { bg: '#dcfce7', color: '#16a34a' };
            case 'pending': return { bg: '#fef3c7', color: '#d97706' };
            case 'rejected': return { bg: '#fee2e2', color: '#dc2626' };
            default: return { bg: '#f1f5f9', color: '#64748b' };
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Handle submission
        setShowApplyModal(false);
        setFromDate('');
        setToDate('');
        setReason('');
    };

    return (
        <div className="leave-page">
            {/* Leave Balance Cards */}
            <div className="balance-row">
                <div className="balance-card casual">
                    <div className="balance-header">
                        <span className="balance-icon">🏖️</span>
                        <h4>Casual Leave</h4>
                    </div>
                    <div className="balance-stats">
                        <div className="stat-circle">
                            <svg viewBox="0 0 36 36">
                                <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#e2e8f0" strokeWidth="3" />
                                <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#3b82f6" strokeWidth="3" strokeDasharray={`${(leaveBalance.casual.remaining / leaveBalance.casual.total) * 100}, 100`} />
                            </svg>
                            <span>{leaveBalance.casual.remaining}</span>
                        </div>
                        <div className="balance-info">
                            <span>Total: {leaveBalance.casual.total}</span>
                            <span>Used: {leaveBalance.casual.used}</span>
                        </div>
                    </div>
                </div>

                <div className="balance-card sick">
                    <div className="balance-header">
                        <span className="balance-icon">🏥</span>
                        <h4>Sick Leave</h4>
                    </div>
                    <div className="balance-stats">
                        <div className="stat-circle">
                            <svg viewBox="0 0 36 36">
                                <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#e2e8f0" strokeWidth="3" />
                                <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#16a34a" strokeWidth="3" strokeDasharray={`${(leaveBalance.sick.remaining / leaveBalance.sick.total) * 100}, 100`} />
                            </svg>
                            <span>{leaveBalance.sick.remaining}</span>
                        </div>
                        <div className="balance-info">
                            <span>Total: {leaveBalance.sick.total}</span>
                            <span>Used: {leaveBalance.sick.used}</span>
                        </div>
                    </div>
                </div>

                <div className="balance-card earned">
                    <div className="balance-header">
                        <span className="balance-icon">⭐</span>
                        <h4>Earned Leave</h4>
                    </div>
                    <div className="balance-stats">
                        <div className="stat-circle">
                            <svg viewBox="0 0 36 36">
                                <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#e2e8f0" strokeWidth="3" />
                                <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#7c3aed" strokeWidth="3" strokeDasharray={`${(leaveBalance.earned.remaining / leaveBalance.earned.total) * 100}, 100`} />
                            </svg>
                            <span>{leaveBalance.earned.remaining}</span>
                        </div>
                        <div className="balance-info">
                            <span>Total: {leaveBalance.earned.total}</span>
                            <span>Used: {leaveBalance.earned.used}</span>
                        </div>
                    </div>
                </div>

                <div className="apply-card">
                    <button className="apply-btn" onClick={() => setShowApplyModal(true)}>
                        <span className="plus-icon">+</span>
                        Apply for Leave
                    </button>
                </div>
            </div>

            {/* Leave History */}
            <div className="history-card">
                <div className="card-header">
                    <h3>Leave History</h3>
                    <div className="filter-tabs">
                        <button className="tab active">All</button>
                        <button className="tab">Pending</button>
                        <button className="tab">Approved</button>
                    </div>
                </div>

                <div className="history-table">
                    <div className="table-header">
                        <span>Leave ID</span>
                        <span>Type</span>
                        <span>Duration</span>
                        <span>Reason</span>
                        <span>Status</span>
                        <span>Applied On</span>
                    </div>
                    {leaveHistory.map(leave => {
                        const status = getStatusColor(leave.status);
                        return (
                            <div key={leave.id} className="table-row">
                                <span className="leave-id">{leave.id}</span>
                                <span className="leave-type">{leave.type}</span>
                                <span className="leave-duration">
                                    <strong>{new Date(leave.from).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}</strong>
                                    {leave.days > 1 && <> - {new Date(leave.to).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}</>}
                                    <span className="days-badge">{leave.days} day{leave.days > 1 ? 's' : ''}</span>
                                </span>
                                <span className="leave-reason">{leave.reason}</span>
                                <span className="leave-status">
                                    <span className="status-badge" style={{ background: status.bg, color: status.color }}>
                                        {leave.status}
                                    </span>
                                </span>
                                <span className="leave-applied">{new Date(leave.appliedOn).toLocaleDateString('en-IN')}</span>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Apply Leave Modal */}
            {showApplyModal && (
                <div className="modal-overlay">
                    <div className="apply-modal">
                        <div className="modal-header">
                            <h3>Apply for Leave</h3>
                            <button className="close-btn" onClick={() => setShowApplyModal(false)}>×</button>
                        </div>
                        <form onSubmit={handleSubmit} className="modal-body">
                            <div className="form-group">
                                <label>Leave Type</label>
                                <select value={leaveType} onChange={e => setLeaveType(e.target.value)}>
                                    <option value="casual">Casual Leave ({leaveBalance.casual.remaining} remaining)</option>
                                    <option value="sick">Sick Leave ({leaveBalance.sick.remaining} remaining)</option>
                                    <option value="earned">Earned Leave ({leaveBalance.earned.remaining} remaining)</option>
                                </select>
                            </div>
                            <div className="form-row">
                                <div className="form-group">
                                    <label>From Date</label>
                                    <input type="date" value={fromDate} onChange={e => setFromDate(e.target.value)} required />
                                </div>
                                <div className="form-group">
                                    <label>To Date</label>
                                    <input type="date" value={toDate} onChange={e => setToDate(e.target.value)} required />
                                </div>
                            </div>
                            <div className="form-group">
                                <label>Reason</label>
                                <textarea value={reason} onChange={e => setReason(e.target.value)} placeholder="Enter reason for leave..." rows={3} required></textarea>
                            </div>
                            <div className="form-actions">
                                <button type="button" className="cancel-btn" onClick={() => setShowApplyModal(false)}>Cancel</button>
                                <button type="submit" className="submit-btn">Submit Application</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            <style>{`
        .leave-page { max-width: 1200px; }

        .balance-row { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1rem; margin-bottom: 1.5rem; }

        .balance-card {
          background: white;
          border-radius: 12px;
          padding: 1.25rem;
          box-shadow: 0 1px 3px rgba(0,0,0,0.1);
        }

        .balance-header { display: flex; align-items: center; gap: 0.75rem; margin-bottom: 1rem; }
        .balance-icon { font-size: 1.5rem; }
        .balance-header h4 { font-size: 0.9rem; font-weight: 600; }

        .balance-stats { display: flex; align-items: center; gap: 1rem; }

        .stat-circle {
          width: 70px;
          height: 70px;
          position: relative;
        }

        .stat-circle svg { transform: rotate(-90deg); }

        .stat-circle span {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          font-size: 1.25rem;
          font-weight: 700;
          color: #1e293b;
        }

        .balance-info { display: flex; flex-direction: column; gap: 0.25rem; font-size: 0.75rem; color: #64748b; }

        .apply-card {
          background: linear-gradient(135deg, #1e40af 0%, #3b82f6 100%);
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .apply-btn {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.5rem;
          background: none;
          border: none;
          color: white;
          cursor: pointer;
          font-size: 0.9rem;
          font-weight: 600;
        }

        .plus-icon {
          width: 48px;
          height: 48px;
          background: rgba(255,255,255,0.2);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.5rem;
        }

        .history-card {
          background: white;
          border-radius: 12px;
          padding: 1.5rem;
          box-shadow: 0 1px 3px rgba(0,0,0,0.1);
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

        .filter-tabs { display: flex; gap: 0.5rem; }

        .tab {
          padding: 0.5rem 1rem;
          border: 1px solid #e2e8f0;
          background: white;
          border-radius: 6px;
          font-size: 0.875rem;
          cursor: pointer;
        }

        .tab.active { background: #1e40af; color: white; border-color: #1e40af; }

        .history-table { overflow-x: auto; }

        .table-header {
          display: grid;
          grid-template-columns: 100px 100px 1fr 1.5fr 100px 120px;
          gap: 1rem;
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
          grid-template-columns: 100px 100px 1fr 1.5fr 100px 120px;
          gap: 1rem;
          padding: 1rem;
          border-bottom: 1px solid #f1f5f9;
          align-items: center;
        }

        .leave-id { font-family: monospace; color: #1e40af; }
        .leave-type { font-weight: 500; }

        .leave-duration { display: flex; flex-direction: column; gap: 0.25rem; }
        .days-badge { display: inline-block; font-size: 0.7rem; color: #64748b; background: #f1f5f9; padding: 0.125rem 0.5rem; border-radius: 10px; margin-top: 0.25rem; }

        .leave-reason { color: #64748b; font-size: 0.875rem; }

        .status-badge {
          padding: 0.25rem 0.75rem;
          border-radius: 20px;
          font-size: 0.7rem;
          font-weight: 600;
          text-transform: capitalize;
        }

        .leave-applied { color: #64748b; font-size: 0.875rem; }

        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0,0,0,0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
        }

        .apply-modal {
          background: white;
          border-radius: 16px;
          width: 100%;
          max-width: 500px;
          overflow: hidden;
        }

        .modal-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1rem 1.5rem;
          border-bottom: 1px solid #e2e8f0;
        }

        .modal-header h3 { margin: 0; font-size: 1.125rem; }

        .close-btn {
          width: 32px;
          height: 32px;
          border: none;
          background: #f1f5f9;
          border-radius: 50%;
          font-size: 1.25rem;
          cursor: pointer;
        }

        .modal-body { padding: 1.5rem; }

        .form-group { margin-bottom: 1rem; }
        .form-group label { display: block; font-size: 0.875rem; font-weight: 500; margin-bottom: 0.5rem; }
        .form-group input, .form-group select, .form-group textarea {
          width: 100%;
          padding: 0.75rem;
          border: 1px solid #e2e8f0;
          border-radius: 8px;
          font-size: 0.9rem;
        }

        .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }

        .form-actions { display: flex; gap: 1rem; margin-top: 1.5rem; }

        .cancel-btn {
          flex: 1;
          padding: 0.75rem;
          border: 1px solid #e2e8f0;
          background: white;
          border-radius: 8px;
          cursor: pointer;
        }

        .submit-btn {
          flex: 1;
          padding: 0.75rem;
          background: #1e40af;
          color: white;
          border: none;
          border-radius: 8px;
          font-weight: 600;
          cursor: pointer;
        }

        @media (max-width: 768px) {
          .balance-row { grid-template-columns: repeat(2, 1fr); }
          .table-header, .table-row { grid-template-columns: 1fr 1fr; }
          .table-header span:nth-child(n+3), .table-row span:nth-child(n+3) { display: none; }
        }
      `}</style>
        </div>
    );
}
