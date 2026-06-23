import { useState, useEffect } from 'react';
import ImageTestimonialModal from '../../components/admin/ImageTestimonialModal';

export default function AdminImageTestimonials() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [galleries, setGalleries] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchGalleries = async () => {
    try {
      setIsLoading(true);
      const token = localStorage.getItem('token');
      const res = await fetch('http://localhost:5000/api/cms/image-testimonials', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      setGalleries(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error('Error fetching galleries:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchGalleries();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this gallery?')) return;
    try {
      const token = localStorage.getItem('token');
      await fetch(`http://localhost:5000/api/cms/image-testimonials/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      fetchGalleries();
    } catch (err) {
      alert('Failed to delete gallery.');
    }
  };

  return (
    <div className="space-y-6 animate-[fadeIn_0.3s_ease-out]">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-[#0A1628] tracking-tight">Image Galleries</h1>
          <p className="text-[#64748B] mt-1 font-medium">Manage behind-the-scenes and client result galleries.</p>
        </div>
        <button 
          onClick={() => { setEditingItem(null); setIsModalOpen(true); }}
          className="bg-[#2563EB] hover:bg-[#1E4D99] text-white px-5 py-2.5 rounded-xl font-bold shadow-sm flex items-center gap-2 transition-colors"
        >
          Add Gallery
        </button>
      </div>

      {isLoading && galleries.length === 0 ? (
        <div className="p-12 text-center text-[#64748B] font-medium bg-white rounded-2xl border border-[#E2E8F0]">
          Loading galleries...
        </div>
      ) : galleries.length === 0 ? (
        <div className="p-12 text-center text-[#64748B] font-medium bg-white rounded-2xl border border-[#E2E8F0]">
          No galleries found. Click "Add Gallery" to create one.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {galleries.map((gallery) => (
            <div key={gallery.id} className="bg-white rounded-2xl border border-[#E2E8F0] shadow-sm p-6 group">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-lg text-[#0A1628]">{gallery.clientName}</h3>
                <div className="flex gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button onClick={() => { setEditingItem(gallery); setIsModalOpen(true); }} className="text-[#2563EB] font-bold text-sm hover:underline">Edit</button>
                  <button onClick={() => handleDelete(gallery.id)} className="text-red-500 font-bold text-sm hover:underline">Delete</button>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-2">
                {gallery.images.slice(0, 4).map((img, i) => (
                  <div key={i} className="aspect-square bg-[#F1F5F9] rounded-lg overflow-hidden border border-[#E2E8F0]">
                    <img src={img} alt="preview" className="w-full h-full object-cover" loading="lazy" />
                  </div>
                ))}
                {gallery.images.length === 0 && (
                  <div className="col-span-2 aspect-[2/1] bg-[#F8FAFC] rounded-lg border border-dashed border-[#E2E8F0] flex items-center justify-center text-[#94A3B8] text-sm">
                    No images uploaded
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      <ImageTestimonialModal 
        isOpen={isModalOpen} 
        onClose={() => { setIsModalOpen(false); setEditingItem(null); }} 
        initialData={editingItem} 
        onSuccess={fetchGalleries} 
      />
    </div>
  );
}