export default function ClientModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0A1628]/40 backdrop-blur-sm p-4 animate-[fadeIn_0.2s_ease-out]">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden border border-[#E2E8F0]">
        <div className="px-8 py-6 border-b border-[#F1F5F9] flex justify-between items-center bg-[#F8FAFC]">
          <h2 className="text-xl font-extrabold text-[#0A1628]">Add New Client</h2>
          <button onClick={onClose} className="text-[#94A3B8] hover:text-[#0A1628] text-xl transition-colors">✕</button>
        </div>
        
        <form className="p-8 space-y-6 bg-white">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-bold text-[#334155] mb-2">Client Name</label>
              <input 
                type="text" 
                className="w-full px-4 py-3 rounded-xl border border-[#E2E8F0] focus:ring-2 focus:ring-[#2563EB] focus:border-transparent outline-none transition font-medium text-sm" 
                placeholder="e.g. Endless OS" 
              />
            </div>
            
            <div>
              <label className="block text-sm font-bold text-[#334155] mb-2">Website URL</label>
              <input 
                type="url" 
                className="w-full px-4 py-3 rounded-xl border border-[#E2E8F0] focus:ring-2 focus:ring-[#2563EB] focus:border-transparent outline-none transition font-medium text-sm" 
                placeholder="https://..." 
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-[#334155] mb-2">Status</label>
              <select className="w-full px-4 py-3 rounded-xl border border-[#E2E8F0] focus:ring-2 focus:ring-[#2563EB] outline-none transition font-medium text-sm bg-white cursor-pointer">
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-bold text-[#334155] mb-2">Client Logo</label>
              <div className="border-2 border-dashed border-[#CBD5E1] rounded-xl p-8 text-center hover:bg-[#F8FAFC] transition cursor-pointer group">
                <span className="text-3xl mb-3 block group-hover:scale-110 transition-transform">📁</span>
                <span className="text-sm text-[#64748B] font-bold">Click to upload or drag and drop</span>
                <p className="text-xs text-[#94A3B8] mt-2 font-medium">PNG, JPG, SVG up to 2MB</p>
              </div>
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
              Save Client
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}