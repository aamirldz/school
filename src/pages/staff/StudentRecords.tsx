/**
 * NVRSS ERP - Staff Student Records
 */
import { useState } from 'react';

export default function StaffStudentRecords() {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedStudent, setSelectedStudent] = useState<string | null>(null);

    const students = [
        { id: '25G10A001', name: 'Rahul Sharma', class: 'Grade 10-A', parent: 'Mr. Ramesh Sharma', phone: '+91 98765 43210', status: 'active' },
        { id: '25G10A002', name: 'Priya Patel', class: 'Grade 10-A', parent: 'Mrs. Sunita Patel', phone: '+91 98765 43211', status: 'active' },
        { id: '25G9B015', name: 'Amit Kumar', class: 'Grade 9-B', parent: 'Mr. Vijay Kumar', phone: '+91 98765 43212', status: 'active' },
        { id: '25G8A003', name: 'Sneha Singh', class: 'Grade 8-A', parent: 'Dr. Ranjit Singh', phone: '+91 98765 43213', status: 'active' },
        { id: '25G11A012', name: 'Vikram Reddy', class: 'Grade 11-A', parent: 'Mr. Suresh Reddy', phone: '+91 98765 43214', status: 'active' },
    ];

    const filtered = students.filter(s => s.name.toLowerCase().includes(searchQuery.toLowerCase()) || s.id.includes(searchQuery));

    return (
        <div className="records-page">
            <div className="controls-row">
                <div className="search-box"><input type="text" placeholder="Search by name or ID..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)} /><span className="search-icon">🔍</span></div>
                <button className="add-btn">+ Add Student</button>
            </div>

            <div className="content-grid">
                <div className="students-card">
                    <div className="card-header"><h3>Student Records</h3><span>{filtered.length} students</span></div>
                    <div className="students-list">
                        {filtered.map(student => (
                            <div key={student.id} className={`student-row ${selectedStudent === student.id ? 'selected' : ''}`} onClick={() => setSelectedStudent(student.id)}>
                                <div className="student-avatar">{student.name.split(' ').map(n => n[0]).join('')}</div>
                                <div className="student-info"><span className="student-name">{student.name}</span><span className="student-meta">{student.id} • {student.class}</span></div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="details-card">
                    {selectedStudent ? (() => {
                        const s = students.find(st => st.id === selectedStudent)!;
                        return (<>
                            <div className="detail-header"><div className="detail-avatar">{s.name.split(' ').map(n => n[0]).join('')}</div><div><h3>{s.name}</h3><p>{s.id} • {s.class}</p></div></div>
                            <div className="detail-section"><h4>Guardian Info</h4><div className="detail-items"><span>👤 {s.parent}</span><span>📞 {s.phone}</span></div></div>
                            <div className="detail-actions"><button className="action-btn">📋 View Full Record</button><button className="action-btn">📝 Edit Details</button><button className="action-btn primary">📄 Print ID Card</button></div>
                        </>);
                    })() : (
                        <div className="no-selection"><span className="no-icon">👈</span><h4>Select a Student</h4><p>Click on a student to view details</p></div>
                    )}
                </div>
            </div>

            <style>{`
        .records-page { max-width: 1200px; }
        .controls-row { display: flex; gap: 1rem; margin-bottom: 1.5rem; }
        .search-box { flex: 1; position: relative; }
        .search-box input { width: 100%; padding: 0.75rem 1rem 0.75rem 2.5rem; border: 1px solid #e2e8f0; border-radius: 8px; background: white; }
        .search-icon { position: absolute; left: 0.75rem; top: 50%; transform: translateY(-50%); }
        .add-btn { padding: 0.75rem 1.5rem; background: #059669; color: white; border: none; border-radius: 8px; font-weight: 600; cursor: pointer; }
        .content-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; }
        .students-card, .details-card { background: white; border-radius: 12px; box-shadow: 0 1px 3px rgba(0,0,0,0.1); }
        .card-header { display: flex; justify-content: space-between; align-items: center; padding: 1rem 1.5rem; border-bottom: 1px solid #e2e8f0; }
        .card-header h3 { font-size: 1rem; font-weight: 600; }
        .card-header span { font-size: 0.875rem; color: #64748b; }
        .students-list { max-height: 500px; overflow-y: auto; }
        .student-row { display: flex; align-items: center; gap: 0.75rem; padding: 0.75rem 1.5rem; cursor: pointer; border-left: 3px solid transparent; }
        .student-row:hover { background: #f8fafc; }
        .student-row.selected { background: #ecfdf5; border-left-color: #059669; }
        .student-avatar { width: 40px; height: 40px; background: linear-gradient(135deg, #059669 0%, #10b981 100%); color: white; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 600; font-size: 0.75rem; }
        .student-info { flex: 1; }
        .student-name { display: block; font-weight: 500; }
        .student-meta { font-size: 0.75rem; color: #64748b; }
        .details-card { padding: 1.5rem; min-height: 500px; }
        .detail-header { display: flex; gap: 1rem; align-items: center; margin-bottom: 1.5rem; }
        .detail-avatar { width: 60px; height: 60px; background: linear-gradient(135deg, #059669 0%, #10b981 100%); color: white; border-radius: 12px; display: flex; align-items: center; justify-content: center; font-weight: 700; }
        .detail-header h3 { font-size: 1.25rem; margin-bottom: 0.25rem; }
        .detail-header p { color: #64748b; font-size: 0.875rem; }
        .detail-section { margin-bottom: 1.5rem; }
        .detail-section h4 { font-size: 0.875rem; color: #64748b; margin-bottom: 0.5rem; }
        .detail-items span { display: block; padding: 0.5rem 0; font-size: 0.9rem; }
        .detail-actions { display: flex; gap: 0.5rem; }
        .action-btn { flex: 1; padding: 0.75rem; border: 1px solid #e2e8f0; background: white; border-radius: 8px; font-size: 0.8rem; cursor: pointer; }
        .action-btn.primary { background: #059669; color: white; border-color: #059669; }
        .no-selection { height: 100%; display: flex; flex-direction: column; align-items: center; justify-content: center; color: #64748b; }
        .no-icon { font-size: 3rem; margin-bottom: 1rem; }
        @media (max-width: 768px) { .content-grid { grid-template-columns: 1fr; } }
      `}</style>
        </div>
    );
}
