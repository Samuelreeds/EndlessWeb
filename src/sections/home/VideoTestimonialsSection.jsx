import { useEffect, useState } from 'react';

export default function VideoTestimonialsSection() {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/cms/video-testimonials')
      .then((res) => res.json())
      .then((data) => setVideos(data.slice(0, 3)))
      .catch((err) => console.error('Error fetching videos:', err));
  }, []);

  if (videos.length === 0) return null;

  return (
    <section style={{ background: 'white' }}>
      <div className="container">
        <div className="section-head">
          <div className="eyebrow">Hear It Directly</div>
          <h2>Real Words. Real Clients.</h2>
          <p>Don't take our word for it — watch what our clients have to say in their own words.</p>
        </div>
        <div className="video-grid">
          {videos.map((video) => (
            <div key={video.id}>
              <div className="video-thumb" style={video.thumbnailUrl ? { backgroundImage: `url(${video.thumbnailUrl})`, backgroundSize: 'cover' } : {}}>
                <div className="play-btn">
                  <svg viewBox="0 0 24 24"><polygon points="5 3 19 12 5 21 5 3"/></svg>
                </div>
                {!video.thumbnailUrl && <span className="placeholder-video">[Video: {video.name}]</span>}
              </div>
              <div className="video-label">{video.name} — {video.role}</div>
              <div className="video-sub">{video.quote || 'Watch Video'}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}