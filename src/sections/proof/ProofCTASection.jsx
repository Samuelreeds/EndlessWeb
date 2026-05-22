export default function ProofCTASection() {
  const openTelegram = () => alert('[PLACEHOLDER] Link this to your Telegram: t.me/yourusername');
  const openEmail = () => alert('[PLACEHOLDER] Link this to: mailto:hello@endless.co');

  return (
    <section className="final-cta">
      <div className="container" style={{ textAlign: 'center' }}>
        <div className="eyebrow light">Your Turn</div>
        <h2>Your Results Could Be Next.</h2>
        <p>Start with a free consultation. No commitment, no pressure — just clarity on what's possible for your brand.</p>
        <div className="cta-btns">
          <button className="btn-white" onClick={openTelegram}>Talk to Us on Telegram →</button>
          <button className="btn-outline-white" onClick={openEmail}>Send Us an Email</button>
        </div>
        <div className="cta-fine">Free consultation · No commitment required</div>
      </div>
    </section>
  );
}