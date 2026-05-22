import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/EndlessLogo/EndlessLogo1.png';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const openTelegram = () => alert('[PLACEHOLDER] Link this to your Telegram: t.me/yourusername');

  return (
    <>
      <nav>
        <div className="nav-inner">
          <div className="nav-logo" onClick={() => navigate('/')}>
            <img 
              src={logo} 
              alt="Endless Logo" 
              style={{ height: '70px', cursor: 'pointer', mixBlendMode: 'multiply' }} 
              onClick={() => navigate('/')} 
            />
          </div>
          <div className="nav-links">
            <Link to="/" className="nav-link">Home</Link>
            <Link to="/pricing" className="nav-link">Pricing</Link>
            <Link to="/proof" className="nav-link">Results</Link>
            <button className="nav-cta" onClick={openTelegram}>Contact Us →</button>
          </div>
          <button className="nav-mobile-btn" onClick={() => setIsOpen(!isOpen)} aria-label="Open menu">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/>
            </svg>
          </button>
        </div>
      </nav>
      
      <div className={`mobile-menu ${isOpen ? 'open' : ''}`}>
        <Link to="/" className="nav-link" onClick={() => setIsOpen(false)}>Home</Link>
        <Link to="/pricing" className="nav-link" onClick={() => setIsOpen(false)}>Pricing</Link>
        <Link to="/proof" className="nav-link" onClick={() => setIsOpen(false)}>Results</Link>
        <button className="nav-cta" onClick={() => { openTelegram(); setIsOpen(false); }}>Contact Us on Telegram →</button>
      </div>
    </>
  );
}