export default function VideoCard({ video, onEdit, onDelete }) {
  return (
    <div className="bg-white rounded-2xl border border-[#E2E8F0] shadow-sm hover:shadow-md transition-shadow overflow-hidden group">
      <div 
        className="aspect-video bg-[#F1F5F9] relative flex items-center justify-center border-b border-[#E2E8F0] cursor-pointer bg-cover bg-center"
        style={video.thumbnailUrl ? { backgroundImage: `url(${video.thumbnailUrl})` } : {}}
      >
        <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-md group-hover:scale-110 transition-transform z-10">
          <svg className="w-5 h-5 text-[#2563EB] ml-1" fill="currentColor" viewBox="0 0 20 20">
            <path d="M4 4l12 6-12 6z" />
          </svg>
        </div>
        <div className="absolute inset-0 bg-[#0A1628]/10 group-hover:bg-[#0A1628]/30 transition-colors"></div>
        
        <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity z-20">
          <button onClick={() => onEdit(video)} className="p-1.5 bg-white text-[#64748B] hover:text-[#2563EB] rounded-lg shadow-sm transition-colors">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
          </button>
          <button onClick={() => onDelete(video.id)} className="p-1.5 bg-white text-[#64748B] hover:text-red-600 rounded-lg shadow-sm transition-colors">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
          </button>
        </div>
      </div>
      
      <div className="p-5">
        <h3 className="text-[16px] font-bold text-[#0A1628] leading-tight mb-1">{video.label}</h3>
        <p className="text-[13px] font-medium text-[#64748B]">{video.subtext}</p>
      </div>
    </div>
  );
}