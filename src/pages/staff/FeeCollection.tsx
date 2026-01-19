/**
 * NVRSS ERP - Staff Fee Collection
 */
import { useState } from 'react';

export default function StaffFeeCollection() {
    const [showCollectModal, setShowCollectModal] = useState(false);

    const todayStats = { collected: 125000, pending: 45000, transactions: 15 };
    const recentPayments = [
        { id: 'FEE2601', student: 'Rahul Sharma', class: '10-A', amount: 15000, method: 'UPI', time: '10:30 AM', status: 'success' },
        { id: 'FEE2602', student: 'Priya Patel', class: '10-A', amount: 15000, method: 'Cash', time: '11:15 AM', status: 'success' },
        { id: 'FEE2603', student: 'Amit Kumar', class: '9-B', amount: 12000, method: 'Card', time: '11:45 AM', status: 'success' },
    ];
    const pendingFees = [
        { id: '25G10A005', name: 'Vikram Gupta', class: '10-A', due: 15000, dueDate: '2026-01-25' },
        { id: '25G9B012', name: 'Pooja Verma', class: '9-B', due: 12000, dueDate: '2026-01-20' },
    ];

    return (
        <div className="fee-page">
            <div className="stats-row">
                <div className="stat-card main"><span className="stat-label">Today's Collection</span><span className="stat-value">₹{(todayStats.collected / 1000).toFixed(0)}K</span><span className="stat-detail">{todayStats.transactions} transactions</span></div>
                <div className="stat-card"><span className="stat-label">Pending Today</span><span className="stat-value">₹{(todayStats.pending / 1000).toFixed(0)}K</span></div>
                <button className="collect-card" onClick={() => setShowCollectModal(true)}><span className="plus-icon">💰</span>Collect Fee</button>
            </div>

            <div className="content-grid">
                <div className="card">
                    <div className="card-header"><h3>Recent Payments</h3></div>
                    <div className="payments-list">
                        {recentPayments.map(p => (
                            <div key={p.id} className="payment-row">
                                <div className="payment-info"><span className="payment-id">{p.id}</span><span className="payment-student">{p.student} • {p.class}</span><span className="payment-time">{p.time}</span></div>
                                <div className="payment-amount"><span className="amount">₹{p.amount.toLocaleString()}</span><span className="method">{p.method}</span></div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="card">
                    <div className="card-header"><h3>Pending Payments</h3></div>
                    <div className="pending-list">
                        {pendingFees.map(s => (
                            <div key={s.id} className="pending-row">
                                <div className="pending-info"><span className="pending-name">{s.name}</span><span className="pending-meta">{s.id} • {s.class}</span></div>
                                <div className="pending-due"><span className="due-amount">₹{s.due.toLocaleString()}</span><span className="due-date">Due: {new Date(s.dueDate).toLocaleDateString('en-IN')}</span></div>
                                <button className="collect-btn" onClick={() => setShowCollectModal(true)}>Collect</button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {showCollectModal && (
                <div className="modal-overlay"><div className="collect-modal">
                    <div className="modal-header"><h3>Collect Fee</h3><button className="close-btn" onClick={() => setShowCollectModal(false)}>×</button></div>
                    <form className="modal-body" onSubmit={e => { e.preventDefault(); setShowCollectModal(false); }}>
                        <div className="form-group"><label>Student ID</label><input type="text" placeholder="Enter student ID" required /></div>
                        <div className="form-group"><label>Amount</label><input type="number" placeholder="₹" required /></div>
                        <div className="form-group"><label>Payment Method</label><select><option>Cash</option><option>UPI</option><option>Card</option><option>Bank Transfer</option></select></div>
                        <button type="submit" className="submit-btn">Collect Payment</button>
                    </form>
                </div></div>
            )}

            <style>{`
        .fee-page { max-width: 1200px; }
        .stats-row { display: grid; grid-template-columns: 1.5fr 1fr 1fr; gap: 1rem; margin-bottom: 1.5rem; }
        .stat-card { background: white; border-radius: 12px; padding: 1.25rem; box-shadow: 0 1px 3px rgba(0,0,0,0.1); }
        .stat-card.main { background: linear-gradient(135deg, #059669 0%, #10b981 100%); color: white; }
        .stat-label { display: block; font-size: 0.8rem; opacity: 0.9; margin-bottom: 0.25rem; }
        .stat-value { display: block; font-size: 1.75rem; font-weight: 700; }
        .stat-detail { font-size: 0.75rem; opacity: 0.8; }
        .collect-card { background: linear-gradient(135deg, #059669 0%, #10b981 100%); border: none; border-radius: 12px; color: white; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 0.5rem; cursor: pointer; font-weight: 600; }
        .plus-icon { font-size: 1.5rem; }
        .content-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; }
        .card { background: white; border-radius: 12px; padding: 1.5rem; box-shadow: 0 1px 3px rgba(0,0,0,0.1); }
        .card-header { margin-bottom: 1rem; padding-bottom: 0.75rem; border-bottom: 1px solid #e2e8f0; }
        .card-header h3 { font-size: 1rem; font-weight: 600; }
        .payments-list, .pending-list { display: flex; flex-direction: column; gap: 0.75rem; }
        .payment-row, .pending-row { display: flex; align-items: center; justify-content: space-between; padding: 0.75rem; background: #f8fafc; border-radius: 8px; }
        .payment-id { display: block; font-family: monospace; color: #059669; font-size: 0.75rem; }
        .payment-student { display: block; font-weight: 500; }
        .payment-time { font-size: 0.75rem; color: #64748b; }
        .payment-amount { text-align: right; }
        .amount { display: block; font-weight: 700; color: #16a34a; }
        .method { font-size: 0.75rem; color: #64748b; }
        .pending-name { display: block; font-weight: 500; }
        .pending-meta { font-size: 0.75rem; color: #64748b; }
        .pending-due { text-align: right; }
        .due-amount { display: block; font-weight: 700; color: #dc2626; }
        .due-date { font-size: 0.75rem; color: #64748b; }
        .collect-btn { padding: 0.5rem 1rem; background: #059669; color: white; border: none; border-radius: 6px; font-size: 0.8rem; cursor: pointer; }
        .modal-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.5); display: flex; align-items: center; justify-content: center; z-index: 1000; }
        .collect-modal { background: white; border-radius: 16px; width: 100%; max-width: 400px; }
        .modal-header { display: flex; justify-content: space-between; align-items: center; padding: 1rem 1.5rem; border-bottom: 1px solid #e2e8f0; }
        .close-btn { width: 32px; height: 32px; border: none; background: #f1f5f9; border-radius: 50%; cursor: pointer; font-size: 1.25rem; }
        .modal-body { padding: 1.5rem; }
        .form-group { margin-bottom: 1rem; }
        .form-group label { display: block; font-size: 0.875rem; font-weight: 500; margin-bottom: 0.5rem; }
        .form-group input, .form-group select { width: 100%; padding: 0.75rem; border: 1px solid #e2e8f0; border-radius: 8px; }
        .submit-btn { width: 100%; padding: 0.75rem; background: #059669; color: white; border: none; border-radius: 8px; font-weight: 600; cursor: pointer; }
        @media (max-width: 768px) { .stats-row, .content-grid { grid-template-columns: 1fr; } }
      `}</style>
        </div>
    );
}
