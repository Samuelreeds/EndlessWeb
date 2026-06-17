import AdminPageHeader from '../../components/admin/AdminPageHeader';
import AdminStatsCard from '../../components/admin/AdminStatsCard';

export default function AdminDashboard() {
  return (
    <div className="p-8 max-w-7xl mx-auto">
      <AdminPageHeader title="Dashboard" subtitle="Welcome back to your workspace." />
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-8">
        <AdminStatsCard title="Total Clients" value="24" icon="🏢" trend="+2 this month" />
        <AdminStatsCard title="Case Studies" value="12" icon="📈" />
        <AdminStatsCard title="Testimonials" value="48" icon="💬" />
        <AdminStatsCard title="Media Assets" value="156" icon="🖼️" />
      </div>

      <div className="mt-8 bg-white rounded-2xl border border-gray-100 p-6">
        <h2 className="text-lg font-bold text-blue-900 mb-4">Recent Activity</h2>
        <div className="space-y-4">
          {['Uploaded new logo for DaraShop', 'Updated Case Study: F&B Business', 'New testimonial from Sarah K.'].map((act, i) => (
            <div key={i} className="flex items-center p-4 bg-gray-50 rounded-xl">
              <span className="text-blue-500 mr-4">●</span>
              <span className="text-sm text-gray-600">{act}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}