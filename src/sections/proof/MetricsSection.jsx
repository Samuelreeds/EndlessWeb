export default function MetricsSection() {
  return (
    <section className="metrics-section">
      <div className="container">
        <div className="section-head">
          <div className="eyebrow">Impact at a Glance</div>
          <h2>Results Across All Clients</h2>
        </div>
        <div className="metrics-grid">
          <div className="metric-block">
            <span className="metric-num">+187%</span>
            <div className="metric-lbl">Avg. follower growth</div>
            <div className="metric-sub">Within 90 days</div>
          </div>
          <div className="metric-block">
            <span className="metric-num">+340%</span>
            <div className="metric-lbl">Avg. engagement rate</div>
            <div className="metric-sub">Across all accounts</div>
          </div>
          <div className="metric-block">
            <span className="metric-num">94%</span>
            <div className="metric-lbl">Client retention</div>
            <div className="metric-sub">After first 3 months</div>
          </div>
          <div className="metric-block">
            <span className="metric-num">50+</span>
            <div className="metric-lbl">Brands managed</div>
            <div className="metric-sub">Across the region</div>
          </div>
        </div>
        <p style={{ textAlign: 'center', marginTop: '20px', fontSize: '12px', color: 'var(--grey-400)' }}>
          [PLACEHOLDER — Replace with verified, real metrics before launch]
        </p>
      </div>
    </section>
  );
}