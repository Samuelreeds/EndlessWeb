import { Link } from 'react-router-dom';

export default function AdminTopbar({ onMenuClick }) {
  return (
    <header className="h-16 lg:h-24 bg-white/80 backdrop-blur-md border-b border-[#E2E8F0] flex items-center justify-between px-4 sm:px-6 lg:px-10 z-10 sticky top-0 shadow-sm">
      <div className="flex items-center gap-4">
        <button 
          onClick={onMenuClick}
          aria-label="Open navigation menu"
          className="lg:hidden p-2 text-[#64748B] hover:bg-[#F1F5F9] rounded-lg transition-colors focus:ring-2 focus:ring-[#2563EB] outline-none"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
        </button>
        <div className="hidden sm:block text-[14px] text-[#64748B] font-semibold bg-[#F8FAFC] px-4 py-2.5 rounded-lg border border-[#E2E8F0]">
          Content Management System
        </div>
      </div>
      
      <div className="flex items-center gap-4 sm:gap-6">
        <Link to="/" target="_blank" className="text-[14px] font-bold text-[#2563EB] hover:text-[#1E4D99] transition-colors flex items-center gap-2">
          <span className="hidden sm:inline">View Live Site</span> <span className="text-lg leading-none">↗</span>
        </Link>
        <div className="w-px h-8 bg-[#E2E8F0] hidden sm:block"></div>
        <button className="text-[14px] font-bold bg-white border-2 border-[#E2E8F0] hover:border-[#CBD5E1] text-[#0A1628] py-2 px-4 sm:py-2.5 sm:px-6 rounded-xl transition-all shadow-sm hover:shadow focus:ring-2 focus:ring-[#2563EB] outline-none">
          Logout
        </button>
      </div>
    </header>
  );
}