import { Link } from 'react-router-dom';

export default function AdminTopbar() {
  return (
    <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6">
      <div className="text-gray-600 font-medium">
        Content Management System
      </div>
      <div className="flex items-center gap-4">
        <Link to="/" target="_blank" className="text-sm text-blue-600 hover:underline">
          View Live Site
        </Link>
        <button className="text-sm bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 px-4 rounded transition-colors">
          Logout
        </button>
      </div>
    </header>
  );
}