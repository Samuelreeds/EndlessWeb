export default function VideoUploadModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0A1628]/40 backdrop-blur-sm p-4 animate-[fadeIn_0.2s_ease-out]">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl overflow-hidden border border-[#E2E8F0]">
        
        <div className="px-8 py-5 border-b border-[#F1F5F9] flex justify-between items-center bg-[#F8FAFC]">
          <h2 className="text-xl font-extrabold text-[#0A1628]">Upload Video Testimonial</h2>
          <button onClick={onClose} className="text-[#94A3B8] hover:text-[#0A1628] text-xl transition-colors">✕</button>
        </div>
        
        <form className="p-8 space-y-6 bg-white">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <label className="block text-sm font-bold text-[#334155] mb-2">Video File</label>
              <div className="border-2 border-dashed border-[#CBD5E1] rounded-2xl p-10 text-center hover:bg-[#F8FAFC] transition cursor-pointer group">
                <svg className="w-8 h-8 mx-auto text-[#94A3B8] group-hover:text-[#2563EB] mb-3 group-hover:scale-110 transition-all" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span className="text-[15px] text-[#0A1628] font-bold block mb-1">Click to upload video or drag and drop</span>
                <span className="text-[13px] text-[#64748B] font-medium">MP4, WebM, or OGG up to 50MB</span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-[#334155] mb-2">Title</label>
              <input 
                type="text" 
                className="w-full px-4 py-3 rounded-xl border border-[#E2E8F0] focus:ring-2 focus:ring-[#2563EB] focus:border-transparent outline-none transition font-medium text-sm" 
                placeholder="e.g. Sarah K. Review" 
              />
            </div>
            
            <div>
              <label className="block text-sm font-bold text-[#334155] mb-2">Subtitle</label>
              <input 
                type="text" 
                className="w-full px-4 py-3 rounded-xl border border-[#E2E8F0] focus:ring-2 focus:ring-[#2563EB] focus:border-transparent outline-none transition font-medium text-sm" 
                placeholder="e.g. Café Owner - 500% ROI" 
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-bold text-[#334155] mb-2">Custom Thumbnail (Optional)</label>
              <div className="border-2 border-dashed border-[#CBD5E1] rounded-xl p-6 text-center hover:bg-[#F8FAFC] transition cursor-pointer flex flex-col items-center justify-center">
                <svg className="w-8 h-8 mx-auto text-[#94A3B8] group-hover:text-[#2563EB] mb-3 group-hover:scale-110 transition-all" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span className="text-sm text-[#64748B] font-bold">Upload cover image</span>
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
              Upload Video
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}