import { useEffect, useState } from 'react';

export default function VideoTestimonialsSection() {
  const [videos, setVideos] = useState([]);
  const [activeVideo, setActiveVideo] = useState(null); // Added

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
              <div 
                className="video-thumb" 
                style={video.thumbnailUrl ? { backgroundImage: `url(${video.thumbnailUrl})`, backgroundSize: 'cover', cursor: 'pointer' } : { cursor: 'pointer' }}
                onClick={() => setActiveVideo(video)} // Added
              >
                <div className="play-btn">
                  <svg viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"/></svg>
                </div>
              </div>
              <div className="video-label">{video.label}</div> {/* Fixed */}
              <div className="video-sub">{video.subtext}</div> {/* Fixed */}
            </div>
          ))}
        </div>
      </div>

      {/* Added Fullscreen Video Player */}
      {activeVideo && (
        <div 
          style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.85)', zIndex: 9999, display: 'flex', justifyContent: 'center', alignItems: 'center' }}
          onClick={() => setActiveVideo(null)}
        >
          <video 
            src={activeVideo.videoUrl} 
            controls 
            autoPlay 
            style={{ maxWidth: '90%', maxHeight: '90%', borderRadius: '8px', backgroundColor: 'black' }}
            onClick={(e) => e.stopPropagation()} 
          />
        </div>
      )}
    </section>
  );
}