import { useState, useEffect, useRef } from 'react';
import MediaPreviewModal from '../../components/admin/MediaPreviewModal';

export default function AdminMedia() {
  const [selectedMedia, setSelectedMedia] = useState(null);
  const [mediaList, setMediaList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isUploading, setIsUploading] = useState(false);
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');
  const fileInputRef = useRef(null);

  const fetchMedia = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/media');
      if (!res.ok) throw new Error('Failed to fetch media');
      const data = await res.json();
      setMediaList(data);
    } catch (err) {
      console.error('Error fetching media:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMedia();
  }, []);

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setIsUploading(true);
    try {
      const token = localStorage.getItem('token');
      const formData = new FormData();
      formData.append('image', file);

      const res = await fetch('http://localhost:5000/api/media/upload', {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` },
        body: formData,
      });

      if (!res.ok) throw new Error('Upload failed');
      
      // Refresh the library after successful upload
      fetchMedia();
    } catch (err) {
      console.error('Error uploading:', err);
      alert('Failed to upload file.');
    } finally {
      setIsUploading(false);
      // Reset input so the same file can be uploaded again if needed
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const handleDelete = async (fileName) => {
    if (!window.confirm('Are you sure you want to delete this file? This may break images currently in use on the website.')) return;
    
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`http://localhost:5000/api/media/${fileName}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      
      if (!res.ok) throw new Error('Delete failed');
      
      setSelectedMedia(null);
      fetchMedia();
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

  // Filter and Search Logic
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

      {/* Hidden File Input & Drag/Drop Area */}
      <input 
        type="file" 
        ref={fileInputRef} 
        onChange={handleUpload} 
        className="hidden" 
        accept="image/*,video/*"
      />
      <div 
        onClick={() => !isUploading && fileInputRef.current.click()}
        className={`border-2 border-dashed border-[#CBD5E1] rounded-2xl p-10 text-center transition-all bg-white group shadow-sm ${isUploading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-[#F8FAFC] hover:border-[#94A3B8] cursor-pointer'}`}
      >
        <div className="w-16 h-16 bg-[#EFF6FF] text-[#2563EB] rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 group-hover:bg-[#DBEAFE] transition-all">
          {isUploading ? (
            <svg className="w-7 h-7 animate-spin" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
          ) : (
            <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg>
          )}
        </div>
        <h3 className="text-[16px] font-bold text-[#0A1628] mb-1">{isUploading ? 'Uploading...' : 'Click to upload'}</h3>
        <p className="text-[13px] font-medium text-[#64748B]">SVG, PNG, JPG, WEBP, or MP4 (max. 50MB)</p>
      </div>

      {/* Controls */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-center">
        <div className="relative w-full sm:w-96">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#94A3B8]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input 
            type="text" 
            placeholder="Search files by name..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#E2E8F0] bg-white focus:ring-2 focus:ring-[#2563EB] focus:border-transparent outline-none transition text-sm font-medium shadow-sm"
          />
        </div>
        <select 
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="w-full sm:w-auto px-4 py-2.5 rounded-xl border border-[#E2E8F0] bg-white focus:ring-2 focus:ring-[#2563EB] outline-none transition text-sm font-bold text-[#334155] cursor-pointer shadow-sm"
        >
          <option value="all">All File Types</option>
          <option value="images">Images Only</option>
          <option value="videos">Videos Only</option>
        </select>
      </div>

      {/* Grid */}
      {isLoading ? (
         <div className="py-12 text-center text-[#64748B] font-medium">Loading media library...</div>
      ) : filteredMedia.length === 0 ? (
         <div className="py-12 text-center text-[#64748B] font-medium border-2 border-dashed border-[#E2E8F0] rounded-2xl bg-white">No files found.</div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          {filteredMedia.map((file) => (
            <div 
              key={file.id} 
              onClick={() => setSelectedMedia(file)}
              className="group relative aspect-square bg-[#F8FAFC] rounded-xl border border-[#E2E8F0] overflow-hidden cursor-pointer hover:border-[#2563EB] hover:shadow-md transition-all flex items-center justify-center bg-cover bg-center"
              style={file.type === 'image' ? { backgroundImage: `url(${file.url})` } : {}}
            >
              {file.type === 'video' && (
                <div className="bg-[#0A1628]/50 p-3 rounded-full text-white backdrop-blur-sm group-hover:scale-110 transition-transform z-10">
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                </div>
              )}
              
              <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#0A1628]/90 to-transparent p-3 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all z-20">
                <p className="text-white text-xs font-bold truncate">{file.name}</p>
                <p className="text-white/70 text-[10px] font-medium mt-0.5">{formatBytes(file.size)}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      <MediaPreviewModal 
        media={selectedMedia} 
        onClose={() => setSelectedMedia(null)} 
        onDelete={handleDelete}
        formatBytes={formatBytes}
      />
    </div>
  );
}