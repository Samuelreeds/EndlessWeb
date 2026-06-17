export default function AdminDashboard() {
  const stats = [
    { title: 'Total Clients', value: '24', trend: '+3 this month', icon: '🏢' },
    { title: 'Case Studies', value: '12', trend: '+1 this week', icon: '📈' },
    { title: 'Testimonials', value: '48', trend: '+5 this month', icon: '💬' },
    { title: 'Media Assets', value: '156', trend: '+12 this week', icon: '🖼️' }
  ];

  const activities = [
    { text: 'Uploaded new logo for DaraShop', time: '2 hours ago', icon: '📁' },
    { text: 'Updated Case Study: F&B Business', time: '5 hours ago', icon: '📝' },
    { text: 'New video testimonial added for Sarah K.', time: '1 day ago', icon: '📹' },
    { text: 'Deleted unused asset from Media Library', time: '2 days ago', icon: '🗑️' }
  ];

  return (
    <div className="space-y-8 animate-[fadeIn_0.3s_ease-out]">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-extrabold text-[#0A1628] tracking-tight">Dashboard Overview</h1>
        <p className="text-[#64748B] mt-2 font-medium">Welcome back. Here is what is happening with your content today.</p>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-2xl border border-[#E2E8F0] shadow-sm hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-bold tracking-wide text-[#94A3B8] uppercase">{stat.title}</p>
                <h3 className="text-3xl font-extrabold text-[#0A1628] mt-2">{stat.value}</h3>
              </div>
              <div className="p-3 bg-[#EFF6FF] rounded-xl text-xl">{stat.icon}</div>
            </div>
            <p className="text-xs text-green-600 mt-4 font-bold bg-green-50 w-fit px-2.5 py-1 rounded-md">{stat.trend}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Activity */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-[#E2E8F0] shadow-sm overflow-hidden">
          <div className="px-6 py-5 border-b border-[#F1F5F9] bg-[#F8FAFC]">
            <h2 className="text-lg font-bold text-[#0A1628]">Recent Activity</h2>
          </div>
          <div className="divide-y divide-[#F1F5F9]">
            {activities.map((activity, i) => (
              <div key={i} className="px-6 py-4 flex items-center gap-4 hover:bg-[#F8FAFC] transition-colors">
                <div className="w-10 h-10 rounded-full bg-[#EFF6FF] flex items-center justify-center text-sm flex-shrink-0">
                  {activity.icon}
                </div>
                <div className="flex-1">
                  <p className="text-[15px] font-semibold text-[#334155]">{activity.text}</p>
                  <p className="text-[13px] font-medium text-[#94A3B8] mt-0.5">{activity.time}</p>
                </div>
                <button className="text-[#2563EB] text-sm font-bold hover:underline">View</button>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-2xl border border-[#E2E8F0] shadow-sm overflow-hidden h-fit">
          <div className="px-6 py-5 border-b border-[#F1F5F9] bg-[#F8FAFC]">
            <h2 className="text-lg font-bold text-[#0A1628]">Quick Actions</h2>
          </div>
          <div className="p-6 flex flex-col gap-3">
            <button className="w-full flex items-center gap-3 px-4 py-3 bg-[#EFF6FF] text-[#2563EB] rounded-xl font-bold hover:bg-[#DBEAFE] transition-colors border border-[#BFDBFE]">
              <span className="text-lg">＋</span> Add New Client
            </button>
            <button className="w-full flex items-center gap-3 px-4 py-3 bg-white text-[#334155] rounded-xl font-bold hover:bg-[#F8FAFC] transition-colors border border-[#E2E8F0] shadow-sm">
              <span className="text-lg">📝</span> Create Case Study
            </button>
            <button className="w-full flex items-center gap-3 px-4 py-3 bg-white text-[#334155] rounded-xl font-bold hover:bg-[#F8FAFC] transition-colors border border-[#E2E8F0] shadow-sm">
              <span className="text-lg">🖼️</span> Upload Media
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}