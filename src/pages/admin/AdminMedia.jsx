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

  const ImageSvg = () => (
    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
  );

  const VideoSvg = () => (
    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
    </svg>
  );

  return (
    <div className="space-y-6 animate-[fadeIn_0.3s_ease-out]">
      <div>
        <h1 className="text-3xl font-extrabold text-[#0A1628] tracking-tight">Media Library</h1>
        <p className="text-[#64748B] mt-1 font-medium">Upload and manage all your assets in one place.</p>
      </div>

      {/* Drag & Drop Area */}
      <div className="border-2 border-dashed border-[#CBD5E1] rounded-2xl p-10 text-center hover:bg-[#F8FAFC] hover:border-[#94A3B8] transition-all cursor-pointer bg-white group shadow-sm">
        <div className="w-16 h-16 bg-[#EFF6FF] text-[#2563EB] rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 group-hover:bg-[#DBEAFE] transition-all">
          <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg>
        </div>
        <h3 className="text-[16px] font-bold text-[#0A1628] mb-1">Click to upload or drag and drop</h3>
        <p className="text-[13px] font-medium text-[#64748B]">SVG, PNG, JPG or MP4 (max. 50MB)</p>
      </div>

      {/* Controls */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-center">
        <div className="relative w-full sm:w-96">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#94A3B8]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
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
            className="group relative aspect-square bg-[#F8FAFC] rounded-xl border border-[#E2E8F0] overflow-hidden cursor-pointer hover:border-[#2563EB] hover:shadow-md transition-all flex items-center justify-center"
          >
            <div className="text-[#94A3B8] group-hover:text-[#2563EB] group-hover:scale-110 transition-transform">
              {file.type === 'video' ? <VideoSvg /> : <ImageSvg />}
            </div>
            
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#0A1628]/90 to-transparent p-3 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all">
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