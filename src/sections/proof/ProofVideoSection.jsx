export default function ProofVideoSection() {
  return (
    <section style={{ background: 'white' }}>
      <div className="container">
        <div className="section-head">
          <div className="eyebrow">Hear From Them Directly</div>
          <h2>Clients in Their Own Words</h2>
        </div>
        <div className="video-grid">
          <div>
            <div className="video-thumb">
              <div className="play-btn"><svg viewBox="0 0 24 24"><polygon points="5 3 19 12 5 21 5 3"/></svg></div>
              <span className="placeholder-video">[PLACEHOLDER — Client video 1]</span>
            </div>
            <div className="video-label">James R. — Restaurant Owner</div>
            <div className="video-sub">"From zero to 20 inquiries a week"</div>
          </div>
          <div>
            <div className="video-thumb">
              <div className="play-btn"><svg viewBox="0 0 24 24"><polygon points="5 3 19 12 5 21 5 3"/></svg></div>
              <span className="placeholder-video">[PLACEHOLDER — Client video 2]</span>
            </div>
            <div className="video-label">Nadia A. — E-commerce Brand</div>
            <div className="video-sub">"The strategy behind the results"</div>
          </div>
          <div>
            <div className="video-thumb">
              <div className="play-btn"><svg viewBox="0 0 24 24"><polygon points="5 3 19 12 5 21 5 3"/></svg></div>
              <span className="placeholder-video">[PLACEHOLDER — Client video 3]</span>
            </div>
            <div className="video-label">Tom M. — Personal Brand</div>
            <div className="video-sub">"Best business decision I made"</div>
          </div>
        </div>
      </div>
    </section>
  );
}