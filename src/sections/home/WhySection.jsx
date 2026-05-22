export default function WhySection() {
  return (
    <section className="why-section reveal" style={{ background: '#eff6ff', padding: '80px 24px' }}>
      <div className="container">
        <div className="section-head" style={{ textAlign: 'center' }}>
          <div className="eyebrow" style={{ color: '#2563eb', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '0.1em', fontSize: '14px', marginBottom: '8px' }}>Work With Us</div>
          <h2 style={{ fontSize: '36px', color: '#0f172a' }}>Why Endless</h2>
        </div>
        
        <div className="why-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px', marginTop: '56px' }}>
          
          <div className="why-card" style={{ background: 'white', padding: '40px 32px', borderRadius: '24px', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
            <div style={{ marginBottom: '24px', background: '#eff6ff', padding: '16px', borderRadius: '50%' }}>
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line><polyline points="9 16 11 18 15 14"></polyline></svg>
            </div>
            <div className="why-content">
              <h3 style={{ fontSize: '20px', marginBottom: '12px', color: '#0f172a' }}>We Save You Time And Money</h3>
              <p style={{ color: '#64748b', lineHeight: '1.6' }}>As a marketing agency, we've worked with multiple industries where we have the understanding of what works and performs well.</p>
            </div>
          </div>

          <div className="why-card" style={{ background: 'white', padding: '40px 32px', borderRadius: '24px', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
            <div style={{ marginBottom: '24px', background: '#eff6ff', padding: '16px', borderRadius: '50%' }}>
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2"><path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"></path></svg>
            </div>
            <div className="why-content">
              <h3 style={{ fontSize: '20px', marginBottom: '12px', color: '#0f172a' }}>Extensive Industry Experience</h3>
              <p style={{ color: '#64748b', lineHeight: '1.6' }}>With over a decade of expertise in digital marketing and e-commerce, Endless Digital offers seasoned insights and proven strategies to elevate your business.</p>
            </div>
          </div>

          <div className="why-card" style={{ background: 'white', padding: '40px 32px', borderRadius: '24px', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
            <div style={{ marginBottom: '24px', background: '#eff6ff', padding: '16px', borderRadius: '50%' }}>
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
            </div>
            <div className="why-content">
              <h3 style={{ fontSize: '20px', marginBottom: '12px', color: '#0f172a' }}>Identify Your Target Audience</h3>
              <p style={{ color: '#64748b', lineHeight: '1.6' }}>We stand out for our commitment to disruptive, out-of-the-box marketing approaches, along with results to back it up.</p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}