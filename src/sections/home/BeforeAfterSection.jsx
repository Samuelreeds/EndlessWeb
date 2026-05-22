import { useNavigate } from 'react-router-dom';

export default function BeforeAfterSection() {
  const navigate = useNavigate();

  return (
    <section style={{ background: 'white' }}>
      <div className="container">
        <div className="section-head">
          <div className="eyebrow">The Endless Effect</div>
          <h2>What Managed Social Media Actually Looks Like</h2>
          <p>Real accounts. Real results. See exactly what changed — and why it matters for your business.</p>
        </div>
        <div className="ba-grid" style={{ marginTop: '56px' }}>
          <div className="ba-panel before">
            <div className="placeholder-img">[PLACEHOLDER — Before screenshot]</div>
            <div className="ba-label">Before</div>
            <h3>Unmanaged & Inconsistent</h3>
            <p>No posting schedule. Generic graphics. Zero engagement. The page exists, but it's doing nothing for the business.</p>
          </div>
          <div className="ba-panel after">
            <div className="placeholder-img">[PLACEHOLDER — After screenshot]</div>
            <div className="ba-label">After Endless</div>
            <h3 style={{ color: 'white' }}>Consistent. Professional. Growing.</h3>
            <p>Daily content, custom-designed posts, and a real audience that engages, follows, and buys.</p>
            <div className="ba-metrics">
              <div className="ba-metric">
                <span className="val">+340%</span>
                <span className="lbl">Engagement</span>
              </div>
              <div className="ba-metric">
                <span className="val">+187%</span>
                <span className="lbl">Followers</span>
              </div>
              <div className="ba-metric">
                <span className="val">90 days</span>
                <span className="lbl">Avg. timeline</span>
              </div>
            </div>
          </div>
        </div>
        <div className="section-cta-row">
          <button className="btn-secondary" onClick={() => navigate('/proof')}>
            View Full Case Studies →
          </button>
        </div>
      </div>
    </section>
  );
}