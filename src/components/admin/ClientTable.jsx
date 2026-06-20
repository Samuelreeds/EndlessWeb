export default function ClientTable({ clients, onDelete, onEdit }) {
  if (!clients || clients.length === 0) {
    return (
      <div className="p-12 text-center">
        <p className="text-[#64748B] font-medium">No clients found. Click "Add Client" to create one.</p>
      </div>
    );
  }

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' });
  };

  return (
    <div className="overflow-x-auto w-full">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-white border-b border-[#E2E8F0]">
            <th className="px-6 py-4 text-[12px] font-bold text-[#94A3B8] uppercase tracking-wider">Logo</th>
            <th className="px-6 py-4 text-[12px] font-bold text-[#94A3B8] uppercase tracking-wider">Name</th>
            <th className="px-6 py-4 text-[12px] font-bold text-[#94A3B8] uppercase tracking-wider">Website</th>
            <th className="px-6 py-4 text-[12px] font-bold text-[#94A3B8] uppercase tracking-wider">Status</th>
            <th className="px-6 py-4 text-[12px] font-bold text-[#94A3B8] uppercase tracking-wider">Created Date</th>
            <th className="px-6 py-4 text-[12px] font-bold text-[#94A3B8] uppercase tracking-wider text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-[#F1F5F9]">
          {clients.map((client) => (
            <tr key={client.id} className="hover:bg-[#F8FAFC] transition-colors group bg-white">
              <td className="px-6 py-4">
                <div className="w-12 h-12 rounded-lg bg-[#EFF6FF] text-[#2563EB] flex items-center justify-center font-bold border border-[#DBEAFE] overflow-hidden">
                  {client.imageUrl ? (
                    <img src={client.imageUrl} alt={client.name} className="w-full h-full object-cover" />
                  ) : (
                    <span>{client.name?.charAt(0).toUpperCase()}</span>
                  )}
                </div>
              </td>
              <td className="px-6 py-4 font-bold text-[#0A1628]">{client.name}</td>
              <td className="px-6 py-4 text-sm font-medium text-[#64748B] hover:text-[#2563EB] cursor-pointer">
                <a href={client.website} target="_blank" rel="noopener noreferrer">{client.website || '-'}</a>
              </td>
              <td className="px-6 py-4">
                <span className={`px-3 py-1 text-xs font-bold rounded-full ${
                  client.status === 'active' || client.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'
                }`}>
                  {client.status || 'Active'}
                </span>
              </td>
              <td className="px-6 py-4 text-sm font-medium text-[#64748B]">{formatDate(client.createdAt)}</td>
              <td className="px-6 py-4 text-right space-x-3">
                {/* UPDATE THIS BUTTON: Add onClick */}
                <button onClick={() => onEdit(client)} className="text-[#64748B] hover:text-[#2563EB] font-bold text-sm transition-colors">Edit</button>
                <button onClick={() => onDelete(client.id)} className="text-[#64748B] hover:text-red-500 font-bold text-sm transition-colors">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}