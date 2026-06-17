import { useEffect, useState } from 'react';

export default function ClientLogos() {
  const [logos, setLogos] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/cms/clients')
      .then((res) => res.json())
      .then((data) => {
        // Fallback to local if DB is empty, otherwise use DB images
        if (data.length > 0) {
          setLogos(data.map((client) => client.logoUrl || client.imageUrl));
        } else {
          const logoModules = import.meta.glob('../assets/LogoClient/*.{png,jpg,jpeg,svg,PNG,JPG}', { eager: true });
          setLogos(Object.values(logoModules).map((module) => module.default));
        }
      })
      .catch((err) => console.error('Error fetching clients:', err));
  }, []);

  if (logos.length === 0) return null;

  const doubledLogos = [...logos, ...logos];

  return (
    <section className="reveal" style={{ background: 'white', padding: '64px 0', borderTop: '1px solid var(--grey-200)', overflow: 'hidden' }}>
      <div style={{ textAlign: 'center', marginBottom: '48px' }}>
        <p style={{ fontSize: '13px', fontWeight: '600', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--grey-400)' }}>
          Trusted by growing brands
        </p>
      </div>
      
      <div className="logo-slider-container">
        <div className="logo-track">
          {doubledLogos.map((logoUrl, index) => (
            <img 
              key={index} 
              src={logoUrl} 
              alt={`Client logo ${index}`} 
              style={{ maxHeight: '70px', maxWidth: '160px', objectFit: 'contain', mixBlendMode: 'multiply', flexShrink: 0 }} 
            />
          ))}
        </div>
      </div>
    </section>
  );
}