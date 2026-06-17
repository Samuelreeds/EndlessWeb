export default function CaseStudyModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0A1628]/40 backdrop-blur-sm p-4 sm:p-6 lg:p-8 animate-[fadeIn_0.2s_ease-out]">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden border border-[#E2E8F0]">
        
        {/* Header */}
        <div className="px-8 py-5 border-b border-[#F1F5F9] flex justify-between items-center bg-[#F8FAFC] flex-shrink-0">
          <h2 className="text-xl font-extrabold text-[#0A1628]">Create Case Study</h2>
          <button onClick={onClose} className="text-[#94A3B8] hover:text-[#0A1628] text-xl transition-colors">✕</button>
        </div>
        
        {/* Scrollable Form Body */}
        <div className="p-8 overflow-y-auto flex-1">
          <form className="space-y-8">
            
            {/* Basic Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-bold text-[#334155] mb-2">Title</label>
                <input 
                  type="text" 
                  className="w-full px-4 py-3 rounded-xl border border-[#E2E8F0] focus:ring-2 focus:ring-[#2563EB] focus:border-transparent outline-none transition font-medium text-sm" 
                  placeholder="e.g. From Zero Engagement to 22 DMs" 
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-[#334155] mb-2">Category</label>
                <input 
                  type="text" 
                  className="w-full px-4 py-3 rounded-xl border border-[#E2E8F0] focus:ring-2 focus:ring-[#2563EB] focus:border-transparent outline-none transition font-medium text-sm" 
                  placeholder="e.g. F&B Business" 
                />
              </div>
            </div>

            {/* Narrative */}
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-bold text-[#334155] mb-2">Challenge</label>
                <textarea 
                  rows="3"
                  className="w-full px-4 py-3 rounded-xl border border-[#E2E8F0] focus:ring-2 focus:ring-[#2563EB] focus:border-transparent outline-none transition font-medium text-sm resize-none" 
                  placeholder="What was the client struggling with?" 
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-[#334155] mb-2">Approach</label>
                <textarea 
                  rows="3"
                  className="w-full px-4 py-3 rounded-xl border border-[#E2E8F0] focus:ring-2 focus:ring-[#2563EB] focus:border-transparent outline-none transition font-medium text-sm resize-none" 
                  placeholder="How did Endless solve this problem?" 
                />
              </div>
            </div>

            {/* Visuals */}
            <div>
              <label className="block text-sm font-bold text-[#334155] mb-4">Transformation Images</label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="border-2 border-dashed border-[#CBD5E1] rounded-xl p-8 text-center hover:bg-[#F8FAFC] transition cursor-pointer group">
                  <span className="text-2xl mb-2 block group-hover:scale-110 transition-transform">📸</span>
                  <span className="text-sm text-[#64748B] font-bold">Upload Before Image</span>
                </div>
                <div className="border-2 border-dashed border-[#CBD5E1] rounded-xl p-8 text-center hover:bg-[#EFF6FF] hover:border-[#BFDBFE] transition cursor-pointer group bg-[#F8FAFC]">
                  <span className="text-2xl mb-2 block group-hover:scale-110 transition-transform">✨</span>
                  <span className="text-sm text-[#2563EB] font-bold">Upload After Image</span>
                </div>
              </div>
            </div>

            {/* Results / Metrics */}
            <div>
              <div className="flex justify-between items-center mb-4">
                <label className="block text-sm font-bold text-[#334155]">Key Results</label>
                <button type="button" className="text-[12px] font-bold text-[#2563EB] hover:underline">＋ Add Metric</button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[1, 2, 3].map((num) => (
                  <div key={num} className="bg-[#F8FAFC] p-4 rounded-xl border border-[#E2E8F0]">
                    <input 
                      type="text" 
                      placeholder="Value (e.g. 4.4x)" 
                      className="w-full px-3 py-2 mb-2 rounded-lg border border-[#CBD5E1] font-bold text-[#0A1628] focus:ring-2 focus:ring-[#2563EB] outline-none text-sm"
                    />
                    <input 
                      type="text" 
                      placeholder="Label (e.g. Followers)" 
                      className="w-full px-3 py-2 rounded-lg border border-[#CBD5E1] font-medium text-[#64748B] focus:ring-2 focus:ring-[#2563EB] outline-none text-sm"
                    />
                  </div>
                ))}
              </div>
            </div>

          </form>
        </div>

        {/* Footer Actions */}
        <div className="px-8 py-5 border-t border-[#F1F5F9] bg-white flex justify-end gap-3 flex-shrink-0">
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
            Publish Case Study
          </button>
        </div>
        
      </div>
    </div>
  );
}