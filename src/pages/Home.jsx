import HeroSection from '../sections/home/HeroSection';
import ServicesSection from '../sections/home/ServicesSection';
import WhySection from '../sections/home/WhySection';
import BeforeAfterSection from '../sections/home/BeforeAfterSection';
import TestimonialsSection from '../sections/home/TestimonialsSection';
import VideoTestimonialsSection from '../sections/home/VideoTestimonialsSection';
import ImageTestimonialsSection from '../sections/home/ImageTestimonialsSection'; 
import FinalCTASection from '../sections/home/FinalCTASection';
import ClientLogos from '../components/ClientLogos';

export default function Home() {
  return (
    <div className="page active">
      <HeroSection />
      <ClientLogos />
      <ServicesSection />
      <WhySection />
      <BeforeAfterSection />
      <TestimonialsSection />
      
      {/* Social Proof Block */}
      <VideoTestimonialsSection />
      <ImageTestimonialsSection /> 

      <FinalCTASection />
    </div>
  );
}