export default function ClientLogos() {
  const logoModules = import.meta.glob('../assets/LogoClient/*.{png,jpg,jpeg,svg,PNG,JPG}', { eager: true });
  const logos = Object.values(logoModules).map((module) => module.default);

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