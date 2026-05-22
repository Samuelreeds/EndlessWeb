export default function PricingCTA() {
  const openTelegram = () => alert('[PLACEHOLDER] Link this to your Telegram: t.me/yourusername');
  const openEmail = () => alert('[PLACEHOLDER] Link this to: mailto:hello@endless.co');

  return (
    <section className="final-cta">
      <div className="container" style={{ textAlign: 'center' }}>
        <h2>Not Sure Which Plan?</h2>
        <p>Message us and we'll recommend the right fit for your business — no pressure, no pitch.</p>
        <div className="cta-btns">
          <button className="btn-white" onClick={openTelegram}>Chat on Telegram →</button>
          <button className="btn-outline-white" onClick={openEmail}>Send an Email</button>
        </div>
      </div>
    </section>
  );
}