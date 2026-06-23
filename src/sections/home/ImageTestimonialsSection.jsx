import { useEffect, useState } from 'react';

export default function ImageTestimonialsSection() {
  const [galleries, setGalleries] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // ADDED: This will use your Render URL in production, and localhost on your PC
  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

  useEffect(() => {
    // UPDATED: Using the dynamic API_URL
    fetch(`${API_URL}/cms/image-testimonials`)
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
          setGalleries(data);
        } else {
          setGalleries([]);
        }
      })
      .catch(err => console.error('Error fetching galleries on frontend:', err))
      .finally(() => setIsLoading(false));
  }, []);

  if (isLoading) {
    return <div className="py-24 text-center text-[#64748B]">Loading Behind The Scenes...</div>;
  }

  if (galleries.length === 0) {
    // If no data, don't show the section at all
    return null; 
  }

  return (
    <section className="py-24 bg-[#F8FAFC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="text-sm font-bold tracking-widest text-[#2563EB] uppercase mb-3">Behind The Scenes</div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#0A1628] mb-6">Our Work In Action</h2>
          <p className="text-lg text-[#64748B]">Real moments and results from our client partnerships.</p>
        </div>

        <div className="space-y-12">
          {galleries.map((client) => (
            <div key={client.id} className="bg-white p-6 rounded-3xl border border-[#E2E8F0] shadow-sm">
              <h3 className="text-xl font-bold text-[#0A1628] mb-6 px-2">{client.clientName}</h3>
              
              {/* Horizontal Scrolling Container */}
              <div className="flex overflow-x-auto gap-4 pb-4 snap-x snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                {client.images && client.images.map((imgUrl, idx) => (
                  <div 
                    key={idx} 
                    className="flex-none w-[85%] sm:w-[45%] md:w-[30%] lg:w-[23.5%] aspect-[4/5] snap-center rounded-2xl overflow-hidden bg-[#F1F5F9] relative group"
                  >
                    <img 
                      src={imgUrl} 
                      alt={`${client.clientName} image ${idx + 1}`} 
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-105" 
                      loading="lazy" 
                    />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}