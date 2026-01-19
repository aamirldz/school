/**
 * NVRSS ERP - Student Fee Details Page
 * View fee structure and payment history
 */

import { useState } from 'react';

export default function StudentFees() {
    const [showPaymentModal, setShowPaymentModal] = useState(false);

    const feeStructure = {
        annual: [
            { name: 'Tuition Fee', amount: 48000 },
            { name: 'Development Fee', amount: 12000 },
            { name: 'Lab Fee', amount: 6000 },
            { name: 'Library Fee', amount: 3000 },
            { name: 'Sports Fee', amount: 4000 },
            { name: 'Computer Fee', amount: 5000 },
        ],
        quarterly: [
            { name: 'Quarterly Tuition', amount: 12000 },
            { name: 'Transport Fee', amount: 4500 },
            { name: 'Misc. Charges', amount: 1500 },
        ],
    };

    const payments = [
        { id: 'PAY001', date: '2025-04-15', amount: 18000, type: 'Q1 Fees', status: 'paid', method: 'Online' },
        { id: 'PAY002', date: '2025-07-10', amount: 18000, type: 'Q2 Fees', status: 'paid', method: 'Bank Transfer' },
        { id: 'PAY003', date: '2025-10-05', amount: 18000, type: 'Q3 Fees', status: 'paid', method: 'Online' },
        { id: 'PAY004', date: '2026-01-15', amount: 18000, type: 'Q4 Fees', status: 'due', method: '-' },
    ];

    const totalAnnual = feeStructure.annual.reduce((sum, f) => sum + f.amount, 0);
    const totalQuarterly = feeStructure.quarterly.reduce((sum, f) => sum + f.amount, 0);
    const totalPaid = payments.filter(p => p.status === 'paid').reduce((sum, p) => sum + p.amount, 0);
    const totalDue = payments.filter(p => p.status === 'due').reduce((sum, p) => sum + p.amount, 0);

    return (
        <div className="fees-page">
            {/* Summary Cards */}
            <div className="summary-row">
                <div className="summary-card total">
                    <div className="summary-icon">💰</div>
                    <div className="summary-info">
                        <span className="summary-amount">₹{(totalAnnual + totalQuarterly * 4).toLocaleString()}</span>
                        <span className="summary-label">Total Annual Fee</span>
                    </div>
                </div>
                <div className="summary-card paid">
                    <div className="summary-icon">✅</div>
                    <div className="summary-info">
                        <span className="summary-amount">₹{totalPaid.toLocaleString()}</span>
                        <span className="summary-label">Total Paid</span>
                    </div>
                </div>
                <div className="summary-card due">
                    <div className="summary-icon">⏳</div>
                    <div className="summary-info">
                        <span className="summary-amount">₹{totalDue.toLocaleString()}</span>
                        <span className="summary-label">Amount Due</span>
                    </div>
                </div>
                <div className="summary-card next">
                    <div className="summary-icon">📅</div>
                    <div className="summary-info">
                        <span className="summary-amount">Jan 15, 2026</span>
                        <span className="summary-label">Next Due Date</span>
                    </div>
                </div>
            </div>

            {/* Due Payment Alert */}
            {totalDue > 0 && (
                <div className="due-alert">
                    <div className="alert-content">
                        <span className="alert-icon">⚠️</span>
                        <div className="alert-text">
                            <strong>Payment Due</strong>
                            <p>Q4 Fee payment of ₹{totalDue.toLocaleString()} is due on January 15, 2026</p>
                        </div>
                    </div>
                    <button className="pay-now-btn" onClick={() => setShowPaymentModal(true)}>
                        Pay Now →
                    </button>
                </div>
            )}

            <div className="content-grid">
                {/* Fee Structure */}
                <div className="fee-card">
                    <h3>Fee Structure (2025-26)</h3>

                    <div className="fee-section">
                        <h4>Annual Charges</h4>
                        {feeStructure.annual.map((fee, i) => (
                            <div key={i} className="fee-item">
                                <span className="fee-name">{fee.name}</span>
                                <span className="fee-amount">₹{fee.amount.toLocaleString()}</span>
                            </div>
                        ))}
                        <div className="fee-total">
                            <span>Annual Total</span>
                            <span>₹{totalAnnual.toLocaleString()}</span>
                        </div>
                    </div>

                    <div className="fee-section">
                        <h4>Quarterly Charges</h4>
                        {feeStructure.quarterly.map((fee, i) => (
                            <div key={i} className="fee-item">
                                <span className="fee-name">{fee.name}</span>
                                <span className="fee-amount">₹{fee.amount.toLocaleString()}</span>
                            </div>
                        ))}
                        <div className="fee-total">
                            <span>Quarterly Total</span>
                            <span>₹{totalQuarterly.toLocaleString()}</span>
                        </div>
                    </div>
                </div>

                {/* Payment History */}
                <div className="payment-card">
                    <h3>Payment History</h3>
                    <div className="payment-list">
                        {payments.map((payment) => (
                            <div key={payment.id} className={`payment-item ${payment.status}`}>
                                <div className="payment-main">
                                    <div className="payment-icon">
                                        {payment.status === 'paid' ? '✓' : '○'}
                                    </div>
                                    <div className="payment-info">
                                        <span className="payment-type">{payment.type}</span>
                                        <span className="payment-meta">
                                            {payment.status === 'paid'
                                                ? `Paid on ${new Date(payment.date).toLocaleDateString('en-IN')} via ${payment.method}`
                                                : `Due by ${new Date(payment.date).toLocaleDateString('en-IN')}`
                                            }
                                        </span>
                                    </div>
                                </div>
                                <div className="payment-right">
                                    <span className="payment-amount">₹{payment.amount.toLocaleString()}</span>
                                    {payment.status === 'paid' ? (
                                        <button className="receipt-btn">Receipt</button>
                                    ) : (
                                        <button className="pay-btn" onClick={() => setShowPaymentModal(true)}>Pay</button>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Payment Modal */}
            {showPaymentModal && (
                <div className="modal-overlay">
                    <div className="payment-modal">
                        <div className="modal-header">
                            <h3>Make Payment</h3>
                            <button className="close-btn" onClick={() => setShowPaymentModal(false)}>×</button>
                        </div>
                        <div className="modal-body">
                            <div className="payment-summary">
                                <span>Q4 Fee Payment</span>
                                <span className="modal-amount">₹{totalDue.toLocaleString()}</span>
                            </div>

                            <div className="payment-methods">
                                <h4>Select Payment Method</h4>
                                <label className="method-option">
                                    <input type="radio" name="method" defaultChecked />
                                    <span className="method-icon">💳</span>
                                    <span className="method-name">Credit/Debit Card</span>
                                </label>
                                <label className="method-option">
                                    <input type="radio" name="method" />
                                    <span className="method-icon">🏦</span>
                                    <span className="method-name">Net Banking</span>
                                </label>
                                <label className="method-option">
                                    <input type="radio" name="method" />
                                    <span className="method-icon">📱</span>
                                    <span className="method-name">UPI Payment</span>
                                </label>
                            </div>

                            <button className="proceed-btn">
                                Proceed to Pay ₹{totalDue.toLocaleString()}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <style>{`
        .fees-page { max-width: 1200px; }

        .summary-row {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1rem;
          margin-bottom: 1.5rem;
        }

        .summary-card {
          background: white;
          border-radius: 12px;
          padding: 1.25rem;
          display: flex;
          align-items: center;
          gap: 1rem;
          box-shadow: 0 1px 3px rgba(0,0,0,0.1);
        }

        .summary-card.total { border-left: 4px solid #1e40af; }
        .summary-card.paid { border-left: 4px solid #16a34a; }
        .summary-card.due { border-left: 4px solid #dc2626; }
        .summary-card.next { border-left: 4px solid #d97706; }

        .summary-icon { font-size: 2rem; }
        .summary-info { display: flex; flex-direction: column; }
        .summary-amount { font-size: 1.25rem; font-weight: 700; color: #1e293b; }
        .summary-label { font-size: 0.875rem; color: #64748b; }

        .due-alert {
          background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%);
          border: 1px solid #f59e0b;
          border-radius: 12px;
          padding: 1rem 1.5rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1.5rem;
        }

        .alert-content {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .alert-icon { font-size: 1.5rem; }
        .alert-text strong { color: #92400e; }
        .alert-text p { font-size: 0.875rem; color: #b45309; margin: 0; }

        .pay-now-btn {
          padding: 0.75rem 1.5rem;
          background: #1e40af;
          color: white;
          border: none;
          border-radius: 8px;
          font-weight: 600;
          cursor: pointer;
        }

        .pay-now-btn:hover { background: #1e3a8a; }

        .content-grid {
          display: grid;
          grid-template-columns: 1fr 1.5fr;
          gap: 1.5rem;
        }

        .fee-card, .payment-card {
          background: white;
          border-radius: 12px;
          padding: 1.5rem;
          box-shadow: 0 1px 3px rgba(0,0,0,0.1);
        }

        .fee-card h3, .payment-card h3 {
          font-size: 1rem;
          font-weight: 600;
          margin-bottom: 1rem;
          padding-bottom: 0.75rem;
          border-bottom: 1px solid #e2e8f0;
        }

        .fee-section {
          margin-bottom: 1.5rem;
        }

        .fee-section h4 {
          font-size: 0.875rem;
          color: #64748b;
          margin-bottom: 0.75rem;
        }

        .fee-item {
          display: flex;
          justify-content: space-between;
          padding: 0.5rem 0;
          font-size: 0.9rem;
        }

        .fee-name { color: #64748b; }
        .fee-amount { font-weight: 500; }

        .fee-total {
          display: flex;
          justify-content: space-between;
          padding: 0.75rem 0;
          border-top: 1px solid #e2e8f0;
          margin-top: 0.5rem;
          font-weight: 600;
          color: #1e40af;
        }

        .payment-list {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .payment-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1rem;
          background: #f8fafc;
          border-radius: 8px;
        }

        .payment-item.due {
          background: #fef2f2;
          border: 1px solid #fecaca;
        }

        .payment-main {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .payment-icon {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 600;
        }

        .payment-item.paid .payment-icon {
          background: #dcfce7;
          color: #16a34a;
        }

        .payment-item.due .payment-icon {
          background: #fee2e2;
          color: #dc2626;
        }

        .payment-type { font-weight: 500; display: block; }
        .payment-meta { font-size: 0.75rem; color: #64748b; }

        .payment-right {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .payment-amount { font-weight: 600; font-size: 1rem; }

        .receipt-btn, .pay-btn {
          padding: 0.5rem 1rem;
          border-radius: 6px;
          font-size: 0.875rem;
          cursor: pointer;
          border: none;
        }

        .receipt-btn {
          background: #f1f5f9;
          color: #64748b;
        }

        .pay-btn {
          background: #1e40af;
          color: white;
        }

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

        .payment-modal {
          background: white;
          border-radius: 16px;
          width: 100%;
          max-width: 400px;
          overflow: hidden;
        }

        .modal-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1rem 1.5rem;
          border-bottom: 1px solid #e2e8f0;
        }

        .modal-header h3 { margin: 0; }

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

        .payment-summary {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1rem;
          background: #f8fafc;
          border-radius: 8px;
          margin-bottom: 1.5rem;
        }

        .modal-amount {
          font-size: 1.5rem;
          font-weight: 700;
          color: #1e40af;
        }

        .payment-methods h4 {
          font-size: 0.875rem;
          color: #64748b;
          margin-bottom: 0.75rem;
        }

        .method-option {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.75rem 1rem;
          border: 1px solid #e2e8f0;
          border-radius: 8px;
          margin-bottom: 0.5rem;
          cursor: pointer;
        }

        .method-option:has(input:checked) {
          border-color: #1e40af;
          background: #eff6ff;
        }

        .method-icon { font-size: 1.25rem; }
        .method-name { font-weight: 500; }

        .proceed-btn {
          width: 100%;
          padding: 1rem;
          background: linear-gradient(135deg, #1e40af 0%, #3b82f6 100%);
          color: white;
          border: none;
          border-radius: 8px;
          font-weight: 600;
          font-size: 1rem;
          cursor: pointer;
          margin-top: 1rem;
        }

        .proceed-btn:hover {
          filter: brightness(1.1);
        }

        @media (max-width: 768px) {
          .summary-row { grid-template-columns: repeat(2, 1fr); }
          .content-grid { grid-template-columns: 1fr; }
          .due-alert { flex-direction: column; gap: 1rem; text-align: center; }
        }
      `}</style>
        </div>
    );
}
