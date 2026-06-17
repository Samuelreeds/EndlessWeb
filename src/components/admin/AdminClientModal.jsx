import { useState } from 'react';
import AdminPageHeader from '../../components/admin/AdminPageHeader';
import AdminClientModal from '../../components/admin/AdminClientModal';

export default function AdminClients() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [clients] = useState([
    { id: 1, name: 'DaraShop', website: 'darashop.com', status: 'Active' },
    { id: 2, name: 'BicycleShop', website: 'bicycle.com', status: 'Active' }
  ]);

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="flex justify-between items-center">
        <AdminPageHeader title="Clients" subtitle="Manage your client portfolio." />
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 transition"
        >
          + Add Client
        </button>
      </div>

      <div className="mt-8 bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50 border-b border-gray-100">
            <tr>
              <th className="p-4 text-sm font-semibold text-gray-600">Client Name</th>
              <th className="p-4 text-sm font-semibold text-gray-600">Website</th>
              <th className="p-4 text-sm font-semibold text-gray-600">Status</th>
              <th className="p-4 text-sm font-semibold text-gray-600">Actions</th>
            </tr>
          </thead>
          <tbody>
            {clients.map(client => (
              <tr key={client.id} className="border-b border-gray-50 hover:bg-gray-50">
                <td className="p-4 font-medium text-blue-900">{client.name}</td>
                <td className="p-4 text-sm text-gray-500">{client.website}</td>
                <td className="p-4 text-sm text-green-600">{client.status}</td>
                <td className="p-4 space-x-3">
                  <button className="text-blue-500 hover:text-blue-700">Edit</button>
                  <button className="text-red-500 hover:text-red-700">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <AdminClientModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}