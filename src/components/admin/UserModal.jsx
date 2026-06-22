import { useState } from 'react';
import { api } from '../../utils/api';

export default function UserModal({ isOpen, onClose, initialData, onSuccess }) {
  const [formData, setFormData] = useState({ 
    email: initialData?.email || '', 
    password: '', 
    role: initialData?.role || 'ADMIN' 
  });
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // 1. Determine the correct endpoint relative path
      const endpoint = initialData ? `/users/${initialData.id}` : '/users';
      
      // 2. Use our centralized api.fetch. No need for localhost URLs or manual token headers!
      const res = await api.fetch(endpoint, {
        method: initialData ? 'PUT' : 'POST',
        body: JSON.stringify(formData)
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || 'Failed to save user');
      }

      onSuccess(); // Refresh the parent table
      onClose();   // Close the modal
    } catch (err) {
      alert(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0A1628]/40 backdrop-blur-sm p-4 animate-[fadeIn_0.2s_ease-out]">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-3xl w-full max-w-lg space-y-5 border border-[#E2E8F0] shadow-2xl">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-xl font-extrabold text-[#0A1628]">{initialData ? 'Edit User' : 'Add New User'}</h2>
          <button type="button" onClick={onClose} className="text-[#94A3B8] hover:text-[#0A1628]">✕</button>
        </div>

        <div>
          <label className="block text-sm font-bold text-[#334155] mb-2">Email Address</label>
          <input 
            type="email" 
            required
            className="w-full px-4 py-3 rounded-xl border border-[#E2E8F0] focus:ring-2 focus:ring-[#2563EB] outline-none" 
            value={formData.email}
            onChange={e => setFormData({...formData, email: e.target.value})}
          />
        </div>

        <div>
          <label className="block text-sm font-bold text-[#334155] mb-2">Password</label>
          <input 
            type="password" 
            required={!initialData} 
            placeholder={initialData ? "Leave blank to keep current" : "••••••••"}
            className="w-full px-4 py-3 rounded-xl border border-[#E2E8F0] focus:ring-2 focus:ring-[#2563EB] outline-none" 
            onChange={e => setFormData({...formData, password: e.target.value})}
          />
        </div>

        <div>
          <label className="block text-sm font-bold text-[#334155] mb-2">Role</label>
          <select 
            className="w-full px-4 py-3 rounded-xl border border-[#E2E8F0] bg-white focus:ring-2 focus:ring-[#2563EB] outline-none cursor-pointer"
            value={formData.role}
            onChange={e => setFormData({...formData, role: e.target.value})}
          >
            <option value="ADMIN">Admin</option>
            <option value="SUPER_ADMIN">Super Admin</option>
          </select>
        </div>

        <div className="flex justify-end gap-3 pt-4 border-t border-[#F1F5F9]">
          <button type="button" onClick={onClose} className="px-6 py-2.5 font-bold text-[#64748B]">Cancel</button>
          <button type="submit" disabled={isLoading} className="bg-[#2563EB] text-white px-6 py-2.5 rounded-xl font-bold hover:bg-[#1E4D99] disabled:opacity-50">
            {isLoading ? 'Saving...' : 'Save User'}
          </button>
        </div>
      </form>
    </div>
  );
}