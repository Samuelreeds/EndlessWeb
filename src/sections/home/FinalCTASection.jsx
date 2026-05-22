export default function FinalCTASection() {
  const openTelegram = () => alert('[PLACEHOLDER] Link this to your Telegram: t.me/yourusername');
  const openEmail = () => alert('[PLACEHOLDER] Link this to: mailto:hello@endless.co');

  return (
    <section className="final-cta">
      <div className="container" style={{ textAlign: 'center' }}>
        <div className="eyebrow light">Ready to Start?</div>
        <h2>Ready to Hand Off<br />Your Social Media?</h2>
        <p>Start today and see results within your first 30 days. No contracts. No risk.</p>
        <div className="cta-btns">
          <button className="btn-white" onClick={openTelegram}>
            Message Us on Telegram →
          </button>
          <button className="btn-outline-white" onClick={openEmail}>
            Email Us Instead
          </button>
        </div>
        <div className="cta-fine">No contracts · Month-to-month · Cancel anytime</div>
      </div>
    </section>
  );
}