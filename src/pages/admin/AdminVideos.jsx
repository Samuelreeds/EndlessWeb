import { useState } from 'react';
import VideoCard from '../../components/admin/VideoCard';
import VideoUploadModal from '../../components/admin/VideoUploadModal';

export default function AdminVideos() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const mockVideos = [
    {
      id: 1,
      title: 'Sarah K. Success Story',
      subtitle: 'Café Owner - 500% ROI in 3 months',
    },
    {
      id: 2,
      title: 'Marcus D. Review',
      subtitle: 'Fitness Studio - Brand Transformation',
    }
  ];

  return (
    <div className="space-y-6 animate-[fadeIn_0.3s_ease-out]">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-[#0A1628] tracking-tight">Video Testimonials</h1>
          <p className="text-[#64748B] mt-1 font-medium">Manage client video reviews and success stories.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-[#2563EB] hover:bg-[#1E4D99] text-white px-5 py-2.5 rounded-xl font-bold transition-all shadow-sm shadow-blue-500/20 flex items-center gap-2"
        >
          <span>＋</span> Add Video
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockVideos.map(video => (
          <VideoCard key={video.id} video={video} />
        ))}
      </div>

      <VideoUploadModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}