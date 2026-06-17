export default function UserModal({ isOpen, onClose, initialData }) {
  if (!isOpen) return null;

  const isEditing = !!initialData;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0A1628]/40 backdrop-blur-sm p-4 animate-[fadeIn_0.2s_ease-out]">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden border border-[#E2E8F0]">
        
        <div className="px-8 py-5 border-b border-[#F1F5F9] flex justify-between items-center bg-[#F8FAFC]">
          <h2 className="text-xl font-extrabold text-[#0A1628]">
            {isEditing ? 'Edit User' : 'Add New User'}
          </h2>
          <button onClick={onClose} className="text-[#94A3B8] hover:text-[#0A1628] text-xl transition-colors">✕</button>
        </div>
        
        <form className="p-8 space-y-5 bg-white">
          <div>
            <label className="block text-sm font-bold text-[#334155] mb-2">Full Name</label>
            <input 
              type="text" 
              defaultValue={initialData?.name || ''}
              className="w-full px-4 py-3 rounded-xl border border-[#E2E8F0] focus:ring-2 focus:ring-[#2563EB] focus:border-transparent outline-none transition font-medium text-sm" 
              placeholder="e.g. Jane Doe" 
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-[#334155] mb-2">Email Address</label>
            <input 
              type="email" 
              defaultValue={initialData?.email || ''}
              className="w-full px-4 py-3 rounded-xl border border-[#E2E8F0] focus:ring-2 focus:ring-[#2563EB] focus:border-transparent outline-none transition font-medium text-sm" 
              placeholder="jane@endless.com" 
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-bold text-[#334155] mb-2">Role</label>
              <select 
                defaultValue={initialData?.role || 'Editor'}
                className="w-full px-4 py-3 rounded-xl border border-[#E2E8F0] bg-white focus:ring-2 focus:ring-[#2563EB] outline-none transition font-medium text-sm cursor-pointer"
              >
                <option value="Super Admin">Super Admin</option>
                <option value="Editor">Editor</option>
                <option value="Viewer">Viewer</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-bold text-[#334155] mb-2">Status</label>
              <select 
                defaultValue={initialData?.status || 'Active'}
                className="w-full px-4 py-3 rounded-xl border border-[#E2E8F0] bg-white focus:ring-2 focus:ring-[#2563EB] outline-none transition font-medium text-sm cursor-pointer"
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-6 border-t border-[#F1F5F9]">
            <button 
              type="button" 
              onClick={onClose} 
              className="px-6 py-2.5 text-sm font-bold text-[#64748B] hover:bg-[#F1F5F9] rounded-xl transition-colors"
            >
              Cancel
            </button>
            <button 
              type="button" 
              className="px-6 py-2.5 text-sm font-bold text-white bg-[#2563EB] hover:bg-[#1E4D99] rounded-xl shadow-md shadow-blue-500/20 transition-all"
            >
              {isEditing ? 'Save Changes' : 'Create User'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}