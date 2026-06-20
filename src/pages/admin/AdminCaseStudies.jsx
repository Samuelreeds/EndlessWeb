import { useState, useEffect } from 'react';
import CaseStudyCard from '../../components/admin/CaseStudyCard';
import CaseStudyModal from '../../components/admin/CaseStudyModal';

export default function AdminCaseStudies() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [caseStudies, setCaseStudies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editingStudy, setEditingStudy] = useState(null);

  const fetchCaseStudies = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/cms/case-studies');
      if (!res.ok) throw new Error('Failed to fetch case studies');
      const data = await res.json();
      setCaseStudies(data);
    } catch (err) {
      console.error('Error fetching case studies:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCaseStudies();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this case study?')) return;
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`http://localhost:5000/api/cms/case-studies/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (!res.ok) throw new Error('Failed to delete case study');
      fetchCaseStudies();
    } catch (err) {
      console.error('Error deleting case study:', err);
      alert('Failed to delete case study.');
    }
  };

  const handleEdit = (study) => {
    setEditingStudy(study);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingStudy(null);
  };

  return (
    <div className="space-y-6 animate-[fadeIn_0.3s_ease-out]">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-[#0A1628] tracking-tight">Case Studies</h1>
          <p className="text-[#64748B] mt-1 font-medium">Create and manage your success stories and portfolio.</p>
        </div>
        <button 
          onClick={() => { setEditingStudy(null); setIsModalOpen(true); }}
          className="bg-[#2563EB] hover:bg-[#1E4D99] text-white px-5 py-2.5 rounded-xl font-bold transition-all shadow-sm shadow-blue-500/20 flex items-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" /></svg> Create Case Study
        </button>
      </div>

      {isLoading ? (
        <div className="p-12 text-center text-[#64748B] font-medium bg-white rounded-2xl border border-[#E2E8F0]">
          Loading case studies...
        </div>
      ) : caseStudies.length === 0 ? (
        <div className="p-12 text-center bg-white rounded-2xl border border-[#E2E8F0]">
          <p className="text-[#64748B] font-medium">No case studies found. Click "Create Case Study" to add one.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 xl:grid-cols-3 lg:grid-cols-2 gap-6">
          {caseStudies.map(study => (
            <CaseStudyCard 
              key={study.id} 
              study={study} 
              onEdit={handleEdit} 
              onDelete={handleDelete} 
            />
          ))}
        </div>
      )}

      <CaseStudyModal 
        isOpen={isModalOpen} 
        onClose={handleCloseModal} 
        onSuccess={fetchCaseStudies}
        studyToEdit={editingStudy}
      />
    </div>
  );
}