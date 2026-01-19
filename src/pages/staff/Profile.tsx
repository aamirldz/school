/**
 * NVRSS ERP - Staff Profile Page
 */
import { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';

export default function StaffProfile() {
    const { user } = useAuth();
    const [activeTab, setActiveTab] = useState('personal');

    const staffData = {
        personal: { firstName: user?.firstName || 'Anita', lastName: user?.lastName || 'Desai', dob: '1988-07-22', gender: 'Female', bloodGroup: 'A+' },
        employment: { id: user?.uid || 'STF001', joinDate: '2019-03-15', designation: 'Administrative Assistant', department: 'Front Office', shift: '8:00 AM - 4:00 PM' },
        contact: { email: 'anita.desai@nvrss.edu', phone: '+91 98765 12345', address: '789, Garden View Apartments, Bangalore' },
    };

    return (
        <div className="profile-page">
            <div className="profile-header">
                <div className="profile-cover"></div>
                <div className="profile-info-row">
                    <div className="profile-avatar"><span>{user?.firstName?.charAt(0)}{user?.lastName?.charAt(0)}</span></div>
                    <div className="profile-title">
                        <h1>{staffData.personal.firstName} {staffData.personal.lastName}</h1>
                        <p>{staffData.employment.designation} • {staffData.employment.department}</p>
                        <span className="badge">{staffData.employment.id}</span>
                    </div>
                </div>
            </div>

            <div className="profile-tabs">
                {['personal', 'employment', 'documents'].map(tab => (
                    <button key={tab} className={`tab-btn ${activeTab === tab ? 'active' : ''}`} onClick={() => setActiveTab(tab)}>{tab.charAt(0).toUpperCase() + tab.slice(1)}</button>
                ))}
            </div>

            <div className="tab-content">
                {activeTab === 'personal' && (
                    <div className="info-grid">
                        <div className="info-card">
                            <h3>👤 Personal Info</h3>
                            <div className="info-items">
                                <div className="info-item"><label>Name</label><span>{staffData.personal.firstName} {staffData.personal.lastName}</span></div>
                                <div className="info-item"><label>DOB</label><span>{new Date(staffData.personal.dob).toLocaleDateString('en-IN')}</span></div>
                                <div className="info-item"><label>Gender</label><span>{staffData.personal.gender}</span></div>
                                <div className="info-item"><label>Blood Group</label><span>{staffData.personal.bloodGroup}</span></div>
                            </div>
                        </div>
                        <div className="info-card">
                            <h3>📞 Contact</h3>
                            <div className="info-items">
                                <div className="info-item"><label>Email</label><span>{staffData.contact.email}</span></div>
                                <div className="info-item"><label>Phone</label><span>{staffData.contact.phone}</span></div>
                                <div className="info-item full"><label>Address</label><span>{staffData.contact.address}</span></div>
                            </div>
                        </div>
                    </div>
                )}
                {activeTab === 'employment' && (
                    <div className="info-card wide">
                        <h3>💼 Employment</h3>
                        <div className="info-items">
                            <div className="info-item"><label>ID</label><span className="highlight">{staffData.employment.id}</span></div>
                            <div className="info-item"><label>Join Date</label><span>{new Date(staffData.employment.joinDate).toLocaleDateString('en-IN')}</span></div>
                            <div className="info-item"><label>Designation</label><span>{staffData.employment.designation}</span></div>
                            <div className="info-item"><label>Department</label><span>{staffData.employment.department}</span></div>
                            <div className="info-item"><label>Shift</label><span>{staffData.employment.shift}</span></div>
                        </div>
                    </div>
                )}
                {activeTab === 'documents' && (
                    <div className="documents-grid">
                        {['Appointment Letter', 'ID Card', 'Salary Slip - Dec 2025'].map((doc, i) => (
                            <div key={i} className="document-card"><span className="doc-icon">📄</span><span className="doc-name">{doc}</span><button className="download-btn">↓</button></div>
                        ))}
                    </div>
                )}
            </div>

            <style>{`
        .profile-page { max-width: 1000px; }
        .profile-header { background: white; border-radius: 16px; overflow: hidden; margin-bottom: 1.5rem; box-shadow: 0 1px 3px rgba(0,0,0,0.1); }
        .profile-cover { height: 100px; background: linear-gradient(135deg, #059669 0%, #10b981 100%); }
        .profile-info-row { display: flex; align-items: flex-end; padding: 0 2rem 1.5rem; margin-top: -40px; gap: 1rem; }
        .profile-avatar { width: 80px; height: 80px; background: white; border-radius: 12px; display: flex; align-items: center; justify-content: center; font-size: 1.5rem; font-weight: 700; color: #059669; border: 3px solid white; box-shadow: 0 4px 12px rgba(0,0,0,0.15); }
        .profile-title { padding-top: 2.5rem; }
        .profile-title h1 { font-size: 1.25rem; margin-bottom: 0.25rem; }
        .profile-title p { color: #64748b; font-size: 0.9rem; margin-bottom: 0.5rem; }
        .badge { padding: 0.25rem 0.75rem; background: #ecfdf5; color: #059669; border-radius: 20px; font-size: 0.75rem; font-weight: 500; }
        .profile-tabs { display: flex; gap: 0.5rem; margin-bottom: 1.5rem; background: white; padding: 0.5rem; border-radius: 12px; }
        .tab-btn { flex: 1; padding: 0.75rem; border: none; background: transparent; border-radius: 8px; font-weight: 500; cursor: pointer; color: #64748b; }
        .tab-btn.active { background: #059669; color: white; }
        .info-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 1.5rem; }
        .info-card { background: white; border-radius: 12px; padding: 1.5rem; box-shadow: 0 1px 3px rgba(0,0,0,0.1); }
        .info-card.wide { grid-column: 1 / -1; }
        .info-card h3 { font-size: 1rem; margin-bottom: 1rem; padding-bottom: 0.75rem; border-bottom: 1px solid #e2e8f0; }
        .info-items { display: grid; grid-template-columns: repeat(2, 1fr); gap: 1rem; }
        .info-item { display: flex; flex-direction: column; gap: 0.25rem; }
        .info-item.full { grid-column: 1 / -1; }
        .info-item label { font-size: 0.75rem; color: #64748b; text-transform: uppercase; }
        .info-item span { font-weight: 500; }
        .info-item span.highlight { color: #059669; font-family: monospace; }
        .documents-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem; }
        .document-card { background: white; border-radius: 12px; padding: 1rem; display: flex; align-items: center; gap: 0.75rem; box-shadow: 0 1px 3px rgba(0,0,0,0.1); }
        .doc-icon { font-size: 1.5rem; }
        .doc-name { flex: 1; font-weight: 500; font-size: 0.9rem; }
        .download-btn { width: 32px; height: 32px; border: 1px solid #e2e8f0; background: white; border-radius: 6px; cursor: pointer; }
        .download-btn:hover { background: #059669; color: white; border-color: #059669; }
        @media (max-width: 768px) { .info-grid, .documents-grid { grid-template-columns: 1fr; } .info-items { grid-template-columns: 1fr; } }
      `}</style>
        </div>
    );
}
