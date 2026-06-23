import { useState, useRef, useEffect } from 'react';

export default function VideoUploadModal({ isOpen, onClose, onSuccess, videoToEdit }) {
  const [formData, setFormData] = useState({ label: '', subtext: '' });
  const [videoFile, setVideoFile] = useState(null);
  const [thumbnailFile, setThumbnailFile] = useState(null);
  const [thumbnailPreview, setThumbnailPreview] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  
  const videoInputRef = useRef(null);
  const thumbnailInputRef = useRef(null);

  const isEditing = !!videoToEdit;

  useEffect(() => {
    if (videoToEdit) {
      setFormData({
        label: videoToEdit.label || '',
        subtext: videoToEdit.subtext || ''
      });
      setThumbnailPreview(videoToEdit.thumbnailUrl || null);
    } else {
      setFormData({ label: '', subtext: '' });
      setThumbnailPreview(null);
    }
    setVideoFile(null);
    setThumbnailFile(null);
  }, [videoToEdit, isOpen]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleVideoChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) setVideoFile(selectedFile);
  };

  const handleThumbnailChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setThumbnailFile(selectedFile);
      setThumbnailPreview(URL.createObjectURL(selectedFile));
    }
  };

  const uploadMedia = async (file, token) => {
    const mediaForm = new FormData();
    mediaForm.append('image', file); // using 'image' as expected by backend multer
    const res = await fetch('${import.meta.env.VITE_API_URL}/api/media/upload', {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${token}` },
      body: mediaForm,
    });
    if (!res.ok) throw new Error('Failed to upload media');
    const data = await res.json();
    return data.url;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const token = localStorage.getItem('token');
      let finalVideoUrl = isEditing ? videoToEdit.videoUrl : '';
      let finalThumbnailUrl = isEditing ? videoToEdit.thumbnailUrl : '';

      // 1. Upload Video if selected
      if (videoFile) {
        finalVideoUrl = await uploadMedia(videoFile, token);
      } else if (!isEditing) {
        throw new Error('A video file is required');
      }

      // 2. Upload Thumbnail if selected
      if (thumbnailFile) {
        finalThumbnailUrl = await uploadMedia(thumbnailFile, token);
      }

      // 3. Save to Database
      const payload = {
        label: formData.label,
        subtext: formData.subtext,
        videoUrl: finalVideoUrl,
        ...(finalThumbnailUrl && { thumbnailUrl: finalThumbnailUrl })
      };

      const url = isEditing 
        ? `${import.meta.env.VITE_API_URL}/api/cms/video-testimonials/${videoToEdit.id}`
        : '${import.meta.env.VITE_API_URL}/api/cms/video-testimonials';

      const res = await fetch(url, {
        method: isEditing ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || `Failed to ${isEditing ? 'update' : 'create'} video`);
      }

      onSuccess();
      onClose();
    } catch (error) {
      console.error('Error saving video:', error);
      alert(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0A1628]/40 backdrop-blur-sm p-4 animate-[fadeIn_0.2s_ease-out]">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl overflow-hidden border border-[#E2E8F0]">
        
        <div className="px-8 py-5 border-b border-[#F1F5F9] flex justify-between items-center bg-[#F8FAFC]">
          <h2 className="text-xl font-extrabold text-[#0A1628]">{isEditing ? 'Edit Video Testimonial' : 'Upload Video Testimonial'}</h2>
          <button onClick={onClose} className="text-[#94A3B8] hover:text-[#0A1628] text-xl transition-colors">✕</button>
        </div>
        
        <form id="videoForm" onSubmit={handleSubmit} className="p-8 space-y-6 bg-white overflow-y-auto max-h-[75vh]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <label className="block text-sm font-bold text-[#334155] mb-2">Video File</label>
              <input type="file" accept="video/mp4,video/webm,video/ogg" className="hidden" ref={videoInputRef} onChange={handleVideoChange} />
              <div 
                onClick={() => videoInputRef.current.click()}
                className={`border-2 border-dashed ${videoFile || (isEditing && videoToEdit.videoUrl) ? 'border-[#2563EB] bg-[#EFF6FF]' : 'border-[#CBD5E1]'} rounded-2xl p-10 text-center hover:bg-[#F8FAFC] transition cursor-pointer group`}
              >
                <svg className="w-8 h-8 mx-auto text-[#94A3B8] group-hover:text-[#2563EB] mb-3 group-hover:scale-110 transition-all" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
                <span className="text-[15px] text-[#0A1628] font-bold block mb-1">
                  {videoFile ? videoFile.name : (isEditing && videoToEdit.videoUrl ? 'Video Uploaded (Click to replace)' : 'Click to upload video')}
                </span>
                <span className="text-[13px] text-[#64748B] font-medium">MP4, WebM, or OGG up to 50MB</span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-[#334155] mb-2">Title</label>
              <input 
                type="text" name="label" value={formData.label} onChange={handleChange} required
                className="w-full px-4 py-3 rounded-xl border border-[#E2E8F0] focus:ring-2 focus:ring-[#2563EB] focus:border-transparent outline-none transition font-medium text-sm" 
                placeholder="e.g. Sarah K. Review" 
              />
            </div>
            
            <div>
              <label className="block text-sm font-bold text-[#334155] mb-2">Subtitle</label>
              <input 
                type="text" name="subtext" value={formData.subtext} onChange={handleChange} required
                className="w-full px-4 py-3 rounded-xl border border-[#E2E8F0] focus:ring-2 focus:ring-[#2563EB] focus:border-transparent outline-none transition font-medium text-sm" 
                placeholder="e.g. Café Owner - 500% ROI" 
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-bold text-[#334155] mb-2">Custom Thumbnail (Optional)</label>
              <input type="file" accept="image/png, image/jpeg, image/webp" className="hidden" ref={thumbnailInputRef} onChange={handleThumbnailChange} />
              <div 
                onClick={() => thumbnailInputRef.current.click()}
                className="border-2 border-dashed border-[#CBD5E1] rounded-xl p-6 text-center hover:bg-[#F8FAFC] transition cursor-pointer flex flex-col items-center justify-center overflow-hidden h-32"
              >
                {thumbnailPreview ? (
                  <img src={thumbnailPreview} alt="Thumbnail preview" className="h-full object-contain" />
                ) : (
                  <>
                    <svg className="w-8 h-8 mx-auto text-[#94A3B8] group-hover:text-[#2563EB] mb-3 group-hover:scale-110 transition-all" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                    </svg>
                    <span className="text-sm text-[#64748B] font-bold">Upload cover image</span>
                  </>
                )}
              </div>
            </div>
          </div>
        </form>

        <div className="px-8 py-5 border-t border-[#F1F5F9] bg-white flex justify-end gap-3">
          <button type="button" onClick={onClose} className="px-6 py-2.5 text-sm font-bold text-[#64748B] hover:bg-[#F1F5F9] rounded-xl transition-colors">
            Cancel
          </button>
          <button type="submit" form="videoForm" disabled={isLoading} className="px-6 py-2.5 text-sm font-bold text-white bg-[#2563EB] hover:bg-[#1E4D99] disabled:opacity-50 rounded-xl shadow-md shadow-blue-500/20 transition-all">
            {isLoading ? 'Uploading...' : (isEditing ? 'Update Video' : 'Upload Video')}
          </button>
        </div>

      </div>
    </div>
  );
}