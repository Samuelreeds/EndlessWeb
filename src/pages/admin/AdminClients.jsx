import { useState } from 'react';
import ClientTable from '../../components/admin/ClientTable';
import ClientModal from '../../components/admin/ClientModal';
import { api } from '../../utils/api';
import { useCache } from '../../utils/useCache';

export default function AdminClients() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingClient, setEditingClient] = useState(null); 
  
  // Use memory cache instead of fetching every single time
  const { data, isLoading, updateCache } = useCache('clients_data', '/cms/client-logos');
  const clients = data || [];

  const refreshData = async () => {
    try {
      const res = await api.fetch('/cms/client-logos');
      const freshData = await res.json();
      updateCache(Array.isArray(freshData) ? freshData : []);
    } catch (err) {
      console.error('Error refreshing clients:', err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this client?')) return;
    try {
      await api.fetch(`/cms/client-logos/${id}`, { method: 'DELETE' });
      refreshData();
    } catch (err) {
      alert('Failed to delete client.');
    }
  };

  const handleEdit = (client) => {
    setEditingClient(client);
    setIsModalOpen(true);
  };

  return (
    <div className="space-y-6 animate-[fadeIn_0.3s_ease-out]">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-extrabold text-[#0A1628]">Clients</h1>
          <p className="text-[#64748B] mt-1 font-medium">Manage your client portfolio and logos.</p>
        </div>
        <button 
          onClick={() => { setEditingClient(null); setIsModalOpen(true); }}
          className="bg-[#2563EB] text-white px-5 py-2.5 rounded-xl font-bold flex items-center gap-2"
        >
          Add Client
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-[#E2E8F0] shadow-sm overflow-hidden flex flex-col">
        {isLoading ? (
          <div className="p-8 text-center text-[#64748B] font-medium">Loading clients...</div>
        ) : (
          <ClientTable clients={clients} onDelete={handleDelete} onEdit={handleEdit} />
        )}
      </div>

      <ClientModal 
        isOpen={isModalOpen} 
        onClose={() => { setIsModalOpen(false); setEditingClient(null); }} 
        onSuccess={refreshData} 
        clientToEdit={editingClient} 
      />
    </div>
  );
}