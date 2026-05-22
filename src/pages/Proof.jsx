import ProofHero from '../sections/proof/ProofHero';
import MetricsSection from '../sections/proof/MetricsSection';
import CaseStudiesSection from '../sections/proof/CaseStudiesSection';
import ProofBeforeAfterSection from '../sections/proof/ProofBeforeAfterSection';
import ProofTestimonialsSection from '../sections/proof/ProofTestimonialsSection';
import ProofVideoSection from '../sections/proof/ProofVideoSection';
import ProofCTASection from '../sections/proof/ProofCTASection';

export default function Proof() {
  return (
    <div className="page active">
      <ProofHero />
      <MetricsSection />
      <CaseStudiesSection />
      <ProofBeforeAfterSection />
      <ProofTestimonialsSection />
      <ProofVideoSection />
      <ProofCTASection />
    </div>
  );
}