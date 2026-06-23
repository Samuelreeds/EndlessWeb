import { useEffect, useState } from 'react';

export default function TestimonialsSection() {
  const [testimonials, setTestimonials] = useState([]);

  useEffect(() => {
    fetch('${import.meta.env.VITE_API_URL}/api/cms/testimonials')
      .then((res) => res.json())
      .then((data) => setTestimonials(data.slice(0, 3))) // Show top 3 on home
      .catch((err) => console.error('Error fetching testimonials:', err));
  }, []);

  if (testimonials.length === 0) return null;

  return (
    <section className="testimonials-section">
      <div className="container">
        <div className="section-head">
          <div className="eyebrow">Client Stories</div>
          <h2>What Our Clients Say</h2>
        </div>
        <div className="testimonials-grid">
          {testimonials.map((testi) => (
            <div key={testi.id} className="testi-card">
              <div className="testi-stars">{'★'.repeat(testi.stars || 5)}</div>
              <p>"{testi.quote}"</p>
              <div className="testi-author">
                <div className="testi-avatar">{testi.avatar || testi.name.charAt(0)}</div>
                <div>
                  <div className="testi-name">{testi.name}</div>
                  <div className="testi-role">{testi.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}