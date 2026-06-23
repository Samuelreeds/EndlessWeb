import { useEffect, useState, useRef } from 'react';

// Sub-component to handle individual video intersection observing
function VideoItem({ video, onVideoClick }) {
  const videoRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          videoRef.current?.play().catch(() => {});
        } else {
          videoRef.current?.pause();
        }
      },
      { threshold: 0.5 }
    );

    if (videoRef.current) {
      observer.observe(videoRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div>
      <div 
        className="video-thumb group" 
        style={{ cursor: 'pointer', position: 'relative', overflow: 'hidden' }}
        onClick={() => onVideoClick(video)}
      >
        <video
          ref={videoRef}
          src={video.videoUrl}
          poster={video.thumbnailUrl}
          muted
          loop
          playsInline
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
        />
        
        {/* Subtle Play Indicator in the bottom right corner */}
        <div style={{ 
          position: 'absolute', 
          bottom: '12px', 
          right: '12px', 
          width: '36px', 
          height: '36px', 
          backgroundColor: 'rgba(0,0,0,0.6)', 
          borderRadius: '50%', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center', 
          zIndex: 2,
          backdropFilter: 'blur(4px)',
          transition: 'transform 0.2s ease'
        }}>
          <svg viewBox="0 0 24 24" fill="white" style={{ width: '16px', height: '16px', marginLeft: '2px' }}>
            <polygon points="5 3 19 12 5 21 5 3"/>
          </svg>
        </div>
      </div>
      <div className="video-label">{video.label}</div>
      <div className="video-sub">{video.subtext}</div>
    </div>
  );
}

export default function VideoTestimonialsSection() {
  const [videos, setVideos] = useState([]);
  const [activeVideo, setActiveVideo] = useState(null);

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
        <div className="section-head reveal">
          <div className="eyebrow">Hear It Directly</div>
          <h2>Real Words. Real Clients.</h2>
          <p>Don't take our word for it — watch what our clients have to say in their own words.</p>
        </div>
        <div className="video-grid">
          {videos.map((video) => (
            <VideoItem key={video.id} video={video} onVideoClick={setActiveVideo} />
          ))}
        </div>
      </div>

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