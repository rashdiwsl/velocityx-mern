import { useNavigate } from 'react-router-dom';
import { addToGarage } from '../api';

function CarCard({ car, index = 0, onWatchlist, onOpenModal }) {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('velocityUser'));

  const fuelColor = {
    Electric: { bg: 'rgba(16,185,129,0.12)', color: '#10b981', border: 'rgba(16,185,129,0.25)' },
    Hybrid:   { bg: 'rgba(59,130,246,0.12)', color: '#3b82f6', border: 'rgba(59,130,246,0.25)' },
    Petrol:   { bg: 'rgba(192,57,43,0.12)',  color: '#e74c3c', border: 'rgba(192,57,43,0.25)' },
    Diesel:   { bg: 'rgba(107,114,128,0.12)',color: '#9ca3af', border: 'rgba(107,114,128,0.25)' },
  }[car.fuelType] || { bg: 'rgba(192,57,43,0.12)', color: '#e74c3c', border: 'rgba(192,57,43,0.25)' };

  const handleWatchlist = async (e) => {
    e.stopPropagation();
    if (!user) {
      onWatchlist('info', 'Please login to add to Watchlist');
      setTimeout(() => navigate('/login'), 1200);
      return;
    }
    try {
      await addToGarage(car._id);
      onWatchlist('success', `${car.brand} ${car.model} added to Watchlist ✓`);
    } catch {
      onWatchlist('error', 'Already in your Watchlist');
    }
  };

  return (
    <div
      onClick={() => onOpenModal(car)}
      className="group relative rounded-2xl overflow-hidden transition-all duration-300 cursor-pointer"
      style={{ background: '#141414', border: '1px solid #1e1e1e' }}
      onMouseEnter={e => e.currentTarget.style.borderColor = '#2a2a2a'}
      onMouseLeave={e => e.currentTarget.style.borderColor = '#1e1e1e'}
    >
      <div className="relative overflow-hidden" style={{ height: 200, background: '#0a0a0a' }}>
        <img src={car.image} alt={car.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          style={{ filter: 'brightness(0.88) saturate(0.9)' }} />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(14,14,14,0.95) 0%, transparent 55%)' }} />

        <div className="absolute top-3 right-3">
          <span className="text-xs font-semibold px-2.5 py-1 rounded-full"
            style={{ background: fuelColor.bg, color: fuelColor.color, border: `1px solid ${fuelColor.border}` }}>
            {car.fuelType}
          </span>
        </div>
        <div className="absolute top-3 left-3">
          <span className="text-xs font-medium px-2.5 py-1 rounded-full"
            style={{ background: 'rgba(0,0,0,0.6)', color: '#9ca3af', border: '1px solid #2a2a2a', backdropFilter: 'blur(4px)' }}>
            {car.transmission}
          </span>
        </div>
        <div className="absolute bottom-3 left-4 right-4 flex items-end justify-between">
          <p className="text-white font-black text-xl" style={{ textShadow: '0 2px 8px rgba(0,0,0,0.9)' }}>
            ${car.price?.toLocaleString()}
          </p>
          <p className="text-xs font-medium" style={{ color: '#6b6b6b' }}>{car.year}</p>
        </div>

        {/* Sold ribbon on card */}
{car.status === 'Sold' && (
  <div style={{
    position: 'absolute', inset: 0,
    background: 'rgba(0,0,0,0.55)',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    borderRadius: '16px 16px 0 0'
  }}>
    <span style={{
      color: '#e74c3c', border: '2px solid #e74c3c',
      borderRadius: 8, padding: '4px 18px',
      fontSize: 13, fontWeight: 900, letterSpacing: 4
    }}>SOLD</span>
  </div>
)}
      </div>

      <div className="p-4">
        <p className="text-xs font-semibold tracking-widest uppercase mb-1" style={{ color: '#c0392b' }}>{car.brand}</p>
        <h3 className="font-bold text-base text-white leading-tight mb-2">{car.title}</h3>
        <div className="flex gap-2 mb-4 flex-wrap">
          {car.mileage > 0 && (
            <span className="text-xs px-2 py-1 rounded-lg" style={{ background: '#0a0a0a', color: '#6b6b6b', border: '1px solid #1e1e1e' }}>
              {car.mileage?.toLocaleString()} km
            </span>
          )}
          <span className="text-xs px-2 py-1 rounded-lg" style={{ background: '#0a0a0a', color: '#6b6b6b', border: '1px solid #1e1e1e' }}>
            {car.model}
          </span>
        </div>

     <button
  onClick={car.status === 'Sold' ? undefined : handleWatchlist}
  style={{
    background: '#0a0a0a',
    border: `1px solid ${car.status === 'Sold' ? '#1e1e1e' : '#2a2a2a'}`,
    color: car.status === 'Sold' ? '#2a2a2a' : '#6b6b6b',
    cursor: car.status === 'Sold' ? 'not-allowed' : 'pointer'
  }}
  className="w-full text-sm font-semibold py-2.5 rounded-xl transition-all duration-200"
>
  {car.status === 'Sold' ? 'Sold' : '+ Watchlist'}
</button>
      </div>
    </div>
  );
}

export default CarCard;