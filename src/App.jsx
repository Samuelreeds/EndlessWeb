import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Pricing from './pages/Pricing';
import Proof from './pages/Proof';
import FloatingChat from './components/FloatingChat';

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
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/proof" element={<Proof />} />
          </Routes>
        </main>
        <FloatingChat />
        <Footer />
      </div>
    </Router>
  );
}