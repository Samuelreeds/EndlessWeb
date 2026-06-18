import { useState, useEffect } from 'react';
import TestimonialModal from '../../components/admin/TestimonialModal';
import ConfirmModal from '../../components/admin/ConfirmModal';

export default function AdminTestimonials() {
  const [testimonials, setTestimonials] = useState([]);
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [itemToDelete, setItemToDelete] = useState(null);

  const fetchTestimonials = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch('http://localhost:5000/api/cms/testimonials', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (!res.ok) throw new Error('Failed to fetch testimonials');
      
      const data = await res.json();
      setTestimonials(data);
    } catch (err) {
      console.error('Error fetching testimonials:', err);
    }
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const handleEdit = (testimonial) => {
    setEditingItem(testimonial);
    setIsFormModalOpen(true);
  };

  const handleAddNew = () => {
    setEditingItem(null);
    setIsFormModalOpen(true);
  };

  const handleDeleteClick = (testimonial) => {
    setItemToDelete(testimonial);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    if (!itemToDelete) return;
    try {
      const token = localStorage.getItem('token');
      await fetch(`http://localhost:5000/api/cms/testimonials/${itemToDelete.id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      fetchTestimonials();
      setIsDeleteModalOpen(false);
      setItemToDelete(null);
    } catch (err) {
      console.error('Error deleting testimonial:', err);
    }
  };

  return (
    <div className="space-y-6 animate-[fadeIn_0.3s_ease-out]">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-[#0A1628] tracking-tight">Testimonials</h1>
          <p className="text-[#64748B] mt-1 font-medium">Manage client reviews and success quotes.</p>
        </div>
        <button 
          onClick={handleAddNew}
          className="bg-[#2563EB] hover:bg-[#1E4D99] text-white px-5 py-2.5 rounded-xl font-bold transition-all shadow-sm shadow-blue-500/20 flex items-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" /></svg>
          <span>Add Testimonial</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {testimonials.map((testi) => (
          <div key={testi.id} className="bg-white rounded-2xl border border-[#E2E8F0] shadow-sm hover:shadow-md transition-shadow p-6 lg:p-8 flex flex-col h-full group">
            <div className="flex justify-between items-start mb-4">
              <div className="text-[#FBBF24] text-sm tracking-widest">
                {'★'.repeat(testi.stars || 5)}
              </div>
              <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button onClick={() => handleEdit(testi)} className="p-1.5 text-[#64748B] hover:text-[#2563EB] hover:bg-[#EFF6FF] rounded-lg transition-colors">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
                </button>
                <button onClick={() => handleDeleteClick(testi)} className="p-1.5 text-[#64748B] hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                </button>
              </div>
            </div>
            
            <p className="text-[15px] leading-relaxed text-[#475569] italic mb-6 flex-1">
              "{testi.quote}"
            </p>
            
            <div className="flex items-center gap-3 pt-4 border-t border-[#F1F5F9] mt-auto">
              <div className="w-10 h-10 rounded-full bg-[#EFF6FF] flex items-center justify-center font-bold text-[#2563EB] flex-shrink-0 text-sm uppercase">
                {testi.avatar || testi.name?.substring(0, 2)}
              </div>
              <div>
                <div className="text-[14px] font-bold text-[#0A1628] leading-tight">{testi.name}</div>
                <div className="text-[12px] font-medium text-[#64748B] mt-0.5">{testi.role}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <TestimonialModal 
        isOpen={isFormModalOpen} 
        onClose={() => setIsFormModalOpen(false)} 
        initialData={editingItem} 
        onSuccess={fetchTestimonials}
      />
      
      <ConfirmModal 
        isOpen={isDeleteModalOpen} 
        onClose={() => setIsDeleteModalOpen(false)} 
        onConfirm={confirmDelete}
        title="Delete Testimonial"
        message="Are you sure you want to delete this testimonial? This action cannot be undone."
        confirmText="Delete"
        isDestructive={true}
      />
    </div>
  );
}