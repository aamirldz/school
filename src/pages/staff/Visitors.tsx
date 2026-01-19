/**
 * NVRSS ERP - Staff Visitor Log
 */
import { useState } from 'react';

export default function StaffVisitors() {
    const [showAddModal, setShowAddModal] = useState(false);

    const todayStats = { total: 15, inPremises: 3, checkedOut: 12 };
    const visitors = [
        { id: 'VIS001', name: 'Mr. Ramesh Kumar', purpose: 'Parent Meeting', student: 'Rahul Sharma (10-A)', phone: '+91 98765 43210', inTime: '10:30 AM', outTime: '11:15 AM', status: 'checked-out' },
        { id: 'VIS002', name: 'Ms. Priya Sharma', purpose: 'Fee Payment', student: 'Amit Kumar (5-B)', phone: '+91 98765 43211', inTime: '11:00 AM', outTime: '-', status: 'in-premises' },
        { id: 'VIS003', name: 'Mr. Vendor Supplies', purpose: 'Delivery', student: '-', phone: '+91 98765 43212', inTime: '11:45 AM', outTime: '-', status: 'in-premises' },
        { id: 'VIS004', name: 'Mrs. Sunita Patel', purpose: 'Parent Meeting', student: 'Priya Patel (10-A)', phone: '+91 98765 43213', inTime: '09:30 AM', outTime: '10:00 AM', status: 'checked-out' },
    ];

    return (
        <div className="visitors-page">
            <div className="stats-row">
                <div className="stat-card"><span className="stat-value">{todayStats.total}</span><span className="stat-label">Total Today</span></div>
                <div className="stat-card active"><span className="stat-value">{todayStats.inPremises}</span><span className="stat-label">In Premises</span></div>
                <div className="stat-card"><span className="stat-value">{todayStats.checkedOut}</span><span className="stat-label">Checked Out</span></div>
                <button className="add-card" onClick={() => setShowAddModal(true)}><span>+</span>New Visitor</button>
            </div>

            <div className="visitors-card">
                <div className="card-header"><h3>Today's Visitors - {new Date().toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long' })}</h3></div>
                <div className="table-header"><span>Visitor</span><span>Purpose</span><span>Related To</span><span>In Time</span><span>Out Time</span><span>Status</span></div>
                {visitors.map(v => (
                    <div key={v.id} className="table-row">
                        <div className="visitor-info"><span className="visitor-name">{v.name}</span><span className="visitor-id">{v.id}</span></div>
                        <span className="visitor-purpose">{v.purpose}</span>
                        <span className="visitor-student">{v.student}</span>
                        <span className="visitor-time">{v.inTime}</span>
                        <span className="visitor-time">{v.outTime}</span>
                        <div className="visitor-status"><span className={`status-badge ${v.status}`}>{v.status.replace('-', ' ')}</span>{v.status === 'in-premises' && <button className="checkout-btn">Check Out</button>}</div>
                    </div>
                ))}
            </div>

            {showAddModal && (
                <div className="modal-overlay"><div className="add-modal">
                    <div className="modal-header"><h3>Register Visitor</h3><button className="close-btn" onClick={() => setShowAddModal(false)}>×</button></div>
                    <form className="modal-body" onSubmit={e => { e.preventDefault(); setShowAddModal(false); }}>
                        <div className="form-group"><label>Visitor Name</label><input type="text" required /></div>
                        <div className="form-group"><label>Phone Number</label><input type="tel" required /></div>
                        <div className="form-group"><label>Purpose of Visit</label><select><option>Parent Meeting</option><option>Fee Payment</option><option>Admission Inquiry</option><option>Delivery</option><option>Other</option></select></div>
                        <div className="form-group"><label>Related Student (if any)</label><input type="text" placeholder="Student name or ID" /></div>
                        <button type="submit" className="submit-btn">Register & Print Pass</button>
                    </form>
                </div></div>
            )}

            <style>{`
        .visitors-page { max-width: 1200px; }
        .stats-row { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1rem; margin-bottom: 1.5rem; }
        .stat-card { background: white; border-radius: 12px; padding: 1.25rem; text-align: center; box-shadow: 0 1px 3px rgba(0,0,0,0.1); }
        .stat-card.active { border-left: 4px solid #16a34a; }
        .stat-value { display: block; font-size: 2rem; font-weight: 700; color: #1e293b; }
        .stat-label { font-size: 0.8rem; color: #64748b; }
        .add-card { background: #059669; border: none; border-radius: 12px; color: white; display: flex; flex-direction: column; align-items: center; justify-content: center; font-weight: 600; cursor: pointer; }
        .add-card span { font-size: 1.5rem; }
        .visitors-card { background: white; border-radius: 12px; padding: 1.5rem; box-shadow: 0 1px 3px rgba(0,0,0,0.1); overflow-x: auto; }
        .card-header { margin-bottom: 1rem; padding-bottom: 0.75rem; border-bottom: 1px solid #e2e8f0; }
        .card-header h3 { font-size: 1rem; font-weight: 600; }
        .table-header { display: grid; grid-template-columns: 1.5fr 1fr 1.5fr 100px 100px 140px; gap: 1rem; padding: 0.75rem; background: #f8fafc; border-radius: 8px; font-size: 0.75rem; font-weight: 600; color: #64748b; text-transform: uppercase; min-width: 800px; }
        .table-row { display: grid; grid-template-columns: 1.5fr 1fr 1.5fr 100px 100px 140px; gap: 1rem; padding: 0.75rem; border-bottom: 1px solid #f1f5f9; align-items: center; min-width: 800px; }
        .visitor-name { display: block; font-weight: 500; }
        .visitor-id { font-size: 0.75rem; color: #64748b; font-family: monospace; }
        .visitor-purpose, .visitor-student { font-size: 0.875rem; }
        .visitor-time { font-size: 0.875rem; color: #64748b; }
        .visitor-status { display: flex; flex-direction: column; gap: 0.25rem; }
        .status-badge { display: inline-block; padding: 0.25rem 0.5rem; border-radius: 4px; font-size: 0.7rem; font-weight: 500; text-transform: capitalize; }
        .status-badge.in-premises { background: #dcfce7; color: #16a34a; }
        .status-badge.checked-out { background: #f1f5f9; color: #64748b; }
        .checkout-btn { padding: 0.25rem 0.5rem; background: #f97316; color: white; border: none; border-radius: 4px; font-size: 0.7rem; cursor: pointer; }
        .modal-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.5); display: flex; align-items: center; justify-content: center; z-index: 1000; }
        .add-modal { background: white; border-radius: 16px; width: 100%; max-width: 400px; }
        .modal-header { display: flex; justify-content: space-between; align-items: center; padding: 1rem 1.5rem; border-bottom: 1px solid #e2e8f0; }
        .close-btn { width: 32px; height: 32px; border: none; background: #f1f5f9; border-radius: 50%; cursor: pointer; font-size: 1.25rem; }
        .modal-body { padding: 1.5rem; }
        .form-group { margin-bottom: 1rem; }
        .form-group label { display: block; font-size: 0.875rem; font-weight: 500; margin-bottom: 0.5rem; }
        .form-group input, .form-group select { width: 100%; padding: 0.75rem; border: 1px solid #e2e8f0; border-radius: 8px; }
        .submit-btn { width: 100%; padding: 0.75rem; background: #059669; color: white; border: none; border-radius: 8px; font-weight: 600; cursor: pointer; }
        @media (max-width: 768px) { .stats-row { grid-template-columns: 1fr 1fr; } }
      `}</style>
        </div>
    );
}
