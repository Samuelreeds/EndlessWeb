import case1Img from '../../assets/LogoClient/BicyleShop.png';
import case2Img from '../../assets/LogoClient/DaraShop.png';// <-- Change to your actual file name

export default function CaseStudiesSection() {
  return (
    <section className="case-section">
      <div className="container">
        <div className="section-head">
          <div className="eyebrow">Case Studies</div>
          <h2>How We Changed the Game</h2>
          <p>Real businesses, real challenges, real outcomes. Here's exactly what we did — and what it produced.</p>
        </div>
        <div style={{ marginTop: '56px' }}>

          <div className="case-study">
            <div className="case-content">
              <div className="case-tag">Case Study 01 — F&B Business</div>
              <h3>From Zero Engagement to 22 DMs Per Week</h3>
              <div className="case-point">
                <strong>Challenge</strong>
                <p>No consistent content, zero engagement, outdated visuals that didn't reflect the quality of the business at all.</p>
              </div>
              <div className="case-point">
                <strong>Approach</strong>
                <p>Redesigned visual identity, built a 30-day content calendar, and launched two boosted posts targeting local audiences within the first month.</p>
              </div>
              <div className="case-results">
                <div>
                  <div className="result-num">4.4×</div>
                  <div className="result-lbl">Followers in 90 days</div>
                </div>
                <div>
                  <div className="result-num">14×</div>
                  <div className="result-lbl">Average post reach</div>
                </div>
                <div>
                  <div className="result-num">+20</div>
                  <div className="result-lbl">DMs/week from Instagram</div>
                </div>
              </div>
            </div>
            <div className="case-visual" style={{ padding: 0, border: 'none', background: 'transparent' }}>
              <img 
                src={case1Img} 
                alt="Case Study 1" 
                style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 'var(--radius-lg)' }} 
              />
            </div>
          </div>

          <div className="case-study reverse">
            <div className="case-content">
              <div className="case-tag">Case Study 02 — Boutique Retail</div>
              <h3>Engagement Up 575% in Two Months</h3>
              <div className="case-point">
                <strong>Challenge</strong>
                <p>Inconsistent posting, no brand voice, and an engagement rate so low the algorithm had stopped showing posts to followers.</p>
              </div>
              <div className="case-point">
                <strong>Approach</strong>
                <p>Developed brand content pillars, built a daily posting schedule, and launched a custom poster design series with a clear visual identity.</p>
              </div>
              <div className="case-results">
                <div>
                  <div className="result-num">5.4%</div>
                  <div className="result-lbl">Engagement rate (was 0.8%)</div>
                </div>
                <div>
                  <div className="result-num">3×</div>
                  <div className="result-lbl">Story views in 60 days</div>
                </div>
                <div>
                  <div className="result-num">Wk 3</div>
                  <div className="result-lbl">First Instagram sale</div>
                </div>
              </div>
            </div>
            <div className="case-visual" style={{ padding: 0, border: 'none', background: 'transparent' }}>
              <img 
                src={case2Img} 
                alt="Case Study 2" 
                style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 'var(--radius-lg)' }} 
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}