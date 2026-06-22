import { useState, useRef } from 'react';
import MediaPreviewModal from '../../components/admin/MediaPreviewModal';
import { api } from '../../utils/api';
import { useCache } from '../../utils/useCache';

export default function AdminMedia() {
  const [selectedMedia, setSelectedMedia] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');
  const fileInputRef = useRef(null);

  const { data, isLoading, updateCache } = useCache('media', '/media');
  const mediaList = data || [];
  const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

  const refreshData = async () => {
    try {
      const res = await api.fetch('/media');
      const freshData = await res.json();
      updateCache(Array.isArray(freshData) ? freshData : []);
    } catch (err) {
      console.error(err);
    }
  };

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setIsUploading(true);
    try {
      const formData = new FormData();
      formData.append('image', file);
      const res = await fetch(`${BASE_URL}/media/upload`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` },
        body: formData,
      });

      if (!res.ok) throw new Error('Upload failed');
      refreshData();
    } catch (err) {
      console.error('Error uploading:', err);
      alert('Failed to upload file.');
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const handleDelete = async (fileName) => {
    if (!window.confirm('Are you sure you want to delete this file?')) return;
    try {
      await api.fetch(`/media/${fileName}`, { method: 'DELETE' });
      setSelectedMedia(null);
      refreshData();
    } catch (err) {
      console.error('Error deleting:', err);
      alert('Failed to delete file.');
    }
  };

  const formatBytes = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const filteredMedia = mediaList.filter(file => {
    const matchesFilter = filter === 'all' || file.type === (filter === 'images' ? 'image' : 'video');
    const matchesSearch = file.name.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="space-y-6 animate-[fadeIn_0.3s_ease-out]">
      <div>
        <h1 className="text-3xl font-extrabold text-[#0A1628] tracking-tight">Media Library</h1>
        <p className="text-[#64748B] mt-1 font-medium">Upload and manage all your assets directly in Supabase Storage.</p>
      </div>

      <input type="file" ref={fileInputRef} onChange={handleUpload} className="hidden" accept="image/*,video/*" />
      <div onClick={() => !isUploading && fileInputRef.current.click()} className={`border-2 border-dashed border-[#CBD5E1] rounded-2xl p-10 text-center transition-all bg-white group shadow-sm ${isUploading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-[#F8FAFC] cursor-pointer'}`}>
        <h3 className="text-[16px] font-bold text-[#0A1628] mb-1">{isUploading ? 'Uploading...' : 'Click to upload'}</h3>
        <p className="text-[13px] font-medium text-[#64748B]">SVG, PNG, JPG, WEBP, or MP4 (max. 50MB)</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 justify-between items-center">
        <input type="text" placeholder="Search files by name..." value={search} onChange={(e) => setSearch(e.target.value)} className="w-full sm:w-96 px-4 py-2.5 rounded-xl border border-[#E2E8F0]" />
        <select value={filter} onChange={(e) => setFilter(e.target.value)} className="w-full sm:w-auto px-4 py-2.5 rounded-xl border border-[#E2E8F0]">
          <option value="all">All File Types</option>
          <option value="images">Images Only</option>
          <option value="videos">Videos Only</option>
        </select>
      </div>

      {isLoading && mediaList.length === 0 ? (
         <div className="py-12 text-center text-[#64748B] font-medium">Loading media library...</div>
      ) : filteredMedia.length === 0 ? (
         <div className="py-12 text-center text-[#64748B] font-medium border-2 border-dashed border-[#E2E8F0] rounded-2xl bg-white">No files found.</div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          {filteredMedia.map((file) => (
            <div key={file.id} onClick={() => setSelectedMedia(file)} className="group relative aspect-square bg-[#F8FAFC] rounded-xl border border-[#E2E8F0] overflow-hidden cursor-pointer flex items-center justify-center bg-cover bg-center" style={file.type === 'image' ? { backgroundImage: `url(${file.url})` } : {}}>
              {file.type === 'video' && <div className="bg-[#0A1628]/50 p-3 rounded-full text-white backdrop-blur-sm z-10">▶</div>}
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#0A1628]/90 to-transparent p-3 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all z-20">
                <p className="text-white text-xs font-bold truncate">{file.name}</p>
                <p className="text-white/70 text-[10px] font-medium mt-0.5">{formatBytes(file.size)}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      <MediaPreviewModal media={selectedMedia} onClose={() => setSelectedMedia(null)} onDelete={handleDelete} formatBytes={formatBytes} />
    </div>
  );
}