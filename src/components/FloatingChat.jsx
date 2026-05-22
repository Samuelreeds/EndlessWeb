export default function FloatingChat() {
  const openTelegram = () => window.open('https://t.me/yourusername', '_blank');

  return (
    <button 
      onClick={openTelegram}
      style={{
        position: 'fixed',
        bottom: '30px',
        right: '30px',
        backgroundColor: '#2AABEE', // Official Telegram Blue
        color: 'white',
        width: '60px',
        height: '60px',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0 10px 25px rgba(42, 171, 238, 0.4)',
        cursor: 'pointer',
        zIndex: 1000,
        border: 'none',
        transition: 'transform 0.2s',
        paddingRight: '4px' // Visually centers the plane icon
      }}
      onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
      onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
    >
      <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.665 3.717l-17.73 6.837c-1.21.486-1.203 1.161-.222 1.462l4.552 1.42 10.532-6.645c.498-.303.953-.14.579.192l-8.533 7.701h-.002l.002.001-.314 4.692c.46 0 .663-.211.921-.46l2.211-2.15 4.599 3.397c.848.467 1.457.227 1.668-.785l3.019-14.228c.309-1.239-.473-1.8-1.282-1.434z" />
      </svg>
    </button>
  );
}