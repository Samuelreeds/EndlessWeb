import { Link, useLocation } from 'react-router-dom';

export default function AdminSidebar({ onClose }) {
  const location = useLocation();

  const links = [
    { name: 'Dashboard', path: '/admin', icon: '📊' },
    { name: 'Clients', path: '/admin/clients', icon: '🏢' },
    { name: 'Case Studies', path: '/admin/case-studies', icon: '📈' },
    { name: 'Testimonials', path: '/admin/testimonials', icon: '💬' },
    { name: 'Videos', path: '/admin/video-testimonials', icon: '📹' },
    { name: 'Media Library', path: '/admin/media', icon: '🖼️' },
    { name: 'Users', path: '/admin/users', icon: '👥' },
    { name: 'Settings', path: '/admin/settings', icon: '⚙️' },
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
          ✕
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
                  <span className={isActive ? 'opacity-100' : 'opacity-60 grayscale'} aria-hidden="true">{link.icon}</span>
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