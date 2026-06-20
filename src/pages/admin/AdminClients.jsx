import { useState, useEffect } from 'react';
import ClientTable from '../../components/admin/ClientTable';
import ClientModal from '../../components/admin/ClientModal';

export default function AdminClients() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [clients, setClients] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // NEW: State to track which client we are editing
  const [editingClient, setEditingClient] = useState(null); 

  const fetchClients = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/cms/client-logos');
      if (!res.ok) throw new Error('Failed to fetch clients');
      const data = await res.json();
      setClients(data);
    } catch (err) {
      console.error('Error fetching clients:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchClients();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this client?')) return;
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`http://localhost:5000/api/cms/client-logos/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (!res.ok) throw new Error('Failed to delete client');
      fetchClients();
    } catch (err) {
      console.error('Error deleting client:', err);
      alert('Failed to delete client.');
    }
  };

  // NEW: Function to open modal in "Edit" mode
  const handleEdit = (client) => {
    setEditingClient(client);
    setIsModalOpen(true);
  };

  // NEW: Function to close modal and reset edit state
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingClient(null);
  };

  return (
    <div className="space-y-6 animate-[fadeIn_0.3s_ease-out]">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-[#0A1628] tracking-tight">Clients</h1>
          <p className="text-[#64748B] mt-1 font-medium">Manage your client portfolio and logos.</p>
        </div>
        <button 
          onClick={() => { setEditingClient(null); setIsModalOpen(true); }}
          className="bg-[#2563EB] hover:bg-[#1E4D99] text-white px-5 py-2.5 rounded-xl font-bold transition-all shadow-sm shadow-blue-500/20 flex items-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" /></svg> Add Client
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-[#E2E8F0] shadow-sm overflow-hidden flex flex-col">
        <div className="p-5 border-b border-[#F1F5F9] flex flex-col sm:flex-row gap-4 justify-between bg-[#F8FAFC]">
          <div className="relative w-full sm:w-80">
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#94A3B8]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input type="text" placeholder="Search clients..." className="w-full pl-10 pr-4 py-2 rounded-lg border border-[#E2E8F0] focus:ring-2 focus:ring-[#2563EB] focus:border-transparent outline-none transition text-sm font-medium" />
          </div>
        </div>
        
        {isLoading ? (
          <div className="p-8 text-center text-[#64748B] font-medium">Loading clients...</div>
        ) : (
          <ClientTable clients={clients} onDelete={handleDelete} onEdit={handleEdit} />
        )}
      </div>

      {/* Passed the editingClient down to the modal */}
      <ClientModal 
        isOpen={isModalOpen} 
        onClose={handleCloseModal} 
        onSuccess={fetchClients} 
        clientToEdit={editingClient} 
      />
    </div>
  );
}