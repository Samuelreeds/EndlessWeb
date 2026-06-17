import { useEffect, useState } from 'react';

export default function CaseStudiesSection() {
  const [caseStudies, setCaseStudies] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/cms/case-studies')
      .then((res) => res.json())
      .then((data) => setCaseStudies(data))
      .catch((err) => console.error('Error fetching case studies:', err));
  }, []);

  if (caseStudies.length === 0) return null;

  return (
    <section className="case-section">
      <div className="container">
        <div className="section-head">
          <div className="eyebrow">Case Studies</div>
          <h2>How We Changed the Game</h2>
          <p>Real businesses, real challenges, real outcomes. Here's exactly what we did — and what it produced.</p>
        </div>
        <div style={{ marginTop: '56px' }}>

          {caseStudies.map((study, index) => {
            // Parse metrics if they are stored as JSON string, else fallback
            let metrics = [];
            try {
              metrics = typeof study.results === 'string' ? JSON.parse(study.results) : study.results;
            } catch (e) {
              metrics = [];
            }

            return (
              <div key={study.id} className={`case-study ${index % 2 !== 0 ? 'reverse' : ''}`}>
                <div className="case-content">
                  <div className="case-tag">{study.category || `Case Study 0${index + 1}`}</div>
                  <h3>{study.title}</h3>
                  <div className="case-point">
                    <strong>Challenge</strong>
                    <p>{study.challenge}</p>
                  </div>
                  <div className="case-point">
                    <strong>Approach</strong>
                    <p>{study.approach}</p>
                  </div>
                  
                  {metrics && metrics.length > 0 && (
                    <div className="case-results">
                      {metrics.map((m, i) => (
                        <div key={i}>
                          <div className="result-num">{m.value}</div>
                          <div className="result-lbl">{m.label}</div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                
                <div className="case-visual" style={{ padding: 0, border: 'none', background: 'transparent' }}>
                  {study.imageUrl ? (
                    <img 
                      src={study.imageUrl} 
                      alt={study.title} 
                      style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 'var(--radius-lg)' }} 
                    />
                  ) : (
                    <div>[PLACEHOLDER IMAGE]</div>
                  )}
                </div>
              </div>
            );
          })}

        </div>
      </div>
    </section>
  );
}