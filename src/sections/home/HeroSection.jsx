import React from 'react';

export default function HeroSection() {
  const openTelegram = () => window.open('https://t.me/yourusername', '_blank');

  return (
    <section className="hero-section reveal active" style={{ 
      padding: '160px 24px 100px', 
      // Rich, premium deep blue gradient
      background: 'linear-gradient(135deg, #0f172a 0%, #1e3a8a 100%)', 
      textAlign: 'center',
      color: 'white'
    }}>
      <div className="container" style={{ maxWidth: '1000px' }}>
        
        <div className="eyebrow" style={{
          textTransform: 'uppercase',
          letterSpacing: '0.15em',
          fontWeight: '700',
          color: '#60a5fa', // Bright accent blue for dark backgrounds
          marginBottom: '16px',
          fontSize: '14px'
        }}>
          Social Media Management agency
        </div>

        <h1 style={{
          fontSize: '64px',
          fontWeight: '800',
          lineHeight: '1.1',
          color: '#ffffff', // Changed to white
          letterSpacing: '-0.03em',
          marginBottom: '24px',
          fontFamily: 'var(--font-head)'
        }}>
          Endless Growth for<br />
          Your Digital Presence
        </h1>

        <p style={{
          fontSize: '20px',
          lineHeight: '1.6',
          color: '#cbd5e1', // Lighter slate for readability on dark
          maxWidth: '650px',
          margin: '0 auto 48px',
          fontWeight: '400'
        }}>
          We handle your social media end-to-end, creating compelling content that builds community and drives measurable growth.
        </p>

        <button 
          onClick={openTelegram} 
          className="modern-btn btn-primary" 
          style={{ 
            padding: '18px 36px', 
            fontSize: '18px',
            display: 'inline-flex', 
            width: 'auto',
            background: '#ffffff', // White button on dark background
            color: '#1e3a8a', // Blue text
            boxShadow: '0 4px 14px rgba(255,255,255,0.25)'
          }}
        >
          Grow Your Presence
        </button>

        {/* Dashboard Mockup (Stays white so it pops off the dark background!) */}
        <div className="hero-visual reveal" style={{
          marginTop: '80px',
          background: 'white',
          border: '1px solid #334155',
          borderRadius: '20px',
          padding: '12px',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)', // Darker shadow
          overflow: 'hidden'
        }}>
          <div style={{
            height: '32px',
            background: '#f1f5f9',
            borderRadius: '12px 12px 0 0',
            borderBottom: '1px solid #e2e8f0',
            display: 'flex',
            alignItems: 'center',
            padding: '0 16px',
            marginBottom: '12px'
          }}>
            <div style={{ display: 'flex', gap: '6px' }}>
              <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#ff5f57' }}></div>
              <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#febc2e' }}></div>
              <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#28c840' }}></div>
            </div>
            <div style={{ fontSize: '12px', color: '#94a3b8', flexGrow: 1, textAlign: 'center', marginRight: '32px' }}>
              app.endless.digital/dashboard
            </div>
          </div>

          <div style={{ height: '400px', display: 'flex', gap: '12px' }}>
            <div style={{ width: '60px', background: '#f8fafc', borderRadius: '8px' }}></div>
            <div style={{ flexGrow: 1, display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ display: 'flex', gap: '12px' }}>
                <div style={{ flex: 1, height: '100px', background: '#eff6ff', borderRadius: '8px' }}></div>
                <div style={{ flex: 1, height: '100px', background: '#f8fafc', borderRadius: '8px' }}></div>
                <div style={{ flex: 1, height: '100px', background: '#f8fafc', borderRadius: '8px' }}></div>
              </div>
              <div style={{ flexGrow: 1, background: '#f8fafc', borderRadius: '8px', padding: '24px' }}>
                <div style={{ height: '20px', width: '200px', background: '#e2e8f0', borderRadius: '4px', marginBottom: '16px' }}></div>
                <div style={{ height: '100px', background: '#e2e8f0', opacity: 0.5, borderRadius: '4px' }}></div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}