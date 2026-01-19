/**
 * NVRSS ERP - Teacher Profile Page
 * View and manage teacher professional information
 */

import { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';

export default function TeacherProfile() {
    const { user } = useAuth();
    const [activeTab, setActiveTab] = useState('personal');

    // Mock teacher data
    const teacherData = {
        personalInfo: {
            firstName: user?.firstName || 'Rajesh',
            lastName: user?.lastName || 'Sharma',
            dateOfBirth: '1985-03-15',
            gender: 'Male',
            bloodGroup: 'B+',
            nationality: 'Indian',
            maritalStatus: 'Married',
            aadharNo: 'XXXX-XXXX-5678',
        },
        professionalInfo: {
            employeeId: user?.uid || 'TCH001',
            joiningDate: '2018-06-01',
            designation: 'Senior Teacher',
            department: 'Science',
            qualification: 'M.Sc Physics, B.Ed',
            experience: '8 Years',
            specialization: 'Physics & Mathematics',
            employmentType: 'Permanent',
        },
        contactInfo: {
            email: 'rajesh.sharma@nvrss.edu',
            phone: '+91 98765 43210',
            emergencyContact: '+91 98765 43211',
            address: '456, Teacher Colony',
            city: 'Bangalore',
            state: 'Karnataka',
            pincode: '560002',
        },
        bankInfo: {
            accountNo: 'XXXX-XXXX-1234',
            bankName: 'State Bank of India',
            ifscCode: 'SBIN0001234',
            panNo: 'ABCDE1234F',
        },
        assignedClasses: [
            { class: 'Grade 10-A', subject: 'Physics', periods: 6 },
            { class: 'Grade 10-B', subject: 'Physics', periods: 6 },
            { class: 'Grade 9-A', subject: 'Science', periods: 5 },
            { class: 'Grade 9-B', subject: 'Science', periods: 5 },
            { class: 'Grade 11-A', subject: 'Physics', periods: 8 },
            { class: 'Grade 12-A', subject: 'Physics', periods: 8 },
        ],
    };

    const totalPeriods = teacherData.assignedClasses.reduce((sum, c) => sum + c.periods, 0);

    return (
        <div className="profile-page">
            {/* Profile Header */}
            <div className="profile-header">
                <div className="profile-cover"></div>
                <div className="profile-info-row">
                    <div className="profile-avatar">
                        <span>{user?.firstName?.charAt(0)}{user?.lastName?.charAt(0)}</span>
                    </div>
                    <div className="profile-title">
                        <h1>{teacherData.personalInfo.firstName} {teacherData.personalInfo.lastName}</h1>
                        <p className="profile-designation">{teacherData.professionalInfo.designation} • {teacherData.professionalInfo.department}</p>
                        <div className="profile-badges">
                            <span className="badge">{teacherData.professionalInfo.employeeId}</span>
                            <span className="badge">{teacherData.professionalInfo.experience} Experience</span>
                            <span className="badge">{totalPeriods} Periods/Week</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Tabs */}
            <div className="profile-tabs">
                {[
                    { id: 'personal', label: 'Personal Info' },
                    { id: 'professional', label: 'Professional' },
                    { id: 'classes', label: 'Assigned Classes' },
                    { id: 'documents', label: 'Documents' },
                ].map(tab => (
                    <button
                        key={tab.id}
                        className={`tab-btn ${activeTab === tab.id ? 'active' : ''}`}
                        onClick={() => setActiveTab(tab.id)}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>

            {/* Tab Content */}
            <div className="tab-content">
                {activeTab === 'personal' && (
                    <div className="info-grid">
                        <div className="info-card">
                            <h3>👤 Personal Information</h3>
                            <div className="info-items">
                                <div className="info-item"><label>Full Name</label><span>{teacherData.personalInfo.firstName} {teacherData.personalInfo.lastName}</span></div>
                                <div className="info-item"><label>Date of Birth</label><span>{new Date(teacherData.personalInfo.dateOfBirth).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}</span></div>
                                <div className="info-item"><label>Gender</label><span>{teacherData.personalInfo.gender}</span></div>
                                <div className="info-item"><label>Blood Group</label><span>{teacherData.personalInfo.bloodGroup}</span></div>
                                <div className="info-item"><label>Marital Status</label><span>{teacherData.personalInfo.maritalStatus}</span></div>
                                <div className="info-item"><label>Aadhar Number</label><span>{teacherData.personalInfo.aadharNo}</span></div>
                            </div>
                        </div>

                        <div className="info-card">
                            <h3>📞 Contact Information</h3>
                            <div className="info-items">
                                <div className="info-item"><label>Email</label><span>{teacherData.contactInfo.email}</span></div>
                                <div className="info-item"><label>Phone</label><span>{teacherData.contactInfo.phone}</span></div>
                                <div className="info-item"><label>Emergency Contact</label><span>{teacherData.contactInfo.emergencyContact}</span></div>
                                <div className="info-item full"><label>Address</label><span>{teacherData.contactInfo.address}, {teacherData.contactInfo.city}, {teacherData.contactInfo.state} - {teacherData.contactInfo.pincode}</span></div>
                            </div>
                        </div>

                        <div className="info-card">
                            <h3>🏦 Bank Details</h3>
                            <div className="info-items">
                                <div className="info-item"><label>Account Number</label><span>{teacherData.bankInfo.accountNo}</span></div>
                                <div className="info-item"><label>Bank Name</label><span>{teacherData.bankInfo.bankName}</span></div>
                                <div className="info-item"><label>IFSC Code</label><span>{teacherData.bankInfo.ifscCode}</span></div>
                                <div className="info-item"><label>PAN Number</label><span>{teacherData.bankInfo.panNo}</span></div>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'professional' && (
                    <div className="info-grid">
                        <div className="info-card wide">
                            <h3>💼 Professional Information</h3>
                            <div className="info-items">
                                <div className="info-item"><label>Employee ID</label><span className="highlight">{teacherData.professionalInfo.employeeId}</span></div>
                                <div className="info-item"><label>Joining Date</label><span>{new Date(teacherData.professionalInfo.joiningDate).toLocaleDateString('en-IN')}</span></div>
                                <div className="info-item"><label>Designation</label><span>{teacherData.professionalInfo.designation}</span></div>
                                <div className="info-item"><label>Department</label><span>{teacherData.professionalInfo.department}</span></div>
                                <div className="info-item"><label>Qualification</label><span>{teacherData.professionalInfo.qualification}</span></div>
                                <div className="info-item"><label>Experience</label><span>{teacherData.professionalInfo.experience}</span></div>
                                <div className="info-item"><label>Specialization</label><span>{teacherData.professionalInfo.specialization}</span></div>
                                <div className="info-item"><label>Employment Type</label><span>{teacherData.professionalInfo.employmentType}</span></div>
                            </div>
                        </div>

                        <div className="stats-row">
                            <div className="stat-card">
                                <span className="stat-value">{teacherData.assignedClasses.length}</span>
                                <span className="stat-label">Classes</span>
                            </div>
                            <div className="stat-card">
                                <span className="stat-value">{totalPeriods}</span>
                                <span className="stat-label">Periods/Week</span>
                            </div>
                            <div className="stat-card">
                                <span className="stat-value">247</span>
                                <span className="stat-label">Students</span>
                            </div>
                            <div className="stat-card">
                                <span className="stat-value">8</span>
                                <span className="stat-label">Years</span>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'classes' && (
                    <div className="classes-grid">
                        {teacherData.assignedClasses.map((cls, i) => (
                            <div key={i} className="class-card">
                                <div className="class-header">
                                    <h4>{cls.class}</h4>
                                    <span className="period-badge">{cls.periods} periods/week</span>
                                </div>
                                <p className="class-subject">{cls.subject}</p>
                                <div className="class-actions">
                                    <button className="action-btn">View Students</button>
                                    <button className="action-btn primary">Mark Attendance</button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {activeTab === 'documents' && (
                    <div className="documents-grid">
                        {[
                            { name: 'Appointment Letter', date: '2018-06-01', type: 'PDF' },
                            { name: 'ID Card', date: '2025-04-01', type: 'PDF' },
                            { name: 'Qualification Certificates', date: '2018-06-01', type: 'PDF' },
                            { name: 'Experience Letters', date: '2018-05-15', type: 'PDF' },
                            { name: 'Salary Slip - Dec 2025', date: '2025-12-31', type: 'PDF' },
                            { name: 'Form 16 - 2024-25', date: '2025-06-15', type: 'PDF' },
                        ].map((doc, i) => (
                            <div key={i} className="document-card">
                                <div className="doc-icon">📄</div>
                                <div className="doc-info">
                                    <span className="doc-name">{doc.name}</span>
                                    <span className="doc-date">{new Date(doc.date).toLocaleDateString('en-IN')}</span>
                                </div>
                                <button className="download-btn">↓</button>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <style>{`
        .profile-page { max-width: 1200px; }

        .profile-header {
          background: white;
          border-radius: 16px;
          overflow: hidden;
          margin-bottom: 1.5rem;
          box-shadow: 0 1px 3px rgba(0,0,0,0.1);
        }

        .profile-cover {
          height: 120px;
          background: linear-gradient(135deg, #1e40af 0%, #3b82f6 100%);
        }

        .profile-info-row {
          display: flex;
          align-items: flex-end;
          padding: 0 2rem 1.5rem;
          margin-top: -50px;
        }

        .profile-avatar {
          width: 100px;
          height: 100px;
          background: white;
          border-radius: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 2rem;
          font-weight: 700;
          color: #1e40af;
          border: 4px solid white;
          box-shadow: 0 4px 12px rgba(0,0,0,0.15);
          flex-shrink: 0;
        }

        .profile-title {
          margin-left: 1.5rem;
          padding-top: 3.5rem;
        }

        .profile-title h1 {
          font-size: 1.5rem;
          font-weight: 700;
          margin-bottom: 0.25rem;
        }

        .profile-designation {
          color: #64748b;
          margin-bottom: 0.5rem;
        }

        .profile-badges {
          display: flex;
          gap: 0.5rem;
        }

        .badge {
          padding: 0.25rem 0.75rem;
          background: #eff6ff;
          color: #1e40af;
          border-radius: 20px;
          font-size: 0.75rem;
          font-weight: 500;
        }

        .profile-tabs {
          display: flex;
          gap: 0.5rem;
          margin-bottom: 1.5rem;
          background: white;
          padding: 0.5rem;
          border-radius: 12px;
          box-shadow: 0 1px 3px rgba(0,0,0,0.1);
        }

        .tab-btn {
          flex: 1;
          padding: 0.75rem 1rem;
          border: none;
          background: transparent;
          border-radius: 8px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s;
          color: #64748b;
        }

        .tab-btn:hover { background: #f1f5f9; }
        .tab-btn.active { background: #1e40af; color: white; }

        .tab-content { min-height: 400px; }

        .info-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1.5rem;
        }

        .info-card {
          background: white;
          border-radius: 12px;
          padding: 1.5rem;
          box-shadow: 0 1px 3px rgba(0,0,0,0.1);
        }

        .info-card.wide { grid-column: 1 / -1; }

        .info-card h3 {
          font-size: 1rem;
          font-weight: 600;
          margin-bottom: 1rem;
          padding-bottom: 0.75rem;
          border-bottom: 1px solid #e2e8f0;
        }

        .info-items {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1rem;
        }

        .info-item {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }

        .info-item.full { grid-column: 1 / -1; }

        .info-item label {
          font-size: 0.75rem;
          color: #64748b;
          text-transform: uppercase;
        }

        .info-item span {
          font-weight: 500;
          color: #1e293b;
        }

        .info-item span.highlight {
          color: #1e40af;
          font-family: monospace;
          font-size: 1rem;
        }

        .stats-row {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1rem;
          grid-column: 1 / -1;
        }

        .stat-card {
          background: white;
          border-radius: 12px;
          padding: 1.5rem;
          text-align: center;
          box-shadow: 0 1px 3px rgba(0,0,0,0.1);
        }

        .stat-value {
          display: block;
          font-size: 2rem;
          font-weight: 700;
          color: #1e40af;
        }

        .stat-label {
          font-size: 0.875rem;
          color: #64748b;
        }

        .classes-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1rem;
        }

        .class-card {
          background: white;
          border-radius: 12px;
          padding: 1.25rem;
          box-shadow: 0 1px 3px rgba(0,0,0,0.1);
        }

        .class-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 0.5rem;
        }

        .class-header h4 {
          font-weight: 600;
          color: #1e293b;
        }

        .period-badge {
          font-size: 0.7rem;
          padding: 0.25rem 0.5rem;
          background: #eff6ff;
          color: #1e40af;
          border-radius: 10px;
        }

        .class-subject {
          color: #64748b;
          font-size: 0.9rem;
          margin-bottom: 1rem;
        }

        .class-actions {
          display: flex;
          gap: 0.5rem;
        }

        .action-btn {
          flex: 1;
          padding: 0.5rem;
          border: 1px solid #e2e8f0;
          background: white;
          border-radius: 6px;
          font-size: 0.75rem;
          cursor: pointer;
        }

        .action-btn.primary {
          background: #1e40af;
          color: white;
          border-color: #1e40af;
        }

        .documents-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1rem;
        }

        .document-card {
          background: white;
          border-radius: 12px;
          padding: 1rem 1.25rem;
          display: flex;
          align-items: center;
          gap: 1rem;
          box-shadow: 0 1px 3px rgba(0,0,0,0.1);
        }

        .doc-icon { font-size: 2rem; }

        .doc-info { flex: 1; }

        .doc-name {
          display: block;
          font-weight: 500;
          color: #1e293b;
        }

        .doc-date {
          font-size: 0.75rem;
          color: #64748b;
        }

        .download-btn {
          width: 36px;
          height: 36px;
          border: 1px solid #e2e8f0;
          background: white;
          border-radius: 8px;
          cursor: pointer;
          font-size: 1rem;
        }

        .download-btn:hover {
          background: #1e40af;
          color: white;
          border-color: #1e40af;
        }

        @media (max-width: 768px) {
          .info-grid, .classes-grid, .documents-grid, .stats-row {
            grid-template-columns: 1fr;
          }
          .info-items { grid-template-columns: 1fr; }
          .profile-info-row { flex-direction: column; align-items: center; text-align: center; }
          .profile-title { margin-left: 0; margin-top: 1rem; padding-top: 0; }
          .profile-badges { justify-content: center; flex-wrap: wrap; }
        }
      `}</style>
        </div>
    );
}
