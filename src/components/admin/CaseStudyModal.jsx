import { useState, useRef, useEffect } from 'react';

export default function CaseStudyModal({ isOpen, onClose, onSuccess, studyToEdit }) {
  const [formData, setFormData] = useState({ title: '', tag: '', challenge: '', approach: '' });
  const [metrics, setMetrics] = useState([{ value: '', label: '' }]);
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef(null);

  const isEditing = !!studyToEdit;

  useEffect(() => {
    if (studyToEdit) {
      setFormData({
        title: studyToEdit.title || '',
        tag: studyToEdit.tag || '',
        challenge: studyToEdit.challenge || '',
        approach: studyToEdit.approach || ''
      });
      setPreview(studyToEdit.imageUrl || null);
      
      try {
        const parsedMetrics = typeof studyToEdit.results === 'string' 
          ? JSON.parse(studyToEdit.results) 
          : studyToEdit.results;
        setMetrics(parsedMetrics && parsedMetrics.length > 0 ? parsedMetrics : [{ value: '', label: '' }]);
      } catch (e) {
        setMetrics([{ value: '', label: '' }]);
      }
    } else {
      setFormData({ title: '', tag: '', challenge: '', approach: '' });
      setMetrics([{ value: '', label: '' }]);
      setPreview(null);
    }
    setFile(null);
  }, [studyToEdit, isOpen]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleMetricChange = (index, field, value) => {
    const newMetrics = [...metrics];
    newMetrics[index][field] = value;
    setMetrics(newMetrics);
  };

  const addMetric = () => setMetrics([...metrics, { value: '', label: '' }]);
  const removeMetric = (index) => setMetrics(metrics.filter((_, i) => i !== index));

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
      let uploadedImageUrl = isEditing ? studyToEdit.imageUrl : '';

      if (file) {
        const mediaForm = new FormData();
        mediaForm.append('image', file);
        const uploadRes = await fetch(`${import.meta.env.VITE_API_URL}/api/media/upload`, {
          method: 'POST',
          headers: { 'Authorization': `Bearer ${token}` },
          body: mediaForm,
        });

        if (!uploadRes.ok) throw new Error('Failed to upload image');
        const uploadData = await uploadRes.json();
        uploadedImageUrl = uploadData.url;
      }

      // Filter out empty metrics before saving
      const validMetrics = metrics.filter(m => m.value.trim() !== '' || m.label.trim() !== '');

      const payload = {
        title: formData.title,
        tag: formData.tag,
        challenge: formData.challenge,
        approach: formData.approach,
        results: validMetrics, // Send as JSON array
        ...(uploadedImageUrl && { imageUrl: uploadedImageUrl })
      };

      const url = isEditing 
        ? `${import.meta.env.VITE_API_URL}/api/cms/case-studies/${studyToEdit.id}`
        : `${import.meta.env.VITE_API_URL}/api/cms/case-studies`;

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
        throw new Error(errData.error || `Failed to ${isEditing ? 'update' : 'create'} case study`);
      }

      onSuccess();
      onClose();
    } catch (error) {
      console.error('Error saving case study:', error);
      alert(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0A1628]/40 backdrop-blur-sm p-4 sm:p-6 lg:p-8 animate-[fadeIn_0.2s_ease-out]">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden border border-[#E2E8F0]">
        
        <div className="px-8 py-5 border-b border-[#F1F5F9] flex justify-between items-center bg-[#F8FAFC] flex-shrink-0">
          <h2 className="text-xl font-extrabold text-[#0A1628]">{isEditing ? 'Edit Case Study' : 'Create Case Study'}</h2>
          <button type="button" onClick={onClose} className="text-[#94A3B8] hover:text-[#0A1628] text-xl transition-colors">✕</button>
        </div>
        
        <div className="p-8 overflow-y-auto flex-1">
          <form id="caseStudyForm" onSubmit={handleSubmit} className="space-y-8">
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-bold text-[#334155] mb-2">Title</label>
                <input 
                  type="text" name="title" value={formData.title} onChange={handleChange} required
                  className="w-full px-4 py-3 rounded-xl border border-[#E2E8F0] focus:ring-2 focus:ring-[#2563EB] focus:border-transparent outline-none transition font-medium text-sm" 
                  placeholder="e.g. From Zero Engagement to 22 DMs" 
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-[#334155] mb-2">Category (Tag)</label>
                <input 
                  type="text" name="tag" value={formData.tag} onChange={handleChange} required
                  className="w-full px-4 py-3 rounded-xl border border-[#E2E8F0] focus:ring-2 focus:ring-[#2563EB] focus:border-transparent outline-none transition font-medium text-sm" 
                  placeholder="e.g. F&B Business" 
                />
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-bold text-[#334155] mb-2">Challenge</label>
                <textarea 
                  name="challenge" value={formData.challenge} onChange={handleChange} rows="3" required
                  className="w-full px-4 py-3 rounded-xl border border-[#E2E8F0] focus:ring-2 focus:ring-[#2563EB] focus:border-transparent outline-none transition font-medium text-sm resize-none" 
                  placeholder="What was the client struggling with?" 
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-[#334155] mb-2">Approach</label>
                <textarea 
                  name="approach" value={formData.approach} onChange={handleChange} rows="3" required
                  className="w-full px-4 py-3 rounded-xl border border-[#E2E8F0] focus:ring-2 focus:ring-[#2563EB] focus:border-transparent outline-none transition font-medium text-sm resize-none" 
                  placeholder="How did Endless solve this problem?" 
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-[#334155] mb-4">Cover Image</label>
              <input type="file" accept="image/png, image/jpeg, image/webp" className="hidden" ref={fileInputRef} onChange={handleFileChange} />
              <div 
                onClick={() => fileInputRef.current.click()}
                className="border-2 border-dashed border-[#CBD5E1] rounded-xl p-8 text-center hover:bg-[#F8FAFC] transition cursor-pointer group relative overflow-hidden h-48 flex items-center justify-center bg-[#F8FAFC]"
              >
                {preview ? (
                  <img src={preview} alt="Preview" className="h-full object-contain" />
                ) : (
                  <div>
                    <span className="text-3xl mb-3 block group-hover:scale-110 transition-transform">📸</span>
                    <span className="text-sm text-[#64748B] font-bold block">Click to Upload Cover Image</span>
                    <span className="text-xs text-[#94A3B8] font-medium mt-1 block">Matches Database Schema</span>
                  </div>
                )}
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-4">
                <label className="block text-sm font-bold text-[#334155]">Key Results (Metrics)</label>
                <button type="button" onClick={addMetric} className="text-[12px] font-bold text-[#2563EB] hover:underline">＋ Add Metric</button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {metrics.map((metric, index) => (
                  <div key={index} className="bg-[#F8FAFC] p-4 rounded-xl border border-[#E2E8F0] relative group">
                    {metrics.length > 1 && (
                      <button type="button" onClick={() => removeMetric(index)} className="absolute -top-2 -right-2 bg-white border border-[#E2E8F0] text-red-500 rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-sm text-xs font-bold">✕</button>
                    )}
                    <input 
                      type="text" value={metric.value} onChange={(e) => handleMetricChange(index, 'value', e.target.value)}
                      placeholder="Value (e.g. 4.4x)" 
                      className="w-full px-3 py-2 mb-2 rounded-lg border border-[#CBD5E1] font-bold text-[#0A1628] focus:ring-2 focus:ring-[#2563EB] outline-none text-sm"
                    />
                    <input 
                      type="text" value={metric.label} onChange={(e) => handleMetricChange(index, 'label', e.target.value)}
                      placeholder="Label (e.g. Followers)" 
                      className="w-full px-3 py-2 rounded-lg border border-[#CBD5E1] font-medium text-[#64748B] focus:ring-2 focus:ring-[#2563EB] outline-none text-sm"
                    />
                  </div>
                ))}
              </div>
            </div>

          </form>
        </div>

        <div className="px-8 py-5 border-t border-[#F1F5F9] bg-white flex justify-end gap-3 flex-shrink-0">
          <button type="button" onClick={onClose} className="px-6 py-2.5 text-sm font-bold text-[#64748B] hover:bg-[#F1F5F9] rounded-xl transition-colors">Cancel</button>
          <button type="submit" form="caseStudyForm" disabled={isLoading} className="px-6 py-2.5 text-sm font-bold text-white bg-[#2563EB] hover:bg-[#1E4D99] disabled:opacity-50 rounded-xl shadow-md shadow-blue-500/20 transition-all">
            {isLoading ? 'Saving...' : (isEditing ? 'Update Case Study' : 'Publish Case Study')}
          </button>
        </div>
        
      </div>
    </div>
  );
}