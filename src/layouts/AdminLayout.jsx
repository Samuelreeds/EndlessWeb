import { useState } from 'react';
import { Outlet } from "react-router-dom";
import AdminSidebar from "../components/admin/AdminSidebar";
import AdminTopbar from "../components/admin/AdminTopbar";

export default function AdminLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen w-full bg-[#F8FAFC] font-sans overflow-hidden">
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 z-20 bg-[#0A1628]/40 backdrop-blur-sm lg:hidden transition-opacity"
          onClick={() => setIsSidebarOpen(false)}
          aria-hidden="true"
        />
      )}
      
      <div className={`fixed inset-y-0 left-0 z-30 w-72 transform bg-white shadow-2xl lg:shadow-none border-r border-[#E2E8F0] transition-transform duration-300 ease-in-out lg:static lg:translate-x-0 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <AdminSidebar onClose={() => setIsSidebarOpen(false)} />
      </div>
      
      <div className="flex-1 flex flex-col h-full overflow-hidden w-full relative">
        <AdminTopbar onMenuClick={() => setIsSidebarOpen(true)} />
        <main className="flex-1 overflow-x-hidden overflow-y-auto p-4 sm:p-6 lg:p-10">
          <div className="mx-auto max-w-7xl">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}