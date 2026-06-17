import { useState } from 'react';
import MediaPreviewModal from '../../components/admin/MediaPreviewModal';

export default function AdminMedia() {
  const [selectedMedia, setSelectedMedia] = useState(null);

  const mockMedia = [
    { id: 1, type: 'image', name: 'hero-banner-v2.jpg', size: '1.2 MB', date: 'Oct 12, 2023' },
    { id: 2, type: 'image', name: 'darashop-logo.png', size: '45 KB', date: 'Oct 14, 2023' },
    { id: 3, type: 'image', name: 'team-photo.jpg', size: '2.4 MB', date: 'Oct 15, 2023' },
    { id: 4, type: 'video', name: 'promo-reel.mp4', size: '14.5 MB', date: 'Oct 16, 2023' },
    { id: 5, type: 'image', name: 'office-front.jpg', size: '3.1 MB', date: 'Oct 18, 2023' },
    { id: 6, type: 'image', name: 'app-mockup.png', size: '890 KB', date: 'Oct 20, 2023' },
  ];

  return (
    <div className="space-y-6 animate-[fadeIn_0.3s_ease-out]">
      <div>
        <h1 className="text-3xl font-extrabold text-[#0A1628] tracking-tight">Media Library</h1>
        <p className="text-[#64748B] mt-1 font-medium">Upload and manage all your assets in one place.</p>
      </div>

      {/* Drag & Drop Area */}
      <div className="border-2 border-dashed border-[#CBD5E1] rounded-2xl p-10 text-center hover:bg-[#F8FAFC] transition-colors cursor-pointer bg-white group">
        <div className="w-16 h-16 bg-[#EFF6FF] text-[#2563EB] rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" /></svg>
        </div>
        <h3 className="text-[16px] font-bold text-[#0A1628] mb-1">Click to upload or drag and drop</h3>
        <p className="text-[13px] font-medium text-[#64748B]">SVG, PNG, JPG or MP4 (max. 50MB)</p>
      </div>

      {/* Controls */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-center">
        <div className="relative w-full sm:w-96">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#94A3B8]">🔍</span>
          <input 
            type="text" 
            placeholder="Search files..." 
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#E2E8F0] bg-white focus:ring-2 focus:ring-[#2563EB] focus:border-transparent outline-none transition text-sm font-medium shadow-sm"
          />
        </div>
        <select className="w-full sm:w-auto px-4 py-2.5 rounded-xl border border-[#E2E8F0] bg-white focus:ring-2 focus:ring-[#2563EB] outline-none transition text-sm font-bold text-[#334155] cursor-pointer shadow-sm">
          <option value="all">All File Types</option>
          <option value="images">Images Only</option>
          <option value="videos">Videos Only</option>
        </select>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
        {mockMedia.map((file) => (
          <div 
            key={file.id} 
            onClick={() => setSelectedMedia(file)}
            className="group relative aspect-square bg-[#F1F5F9] rounded-xl border border-[#E2E8F0] overflow-hidden cursor-pointer hover:border-[#2563EB] transition-colors shadow-sm"
          >
            <div className="absolute inset-0 flex items-center justify-center text-[#94A3B8] font-bold text-4xl">
              {file.type === 'video' ? '🎬' : '🖼️'}
            </div>
            
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#0A1628]/80 to-transparent p-3 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all">
              <p className="text-white text-xs font-bold truncate">{file.name}</p>
              <p className="text-white/70 text-[10px] font-medium mt-0.5">{file.size}</p>
            </div>
          </div>
        ))}
      </div>

      <MediaPreviewModal 
        media={selectedMedia} 
        onClose={() => setSelectedMedia(null)} 
      />
    </div>
  );
}