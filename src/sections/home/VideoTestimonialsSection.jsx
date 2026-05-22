export default function VideoTestimonialsSection() {
  return (
    <section style={{ background: 'white' }}>
      <div className="container">
        <div className="section-head">
          <div className="eyebrow">Hear It Directly</div>
          <h2>Real Words. Real Clients.</h2>
          <p>Don't take our word for it — watch what our clients have to say in their own words.</p>
        </div>
        <div className="video-grid">
          <div>
            <div className="video-thumb">
              <div className="play-btn">
                <svg viewBox="0 0 24 24"><polygon points="5 3 19 12 5 21 5 3"/></svg>
              </div>
              <span className="placeholder-video">[PLACEHOLDER — Video testimonial 1]</span>
            </div>
            <div className="video-label">Sarah K. — Café Owner</div>
            <div className="video-sub">Watch: 45 seconds</div>
          </div>
          <div>
            <div className="video-thumb">
              <div className="play-btn">
                <svg viewBox="0 0 24 24"><polygon points="5 3 19 12 5 21 5 3"/></svg>
              </div>
              <span className="placeholder-video">[PLACEHOLDER — Video testimonial 2]</span>
            </div>
            <div className="video-label">Marcus D. — Fitness Studio</div>
            <div className="video-sub">Watch: 1 minute</div>
          </div>
          <div>
            <div className="video-thumb">
              <div className="play-btn">
                <svg viewBox="0 0 24 24"><polygon points="5 3 19 12 5 21 5 3"/></svg>
              </div>
              <span className="placeholder-video">[PLACEHOLDER — Video testimonial 3]</span>
            </div>
            <div className="video-label">Lina T. — Boutique Retailer</div>
            <div className="video-sub">Watch: 55 seconds</div>
          </div>
        </div>
      </div>
    </section>
  );
}