export default function ClientTable() {
  const mockClients = [
    { id: 1, name: 'DaraShop', website: 'darashop.com', status: 'Active', date: 'Oct 12, 2023', logo: 'D' },
    { id: 2, name: 'BicycleShop', website: 'bicycle.com', status: 'Active', date: 'Nov 05, 2023', logo: 'B' },
    { id: 3, name: 'Urban Café', website: 'urbancafe.co', status: 'Inactive', date: 'Jan 18, 2024', logo: 'U' },
  ];

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
          {mockClients.map((client) => (
            <tr key={client.id} className="hover:bg-[#F8FAFC] transition-colors group bg-white">
              <td className="px-6 py-4">
                <div className="w-10 h-10 rounded-lg bg-[#EFF6FF] text-[#2563EB] flex items-center justify-center font-bold border border-[#DBEAFE]">
                  {client.logo}
                </div>
              </td>
              <td className="px-6 py-4 font-bold text-[#0A1628]">{client.name}</td>
              <td className="px-6 py-4 text-sm font-medium text-[#64748B] hover:text-[#2563EB] cursor-pointer">
                {client.website}
              </td>
              <td className="px-6 py-4">
                <span className={`px-3 py-1 text-xs font-bold rounded-full ${
                  client.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'
                }`}>
                  {client.status}
                </span>
              </td>
              <td className="px-6 py-4 text-sm font-medium text-[#64748B]">{client.date}</td>
              <td className="px-6 py-4 text-right space-x-3">
                <button className="text-[#64748B] hover:text-[#2563EB] font-bold text-sm transition-colors">Edit</button>
                <button className="text-[#64748B] hover:text-red-500 font-bold text-sm transition-colors">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}