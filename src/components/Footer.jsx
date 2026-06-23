import React from 'react';
// Replace this with your exact logo path if it is different
import logo from '../assets/EndlessLogo/EndlessLogo1.png'; 

export default function Footer() {
  const openFacebook = () => window.open('https://facebook.com/yourpage', '_blank'); // Add your FB link
  const openTelegram = () => window.open('https://t.me/Endless_Digitalmarketing', '_blank');

  return (
    <footer style={{ background: '#0f172a', color: '#f1f5f9', padding: '80px 24px 40px', marginTop: 'auto' }}>
      <div className="container" style={{ maxWidth: '1200px', margin: '0 auto' }}>
        
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', gap: '48px', borderBottom: '1px solid #334155', paddingBottom: '48px', marginBottom: '40px' }}>
          
          {/* Brand & Facebook Button Section */}
          <div style={{ maxWidth: '320px' }}>
            <img 
              src={logo} 
              alt="Endless Logo" 
              style={{ height: '48px', width: '48px', objectFit: 'cover', borderRadius: '50%', marginBottom: '24px', background: 'white' }} 
            />
            <p style={{ color: '#94a3b8', lineHeight: '1.6', marginBottom: '24px' }}>
              Endless Growth for Your Digital Presence. We handle your social media end-to-end.
            </p>
            
            {/* New Facebook Button */}
            <button 
              onClick={openFacebook}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '10px',
                background: '#1877F2', // Official Facebook Blue
                color: 'white',
                border: 'none',
                padding: '12px 24px',
                borderRadius: '8px',
                fontWeight: '600',
                fontSize: '15px',
                cursor: 'pointer',
                transition: 'opacity 0.2s'
              }}
              onMouseOver={(e) => e.currentTarget.style.opacity = '0.9'}
              onMouseOut={(e) => e.currentTarget.style.opacity = '1'}
            >
              <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
              Visit our Facebook
            </button>
          </div>

          {/* Footer Links */}
          <div style={{ display: 'flex', gap: '64px', flexWrap: 'wrap' }}>
            <div>
              <h4 style={{ color: 'white', fontWeight: '600', marginBottom: '20px' }}>Services</h4>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <li><span style={{ color: '#94a3b8', cursor: 'pointer' }}>Content Creation</span></li>
                <li><span style={{ color: '#94a3b8', cursor: 'pointer' }}>Ads Optimization</span></li>
                <li><span style={{ color: '#94a3b8', cursor: 'pointer' }}>Page Management</span></li>
              </ul>
            </div>
            
            <div>
              <h4 style={{ color: 'white', fontWeight: '600', marginBottom: '20px' }}>Company</h4>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <li><a href="/" style={{ color: '#94a3b8', textDecoration: 'none' }}>Home</a></li>
                <li><a href="/pricing" style={{ color: '#94a3b8', textDecoration: 'none' }}>Pricing</a></li>
                <li><a href="/proof" style={{ color: '#94a3b8', textDecoration: 'none' }}>Case Studies</a></li>
              </ul>
            </div>
            
            <div>
              <h4 style={{ color: 'white', fontWeight: '600', marginBottom: '20px' }}>Contact</h4>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <li><span onClick={openTelegram} style={{ color: '#94a3b8', cursor: 'pointer' }}>Telegram Support</span></li>
                <li><a href="mailto:hello@endless.digital" style={{ color: '#94a3b8', textDecoration: 'none' }}>hello@endless.digital</a></li>
              </ul>
            </div>
          </div>

        </div>

        {/* Copyright */}
        <div style={{ textAlign: 'center', color: '#64748b', fontSize: '14px' }}>
          © {new Date().getFullYear()} Endless Digital Marketing. All rights reserved.
        </div>
        
      </div>
    </footer>
  );
}