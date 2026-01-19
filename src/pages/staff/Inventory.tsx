/**
 * NVRSS ERP - Staff Inventory Management
 */
import { useState } from 'react';

export default function StaffInventory() {
    const [category, setCategory] = useState('all');
    const [showAddModal, setShowAddModal] = useState(false);

    const categories = ['all', 'stationery', 'electronics', 'furniture', 'sports', 'lab'];
    const inventory = [
        { id: 'INV001', name: 'Whiteboard Markers', category: 'stationery', stock: 150, minStock: 50, unit: 'pcs', status: 'ok' },
        { id: 'INV002', name: 'A4 Paper Reams', category: 'stationery', stock: 25, minStock: 30, unit: 'reams', status: 'low' },
        { id: 'INV003', name: 'Projector Bulbs', category: 'electronics', stock: 5, minStock: 3, unit: 'pcs', status: 'ok' },
        { id: 'INV004', name: 'Student Desks', category: 'furniture', stock: 450, minStock: 400, unit: 'pcs', status: 'ok' },
        { id: 'INV005', name: 'Footballs', category: 'sports', stock: 8, minStock: 10, unit: 'pcs', status: 'low' },
        { id: 'INV006', name: 'Microscopes', category: 'lab', stock: 20, minStock: 15, unit: 'pcs', status: 'ok' },
    ];

    const filtered = category === 'all' ? inventory : inventory.filter(i => i.category === category);
    const lowStock = inventory.filter(i => i.status === 'low').length;

    return (
        <div className="inventory-page">
            <div className="stats-row">
                <div className="stat-card"><span className="stat-value">{inventory.length}</span><span className="stat-label">Total Items</span></div>
                <div className="stat-card low"><span className="stat-value">{lowStock}</span><span className="stat-label">Low Stock</span></div>
                <button className="add-card" onClick={() => setShowAddModal(true)}><span>+</span>Add Item</button>
            </div>

            <div className="filters-row">
                {categories.map(cat => (
                    <button key={cat} className={`filter-btn ${category === cat ? 'active' : ''}`} onClick={() => setCategory(cat)}>{cat.charAt(0).toUpperCase() + cat.slice(1)}</button>
                ))}
            </div>

            <div className="inventory-card">
                <div className="table-header"><span>Item</span><span>Category</span><span>Stock</span><span>Status</span><span>Action</span></div>
                {filtered.map(item => (
                    <div key={item.id} className="table-row">
                        <div className="item-info"><span className="item-name">{item.name}</span><span className="item-id">{item.id}</span></div>
                        <span className="item-category">{item.category}</span>
                        <span className="item-stock">{item.stock} {item.unit}</span>
                        <span className={`status-badge ${item.status}`}>{item.status === 'low' ? '⚠️ Low' : '✓ OK'}</span>
                        <button className="update-btn">Update</button>
                    </div>
                ))}
            </div>

            {showAddModal && (
                <div className="modal-overlay"><div className="add-modal">
                    <div className="modal-header"><h3>Add Inventory Item</h3><button className="close-btn" onClick={() => setShowAddModal(false)}>×</button></div>
                    <form className="modal-body" onSubmit={e => { e.preventDefault(); setShowAddModal(false); }}>
                        <div className="form-group"><label>Item Name</label><input type="text" required /></div>
                        <div className="form-row"><div className="form-group"><label>Category</label><select>{categories.filter(c => c !== 'all').map(c => <option key={c}>{c}</option>)}</select></div><div className="form-group"><label>Quantity</label><input type="number" required /></div></div>
                        <div className="form-group"><label>Min Stock Level</label><input type="number" required /></div>
                        <button type="submit" className="submit-btn">Add Item</button>
                    </form>
                </div></div>
            )}

            <style>{`
        .inventory-page { max-width: 1000px; }
        .stats-row { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 1rem; margin-bottom: 1.5rem; }
        .stat-card { background: white; border-radius: 12px; padding: 1.25rem; text-align: center; box-shadow: 0 1px 3px rgba(0,0,0,0.1); }
        .stat-card.low { border-left: 4px solid #f59e0b; }
        .stat-value { display: block; font-size: 2rem; font-weight: 700; color: #1e293b; }
        .stat-label { font-size: 0.8rem; color: #64748b; }
        .add-card { background: #059669; border: none; border-radius: 12px; color: white; display: flex; flex-direction: column; align-items: center; justify-content: center; font-weight: 600; cursor: pointer; }
        .add-card span { font-size: 1.5rem; }
        .filters-row { display: flex; gap: 0.5rem; margin-bottom: 1.5rem; flex-wrap: wrap; }
        .filter-btn { padding: 0.5rem 1rem; border: 1px solid #e2e8f0; background: white; border-radius: 6px; cursor: pointer; font-size: 0.875rem; }
        .filter-btn.active { background: #059669; color: white; border-color: #059669; }
        .inventory-card { background: white; border-radius: 12px; padding: 1.5rem; box-shadow: 0 1px 3px rgba(0,0,0,0.1); }
        .table-header { display: grid; grid-template-columns: 2fr 1fr 1fr 1fr 100px; gap: 1rem; padding: 0.75rem; background: #f8fafc; border-radius: 8px; font-size: 0.75rem; font-weight: 600; color: #64748b; text-transform: uppercase; }
        .table-row { display: grid; grid-template-columns: 2fr 1fr 1fr 1fr 100px; gap: 1rem; padding: 0.75rem; border-bottom: 1px solid #f1f5f9; align-items: center; }
        .item-name { display: block; font-weight: 500; }
        .item-id { font-size: 0.75rem; color: #64748b; font-family: monospace; }
        .item-category { text-transform: capitalize; font-size: 0.875rem; }
        .item-stock { font-weight: 600; }
        .status-badge { padding: 0.25rem 0.5rem; border-radius: 4px; font-size: 0.75rem; }
        .status-badge.low { background: #fef3c7; color: #d97706; }
        .status-badge.ok { background: #dcfce7; color: #16a34a; }
        .update-btn { padding: 0.5rem 0.75rem; border: 1px solid #e2e8f0; background: white; border-radius: 6px; font-size: 0.75rem; cursor: pointer; }
        .modal-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.5); display: flex; align-items: center; justify-content: center; z-index: 1000; }
        .add-modal { background: white; border-radius: 16px; width: 100%; max-width: 400px; }
        .modal-header { display: flex; justify-content: space-between; align-items: center; padding: 1rem 1.5rem; border-bottom: 1px solid #e2e8f0; }
        .close-btn { width: 32px; height: 32px; border: none; background: #f1f5f9; border-radius: 50%; cursor: pointer; font-size: 1.25rem; }
        .modal-body { padding: 1.5rem; }
        .form-group { margin-bottom: 1rem; }
        .form-group label { display: block; font-size: 0.875rem; font-weight: 500; margin-bottom: 0.5rem; }
        .form-group input, .form-group select { width: 100%; padding: 0.75rem; border: 1px solid #e2e8f0; border-radius: 8px; }
        .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
        .submit-btn { width: 100%; padding: 0.75rem; background: #059669; color: white; border: none; border-radius: 8px; font-weight: 600; cursor: pointer; }
        @media (max-width: 768px) { .stats-row { grid-template-columns: 1fr; } .table-header, .table-row { grid-template-columns: 1fr 1fr; } }
      `}</style>
        </div>
    );
}
