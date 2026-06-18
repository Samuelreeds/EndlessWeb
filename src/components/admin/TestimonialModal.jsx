import { useState, useEffect } from 'react';

export default function TestimonialModal({ isOpen, onClose, initialData, onSuccess }) {
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    quote: '',
    stars: 5,
    avatar: ''
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    } else {
      setFormData({ name: '', role: '', quote: '', stars: 5, avatar: '' });
    }
  }, [initialData, isOpen]);

  if (!isOpen) return null;

  const isEditing = !!initialData;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: name === 'stars' ? Number(value) : value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const url = isEditing 
        ? `http://localhost:5000/api/cms/testimonials/${initialData.id}` 
        : 'http://localhost:5000/api/cms/testimonials';
        
      // 1. Grab the token
      const token = localStorage.getItem('token'); 
      
      // 2. LOG IT to prove the frontend has it!
      console.log("Token right before sending:", token);
      
      const res = await fetch(url, {
        method: isEditing ? 'PUT' : 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` 
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const errorData = await res.json();
        console.error("Backend rejected it! Status:", res.status, "Message:", errorData);
        alert(`Failed to save: ${errorData.error || errorData.message || res.statusText}`);
        throw new Error('API Request Failed');
      }

      onSuccess();
      onClose();
    } catch (error) {
      console.error('Error saving testimonial:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0A1628]/40 backdrop-blur-sm p-4 animate-[fadeIn_0.2s_ease-out]">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-xl overflow-hidden border border-[#E2E8F0]">
        
        <div className="px-8 py-5 border-b border-[#F1F5F9] flex justify-between items-center bg-[#F8FAFC]">
          <h2 className="text-xl font-extrabold text-[#0A1628]">
            {isEditing ? 'Edit Testimonial' : 'Add New Testimonial'}
          </h2>
          <button onClick={onClose} className="text-[#94A3B8] hover:text-[#0A1628] text-xl transition-colors">✕</button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-8 space-y-6 bg-white">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-bold text-[#334155] mb-2">Client Name</label>
              <input 
                type="text" 
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-xl border border-[#E2E8F0] focus:ring-2 focus:ring-[#2563EB] focus:border-transparent outline-none transition font-medium text-sm" 
                placeholder="e.g. Sarah K." 
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-[#334155] mb-2">Client Role</label>
              <input 
                type="text" 
                name="role"
                value={formData.role}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-xl border border-[#E2E8F0] focus:ring-2 focus:ring-[#2563EB] focus:border-transparent outline-none transition font-medium text-sm" 
                placeholder="e.g. Café Owner" 
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-[#334155] mb-2">Quote</label>
            <textarea 
              rows="4"
              name="quote"
              value={formData.quote}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-xl border border-[#E2E8F0] focus:ring-2 focus:ring-[#2563EB] focus:border-transparent outline-none transition font-medium text-sm resize-none" 
              placeholder="What did the client say about Endless?" 
            />
          </div>

          <div className="grid grid-cols-2 gap-4 items-end">
            <div>
              <label className="block text-sm font-bold text-[#334155] mb-2">Rating (Stars)</label>
              <select 
                name="stars"
                value={formData.stars}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-[#E2E8F0] bg-white focus:ring-2 focus:ring-[#2563EB] outline-none transition font-medium text-sm cursor-pointer"
              >
                <option value="5">5 Stars</option>
                <option value="4">4 Stars</option>
                <option value="3">3 Stars</option>
                <option value="2">2 Stars</option>
                <option value="1">1 Star</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-bold text-[#334155] mb-2">Initials / Avatar</label>
              <input 
                type="text" 
                name="avatar"
                value={formData.avatar}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-[#E2E8F0] focus:ring-2 focus:ring-[#2563EB] focus:border-transparent outline-none transition font-medium text-sm" 
                placeholder="e.g. SK" 
                maxLength="2"
              />
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
            <button 
              type="submit" 
              disabled={isLoading}
              className="px-6 py-2.5 text-sm font-bold text-white bg-[#2563EB] hover:bg-[#1E4D99] disabled:opacity-50 rounded-xl shadow-md shadow-blue-500/20 transition-all"
            >
              {isLoading ? 'Saving...' : isEditing ? 'Save Changes' : 'Add Testimonial'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}