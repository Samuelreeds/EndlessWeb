import { useState } from 'react';

export default function MediaPreviewModal({ media, onClose, onDelete, formatBytes }) {
  const [copied, setCopied] = useState(false);

  if (!media) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(media.url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0A1628]/60 backdrop-blur-sm p-4 animate-[fadeIn_0.2s_ease-out]">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-4xl overflow-hidden flex flex-col md:flex-row h-[80vh] max-h-[600px] border border-[#E2E8F0]">
        
        {/* Preview Area (Now actually displays the media) */}
        <div className="bg-black flex-1 flex items-center justify-center relative border-b md:border-b-0 md:border-r border-[#E2E8F0] overflow-hidden group">
          <button 
            onClick={onClose} 
            className="absolute top-4 left-4 z-10 w-8 h-8 bg-white/10 hover:bg-white/30 backdrop-blur rounded-full flex items-center justify-center text-white shadow-sm transition-colors"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
          
          {media.type === 'video' ? (
             <video src={media.url} controls autoPlay className="w-full h-full object-contain" />
          ) : (
             <img src={media.url} alt={media.name} className="w-full h-full object-contain" />
          )}
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
                <p className="text-[13px] font-bold text-[#334155]">{formatBytes(media.size)}</p>
              </div>
            </div>

            <div>
              <p className="text-[12px] font-bold text-[#94A3B8] uppercase tracking-wider mb-1">Uploaded On</p>
              <p className="text-[14px] font-medium text-[#334155]">
                {new Date(media.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
              </p>
            </div>

            <div>
              <p className="text-[12px] font-bold text-[#94A3B8] uppercase tracking-wider mb-2">File URL</p>
              <div className="flex bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-[#2563EB] transition-all">
                <input 
                  type="text" 
                  readOnly 
                  value={media.url}
                  className="bg-transparent text-[13px] text-[#64748B] font-medium px-3 py-2 w-full outline-none truncate"
                />
                <button 
                  onClick={handleCopy}
                  className={`${copied ? 'bg-green-500 text-white border-green-500' : 'bg-white text-[#334155] border-[#E2E8F0] hover:bg-[#F1F5F9]'} border-l px-4 py-2 text-[12px] font-bold transition-colors w-20 flex justify-center`}
                >
                  {copied ? 'Copied!' : 'Copy'}
                </button>
              </div>
            </div>
          </div>

          <div className="p-6 border-t border-[#F1F5F9] mt-auto">
            <button 
              onClick={() => onDelete(media.name)}
              className="w-full px-4 py-3 text-sm font-bold text-red-600 bg-red-50 hover:bg-red-100 rounded-xl transition-colors flex items-center justify-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
              Delete File
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}