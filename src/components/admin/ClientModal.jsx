import { useState, useRef, useEffect } from 'react';

// NEW: Accept clientToEdit prop
export default function ClientModal({ isOpen, onClose, onSuccess, clientToEdit }) {
  const [formData, setFormData] = useState({ name: '', website: '', status: 'active' });
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef(null);

  // NEW: Check if we are editing or creating
  const isEditing = !!clientToEdit;

  // NEW: Pre-fill the form when the modal opens and clientToEdit changes
  useEffect(() => {
    if (clientToEdit) {
      setFormData({
        name: clientToEdit.name || '',
        website: clientToEdit.website || '',
        status: clientToEdit.status || 'active'
      });
      setPreview(clientToEdit.imageUrl || null);
    } else {
      setFormData({ name: '', website: '', status: 'active' });
      setPreview(null);
    }
    setFile(null); // Reset any file selections
  }, [clientToEdit, isOpen]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const token = localStorage.getItem('token');
      // Default to the existing image URL if we are editing and don't upload a new one
      let uploadedLogoUrl = isEditing ? clientToEdit.imageUrl : '';

      if (file) {
        const mediaForm = new FormData();
        mediaForm.append('image', file);

        const uploadRes = await fetch(`${import.meta.env.VITE_API_URL}/api/media/upload`, {
          method: 'POST',
          headers: { 'Authorization': `Bearer ${token}` },
          body: mediaForm,
        });

        if (!uploadRes.ok) {
          const errData = await uploadRes.json();
          throw new Error(errData.error || 'Failed to upload image');
        }

        const uploadData = await uploadRes.json();
        uploadedLogoUrl = uploadData.url;
      }

      const clientPayload = {
        name: formData.name,
        website: formData.website,
        status: formData.status,
        ...(uploadedLogoUrl && { imageUrl: uploadedLogoUrl })
      };

      // NEW: Dynamically set the URL and Method based on isEditing
      const url = isEditing 
        ? `${import.meta.env.VITE_API_URL}/api/cms/client-logos/${clientToEdit.id}`
        : `${import.meta.env.VITE_API_URL}/api/cms/client-logos`;
        
      const method = isEditing ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method: method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(clientPayload)
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || `Failed to ${isEditing ? 'update' : 'create'} client`);
      }

      onSuccess();
      onClose();

    } catch (error) {
      console.error('Error saving client:', error);
      alert(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0A1628]/40 backdrop-blur-sm p-4 animate-[fadeIn_0.2s_ease-out]">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden border border-[#E2E8F0]">
        <div className="px-8 py-6 border-b border-[#F1F5F9] flex justify-between items-center bg-[#F8FAFC]">
          {/* NEW: Dynamic Title */}
          <h2 className="text-xl font-extrabold text-[#0A1628]">
            {isEditing ? 'Edit Client' : 'Add New Client'}
          </h2>
          <button onClick={onClose} className="text-[#94A3B8] hover:text-[#0A1628] text-xl transition-colors">✕</button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-8 space-y-6 bg-white">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-bold text-[#334155] mb-2">Client Name</label>
              <input 
                type="text" 
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-xl border border-[#E2E8F0] focus:ring-2 focus:ring-[#2563EB] focus:border-transparent outline-none transition font-medium text-sm" 
                placeholder="e.g. Endless OS" 
              />
            </div>
            
            <div>
              <label className="block text-sm font-bold text-[#334155] mb-2">Website URL</label>
              <input 
                type="url" 
                name="website"
                value={formData.website}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-[#E2E8F0] focus:ring-2 focus:ring-[#2563EB] focus:border-transparent outline-none transition font-medium text-sm" 
                placeholder="https://..." 
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-[#334155] mb-2">Status</label>
              <select 
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-[#E2E8F0] focus:ring-2 focus:ring-[#2563EB] outline-none transition font-medium text-sm bg-white cursor-pointer"
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-bold text-[#334155] mb-2">Client Logo</label>
              <input 
                type="file" 
                accept="image/png, image/jpeg, image/svg+xml, image/webp"
                className="hidden" 
                ref={fileInputRef}
                onChange={handleFileChange}
              />
              <div 
                onClick={() => fileInputRef.current.click()}
                className="border-2 border-dashed border-[#CBD5E1] rounded-xl p-8 text-center hover:bg-[#F8FAFC] transition cursor-pointer group relative overflow-hidden"
              >
                {preview ? (
                  <img src={preview} alt="Preview" className="max-h-24 mx-auto object-contain" />
                ) : (
                  <>
                    <svg className="w-12 h-12 mx-auto mb-3 text-[#94A3B8] group-hover:text-[#2563EB] transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                    </svg>
                    <span className="text-sm text-[#64748B] font-bold">Click to upload or drag and drop</span>
                    <p className="text-xs text-[#94A3B8] mt-2 font-medium">PNG, JPG, SVG up to 2MB</p>
                  </>
                )}
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-6 border-t border-[#F1F5F9]">
            <button 
              type="button" 
              onClick={onClose} 
              className="px-6 py-2.5 text-sm font-bold text-[#64748B] hover:bg-[#F1F5F9] rounded-xl transition-colors"
            >
              Cancel
            </button>
            {/* NEW: Dynamic Button Text */}
            <button 
              type="submit" 
              disabled={isLoading}
              className="px-6 py-2.5 text-sm font-bold text-white bg-[#2563EB] hover:bg-[#1E4D99] disabled:opacity-50 rounded-xl shadow-md shadow-blue-500/20 transition-all"
            >
              {isLoading ? 'Saving...' : (isEditing ? 'Update Client' : 'Save Client')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}