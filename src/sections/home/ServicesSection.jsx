import { useNavigate } from 'react-router-dom';

export default function ServicesSection() {
  const navigate = useNavigate();

  return (
    <section id="services" style={{ background: 'white' }}>
      <div className="container">
        <div className="section-head">
          <div className="eyebrow">What We Do</div>
          <h2>Everything Your Social Media Needs</h2>
          <p>From strategy to execution — we cover every aspect of your social media presence so nothing falls through the cracks.</p>
        </div>
        <div className="services-grid">
          <div className="service-card">
            <div className="service-icon">
              <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.8"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
            </div>
            <h3>Content Creation</h3>
            <p>Captions, calendars, and copy written for your brand voice. We plan and publish content that builds your audience and drives real engagement — every single week.</p>
          </div>
          <div className="service-card">
            <div className="service-icon">
              <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.8"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
            </div>
            <h3>Poster Design</h3>
            <p>Scroll-stopping graphics designed to match your brand identity. Every post looks like it came from a top creative agency — because it did.</p>
          </div>
          <div className="service-card">
            <div className="service-icon">
              <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.8"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>
            </div>
            <h3>Boosting & Paid Reach</h3>
            <p>We run and manage your ad campaigns to put your content in front of the right people — at the right time, for the right cost. Every dollar tracked.</p>
          </div>
        </div>
        <div className="section-cta-row">
          <button className="btn-secondary" onClick={() => navigate('/pricing')}>
            View Pricing Plans →
          </button>
        </div>
      </div>
    </section>
  );
}