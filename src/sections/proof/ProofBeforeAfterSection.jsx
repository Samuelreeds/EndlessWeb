export default function ProofBeforeAfterSection() {
  return (
    <section style={{ background: 'white' }}>
      <div className="container">
        <div className="section-head">
          <div className="eyebrow">Visual Transformation</div>
          <h2>The Difference Is Visible</h2>
          <p>This is what professional management looks like. Every account you see started exactly where yours is now.</p>
        </div>
        <div className="proof-ba-grid">
          <div className="proof-ba-item">
            <div className="before-frame">
              <div className="frame-label">Before</div>
              <div className="frame-img">[PLACEHOLDER — Before screenshot: Account 1]</div>
              <div style={{ fontSize: '14px', color: 'var(--grey-500)' }}>Unbranded, inconsistent, no clear identity</div>
            </div>
            <div className="after-frame">
              <div className="frame-label">After Endless</div>
              <div className="frame-img">[PLACEHOLDER — After screenshot: Account 1]</div>
              <div className="frame-stat">+220% Followers</div>
              <div className="frame-desc">Month 1 → Month 3 · Instagram</div>
            </div>
          </div>
          <div className="proof-ba-item">
            <div className="before-frame">
              <div className="frame-label">Before</div>
              <div className="frame-img">[PLACEHOLDER — Before screenshot: Account 2]</div>
              <div style={{ fontSize: '14px', color: 'var(--grey-500)' }}>Low engagement, template posts, no strategy</div>
            </div>
            <div className="after-frame">
              <div className="frame-label">After Endless</div>
              <div className="frame-img">[PLACEHOLDER — After screenshot: Account 2]</div>
              <div className="frame-stat">+415% Engagement</div>
              <div className="frame-desc">Month 1 → Month 2 · Facebook + Instagram</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}