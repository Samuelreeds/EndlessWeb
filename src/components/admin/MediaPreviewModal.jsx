export default function MediaPreviewModal({ media, onClose }) {
  if (!media) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0A1628]/60 backdrop-blur-sm p-4 animate-[fadeIn_0.2s_ease-out]">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-4xl overflow-hidden flex flex-col md:flex-row h-[80vh] max-h-[600px] border border-[#E2E8F0]">
        
        {/* Preview Area */}
        <div className="bg-[#F1F5F9] flex-1 flex items-center justify-center relative border-b md:border-b-0 md:border-r border-[#E2E8F0] p-8">
          <button 
            onClick={onClose} 
            className="absolute top-4 left-4 w-8 h-8 bg-white/80 backdrop-blur rounded-full flex items-center justify-center text-[#64748B] hover:text-[#0A1628] shadow-sm transition-colors md:hidden"
          >
            ✕
          </button>
          <div className="text-8xl">{media.type === 'video' ? '🎬' : '🖼️'}</div>
        </div>

        {/* Details Sidebar */}
        <div className="w-full md:w-80 bg-white flex flex-col flex-shrink-0">
          <div className="px-6 py-4 border-b border-[#F1F5F9] flex justify-between items-center hidden md:flex">
            <h3 className="font-extrabold text-[#0A1628]">File Details</h3>
            <button onClick={onClose} className="text-[#94A3B8] hover:text-[#0A1628] transition-colors">✕</button>
          </div>
          
          <div className="p-6 space-y-5 flex-1 overflow-y-auto">
            <div>
              <p className="text-[12px] font-bold text-[#94A3B8] uppercase tracking-wider mb-1">File Name</p>
              <p className="text-[14px] font-bold text-[#0A1628] break-all">{media.name}</p>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-[12px] font-bold text-[#94A3B8] uppercase tracking-wider mb-1">Type</p>
                <p className="text-[14px] font-medium text-[#334155] capitalize">{media.type}</p>
              </div>
              <div>
                <p className="text-[12px] font-bold text-[#94A3B8] uppercase tracking-wider mb-1">Size</p>
                <p className="text-[14px] font-medium text-[#334155]">{media.size}</p>
              </div>
            </div>

            <div>
              <p className="text-[12px] font-bold text-[#94A3B8] uppercase tracking-wider mb-1">Uploaded On</p>
              <p className="text-[14px] font-medium text-[#334155]">{media.date}</p>
            </div>

            <div>
              <p className="text-[12px] font-bold text-[#94A3B8] uppercase tracking-wider mb-2">File URL</p>
              <div className="flex bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg overflow-hidden">
                <input 
                  type="text" 
                  readOnly 
                  value={`/uploads/${media.name}`}
                  className="bg-transparent text-[13px] text-[#64748B] font-medium px-3 py-2 w-full outline-none"
                />
                <button className="bg-[#E2E8F0] hover:bg-[#CBD5E1] text-[#334155] px-3 py-2 text-[12px] font-bold transition-colors">
                  Copy
                </button>
              </div>
            </div>
          </div>

          <div className="p-6 border-t border-[#F1F5F9] mt-auto">
            <button className="w-full px-4 py-2.5 text-sm font-bold text-red-600 bg-red-50 hover:bg-red-100 rounded-xl transition-colors border border-red-100">
              Delete File
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}