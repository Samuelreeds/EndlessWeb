export default function MediaPreviewModal({ media, onClose }) {
  if (!media) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0A1628]/60 backdrop-blur-sm p-4 animate-[fadeIn_0.2s_ease-out]">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-4xl overflow-hidden flex flex-col md:flex-row h-[80vh] max-h-[600px] border border-[#E2E8F0]">
        
        {/* Preview Area */}
        <div className="bg-[#F8FAFC] flex-1 flex items-center justify-center relative border-b md:border-b-0 md:border-r border-[#E2E8F0] p-8 pattern-dots text-[#94A3B8]">
          <button 
            onClick={onClose} 
            className="absolute top-4 left-4 w-8 h-8 bg-white/80 backdrop-blur rounded-full flex items-center justify-center text-[#64748B] hover:text-[#0A1628] shadow-sm transition-colors md:hidden"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
          
          <div className="text-[#CBD5E1]">
            {media.type === 'video' ? (
              <svg className="w-32 h-32" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
            ) : (
              <svg className="w-32 h-32" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
            )}
          </div>
        </div>

        {/* Details Sidebar */}
        <div className="w-full md:w-80 bg-white flex flex-col flex-shrink-0">
          <div className="px-6 py-4 border-b border-[#F1F5F9] hidden md:flex justify-between items-center bg-white">
            <h3 className="font-extrabold text-[#0A1628]">File Details</h3>
            <button onClick={onClose} className="text-[#94A3B8] hover:text-[#0A1628] transition-colors p-1 rounded-lg hover:bg-[#F1F5F9]">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
          </div>
          
          <div className="p-6 space-y-5 flex-1 overflow-y-auto">
            <div>
              <p className="text-[12px] font-bold text-[#94A3B8] uppercase tracking-wider mb-1">File Name</p>
              <p className="text-[14px] font-bold text-[#0A1628] break-all leading-tight">{media.name}</p>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-[#F8FAFC] p-3 rounded-xl border border-[#F1F5F9]">
                <p className="text-[11px] font-bold text-[#94A3B8] uppercase tracking-wider mb-1">Type</p>
                <p className="text-[13px] font-bold text-[#334155] capitalize">{media.type}</p>
              </div>
              <div className="bg-[#F8FAFC] p-3 rounded-xl border border-[#F1F5F9]">
                <p className="text-[11px] font-bold text-[#94A3B8] uppercase tracking-wider mb-1">Size</p>
                <p className="text-[13px] font-bold text-[#334155]">{media.size}</p>
              </div>
            </div>

            <div>
              <p className="text-[12px] font-bold text-[#94A3B8] uppercase tracking-wider mb-1">Uploaded On</p>
              <p className="text-[14px] font-medium text-[#334155]">{media.date}</p>
            </div>

            <div>
              <p className="text-[12px] font-bold text-[#94A3B8] uppercase tracking-wider mb-2">File URL</p>
              <div className="flex bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-[#2563EB] transition-all">
                <input 
                  type="text" 
                  readOnly 
                  value={`/uploads/${media.name}`}
                  className="bg-transparent text-[13px] text-[#64748B] font-medium px-3 py-2 w-full outline-none"
                />
                <button className="bg-white border-l border-[#E2E8F0] hover:bg-[#F1F5F9] text-[#334155] px-4 py-2 text-[12px] font-bold transition-colors">
                  Copy
                </button>
              </div>
            </div>
          </div>

          <div className="p-6 border-t border-[#F1F5F9] mt-auto">
            <button className="w-full px-4 py-3 text-sm font-bold text-red-600 bg-red-50 hover:bg-red-100 rounded-xl transition-colors flex items-center justify-center gap-2">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
              Delete File
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}