import { useState } from 'react';
import VideoCard from '../../components/admin/VideoCard';
import VideoUploadModal from '../../components/admin/VideoUploadModal';
import { api } from '../../utils/api';
import { useCache } from '../../utils/useCache';

export default function AdminVideoTestimonials() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingVideo, setEditingVideo] = useState(null);

  // Use memory cache
  const { data, isLoading, updateCache } = useCache('videos', '/cms/video-testimonials');
  const videos = data || [];

  const refreshData = async () => {
    try {
      const res = await api.fetch('/cms/video-testimonials');
      const freshData = await res.json();
      updateCache(Array.isArray(freshData) ? freshData : []);
    } catch (err) {
      console.error('Error refreshing videos:', err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this video?')) return;
    try {
      await api.fetch(`/cms/video-testimonials/${id}`, { method: 'DELETE' });
      refreshData();
    } catch (err) {
      alert('Failed to delete video.');
    }
  };

  const handleEdit = (video) => {
    setEditingVideo(video);
    setIsModalOpen(true);
  };

  return (
    <div className="space-y-6 animate-[fadeIn_0.3s_ease-out]">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-[#0A1628] tracking-tight">Video Testimonials</h1>
          <p className="text-[#64748B] mt-1 font-medium">Manage client video reviews and success stories.</p>
        </div>
        <button 
          onClick={() => { setEditingVideo(null); setIsModalOpen(true); }}
          className="bg-[#2563EB] hover:bg-[#1E4D99] text-white px-5 py-2.5 rounded-xl font-bold transition-all shadow-sm shadow-blue-500/20 flex items-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" /></svg> Add Video
        </button>
      </div>

      {isLoading ? (
        <div className="p-12 text-center text-[#64748B] font-medium bg-white rounded-2xl border border-[#E2E8F0]">
          Loading videos...
        </div>
      ) : videos.length === 0 ? (
        <div className="p-12 text-center bg-white rounded-2xl border border-[#E2E8F0]">
          <p className="text-[#64748B] font-medium">No videos found. Click "Add Video" to upload one.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {videos.map(video => (
            <VideoCard 
              key={video.id} 
              video={video} 
              onEdit={handleEdit} 
              onDelete={handleDelete} 
            />
          ))}
        </div>
      )}

      <VideoUploadModal 
        isOpen={isModalOpen} 
        onClose={() => { setIsModalOpen(false); setEditingVideo(null); }} 
        onSuccess={refreshData}
        videoToEdit={editingVideo}
      />
    </div>
  );
}