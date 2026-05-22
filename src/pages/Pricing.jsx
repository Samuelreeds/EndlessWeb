import PricingHero from '../sections/pricing/PricingHero';
import PricingPlans from '../sections/pricing/PricingPlans';
import GuaranteeSection from '../sections/pricing/GuaranteeSection';
import FAQSection from '../sections/pricing/FAQSection';
import PricingCTA from '../sections/pricing/PricingCTA';

export default function Pricing() {
  return (
    <div className="page active">
      <PricingHero />
      <PricingPlans />
      <GuaranteeSection />
      <FAQSection />
      <PricingCTA />
    </div>
  );
}