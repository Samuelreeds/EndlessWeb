import { useState, useEffect, useRef } from 'react';

export default function ImageTestimonialModal({ isOpen, onClose, initialData, onSuccess }) {
  const [clientName, setClientName] = useState('');
  const [existingImages, setExistingImages] = useState([]); 
  const [newFiles, setNewFiles] = useState([]); 
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef(null);

  const BASE_URL = 'http://localhost:5000/api';

  useEffect(() => {
    if (initialData) {
      setClientName(initialData.clientName || '');
      setExistingImages(initialData.images || []);
    } else {
      setClientName('');
      setExistingImages([]);
    }
    setNewFiles([]);
  }, [initialData, isOpen]);

  if (!isOpen) return null;

  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;

    const filesWithPreviews = files.map(file => ({
      file,
      preview: URL.createObjectURL(file)
    }));

    setNewFiles(prev => [...prev, ...filesWithPreviews]);
    if (fileInputRef.current) fileInputRef.current.value = ''; 
  };

  const removeExistingImage = (index) => {
    setExistingImages(prev => prev.filter((_, i) => i !== index));
  };

  const removeNewFile = (index) => {
    setNewFiles(prev => {
      const updated = [...prev];
      URL.revokeObjectURL(updated[index].preview); 
      updated.splice(index, 1);
      return updated;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (existingImages.length + newFiles.length === 0) {
      return alert("Please add at least one image.");
    }
    
    setIsLoading(true);

    try {
      const token = localStorage.getItem('token');
      let newlyUploadedUrls = [];

      // 1. Upload new files directly to your Media endpoint
      for (const item of newFiles) {
        const formData = new FormData();
        formData.append('image', item.file);

        const uploadRes = await fetch(`${BASE_URL}/media/upload`, {
          method: 'POST',
          headers: { 'Authorization': `Bearer ${token}` },
          body: formData,
        });

        if (!uploadRes.ok) throw new Error('Failed to upload one or more images.');
        
        const uploadData = await uploadRes.json();
        const fileUrl = uploadData.url || uploadData.imageUrl;
        if (!fileUrl) throw new Error('Backend did not return an image URL after upload.');
        
        newlyUploadedUrls.push(fileUrl);
      }

      // 2. Combine saved URLs with freshly uploaded URLs
      const finalImageUrls = [...existingImages, ...newlyUploadedUrls];

      // 3. Save the gallery record to the database
      const payload = { clientName, images: finalImageUrls };
      const endpoint = initialData ? `${BASE_URL}/cms/image-testimonials/${initialData.id}` : `${BASE_URL}/cms/image-testimonials`;
      
      const res = await fetch(endpoint, {
        method: initialData ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.error || `Failed to save gallery (Status: ${res.status})`);
      }

      onSuccess();
      onClose();
    } catch (err) {
      console.error(err);
      alert(err.message || 'An error occurred while saving.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0A1628]/40 backdrop-blur-sm p-4 animate-[fadeIn_0.2s_ease-out]">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-3xl w-full max-w-xl space-y-6 shadow-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-xl font-extrabold text-[#0A1628]">
            {initialData ? 'Edit Gallery' : 'Add New Gallery'}
          </h2>
          <button type="button" onClick={onClose} className="text-[#94A3B8] hover:text-[#0A1628] transition-colors text-xl">✕</button>
        </div>

        <div>
          <label className="block text-sm font-bold text-[#334155] mb-2">Client / Project Name</label>
          <input 
            type="text" 
            required
            className="w-full px-4 py-3 rounded-xl border border-[#E2E8F0] focus:ring-2 focus:ring-[#2563EB] outline-none transition-shadow" 
            value={clientName}
            onChange={e => setClientName(e.target.value)}
            placeholder="e.g., Tea Kingdom"
          />
        </div>

        <div>
          <div className="flex justify-between items-end mb-2">
            <label className="block text-sm font-bold text-[#334155]">Gallery Images</label>
            <span className="text-xs font-medium text-[#64748B]">
              {existingImages.length + newFiles.length} / 4 Recommended
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-4">
            {existingImages.map((url, idx) => (
              <div key={`existing-${idx}`} className="relative aspect-square rounded-xl overflow-hidden border border-[#E2E8F0] group bg-[#F8FAFC]">
                <img src={url} alt="saved preview" className="w-full h-full object-cover" />
                <button type="button" onClick={() => removeExistingImage(idx)} className="absolute top-1.5 right-1.5 bg-red-500 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition-opacity shadow-sm hover:bg-red-600">✕</button>
              </div>
            ))}

            {newFiles.map((item, idx) => (
              <div key={`new-${idx}`} className="relative aspect-square rounded-xl overflow-hidden border-2 border-[#2563EB] group bg-[#F8FAFC]">
                <img src={item.preview} alt="upload preview" className="w-full h-full object-cover opacity-80" />
                <div className="absolute inset-0 flex items-center justify-center bg-black/10 pointer-events-none">
                  <span className="bg-[#2563EB] text-white text-[10px] font-bold px-2 py-1 rounded-md shadow-sm">NEW</span>
                </div>
                <button type="button" onClick={() => removeNewFile(idx)} className="absolute top-1.5 right-1.5 bg-red-500 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition-opacity shadow-sm hover:bg-red-600">✕</button>
              </div>
            ))}

            <div onClick={() => fileInputRef.current?.click()} className="aspect-square rounded-xl border-2 border-dashed border-[#CBD5E1] hover:border-[#2563EB] hover:bg-[#EFF6FF] transition-colors flex flex-col items-center justify-center cursor-pointer text-[#64748B] hover:text-[#2563EB]">
              <svg className="w-6 h-6 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
              <span className="text-xs font-bold">Add Image</span>
            </div>
          </div>

          <input type="file" ref={fileInputRef} onChange={handleFileSelect} className="hidden" accept="image/*" multiple />
        </div>

        <div className="flex justify-end gap-3 pt-4 border-t border-[#F1F5F9]">
          <button type="button" onClick={onClose} className="px-6 py-2.5 font-bold text-[#64748B] hover:bg-[#F8FAFC] rounded-xl transition-colors">
            Cancel
          </button>
          <button type="submit" disabled={isLoading} className="bg-[#2563EB] text-white px-8 py-2.5 rounded-xl font-bold hover:bg-[#1E4D99] transition-colors shadow-sm disabled:opacity-50 flex items-center gap-2">
            {isLoading ? 'Saving...' : 'Save Gallery'}
          </button>
        </div>
      </form>
    </div>
  );
}