import { useState } from 'react';
import UserModal from '../../components/admin/UserModal';

export default function AdminUsers() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);

  const mockUsers = [
    { id: 1, name: 'Admin User', email: 'admin@endless.com', role: 'Super Admin', status: 'Active', initials: 'AU' },
    { id: 2, name: 'Sarah Content', email: 'sarah@endless.com', role: 'Editor', status: 'Active', initials: 'SC' },
    { id: 3, name: 'Mike Reviewer', email: 'mike@endless.com', role: 'Viewer', status: 'Inactive', initials: 'MR' },
  ];

  const handleEdit = (user) => {
    setEditingUser(user);
    setIsModalOpen(true);
  };

  const handleAddNew = () => {
    setEditingUser(null);
    setIsModalOpen(true);
  };

  return (
    <div className="space-y-6 animate-[fadeIn_0.3s_ease-out]">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-[#0A1628] tracking-tight">Users</h1>
          <p className="text-[#64748B] mt-1 font-medium">Manage team members and access levels.</p>
        </div>
        <button 
          onClick={handleAddNew}
          className="bg-[#2563EB] hover:bg-[#1E4D99] text-white px-5 py-2.5 rounded-xl font-bold transition-all shadow-sm shadow-blue-500/20 flex items-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" /></svg> Add User
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-[#E2E8F0] shadow-sm overflow-hidden">
        <div className="overflow-x-auto w-full">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#F8FAFC] border-b border-[#E2E8F0]">
                <th className="px-6 py-4 text-[12px] font-bold text-[#94A3B8] uppercase tracking-wider">User</th>
                <th className="px-6 py-4 text-[12px] font-bold text-[#94A3B8] uppercase tracking-wider">Role</th>
                <th className="px-6 py-4 text-[12px] font-bold text-[#94A3B8] uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-[12px] font-bold text-[#94A3B8] uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F1F5F9]">
              {mockUsers.map((user) => (
                <tr key={user.id} className="hover:bg-[#F8FAFC] transition-colors group">
                  <td className="px-6 py-4 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#EFF6FF] text-[#2563EB] flex items-center justify-center font-bold text-sm">
                      {user.initials}
                    </div>
                    <div>
                      <div className="font-bold text-[#0A1628]">{user.name}</div>
                      <div className="text-sm font-medium text-[#64748B]">{user.email}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-3 py-1 bg-[#F1F5F9] text-[#475569] text-xs font-bold rounded-full">
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 text-xs font-bold rounded-full ${
                      user.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'
                    }`}>
                      {user.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right space-x-3">
                    <button onClick={() => handleEdit(user)} className="text-[#64748B] hover:text-[#2563EB] font-bold text-sm transition-colors">Edit</button>
                    <button className="text-[#64748B] hover:text-red-500 font-bold text-sm transition-colors">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <UserModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        initialData={editingUser}
      />
    </div>
  );
}