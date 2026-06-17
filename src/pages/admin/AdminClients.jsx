import { useState } from 'react';
import ClientTable from '../../components/admin/ClientTable';
import ClientModal from '../../components/admin/ClientModal';

export default function AdminClients() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="space-y-6 animate-[fadeIn_0.3s_ease-out]">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-[#0A1628] tracking-tight">Clients</h1>
          <p className="text-[#64748B] mt-1 font-medium">Manage your client portfolio and logos.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-[#2563EB] hover:bg-[#1E4D99] text-white px-5 py-2.5 rounded-xl font-bold transition-all shadow-sm shadow-blue-500/20 flex items-center gap-2"
        >
          <span>＋</span> Add Client
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-[#E2E8F0] shadow-sm overflow-hidden flex flex-col">
        <div className="p-5 border-b border-[#F1F5F9] flex flex-col sm:flex-row gap-4 justify-between bg-[#F8FAFC]">
          <div className="relative w-full sm:w-80">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#94A3B8]">🔍</span>
            <input 
              type="text" 
              placeholder="Search clients..." 
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-[#E2E8F0] focus:ring-2 focus:ring-[#2563EB] focus:border-transparent outline-none transition text-sm font-medium"
            />
          </div>
          <select className="px-4 py-2 rounded-lg border border-[#E2E8F0] bg-white focus:ring-2 focus:ring-[#2563EB] outline-none transition text-sm font-medium text-[#334155] cursor-pointer">
            <option value="all">All Statuses</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
        
        <ClientTable />
      </div>

      <ClientModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}