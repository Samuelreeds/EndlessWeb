import { useState } from 'react';

const faqs = [
  { q: "Is there a contract or minimum commitment?", a: "No contracts. All plans are month-to-month. You can upgrade, downgrade, or cancel at any time — with no penalties or fees." },
  { q: "What platforms do you manage?", a: "We manage Instagram, Facebook, TikTok, and LinkedIn. Platform availability depends on your selected plan." },
  { q: "Who creates the content?", a: "Our in-house team writes all captions and designs all graphics. You review and approve before anything goes live — full control, zero effort." },
  { q: "What does \"ad spend not included\" mean?", a: "Endless manages your campaigns, targeting, and creative. The budget you spend on the platform (e.g. Meta Ads) is paid directly by you. We handle all strategy and execution — you control the spend." },
  { q: "How quickly can we start?", a: "Onboarding takes 3–5 business days. Most clients see their first posts live within one week of signing up." },
  { q: "Can I upgrade my plan later?", a: "Absolutely. You can move to a higher plan at any time. We'll prorate the difference and adjust your deliverables immediately." }
];

function FAQItem({ q, a }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className={`faq-item ${isOpen ? 'open' : ''}`}>
      <div className="faq-q" onClick={() => setIsOpen(!isOpen)}>
        {q}
        <svg viewBox="0 0 24 24" fill="none" strokeWidth="2">
          <line x1="12" y1="5" x2="12" y2="19" />
          <line x1="5" y1="12" x2="19" y2="12" />
        </svg>
      </div>
      <div className="faq-a">{a}</div>
    </div>
  );
}

export default function FAQSection() {
  return (
    <section className="faq-section">
      <div className="container">
        <div className="section-head">
          <div className="eyebrow">FAQ</div>
          <h2>Questions? Answered.</h2>
        </div>
        <div className="faq-list">
          {faqs.map((faq, index) => (
            <FAQItem key={index} q={faq.q} a={faq.a} />
          ))}
        </div>
      </div>
    </section>
  );
}