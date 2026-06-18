export default function AdminDashboard() {
  const stats = [
    { 
      title: 'Total Clients', 
      value: '24', 
      trend: '+3 this month', 
      icon: <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg> 
    },
    { 
      title: 'Case Studies', 
      value: '12', 
      trend: '+1 this week', 
      icon: <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg> 
    },
    { 
      title: 'Testimonials', 
      value: '48', 
      trend: '+5 this month', 
      icon: <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" /></svg> 
    },
    { 
      title: 'Media Assets', 
      value: '156', 
      trend: '+12 this week', 
      icon: <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg> 
    }
  ];

  const activities = [
    { 
      text: 'Uploaded new logo for DaraShop', 
      time: '2 hours ago', 
      icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg> 
    },
    { 
      text: 'Updated Case Study: F&B Business', 
      time: '5 hours ago', 
      icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg> 
    },
    { 
      text: 'New video testimonial added for Sarah K.', 
      time: '1 day ago', 
      icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg> 
    },
    { 
      text: 'Deleted unused asset from Media Library', 
      time: '2 days ago', 
      icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg> 
    }
  ];

  return (
    <div className="space-y-8 animate-[fadeIn_0.3s_ease-out]">
      <div>
        <h1 className="text-3xl font-extrabold text-[#0A1628] tracking-tight">Dashboard Overview</h1>
        <p className="text-[#64748B] mt-2 font-medium">Welcome back. Here is what is happening with your content today.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-2xl border border-[#E2E8F0] shadow-sm hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-bold tracking-wide text-[#94A3B8] uppercase">{stat.title}</p>
                <h3 className="text-3xl font-extrabold text-[#0A1628] mt-2">{stat.value}</h3>
              </div>
              <div className="p-3 bg-[#EFF6FF] rounded-xl text-[#2563EB]">{stat.icon}</div>
            </div>
            <p className="text-xs text-green-600 mt-4 font-bold bg-green-50 w-fit px-2.5 py-1 rounded-md">{stat.trend}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white rounded-2xl border border-[#E2E8F0] shadow-sm overflow-hidden">
          <div className="px-6 py-5 border-b border-[#F1F5F9] bg-[#F8FAFC]">
            <h2 className="text-lg font-bold text-[#0A1628]">Recent Activity</h2>
          </div>
          <div className="divide-y divide-[#F1F5F9]">
            {activities.map((activity, i) => (
              <div key={i} className="px-6 py-4 flex items-center gap-4 hover:bg-[#F8FAFC] transition-colors">
                <div className="w-10 h-10 rounded-full bg-[#EFF6FF] text-[#2563EB] flex items-center justify-center text-sm flex-shrink-0">
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

        <div className="bg-white rounded-2xl border border-[#E2E8F0] shadow-sm overflow-hidden h-fit">
          <div className="px-6 py-5 border-b border-[#F1F5F9] bg-[#F8FAFC]">
            <h2 className="text-lg font-bold text-[#0A1628]">Quick Actions</h2>
          </div>
          <div className="p-6 flex flex-col gap-3">
            <button className="w-full flex items-center gap-3 px-4 py-3 bg-[#EFF6FF] text-[#2563EB] rounded-xl font-bold hover:bg-[#DBEAFE] transition-colors border border-[#BFDBFE]">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" /></svg> Add New Client
            </button>
            <button className="w-full flex items-center gap-3 px-4 py-3 bg-white text-[#334155] rounded-xl font-bold hover:bg-[#F8FAFC] transition-colors border border-[#E2E8F0] shadow-sm">
              <svg className="w-5 h-5 text-[#64748B]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg> Create Case Study
            </button>
            <button className="w-full flex items-center gap-3 px-4 py-3 bg-white text-[#334155] rounded-xl font-bold hover:bg-[#F8FAFC] transition-colors border border-[#E2E8F0] shadow-sm">
              <svg className="w-5 h-5 text-[#64748B]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg> Upload Media
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}