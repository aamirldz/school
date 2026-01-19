/**
 * NVRSS ERP - Student Profile Page
 * View and edit student personal information
 */

import { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';

export default function StudentProfile() {
    const { user } = useAuth();
    const [isEditing, setIsEditing] = useState(false);

    // Parse student UID
    const parseStudentUid = (uid: string) => {
        const match = uid?.match(/^(\d{2})G(\d{1,2})([A-Z])(\d{3,})$/);
        if (match) {
            return { year: `20${match[1]}`, grade: match[2], section: match[3], rollNo: match[4] };
        }
        return null;
    };

    const studentInfo = parseStudentUid(user?.uid || '');

    // Mock student data - in production, fetch from API
    const [studentData] = useState({
        personalInfo: {
            firstName: user?.firstName || 'John',
            lastName: user?.lastName || 'Student',
            dateOfBirth: '2015-05-15',
            gender: 'Male',
            bloodGroup: 'O+',
            nationality: 'Indian',
            religion: 'Hindu',
            category: 'General',
            aadharNo: 'XXXX-XXXX-1234',
        },
        contactInfo: {
            email: 'john.student@nvrss.edu',
            phone: '+91 98765 43210',
            address: '123, Green Valley Road',
            city: 'Bangalore',
            state: 'Karnataka',
            pincode: '560001',
        },
        parentInfo: {
            fatherName: 'Robert Student',
            fatherOccupation: 'Business',
            fatherPhone: '+91 98765 43211',
            motherName: 'Mary Student',
            motherOccupation: 'Teacher',
            motherPhone: '+91 98765 43212',
        },
        academicInfo: {
            admissionNo: user?.uid || '25G3A001',
            admissionDate: '2025-04-01',
            class: studentInfo ? `Grade ${studentInfo.grade}` : 'Grade 3',
            section: studentInfo?.section || 'A',
            rollNo: studentInfo?.rollNo || '001',
            house: 'Blue House',
        },
    });

    return (
        <div className="profile-page">
            <div className="profile-header">
                <div className="profile-cover">
                    <div className="profile-avatar">
                        <span>{user?.firstName?.charAt(0)}{user?.lastName?.charAt(0)}</span>
                    </div>
                </div>
                <div className="profile-title">
                    <h1>{studentData.personalInfo.firstName} {studentData.personalInfo.lastName}</h1>
                    <p className="profile-meta">
                        Student ID: <strong>{studentData.academicInfo.admissionNo}</strong> •
                        {studentData.academicInfo.class} - Section {studentData.academicInfo.section}
                    </p>
                </div>
                <button className="edit-btn" onClick={() => setIsEditing(!isEditing)}>
                    {isEditing ? 'Cancel' : 'Edit Profile'}
                </button>
            </div>

            <div className="profile-grid">
                {/* Personal Information */}
                <div className="profile-card">
                    <div className="card-header">
                        <h3>👤 Personal Information</h3>
                    </div>
                    <div className="info-grid">
                        <div className="info-item">
                            <label>Full Name</label>
                            <span>{studentData.personalInfo.firstName} {studentData.personalInfo.lastName}</span>
                        </div>
                        <div className="info-item">
                            <label>Date of Birth</label>
                            <span>{new Date(studentData.personalInfo.dateOfBirth).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                        </div>
                        <div className="info-item">
                            <label>Gender</label>
                            <span>{studentData.personalInfo.gender}</span>
                        </div>
                        <div className="info-item">
                            <label>Blood Group</label>
                            <span>{studentData.personalInfo.bloodGroup}</span>
                        </div>
                        <div className="info-item">
                            <label>Nationality</label>
                            <span>{studentData.personalInfo.nationality}</span>
                        </div>
                        <div className="info-item">
                            <label>Religion</label>
                            <span>{studentData.personalInfo.religion}</span>
                        </div>
                        <div className="info-item">
                            <label>Category</label>
                            <span>{studentData.personalInfo.category}</span>
                        </div>
                        <div className="info-item">
                            <label>Aadhar Number</label>
                            <span>{studentData.personalInfo.aadharNo}</span>
                        </div>
                    </div>
                </div>

                {/* Academic Information */}
                <div className="profile-card">
                    <div className="card-header">
                        <h3>🎓 Academic Information</h3>
                    </div>
                    <div className="info-grid">
                        <div className="info-item">
                            <label>Admission No</label>
                            <span className="highlight">{studentData.academicInfo.admissionNo}</span>
                        </div>
                        <div className="info-item">
                            <label>Admission Date</label>
                            <span>{new Date(studentData.academicInfo.admissionDate).toLocaleDateString('en-IN')}</span>
                        </div>
                        <div className="info-item">
                            <label>Class</label>
                            <span>{studentData.academicInfo.class}</span>
                        </div>
                        <div className="info-item">
                            <label>Section</label>
                            <span>{studentData.academicInfo.section}</span>
                        </div>
                        <div className="info-item">
                            <label>Roll Number</label>
                            <span>{studentData.academicInfo.rollNo}</span>
                        </div>
                        <div className="info-item">
                            <label>House</label>
                            <span>{studentData.academicInfo.house}</span>
                        </div>
                    </div>
                </div>

                {/* Contact Information */}
                <div className="profile-card">
                    <div className="card-header">
                        <h3>📞 Contact Information</h3>
                    </div>
                    <div className="info-grid">
                        <div className="info-item">
                            <label>Email</label>
                            <span>{studentData.contactInfo.email}</span>
                        </div>
                        <div className="info-item">
                            <label>Phone</label>
                            <span>{studentData.contactInfo.phone}</span>
                        </div>
                        <div className="info-item full-width">
                            <label>Address</label>
                            <span>{studentData.contactInfo.address}, {studentData.contactInfo.city}, {studentData.contactInfo.state} - {studentData.contactInfo.pincode}</span>
                        </div>
                    </div>
                </div>

                {/* Parent/Guardian Information */}
                <div className="profile-card">
                    <div className="card-header">
                        <h3>👨‍👩‍👦 Parent/Guardian Information</h3>
                    </div>
                    <div className="info-grid">
                        <div className="info-item">
                            <label>Father's Name</label>
                            <span>{studentData.parentInfo.fatherName}</span>
                        </div>
                        <div className="info-item">
                            <label>Occupation</label>
                            <span>{studentData.parentInfo.fatherOccupation}</span>
                        </div>
                        <div className="info-item">
                            <label>Contact</label>
                            <span>{studentData.parentInfo.fatherPhone}</span>
                        </div>
                        <div className="info-item">
                            <label>Mother's Name</label>
                            <span>{studentData.parentInfo.motherName}</span>
                        </div>
                        <div className="info-item">
                            <label>Occupation</label>
                            <span>{studentData.parentInfo.motherOccupation}</span>
                        </div>
                        <div className="info-item">
                            <label>Contact</label>
                            <span>{studentData.parentInfo.motherPhone}</span>
                        </div>
                    </div>
                </div>
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
          position: relative;
        }

        .profile-avatar {
          position: absolute;
          bottom: -40px;
          left: 2rem;
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
        }

        .profile-title {
          padding: 3.5rem 2rem 1.5rem;
        }

        .profile-title h1 {
          font-size: 1.5rem;
          font-weight: 700;
          color: #1e293b;
          margin-bottom: 0.25rem;
        }

        .profile-meta {
          color: #64748b;
          font-size: 0.9rem;
        }

        .profile-meta strong {
          color: #1e40af;
          font-family: monospace;
        }

        .edit-btn {
          position: absolute;
          top: 140px;
          right: 2rem;
          padding: 0.5rem 1rem;
          background: #1e40af;
          color: white;
          border: none;
          border-radius: 8px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s;
        }

        .edit-btn:hover {
          background: #1e3a8a;
        }

        .profile-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1.5rem;
        }

        .profile-card {
          background: white;
          border-radius: 12px;
          padding: 1.5rem;
          box-shadow: 0 1px 3px rgba(0,0,0,0.1);
        }

        .card-header {
          margin-bottom: 1rem;
          padding-bottom: 0.75rem;
          border-bottom: 1px solid #e2e8f0;
        }

        .card-header h3 {
          font-size: 1rem;
          font-weight: 600;
          color: #1e293b;
        }

        .info-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1rem;
        }

        .info-item {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }

        .info-item.full-width {
          grid-column: 1 / -1;
        }

        .info-item label {
          font-size: 0.75rem;
          color: #64748b;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .info-item span {
          font-size: 0.9rem;
          color: #1e293b;
          font-weight: 500;
        }

        .info-item span.highlight {
          color: #1e40af;
          font-family: monospace;
          font-size: 1rem;
        }

        @media (max-width: 768px) {
          .profile-grid {
            grid-template-columns: 1fr;
          }

          .info-grid {
            grid-template-columns: 1fr;
          }

          .edit-btn {
            position: static;
            margin: 0 2rem 1.5rem;
            width: calc(100% - 4rem);
          }
        }
      `}</style>
        </div>
    );
}
