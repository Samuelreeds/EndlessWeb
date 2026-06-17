import { Link, useLocation } from 'react-router-dom';

export default function AdminSidebar() {
  const location = useLocation();

  const links = [
    { name: 'Dashboard', path: '/admin' },
    { name: 'Clients', path: '/admin/clients' },
    { name: 'Testimonials', path: '/admin/testimonials' },
    { name: 'Video Testimonials', path: '/admin/video-testimonials' },
    { name: 'Case Studies', path: '/admin/case-studies' },
  ];

  return (
    <div className="h-full w-full bg-gray-900 text-white flex flex-col m-0 p-0">
      <div className="h-16 flex items-center px-6 border-b border-gray-800 flex-shrink-0">
        <h1 className="text-xl font-bold tracking-wider m-0">ENDLESS OS</h1>
      </div>
      <nav className="flex-1 py-4 overflow-y-auto">
        <ul className="space-y-1 m-0 p-0 list-none">
          {links.map((link) => (
            <li key={link.name} className="m-0 p-0">
              <Link
                to={link.path}
                className={`block px-6 py-3 hover:bg-gray-800 transition-colors no-underline ${
                  location.pathname === link.path ? 'bg-gray-800 border-l-4 border-blue-500' : 'border-l-4 border-transparent'
                }`}
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}