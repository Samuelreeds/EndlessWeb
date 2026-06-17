import { useState } from 'react';
import CaseStudyCard from '../../components/admin/CaseStudyCard';
import CaseStudyModal from '../../components/admin/CaseStudyModal';

export default function AdminCaseStudies() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const mockCaseStudies = [
    {
      id: 1,
      title: 'From Zero Engagement to 22 DMs Per Week',
      category: 'F&B Business',
      challenge: 'No consistent content, zero engagement, outdated visuals that didn\'t reflect the quality of the business at all.',
      metrics: [
        { value: '4.4×', label: 'Followers in 90 days' },
        { value: '14×', label: 'Average post reach' }
      ]
    },
    {
      id: 2,
      title: 'Engagement Up 575% in Two Months',
      category: 'Boutique Retail',
      challenge: 'Inconsistent posting, no brand voice, and an engagement rate so low the algorithm had stopped showing posts.',
      metrics: [
        { value: '5.4%', label: 'Engagement rate' },
        { value: '3×', label: 'Story views in 60 days' }
      ]
    }
  ];

  return (
    <div className="space-y-6 animate-[fadeIn_0.3s_ease-out]">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-[#0A1628] tracking-tight">Case Studies</h1>
          <p className="text-[#64748B] mt-1 font-medium">Create and manage your success stories and portfolio.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-[#2563EB] hover:bg-[#1E4D99] text-white px-5 py-2.5 rounded-xl font-bold transition-all shadow-sm shadow-blue-500/20 flex items-center gap-2"
        >
          <span>＋</span> Create Case Study
        </button>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {mockCaseStudies.map(study => (
          <CaseStudyCard key={study.id} study={study} />
        ))}
      </div>

      <CaseStudyModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}