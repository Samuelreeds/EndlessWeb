import { Outlet } from "react-router-dom";
import AdminSidebar from "../components/admin/AdminSidebar.jsx";
import AdminTopbar from "../components/admin/AdminTopbar.jsx";
export default function AdminLayout() {
  return (
    <div className="flex flex-row h-screen w-full bg-gray-50 font-sans overflow-hidden">
      {/* Sidebar gets fixed width */}
      <div className="w-64 flex-shrink-0">
        <AdminSidebar />
      </div>
      
      {/* Main content takes remaining space */}
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        <AdminTopbar />
        <main className="flex-1 overflow-x-hidden overflow-y-auto p-6 bg-gray-50">
          <Outlet />
        </main>
      </div>
    </div>
  );
}