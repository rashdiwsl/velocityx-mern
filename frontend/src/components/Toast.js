import { useEffect, useState } from 'react';

export function Toast({ message, type = 'success', onClose }) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => { setVisible(false); setTimeout(onClose, 300); }, 3000);
    return () => clearTimeout(t);
  }, [onClose]);

  const colors = {
    success: { border: 'rgba(16,185,129,0.3)', color: '#10b981', bg: 'rgba(16,185,129,0.08)' },
    error:   { border: 'rgba(192,57,43,0.3)',  color: '#e74c3c', bg: 'rgba(192,57,43,0.08)' },
    info:    { border: 'rgba(99,102,241,0.3)', color: '#818cf8', bg: 'rgba(99,102,241,0.08)' },
  }[type];

  return (
    <div style={{
      position: 'fixed', bottom: 28, right: 28, zIndex: 9999,
      background: '#0f0f0f', border: `1px solid ${colors.border}`,
      borderLeft: `3px solid ${colors.color}`,
      borderRadius: 12, padding: '14px 20px',
      display: 'flex', alignItems: 'center', gap: 10,
      boxShadow: '0 8px 32px rgba(0,0,0,0.6)',
      transition: 'all 0.3s ease',
      opacity: visible ? 1 : 0,
      transform: visible ? 'translateY(0)' : 'translateY(12px)',
      minWidth: 260, maxWidth: 360,
    }}>
      <div style={{
        width: 8, height: 8, borderRadius: '50%',
        background: colors.color, flexShrink: 0,
        boxShadow: `0 0 8px ${colors.color}`
      }} />
      <p style={{ color: '#e5e5e5', fontSize: 13, fontWeight: 500, margin: 0 }}>{message}</p>
      <button onClick={() => { setVisible(false); setTimeout(onClose, 300); }}
        style={{ marginLeft: 'auto', background: 'none', border: 'none', color: '#3a3a3a', cursor: 'pointer', fontSize: 16, padding: 0 }}>
        ×
      </button>
    </div>
  );
}

export function useToast() {
  const [toasts, setToasts] = useState([]);
  const show = (message, type = 'success') => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type }]);
  };
  const remove = (id) => setToasts(prev => prev.filter(t => t.id !== id));
  const ToastContainer = () => (
    <div style={{ position: 'fixed', bottom: 28, right: 28, zIndex: 9999, display: 'flex', flexDirection: 'column', gap: 10 }}>
      {toasts.map(t => <Toast key={t.id} message={t.message} type={t.type} onClose={() => remove(t.id)} />)}
    </div>
  );
  return { show, ToastContainer };
}