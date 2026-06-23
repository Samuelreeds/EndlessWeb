import { useState } from 'react';

export default function PricingPlans() {
  const [isYearly, setIsYearly] = useState(false);
  const openTelegram = () => window.open('https://t.me/Endless_Digitalmarketing', '_blank');

  const plans = [
    {
      tier: "Starter",
      name: "Option 1",
      priceMonthly: 299,
      priceYearly: 239,
      tagline: "Perfect for personal brands and new businesses.",
      features: ["5 Posters", "2 Videos (up to 60s)"],
      terms: ["Content Schedule included"],
      isPopular: false
    },
    {
      tier: "Growth",
      name: "Option 2",
      priceMonthly: 499,
      priceYearly: 399,
      tagline: "The sweet spot for consistent digital growth.",
      features: ["12 Posters (10 + 2 Free)", "4 Videos (3 + 1 Free)", "Ads Optimization Service"],
      terms: ["Content Schedule included", "Videos up to 60s"],
      isPopular: true
    },
    {
      tier: "Scale",
      name: "Option 3",
      priceMonthly: 999,
      priceYearly: 799,
      tagline: "Aggressive growth for established brands.",
      features: ["26 Posters (20 + 6 Free)", "8 Videos (6 + 2 Free)", "Ads Optimization Service"],
      terms: ["2 KOL 100K+ Views", "Boost Service included", "Caption writing included", "Content Schedule"],
      isPopular: false
    },
    {
      tier: "Enterprise",
      name: "Option 4",
      priceMonthly: 1499,
      priceYearly: 1199,
      tagline: "Dominate your market with premium production.",
      features: ["33 Posters (25 + 8 Free)", "1 Video TVC (KOL)", "9 Videos (8 + 1 Free)", "Ads Optimization Service"],
      terms: ["2 KOL 200K+ Views", "Boost Service included", "Caption writing included", "Content Schedule"],
      isPopular: false
    }
  ];

  return (
    <section className="modern-pricing-section reveal">
      <div className="modern-container">
        
        <div className="pricing-toggle-wrapper">
          <div className="pricing-toggle">
            <button className={`toggle-btn ${!isYearly ? 'active' : ''}`} onClick={() => setIsYearly(false)}>Monthly</button>
            <button className={`toggle-btn ${isYearly ? 'active' : ''}`} onClick={() => setIsYearly(true)}>Yearly <span className="savings-badge">Save 20%</span></button>
          </div>
        </div>

        <div className="modern-pricing-grid">
          {plans.map((plan, idx) => (
            <div className={`modern-plan-card ${plan.isPopular ? 'featured-card' : ''}`} key={idx}>
              {plan.isPopular && <div className="popular-badge">Most Popular</div>}
              
              <div className="card-header">
                <span className="plan-tier">{plan.tier}</span>
                <h3 className="plan-name">{plan.name}</h3>
                <p className="plan-tagline">{plan.tagline}</p>
              </div>

              <div className="card-pricing">
                <span className="currency">$</span>
                <span className="price">{isYearly ? plan.priceYearly : plan.priceMonthly}</span>
                <span className="billing-period">/mo</span>
              </div>
              {isYearly && <div className="billed-yearly">Billed ${plan.priceYearly * 12} yearly</div>}

              <div className="plan-divider"></div>

              <div className="card-body">
                <p className="feature-group-title">What's included:</p>
                <ul className="modern-feature-list">
                  {plan.features.map((feature, i) => (
                    <li key={`f-${i}`}><svg className="check-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>{feature}</li>
                  ))}
                </ul>

                <p className="feature-group-title mt-6">Terms & Add-ons:</p>
                <ul className="modern-feature-list muted">
                  {plan.terms.map((term, i) => (
                    <li key={`t-${i}`}><span className="dot-icon">•</span>{term}</li>
                  ))}
                </ul>
              </div>

              <div className="card-footer">
                <button className={`modern-btn ${plan.isPopular ? 'btn-primary' : 'btn-outline'}`} onClick={openTelegram}>Choose {plan.tier}</button>
              </div>
            </div>
          ))}
        </div>

        <div className="standalone-card reveal">
          <div className="standalone-content">
            <div>
              <span className="plan-tier">Ads Service</span>
              <h3 className="plan-name">Ads Optimization Package</h3>
              <p className="plan-tagline">Dedicated campaign management and reporting.</p>
            </div>
            <div className="standalone-features">
              <ul className="modern-feature-list">
                <li><svg className="check-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12" /></svg> Monthly ads optimization Service</li>
                <li><svg className="check-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12" /></svg> Weekly Reporting and Suggestions</li>
              </ul>
            </div>
            <div className="standalone-pricing">
              <div className="card-pricing">
                <span className="currency">$</span>
                <span className="price">150</span>
                <span className="billing-period">/mo</span>
              </div>
              <p style={{ fontSize: '12px', color: 'var(--grey-500)', marginTop: '8px' }}>*Boost For Fee</p>
              <button className="modern-btn btn-outline" style={{ marginTop: '16px' }} onClick={openTelegram}>Add Service</button>
            </div>
          </div>
        </div>

        <div className="trust-section reveal">
          <p className="trust-title">Trusted by 120+ growing brands across the region</p>
          <div className="trust-stats">
            <div className="stat-item"><strong>98%</strong><span>Client Retention</span></div>
            <div className="stat-item"><strong>24/7</strong><span>Dedicated Support</span></div>
            <div className="stat-item"><strong>60-Day</strong><span>Performance Guarantee</span></div>
          </div>
        </div>

      </div>
    </section>
  );
}