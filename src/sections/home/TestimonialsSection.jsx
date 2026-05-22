export default function TestimonialsSection() {
  return (
    <section className="testimonials-section">
      <div className="container">
        <div className="section-head">
          <div className="eyebrow">Client Stories</div>
          <h2>What Our Clients Say</h2>
        </div>
        <div className="testimonials-grid">
          <div className="testi-card">
            <div className="testi-stars">★★★★★</div>
            <p>"Before Endless, our Instagram looked abandoned. Now it's our #1 way new customers find us. The transformation was faster than I expected."</p>
            <div className="testi-author">
              <div className="testi-avatar">SK</div>
              <div>
                <div className="testi-name">Sarah K.</div>
                <div className="testi-role">Café Owner</div>
              </div>
            </div>
          </div>
          <div className="testi-card">
            <div className="testi-stars">★★★★★</div>
            <p>"Professional, fast, and actually creative. I stopped worrying about content entirely. They understood our brand from day one and ran with it."</p>
            <div className="testi-author">
              <div className="testi-avatar">MD</div>
              <div>
                <div className="testi-name">Marcus D.</div>
                <div className="testi-role">Fitness Studio Owner</div>
              </div>
            </div>
          </div>
          <div className="testi-card">
            <div className="testi-stars">★★★★★</div>
            <p>"Our follower count doubled in 3 months. The posters they design are genuinely stunning — clients ask us who does our social media all the time."</p>
            <div className="testi-author">
              <div className="testi-avatar">LT</div>
              <div>
                <div className="testi-name">Lina T.</div>
                <div className="testi-role">Boutique Retailer</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}