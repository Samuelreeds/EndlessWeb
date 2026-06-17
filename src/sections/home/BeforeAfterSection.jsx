import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function BeforeAfterSection() {
  const navigate = useNavigate();
  const [caseStudy, setCaseStudy] = useState(null);

  useEffect(() => {
    fetch('http://localhost:5000/api/cms/case-studies')
      .then((res) => res.json())
      .then((data) => {
        if (data.length > 0) setCaseStudy(data[0]); // Feature the first case study
      })
      .catch((err) => console.error('Error fetching case study:', err));
  }, []);

  return (
    <section style={{ background: 'white' }}>
      <div className="container">
        <div className="section-head">
          <div className="eyebrow">The Endless Effect</div>
          <h2>What Managed Social Media Actually Looks Like</h2>
          <p>Real accounts. Real results. See exactly what changed — and why it matters for your business.</p>
        </div>
        
        {caseStudy && (
          <div className="ba-grid" style={{ marginTop: '56px' }}>
            <div className="ba-panel before">
              {caseStudy.beforeImage ? (
                <img src={caseStudy.beforeImage} alt="Before" className="placeholder-img" style={{ objectFit: 'cover' }} />
              ) : (
                <div className="placeholder-img">[Before Image]</div>
              )}
              <div className="ba-label">Before</div>
              <h3>Unmanaged & Inconsistent</h3>
              <p>{caseStudy.challenge || "No posting schedule. Generic graphics. Zero engagement."}</p>
            </div>
            
            <div className="ba-panel after">
              {caseStudy.afterImage ? (
                <img src={caseStudy.afterImage} alt="After" className="placeholder-img" style={{ objectFit: 'cover' }} />
              ) : (
                <div className="placeholder-img">[After Image]</div>
              )}
              <div className="ba-label">After Endless</div>
              <h3 style={{ color: 'white' }}>{caseStudy.title || "Consistent. Professional. Growing."}</h3>
              <p>{caseStudy.approach || "Daily content, custom-designed posts, and a real audience."}</p>
              
              {/* If you stored metrics as JSON, map them. Otherwise fallback to placeholders */}
              <div className="ba-metrics">
                <div className="ba-metric">
                  <span className="val">+340%</span>
                  <span className="lbl">Engagement</span>
                </div>
                <div className="ba-metric">
                  <span className="val">+187%</span>
                  <span className="lbl">Followers</span>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="section-cta-row">
          <button className="btn-secondary" onClick={() => navigate('/proof')}>
            View Full Case Studies →
          </button>
        </div>
      </div>
    </section>
  );
}