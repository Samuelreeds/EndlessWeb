import { useState } from 'react';

export default function PricingSlider() {
  const [posts, setPosts] = useState(10);
  const pricePerPost = 15;
  const basePrice = 149; 
  
  const totalPrice = basePrice + (posts * pricePerPost);

  return (
    <section className="reveal" style={{ padding: '64px 24px', background: 'white' }}>
      <div className="container" style={{ maxWidth: '800px', textAlign: 'center' }}>
        <h2 style={{ fontSize: '32px', color: '#0f172a', marginBottom: '16px' }}>Calculate Your Custom Plan</h2>
        <p style={{ color: '#64748b', marginBottom: '48px' }}>Slide to adjust your monthly content volume.</p>
        
        <div style={{ background: '#f8fafc', padding: '48px', borderRadius: '24px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px rgba(0,0,0,0.02)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '24px', fontWeight: 'bold' }}>
            <span>{posts} Posters/Videos</span>
            <span style={{ fontSize: '32px', color: '#2563eb' }}>${totalPrice}<span style={{fontSize:'16px', color:'#64748b'}}>/mo</span></span>
          </div>
          
          <input 
            type="range" 
            min="5" 
            max="50" 
            step="1" 
            value={posts} 
            onChange={(e) => setPosts(Number(e.target.value))}
            style={{ width: '100%', cursor: 'pointer', height: '8px', accentColor: '#2563eb' }}
          />
          
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', color: '#94a3b8', marginTop: '12px' }}>
            <span>Starter (5)</span>
            <span>Enterprise (50)</span>
          </div>

          <button 
            style={{ marginTop: '40px', width: '100%', padding: '16px', background: '#2563eb', color: 'white', borderRadius: '12px', fontWeight: 'bold', border: 'none', cursor: 'pointer' }}
            onClick={() => window.open('https://t.me/yourusername', '_blank')}
          >
            Get Started with {posts} Posts →
          </button>
        </div>
      </div>
    </section>
  );
}