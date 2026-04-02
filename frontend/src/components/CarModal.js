import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addToGarage, updateCarStatus } from '../api';
import ImageCarousel from './ImageCarousel';
import CarAI from './CarAI';
import ContactModal from './ContactModal'; // ← ADD THIS

function CarModal({ car, onClose, onWatchlist, onStatusChange }) {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('velocityUser'));
  const isOwner = user && car.seller?._id === user._id;
  const isSold = car.status === 'Sold';
  const [status, setStatus] = useState(car.status || 'Available');
  const [showAI, setShowAI] = useState(false);
  const [showContact, setShowContact] = useState(false); // ← ADD THIS

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    const handler = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handler);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handler);
    };
  }, [onClose]);

  const handleWatchlist = async () => {
    if (!user) { onClose(); navigate('/login'); return; }
    try {
      await addToGarage(car._id);
      onWatchlist('success', `${car.brand} ${car.model} added to Watchlist ✓`);
      setTimeout(() => onClose(), 1500);
    } catch (err) {
      const msg = err.response?.data?.message || '';
      if (msg.toLowerCase().includes('already')) {
        onWatchlist('error', 'Already in your Watchlist');
      } else {
        onWatchlist('error', 'Could not add to Watchlist');
      }
    }
  };

  // ← REPLACE your old handleContact with this
  const handleContact = () => {
    if (!user) { onClose(); navigate('/login'); return; }
    setShowContact(true);
  };

  const handleShare = () => {
    navigator.clipboard.writeText(`${window.location.origin}/?car=${car._id}`);
    onWatchlist('success', 'Link copied to clipboard ✓');
  };

  const handleToggleSold = async () => {
    const newStatus = status === 'Available' ? 'Sold' : 'Available';
    try {
      await updateCarStatus(car._id, newStatus);
      setStatus(newStatus);
      if (onStatusChange) onStatusChange();
      onWatchlist('success', `Marked as ${newStatus} ✓`);
    } catch {
      onWatchlist('error', 'Could not update status');
    }
  };

  const fuelColor = {
    Electric: '#10b981', Hybrid: '#3b82f6',
    Petrol: '#e74c3c', Diesel: '#9ca3af'
  }[car.fuelType] || '#e74c3c';

  const specs = [
    { label: 'Brand',        value: car.brand },
    { label: 'Model',        value: car.model },
    { label: 'Year',         value: car.year },
    { label: 'Fuel',         value: car.fuelType },
    { label: 'Transmission', value: car.transmission },
    { label: 'Mileage',      value: car.mileage ? `${car.mileage.toLocaleString()} km` : 'N/A' },
    { label: 'Seller',       value: car.seller?.name || 'VelocityX' },
    { label: 'Contact',      value: car.sellerContact || 'admin@velocityx.com' },
  ];

  return (
    <>
      <div onClick={onClose} style={{
        position: 'fixed', inset: 0, zIndex: 1000,
        background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(6px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20
      }}>
        <div onClick={e => e.stopPropagation()} style={{
          background: '#0f0f0f', border: '1px solid #1e1e1e',
          borderRadius: 20, width: '100%', maxWidth: 720,
          maxHeight: '90vh', overflowY: 'auto',
          boxShadow: '0 32px 80px rgba(0,0,0,0.8)',
        }}>

          {/* IMAGE CAROUSEL */}
          <div style={{ position: 'relative', height: 300, borderRadius: '20px 20px 0 0', overflow: 'hidden' }}>
            <ImageCarousel
              images={car.images?.length ? car.images : [car.image]}
              alt={car.title}
            />
            <div style={{
              position: 'absolute', inset: 0, pointerEvents: 'none',
              background: 'linear-gradient(to top, rgba(15,15,15,1) 0%, transparent 55%)'
            }} />

            {isSold && (
              <div style={{
                position: 'absolute', inset: 0,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                pointerEvents: 'none'
              }}>
                <div style={{
                  background: 'rgba(0,0,0,0.75)', border: '2px solid #e74c3c',
                  borderRadius: 12, padding: '10px 36px',
                  color: '#e74c3c', fontSize: 30, fontWeight: 900, letterSpacing: 8
                }}>SOLD</div>
              </div>
            )}

            <button onClick={onClose} style={{
              position: 'absolute', top: 14, right: 14, zIndex: 10,
              background: 'rgba(0,0,0,0.65)', border: '1px solid #2a2a2a',
              color: '#fff', borderRadius: 8, width: 36, height: 36,
              cursor: 'pointer', fontSize: 20,
              display: 'flex', alignItems: 'center', justifyContent: 'center'
            }}>×</button>

            <button
              onClick={(e) => { e.stopPropagation(); setShowAI(true); }}
              style={{
                position: 'absolute', top: 14, left: 14, zIndex: 10,
                background: 'rgba(192,57,43,0.2)', border: '1px solid rgba(192,57,43,0.5)',
                color: '#e74c3c', borderRadius: 8, padding: '7px 14px',
                fontSize: 12, fontWeight: 700, cursor: 'pointer', backdropFilter: 'blur(4px)'
              }}>🤖 Ask AI</button>

            <span style={{
              position: 'absolute', top: 56, left: 14, zIndex: 10,
              background: status === 'Available' ? 'rgba(16,185,129,0.15)' : 'rgba(192,57,43,0.15)',
              border: `1px solid ${status === 'Available' ? 'rgba(16,185,129,0.4)' : 'rgba(192,57,43,0.4)'}`,
              color: status === 'Available' ? '#10b981' : '#e74c3c',
              borderRadius: 20, padding: '4px 12px', fontSize: 11, fontWeight: 700,
              display: 'flex', alignItems: 'center', gap: 6
            }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: status === 'Available' ? '#10b981' : '#e74c3c' }} />
              {status}
            </span>

            <span style={{
              position: 'absolute', bottom: 64, left: 20, zIndex: 10,
              background: 'rgba(0,0,0,0.55)', border: `1px solid ${fuelColor}50`,
              color: fuelColor, borderRadius: 20, padding: '4px 12px',
              fontSize: 11, fontWeight: 600, backdropFilter: 'blur(4px)'
            }}>{car.fuelType}</span>

            <div style={{ position: 'absolute', bottom: 20, left: 24, zIndex: 10 }}>
              <p style={{ color: '#c0392b', fontSize: 11, fontWeight: 700, letterSpacing: 3, textTransform: 'uppercase', marginBottom: 4 }}>
                {car.brand}
              </p>
              <h2 style={{ color: '#fff', fontSize: 26, fontWeight: 900, margin: 0, letterSpacing: '-0.5px' }}>
                {car.title}
              </h2>
            </div>
          </div>

          {/* CONTENT */}
          <div style={{ padding: '24px 28px 28px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24, flexWrap: 'wrap', gap: 12 }}>
              <div>
                <p style={{ color: '#3a3a3a', fontSize: 11, marginBottom: 4 }}>Asking Price</p>
                <p style={{
                  color: isSold ? '#3a3a3a' : '#fff', fontSize: 32, fontWeight: 900,
                  margin: 0, letterSpacing: '-1px',
                  textDecoration: isSold ? 'line-through' : 'none'
                }}>
                  ${car.price?.toLocaleString()}
                </p>
                {isSold && <p style={{ color: '#e74c3c', fontSize: 12, marginTop: 6 }}>This car has been sold</p>}
              </div>

              <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                <button onClick={handleShare} style={{
                  background: 'transparent', border: '1px solid #2a2a2a',
                  color: '#6b6b6b', borderRadius: 12, padding: '12px 16px',
                  fontSize: 13, cursor: 'pointer'
                }}
                  onMouseEnter={e => { e.target.style.borderColor='#fff'; e.target.style.color='#fff'; }}
                  onMouseLeave={e => { e.target.style.borderColor='#2a2a2a'; e.target.style.color='#6b6b6b'; }}
                >🔗 Share</button>

                {isOwner && (
                  <button onClick={handleToggleSold} style={{
                    background: 'transparent',
                    border: `1px solid ${status === 'Available' ? '#e74c3c' : '#10b981'}`,
                    color: status === 'Available' ? '#e74c3c' : '#10b981',
                    borderRadius: 12, padding: '12px 20px',
                    fontSize: 13, fontWeight: 600, cursor: 'pointer'
                  }}>
                    {status === 'Available' ? 'Mark as Sold' : 'Mark as Available'}
                  </button>
                )}

                {!isSold && !isOwner && (
                  <button onClick={handleWatchlist} style={{
                    background: 'transparent', color: '#9ca3af',
                    border: '1px solid #2a2a2a', borderRadius: 12,
                    padding: '12px 20px', fontSize: 13, fontWeight: 600, cursor: 'pointer'
                  }}
                    onMouseEnter={e => { e.target.style.borderColor='#c0392b'; e.target.style.color='#e74c3c'; }}
                    onMouseLeave={e => { e.target.style.borderColor='#2a2a2a'; e.target.style.color='#9ca3af'; }}
                  >+ Watchlist</button>
                )}

                {/* ← onClick now calls handleContact */}
                {!isSold && !isOwner && (
                  <button onClick={handleContact} style={{
                    background: '#c0392b', color: '#fff', border: 'none',
                    borderRadius: 12, padding: '12px 24px',
                    fontSize: 14, fontWeight: 700, cursor: 'pointer'
                  }}
                    onMouseEnter={e => e.target.style.background = '#e74c3c'}
                    onMouseLeave={e => e.target.style.background = '#c0392b'}
                  >Contact Seller</button>
                )}
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', gap: 10, marginBottom: 20 }}>
              {specs.map(({ label, value }) => (
                <div key={label} style={{ background: '#141414', border: '1px solid #1e1e1e', borderRadius: 10, padding: '10px 14px' }}>
                  <p style={{ color: '#3a3a3a', fontSize: 10, fontWeight: 600, letterSpacing: 2, textTransform: 'uppercase', margin: '0 0 4px' }}>{label}</p>
                  <p style={{ color: '#e5e5e5', fontSize: 13, fontWeight: 600, margin: 0, wordBreak: 'break-all' }}>{value}</p>
                </div>
              ))}
            </div>

            {car.description && (
              <div style={{ background: '#141414', border: '1px solid #1e1e1e', borderRadius: 12, padding: '16px 18px' }}>
                <p style={{ color: '#3a3a3a', fontSize: 10, fontWeight: 600, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 8 }}>About this car</p>
                <p style={{ color: '#9ca3af', fontSize: 13, lineHeight: 1.7, margin: 0 }}>{car.description}</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Modals outside so z-index works */}
      {showAI && <CarAI car={car} onClose={() => setShowAI(false)} />}
      {showContact && (        // ← ADD THIS
        <ContactModal
          car={car}
          user={user}
          onClose={() => setShowContact(false)}
          onToast={onWatchlist}
        />
      )}
    </>
  );
}

export default CarModal;