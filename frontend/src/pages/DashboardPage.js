import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCars, deleteCar, updateCarStatus } from '../api';
import { useToast } from '../components/Toast';

function DashboardPage() {
  const [myCars, setMyCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { show, ToastContainer } = useToast();
  const user = JSON.parse(localStorage.getItem('velocityUser'));

  useEffect(() => {
    if (!user) { navigate('/login'); return; }
    fetchMyCars();
  }, []);

  const fetchMyCars = async () => {
    try {
      const { data } = await getCars({});
      setMyCars(data.filter(car => car.seller?._id === user._id));
    } catch { show('Error loading your listings', 'error'); }
    finally { setLoading(false); }
  };

  const handleDelete = async (id, title) => {
    if (!window.confirm(`Remove ${title} from listings?`)) return;
    try {
      await deleteCar(id);
      show(`${title} removed`, 'success');
      fetchMyCars();
    } catch { show('Error removing listing', 'error'); }
  };

  const handleToggle = async (id, currentStatus) => {
    const newStatus = currentStatus === 'Available' ? 'Sold' : 'Available';
    try {
      await updateCarStatus(id, newStatus);
      show(`Marked as ${newStatus}`, 'success');
      fetchMyCars();
    } catch { show('Error updating status', 'error'); }
  };

  const stats = {
    total: myCars.length,
    available: myCars.filter(c => c.status === 'Available').length,
    sold: myCars.filter(c => c.status === 'Sold').length,
    value: myCars.filter(c => c.status === 'Available').reduce((sum, c) => sum + c.price, 0)
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <ToastContainer />

      <div className="mb-10">
        <p style={{ color: '#c0392b', fontSize: 11, fontWeight: 700, letterSpacing: 3, textTransform: 'uppercase', marginBottom: 6 }}>
          Seller Portal
        </p>
        <h1 className="text-4xl font-black tracking-tight mb-1">
          My Dashboard<span style={{ color: '#c0392b' }}>.</span>
        </h1>
        <p style={{ color: '#6b6b6b' }}>Manage your listings, {user?.name?.split(' ')[0]}.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
        {[
          { label: 'Total Listings', value: stats.total, color: '#fff' },
          { label: 'Available', value: stats.available, color: '#10b981' },
          { label: 'Sold', value: stats.sold, color: '#e74c3c' },
          { label: 'Portfolio Value', value: `$${stats.value.toLocaleString()}`, color: '#c0392b' },
        ].map(({ label, value, color }) => (
          <div key={label} style={{ background: '#0f0f0f', border: '1px solid #1e1e1e', borderRadius: 16, padding: '20px 24px' }}>
            <p style={{ color: '#3a3a3a', fontSize: 10, fontWeight: 600, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 8 }}>{label}</p>
            <p style={{ color, fontSize: 28, fontWeight: 900, margin: 0 }}>{value}</p>
          </div>
        ))}
      </div>

      {/* Listings table */}
      {loading ? (
        <p style={{ color: '#3a3a3a', textAlign: 'center', padding: '60px 0' }}>Loading your listings...</p>
      ) : myCars.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '60px 0', border: '1px solid #1e1e1e', borderRadius: 16 }}>
          <p style={{ color: '#6b6b6b', marginBottom: 16 }}>You have no listings yet</p>
          <button onClick={() => navigate('/')} style={{
            background: '#c0392b', color: '#fff', border: 'none',
            borderRadius: 12, padding: '12px 24px', fontWeight: 700, cursor: 'pointer'
          }}>Browse & List a Car</button>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {myCars.map(car => (
            <div key={car._id} style={{
              background: '#0f0f0f', border: '1px solid #1e1e1e',
              borderRadius: 16, padding: '16px 20px',
              display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap'
            }}>
              <img src={car.image} alt={car.title} style={{
                width: 80, height: 56, objectFit: 'cover', borderRadius: 8,
                filter: car.status === 'Sold' ? 'grayscale(1) brightness(0.5)' : 'none'
              }} />

              <div style={{ flex: 1, minWidth: 200 }}>
                <p style={{ color: '#fff', fontWeight: 700, fontSize: 15, margin: '0 0 4px' }}>{car.title}</p>
                <p style={{ color: '#6b6b6b', fontSize: 12, margin: 0 }}>
                  {car.year} · {car.fuelType} · {car.transmission} · {car.mileage?.toLocaleString()} km
                </p>
              </div>

              <p style={{ color: '#c0392b', fontWeight: 900, fontSize: 18, minWidth: 120 }}>
                ${car.price?.toLocaleString()}
              </p>

              {/* Status badge */}
              <span style={{
                padding: '4px 12px', borderRadius: 20, fontSize: 11, fontWeight: 700,
                background: car.status === 'Available' ? 'rgba(16,185,129,0.1)' : 'rgba(192,57,43,0.1)',
                color: car.status === 'Available' ? '#10b981' : '#e74c3c',
                border: `1px solid ${car.status === 'Available' ? 'rgba(16,185,129,0.3)' : 'rgba(192,57,43,0.3)'}`,
              }}>{car.status}</span>

              {/* Actions */}
              <div style={{ display: 'flex', gap: 8 }}>
                <button onClick={() => handleToggle(car._id, car.status)} style={{
                  background: 'transparent', fontSize: 12, fontWeight: 600,
                  border: `1px solid ${car.status === 'Available' ? '#e74c3c' : '#10b981'}`,
                  color: car.status === 'Available' ? '#e74c3c' : '#10b981',
                  borderRadius: 8, padding: '7px 14px', cursor: 'pointer'
                }}>
                  {car.status === 'Available' ? 'Mark Sold' : 'Relist'}
                </button>
                <button onClick={() => handleDelete(car._id, car.title)} style={{
                  background: 'transparent', fontSize: 12, fontWeight: 600,
                  border: '1px solid #2a2a2a', color: '#6b6b6b',
                  borderRadius: 8, padding: '7px 14px', cursor: 'pointer'
                }}
                  onMouseEnter={e => { e.target.style.borderColor='#e74c3c'; e.target.style.color='#e74c3c'; }}
                  onMouseLeave={e => { e.target.style.borderColor='#2a2a2a'; e.target.style.color='#6b6b6b'; }}
                >Remove</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default DashboardPage;