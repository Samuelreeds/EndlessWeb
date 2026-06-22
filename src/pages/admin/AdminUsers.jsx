import { useState } from 'react';
import UserModal from '../../components/admin/UserModal';
import { api } from '../../utils/api';
import { useCache } from '../../utils/useCache';

export default function AdminUsers() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);

  const { data, isLoading, updateCache } = useCache('users', '/users');
  const users = data || [];

  const refreshData = async () => {
    try {
      const res = await api.fetch('/users');
      const freshData = await res.json();
      updateCache(Array.isArray(freshData) ? freshData : []);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this user?')) return;
    try {
      await api.fetch(`/users/${id}`, { method: 'DELETE' });
      refreshData();
    } catch (error) {
      alert('Failed to delete user.');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-extrabold text-[#0A1628]">Users</h1>
        <button onClick={() => { setEditingUser(null); setIsModalOpen(true); }} className="bg-[#2563EB] text-white px-5 py-2.5 rounded-xl font-bold hover:bg-[#1E4D99] transition-colors">
          Add User
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-[#E2E8F0] overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-[#F8FAFC] border-b border-[#E2E8F0]">
            <tr>
              <th className="px-6 py-4 text-xs font-bold text-[#94A3B8] uppercase">User</th>
              <th className="px-6 py-4 text-xs font-bold text-[#94A3B8] uppercase">Role</th>
              <th className="px-6 py-4 text-xs font-bold text-[#94A3B8] uppercase text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#F1F5F9]">
            {isLoading && users.length === 0 ? (
              <tr><td colSpan="3" className="px-6 py-8 text-center text-[#64748B] font-medium">Loading users...</td></tr>
            ) : users.length === 0 ? (
              <tr><td colSpan="3" className="px-6 py-8 text-center text-[#64748B] font-medium">No users found.</td></tr>
            ) : (
              users.map((user) => (
                <tr key={user.id} className="hover:bg-[#F8FAFC] transition-colors">
                  <td className="px-6 py-4 font-bold text-[#0A1628]">{user.email}</td>
                  <td className="px-6 py-4"><span className="bg-[#E0E7FF] text-[#3730A3] px-3 py-1 rounded-full text-xs font-bold">{user.role}</span></td>
                  <td className="px-6 py-4 text-right space-x-4">
                    <button onClick={() => { setEditingUser(user); setIsModalOpen(true); }} className="text-[#2563EB] font-bold hover:underline">Edit</button>
                    <button onClick={() => handleDelete(user.id)} className="text-red-500 font-bold hover:underline">Delete</button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <UserModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} initialData={editingUser} onSuccess={refreshData} />
    </div>
  );
}