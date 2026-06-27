import { useState, useEffect } from 'react';

export default function ProofTestimonialsSection() {
  const [settings, setSettings] = useState({
    successHeading: 'What They Said After 90 Days',
    successQuote: '',
    successAuthor: ''
  });

  useEffect(() => {
    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
    
    fetch(`${API_URL}/settings`)
      .then(res => res.json())
      .then(data => {
        if (Object.keys(data).length > 0) {
          setSettings(prev => ({
            ...prev,
            successHeading: data.successHeading || prev.successHeading,
            successQuote: data.successQuote || prev.successQuote,
            successAuthor: data.successAuthor || prev.successAuthor
          }));
        }
      })
      .catch(err => console.error("Error fetching 90-day success settings:", err));
  }, []);

  // Do not render the section at all if there is no quote set in the Admin panel
  if (!settings.successQuote) return null;

  // Automatically parse the "Name, Role" format from the admin panel
  const authorParts = settings.successAuthor ? settings.successAuthor.split(',') : ['Anonymous'];
  const authorName = authorParts[0].trim();
  const authorRole = authorParts.length > 1 ? authorParts[1].trim() : 'Client';
  const avatarLetter = authorName ? authorName.charAt(0).toUpperCase() : 'C';

  return (
    <section className="testimonials-section">
      <div className="container">
        
        <div className="section-head">
          <div className="eyebrow">More From Our Clients</div>
          {/* Dynamically loads the heading from Admin Settings */}
          <h2>{settings.successHeading}</h2>
        </div>

        {/* Display as a centered, featured highlight card instead of a crowded grid */}
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <div className="testi-card" style={{ maxWidth: '700px', width: '100%', textAlign: 'center' }}>
            <div className="testi-stars" style={{ justifyContent: 'center' }}>★★★★★</div>
            
            <p style={{ fontSize: '18px', lineHeight: '1.8', margin: '24px 0' }}>
              "{settings.successQuote}"
            </p>
            
            <div className="testi-author" style={{ justifyContent: 'center', marginTop: '32px' }}>
              <div className="testi-avatar">{avatarLetter}</div>
              <div style={{ textAlign: 'left' }}>
                <div className="testi-name">{authorName}</div>
                <div className="testi-role">{authorRole}</div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}