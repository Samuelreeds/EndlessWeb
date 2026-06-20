import { useEffect, useState } from 'react';

export default function ClientLogos() {
  const [logos, setLogos] = useState([]);

  useEffect(() => {
    // 1. Updated to the correct backend route: /client-logos
    fetch('http://localhost:5000/api/cms/client-logos')
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch logos');
        return res.json();
      })
      .then((data) => {
        // 2. Only show clients that are marked as "Active"
        const activeClients = data.filter(client => 
          client.status === 'active' || client.status === 'Active'
        );

        if (activeClients.length > 0) {
          // Keep the whole object so we can use the website URL and Name
          setLogos(activeClients);
        } else {
          // Fallback to local folder if DB is empty
          const logoModules = import.meta.glob('../assets/LogoClient/*.{png,jpg,jpeg,svg,PNG,JPG}', { eager: true });
          const localLogos = Object.values(logoModules).map((module) => ({
            imageUrl: module.default,
            name: 'Client Logo',
            website: null
          }));
          setLogos(localLogos);
        }
      })
      .catch((err) => console.error('Error fetching clients:', err));
  }, []);

  if (logos.length === 0) return null;

  const doubledLogos = [...logos, ...logos];

  return (
    <section style={{ background: 'white', padding: '64px 0', borderTop: '1px solid var(--grey-200)', overflow: 'hidden' }}>
      <div style={{ textAlign: 'center', marginBottom: '48px' }}>
        <p style={{ fontSize: '13px', fontWeight: '600', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--grey-400)' }}>
          Trusted by growing brands
        </p>
      </div>
      
      <div className="logo-slider-container">
        <div className="logo-track">
          {doubledLogos.map((client, index) => {
            const imgElement = (
              <img 
                src={client.imageUrl} 
                alt={client.name || `Client logo ${index}`} 
                style={{ maxHeight: '70px', maxWidth: '160px', objectFit: 'contain', mixBlendMode: 'multiply', flexShrink: 0 }} 
              />
            );

            // 3. Make the logo clickable if a website URL exists!
            return client.website ? (
              <a 
                key={index} 
                href={client.website} 
                target="_blank" 
                rel="noopener noreferrer"
                style={{ display: 'flex', alignItems: 'center', flexShrink: 0 }}
                className="hover:opacity-75 transition-opacity"
              >
                {imgElement}
              </a>
            ) : (
              <div key={index} style={{ display: 'flex', alignItems: 'center', flexShrink: 0 }}>
                {imgElement}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}