import { Link, useLocation } from 'react-router-dom';

export default function AdminSidebar({ onClose }) {
  const location = useLocation();

  const links = [
    { 
      name: 'Dashboard', 
      path: '/admin', 
      icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg> 
    },
    { 
      name: 'Clients', 
      path: '/admin/clients', 
      icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg> 
    },
    { 
      name: 'Case Studies', 
      path: '/admin/case-studies', 
      icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg> 
    },
    { 
      name: 'Testimonials', 
      path: '/admin/testimonials', 
      icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" /></svg> 
    },
    { 
      name: 'Videos', 
      path: '/admin/video-testimonials', 
      icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg> 
    },
    { 
      name: 'Media Library', 
      path: '/admin/media', 
      icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg> 
    },
    { 
      name: 'Users', 
      path: '/admin/users', 
      icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg> 
    },
    { 
      name: 'Settings', 
      path: '/admin/settings', 
      icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065zM15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg> 
    },
  ];

  return (
    <div className="h-full flex flex-col bg-white">
      <div className="h-16 lg:h-24 flex items-center justify-between px-6 lg:px-8 border-b border-[#F1F5F9] flex-shrink-0">
        <h1 className="text-2xl font-extrabold text-[#0A1628] tracking-tight m-0">
          ENDLESS<span className="text-[#2563EB]">.</span>
        </h1>
        <button 
          onClick={onClose} 
          aria-label="Close navigation menu"
          className="lg:hidden p-2 text-[#94A3B8] hover:text-[#0A1628] transition-colors text-xl focus:ring-2 focus:ring-[#2563EB] outline-none rounded-lg"
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
        </button>
      </div>
      
      <nav className="flex-1 py-6 lg:py-8 overflow-y-auto px-4 lg:px-5">
        <div className="text-[11px] font-bold tracking-widest uppercase text-[#94A3B8] mb-4 px-3" aria-hidden="true">Main Menu</div>
        <ul className="space-y-1.5 m-0 p-0 list-none">
          {links.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <li key={link.name} className="m-0 p-0">
                <Link
                  to={link.path}
                  aria-current={isActive ? 'page' : undefined}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 no-underline font-semibold text-[15px] focus:ring-2 focus:ring-[#2563EB] outline-none ${
                    isActive 
                      ? 'bg-[#EFF6FF] text-[#2563EB] shadow-sm' 
                      : 'text-[#64748B] hover:bg-[#F8FAFC] hover:text-[#0A1628]'
                  }`}
                >
                  <span className={`flex items-center justify-center ${isActive ? 'opacity-100' : 'opacity-60'}`} aria-hidden="true">
                    {link.icon}
                  </span>
                  {link.name}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}