import { Navigate, Outlet } from 'react-router-dom';

export default function ProtectedRoute() {
  const token = localStorage.getItem('adminToken'); // Assuming you store the JWT here
  return token ? <Outlet /> : <Navigate to="/admin/login" replace />;
}