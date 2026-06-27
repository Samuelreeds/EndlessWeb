import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function HeroSection() {
  // Use React Router to match the behavior in your ServicesSection
  const navigate = useNavigate();

  return (
    <section className="hero-section reveal active" style={{ 
      padding: '160px 24px 100px', 
      background: 'linear-gradient(135deg, #0f172a 0%, #1e3a8a 100%)', 
      textAlign: 'center',
      color: 'white'
    }}>
      <div className="container" style={{ maxWidth: '1000px' }}>
        
        <div className="eyebrow" style={{
          textTransform: 'uppercase',
          letterSpacing: '0.15em',
          fontWeight: '700',
          color: '#60a5fa', 
          marginBottom: '16px',
          fontSize: '14px'
        }}>
          Featured Case Study
        </div>

        <h1 style={{
          fontSize: '64px',
          fontWeight: '800',
          lineHeight: '1.1',
          color: '#ffffff', 
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
          color: '#cbd5e1', 
          maxWidth: '650px',
          margin: '0 auto 48px',
          fontWeight: '400'
        }}>
          We handle your social media end-to-end, creating compelling content that builds community and drives measurable growth.
        </p>

        <button 
          onClick={() => navigate('/pricing')} 
          className="modern-btn btn-primary transition-colors" 
          style={{ 
            padding: '18px 36px', 
            fontSize: '18px',
            display: 'inline-flex', 
            width: 'auto',
            background: '#2563EB', // Project Primary Blue
            color: '#ffffff', 
            border: 'none',
            borderRadius: '8px',
            fontWeight: 'bold',
            cursor: 'pointer',
            boxShadow: '0 4px 14px rgba(37, 99, 235, 0.4)' // Blue tinted shadow
          }}
        >
          View Pricing
        </button>

        {/* Marketing Poster / Case Study Image Container */}
        <div className="hero-visual reveal" style={{
          marginTop: '80px',
          background: '#0f172a', // Dark backing
          border: '1px solid #334155',
          borderRadius: '20px',
          padding: '8px', // Thinner padding to frame the poster
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)', 
          overflow: 'hidden',
          aspectRatio: '16/9', // Standard cinematic/presentation ratio
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <img 
            // ⚠️ REPLACE THIS STRING WITH YOUR ACTUAL IMAGE PATH ⚠️
            src="/path-to-your-marketing-poster.jpg" 
            alt="Endless Featured Case Study" 
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover', // Ensures the image fills the space beautifully without stretching
              borderRadius: '12px'
            }}
            loading="lazy"
          />
        </div>

      </div>
    </section>
  );
}