import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom';

// Layouts
import PublicLayout from './layouts/PublicLayout';
import AdminLayout from './layouts/AdminLayout';

// Public Pages
import Home from './pages/Home';
import Pricing from './pages/Pricing';
import Proof from './pages/Proof';

// Admin Pages
import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminClients from './pages/admin/AdminClients';
import AdminTestimonials from './pages/admin/AdminTestimonials';
import AdminVideoTestimonials from './pages/admin/AdminVideoTestimonials';
import AdminCaseStudies from './pages/admin/AdminCaseStudies';

// Security: Protected Route Wrapper
const ProtectedRoute = () => {
  const token = localStorage.getItem('adminToken');
  return token ? <Outlet /> : <Navigate to="/admin/login" replace />;
};

export default function App() {
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add('active');
      });
    }, { threshold: 0.1 });

    const observeElements = () => {
      document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
    };
    
    observeElements();
    window.addEventListener('click', () => setTimeout(observeElements, 100)); 
    
    return () => observer.disconnect();
  }, []);

  return (
    <Router>
      <Routes>
        {/* --- PUBLIC SITE --- */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/proof" element={<Proof />} />
        </Route>

        {/* --- ADMIN DASHBOARD --- */}
        <Route path="/admin/login" element={<AdminLogin />} />
        
        {/* Protected Admin Routes */}
        <Route path="/admin" element={<ProtectedRoute />}>
          <Route element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="clients" element={<AdminClients />} />
            <Route path="testimonials" element={<AdminTestimonials />} />
            <Route path="video-testimonials" element={<AdminVideoTestimonials />} />
            <Route path="case-studies" element={<AdminCaseStudies />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
}