import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function ContactModal({ car, user, onClose, onToast }) {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: '',
    subject: `Enquiry about ${car.title}`,
    message: `Hi,\n\nI'm interested in your ${car.year} ${car.title} listed on VelocityX for $${car.price?.toLocaleString()}.\n\nPlease let me know if it's still available.\n\nThanks,\n${user?.name || ''}`,
  });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);      // ← controls splash screen

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSend = async () => {
  if (!form.name || !form.email || !form.message) {
    onToast('error', 'Please fill in all required fields');
    return;
  }
  setSending(true);
  try {
    // If you have a backend endpoint, call it here:
    // await axios.post('/api/contact', { carId: car._id, sellerId: car.seller?._id, ...form });
    
    // For now — simulate a send delay, then show splash
    await new Promise((res) => setTimeout(res, 800));
    
    setSent(true); // ← show splash screen
    setTimeout(() => {
      onClose();
      navigate('/');
    }, 2500);
  } catch {
    onToast('error', 'Could not send message');
    setSending(false);
  }
};

  const inputStyle = {
    width: '100%', background: '#141414', border: '1px solid #2a2a2a',
    borderRadius: 10, color: '#e5e5e5', padding: '10px 14px',
    fontSize: 13, boxSizing: 'border-box', outline: 'none', fontFamily: 'inherit',
  };

  const labelStyle = {
    display: 'block', color: '#4a4a4a', fontSize: 10, fontWeight: 600,
    letterSpacing: 2, textTransform: 'uppercase', marginBottom: 6,
  };

  // ── SUCCESS SPLASH ──────────────────────────────────────────────
  if (sent) {
    return (
      <div style={{
        position: 'fixed', inset: 0, zIndex: 1100,
        background: 'rgba(0,0,0,0.95)', backdropFilter: 'blur(8px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        flexDirection: 'column', gap: 20,
        animation: 'fadeIn 0.4s ease',
      }}>
        <style>{`
          @keyframes fadeIn { from { opacity: 0; transform: scale(0.95); } to { opacity: 1; transform: scale(1); } }
          @keyframes checkPop { 0% { transform: scale(0); opacity: 0; } 70% { transform: scale(1.2); } 100% { transform: scale(1); opacity: 1; } }
          @keyframes fillBar { from { width: 0%; } to { width: 100%; } }
        `}</style>

        {/* Check circle */}
        <div style={{
          width: 90, height: 90, borderRadius: '50%',
          background: 'rgba(16,185,129,0.1)', border: '2px solid #10b981',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          animation: 'checkPop 0.5s ease forwards',
        }}>
          <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
            <path d="M8 20 L16 28 L32 12" stroke="#10b981" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>

        {/* Text */}
        <div style={{ textAlign: 'center' }}>
          <h2 style={{ color: '#fff', fontSize: 24, fontWeight: 900, margin: '0 0 8px', letterSpacing: '-0.5px' }}>
            Message Sent!
          </h2>
          <p style={{ color: '#6b6b6b', fontSize: 14, margin: '0 0 4px' }}>
            Your enquiry has been sent to the seller.
          </p>
          <p style={{ color: '#3a3a3a', fontSize: 12, margin: 0 }}>
            {car.title}
          </p>
        </div>

        {/* Progress bar */}
        <div style={{
          width: 220, height: 3, background: '#1e1e1e', borderRadius: 999, overflow: 'hidden', marginTop: 8,
        }}>
          <div style={{
            height: '100%', background: '#10b981', borderRadius: 999,
            animation: 'fillBar 2.5s linear forwards',
          }} />
        </div>

        <p style={{ color: '#3a3a3a', fontSize: 11, letterSpacing: 1 }}>Redirecting to home…</p>
      </div>
    );
  }
  // ───────────────────────────────────────────────────────────────

  return (
    <div onClick={onClose} style={{
      position: 'fixed', inset: 0, zIndex: 1100,
      background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(6px)',
      display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20,
    }}>
      <div onClick={(e) => e.stopPropagation()} style={{
        background: '#0f0f0f', border: '1px solid #1e1e1e',
        borderRadius: 20, width: '100%', maxWidth: 480,
        maxHeight: '90vh', overflowY: 'auto',
        boxShadow: '0 32px 80px rgba(0,0,0,0.8)',
      }}>

        {/* Header */}
        <div style={{ position: 'relative', background: '#141414', borderBottom: '1px solid #1e1e1e', padding: '20px 24px' }}>
          <p style={{ color: '#c0392b', fontSize: 11, fontWeight: 700, letterSpacing: 3, textTransform: 'uppercase', margin: '0 0 4px' }}>VelocityX</p>
          <h2 style={{ color: '#fff', fontSize: 18, fontWeight: 700, margin: 0 }}>Contact Seller</h2>
          <p style={{ color: '#4a4a4a', fontSize: 12, margin: '4px 0 0' }}>{car.title} · ${car.price?.toLocaleString()}</p>
          <button onClick={onClose} style={{
            position: 'absolute', top: 16, right: 16,
            background: 'rgba(255,255,255,0.07)', border: '1px solid #2a2a2a',
            color: '#888', borderRadius: 8, width: 32, height: 32,
            cursor: 'pointer', fontSize: 18, display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>×</button>
        </div>

        {/* Form */}
        <div style={{ padding: 24 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 14 }}>
            <div>
              <label style={labelStyle}>Your Name *</label>
              <input name="name" value={form.name} onChange={handleChange} style={inputStyle} />
            </div>
            <div>
              <label style={labelStyle}>Your Email *</label>
              <input name="email" type="email" value={form.email} onChange={handleChange} style={inputStyle} />
            </div>
          </div>

          <div style={{ marginBottom: 14 }}>
            <label style={labelStyle}>Subject</label>
            <input name="subject" value={form.subject} onChange={handleChange} style={inputStyle} />
          </div>

          <div style={{ marginBottom: 14 }}>
            <label style={labelStyle}>Phone (optional)</label>
            <input name="phone" type="tel" value={form.phone} onChange={handleChange} placeholder="+1 555 000 0000" style={inputStyle} />
          </div>

          <div style={{ marginBottom: 20 }}>
            <label style={labelStyle}>Message *</label>
            <textarea name="message" value={form.message} onChange={handleChange} rows={5}
              style={{ ...inputStyle, resize: 'vertical' }} />
          </div>

          <div style={{ display: 'flex', gap: 10 }}>
            <button onClick={onClose} style={{
              flex: 1, background: 'transparent', border: '1px solid #2a2a2a',
              color: '#6b6b6b', borderRadius: 12, padding: 13, fontSize: 13, cursor: 'pointer',
            }}>Cancel</button>
            <button onClick={handleSend} disabled={sending} style={{
              flex: 2, background: '#c0392b', border: 'none', color: '#fff',
              borderRadius: 12, padding: 13, fontSize: 14, fontWeight: 700, cursor: 'pointer',
              opacity: sending ? 0.6 : 1,
            }}>
              {sending ? 'Sending…' : 'Send Message'}
            </button>
          </div>

          <p style={{ color: '#2e2e2e', fontSize: 11, textAlign: 'center', margin: '14px 0 0' }}>
            Message sent to seller · Not shared publicly
          </p>
        </div>
      </div>
    </div>
  );
}

export default ContactModal;