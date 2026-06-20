import { useState, useEffect } from 'react';

export default function AdminDashboard() {
  const [data, setData] = useState({
    clients: 0,
    testimonials: 0,
    videos: 0,
    caseStudies: 0
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:5000/api/cms/stats')
      .then(res => res.json())
      .then(setData)
      .catch(err => console.error('Error fetching stats:', err))
      .finally(() => setIsLoading(false));
  }, []);

  const stats = [
    { title: 'Total Clients', value: data.clients, icon: <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg> },
    { title: 'Case Studies', value: data.caseStudies, icon: <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg> },
    { title: 'Testimonials', value: data.testimonials, icon: <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" /></svg> },
    { title: 'Video Testimonials', value: data.videos, icon: <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg> }
  ];

  return (
    <div className="space-y-8 animate-[fadeIn_0.3s_ease-out]">
      <div>
        <h1 className="text-3xl font-extrabold text-[#0A1628] tracking-tight">Dashboard Overview</h1>
        <p className="text-[#64748B] mt-2 font-medium">Welcome back. Here is your live content inventory.</p>
      </div>

      {isLoading ? (
        <div className="text-[#64748B] font-medium">Loading statistics...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, i) => (
            <div key={i} className="bg-white p-6 rounded-2xl border border-[#E2E8F0] shadow-sm">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-bold tracking-wide text-[#94A3B8] uppercase">{stat.title}</p>
                  <h3 className="text-3xl font-extrabold text-[#0A1628] mt-2">{stat.value}</h3>
                </div>
                <div className="p-3 bg-[#EFF6FF] rounded-xl text-[#2563EB]">{stat.icon}</div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Removed Mock Activities as per instructions */}
    </div>
  );
}