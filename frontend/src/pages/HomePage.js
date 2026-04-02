import { useState, useEffect } from 'react';
import { getCars, addCar } from '../api';
import CarCard from '../components/CarCard';
import CarModal from '../components/CarModal';
import { useToast } from '../components/Toast';

const HERO_BG = 'https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?w=1920&q=80';

function HomePage() {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [brand, setBrand] = useState('');
  const [maxPrice, setMaxPrice] = useState(3500000);
  const [sortOrder, setSortOrder] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [selectedCar, setSelectedCar] = useState(null);
  const { show, ToastContainer } = useToast();
  const [form, setForm] = useState({
    title: '', brand: '', model: '', year: '',
    price: '', mileage: '', fuelType: 'Petrol',
    transmission: 'Manual', image: '', description: ''
  });

  const user = JSON.parse(localStorage.getItem('velocityUser'));

  const fetchCars = async () => {
    try {
      setLoading(true);
      const { data } = await getCars({ search, brand });
      let filtered = data.filter(c => c.price <= maxPrice);
      if (sortOrder === 'asc') filtered.sort((a, b) => a.price - b.price);
      else if (sortOrder === 'desc') filtered.sort((a, b) => b.price - a.price);
      setCars(filtered);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchCars(); }, [search, brand, maxPrice, sortOrder]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addCar({ ...form, year: Number(form.year), price: Number(form.price), mileage: Number(form.mileage) });
      setShowForm(false);
      setForm({ title: '', brand: '', model: '', year: '', price: '', mileage: '', fuelType: 'Petrol', transmission: 'Manual', image: '', description: '' });
      fetchCars();
      show('Car listed successfully ✓', 'success');
    } catch (err) {
      show(err.response?.data?.message || 'Error listing car', 'error');
    }
  };

  const inputStyle = { background: '#0a0a0a', border: '1px solid #2a2a2a' };
  const inputClass = "w-full text-sm text-white placeholder-gray-600 rounded-xl px-4 py-3 focus:outline-none";

  const brands = ['All', ...new Set(cars.map(c => c.brand))];

  return (
    <div>
      <ToastContainer />

      {selectedCar && (
        <CarModal
          car={selectedCar}
          onClose={() => setSelectedCar(null)}
          onWatchlist={(type, msg) => show(msg, type)}
          onStatusChange={fetchCars}
        />
      )}

      {/* HERO */}
      <div className="relative flex items-center justify-center overflow-hidden" style={{ height: '65vh', minHeight: 480 }}>
        <img src={HERO_BG} alt="" className="absolute inset-0 w-full h-full object-cover"
          style={{ filter: 'saturate(0.3) brightness(0.35)' }} />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(5,5,5,0.7) 0%, rgba(5,5,5,0.4) 50%, rgba(192,57,43,0.08) 100%)' }} />
        <div className="absolute bottom-0 left-0 right-0 h-32" style={{ background: 'linear-gradient(to bottom, transparent, #050505)' }} />

        <div className="relative z-10 text-center px-6 w-full max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 mb-5 px-4 py-1.5 rounded-full text-xs font-medium tracking-widest uppercase"
            style={{ background: 'rgba(192,57,43,0.1)', border: '1px solid rgba(192,57,43,0.25)', color: '#e74c3c' }}>
            <span className="w-1.5 h-1.5 rounded-full inline-block" style={{ background: '#e74c3c' }} />
            Premium Car Marketplace
          </div>
          <h1 className="font-black tracking-tighter mb-4 leading-none" style={{ fontSize: 'clamp(36px,7vw,68px)' }}>
            Own the Road.<br /><span style={{ color: '#c0392b' }}>Drive Different.</span>
          </h1>
          <p className="text-lg max-w-md mx-auto mb-8" style={{ color: '#6b6b6b' }}>
            Explore elite machines built for speed, style, and dominance.
          </p>

          {/* Search bar in hero */}
          <div className="flex flex-col sm:flex-row gap-3 max-w-xl mx-auto">
            <input type="text" placeholder="Search by name or model..."
              value={search} onChange={e => setSearch(e.target.value)}
              className="flex-1 text-sm text-white placeholder-gray-600 rounded-xl px-5 py-4 focus:outline-none"
              style={{ background: 'rgba(20,20,20,0.9)', border: '1px solid #2a2a2a', backdropFilter: 'blur(10px)' }} />
          </div>
        </div>
      </div>

      {/* MAIN LAYOUT: sidebar + grid */}
      <div className="max-w-7xl mx-auto px-6 py-10" style={{ display: 'flex', gap: 28, alignItems: 'flex-start' }}>

        {/* ── LEFT SIDEBAR ── */}
        <div style={{ width: 240, flexShrink: 0, position: 'sticky', top: 80 }}>

          {/* Filters heading */}
          <p style={{ color: '#3a3a3a', fontSize: 10, fontWeight: 700, letterSpacing: 3, textTransform: 'uppercase', marginBottom: 16 }}>Filters</p>

          {/* Brand filter */}
          <div style={{ marginBottom: 24 }}>
            <p style={{ color: '#6b6b6b', fontSize: 12, fontWeight: 600, marginBottom: 10 }}>Brand</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              {brands.map(b => (
                <button key={b} onClick={() => setBrand(b === 'All' ? '' : b)} style={{
                  textAlign: 'left', background: (brand === b || (b === 'All' && !brand)) ? 'rgba(192,57,43,0.1)' : 'transparent',
                  border: `1px solid ${(brand === b || (b === 'All' && !brand)) ? '#c0392b' : '#1e1e1e'}`,
                  color: (brand === b || (b === 'All' && !brand)) ? '#e74c3c' : '#6b6b6b',
                  borderRadius: 8, padding: '7px 12px', fontSize: 13,
                  cursor: 'pointer', fontWeight: 500, transition: 'all 0.15s'
                }}>{b}</button>
              ))}
            </div>
          </div>

          {/* Price slider */}
          <div style={{ marginBottom: 24 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
              <p style={{ color: '#6b6b6b', fontSize: 12, fontWeight: 600, margin: 0 }}>Max Price</p>
              <p style={{ color: '#c0392b', fontSize: 12, fontWeight: 700, margin: 0 }}>${maxPrice.toLocaleString()}</p>
            </div>
            <input type="range" min="10000" max="3500000" step="5000"
              value={maxPrice} onChange={e => setMaxPrice(Number(e.target.value))}
              style={{ width: '100%', accentColor: '#c0392b' }} />
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 4 }}>
              <span style={{ color: '#2a2a2a', fontSize: 10 }}>$10k</span>
              <span style={{ color: '#2a2a2a', fontSize: 10 }}>$3.5M</span>
            </div>
          </div>

          {/* Sort */}
          <div style={{ marginBottom: 24 }}>
            <p style={{ color: '#6b6b6b', fontSize: 12, fontWeight: 600, marginBottom: 10 }}>Sort by</p>
            {[['', 'Default'], ['asc', 'Price: Low → High'], ['desc', 'Price: High → Low']].map(([val, label]) => (
              <button key={val} onClick={() => setSortOrder(val)} style={{
                display: 'block', width: '100%', textAlign: 'left', marginBottom: 6,
                background: sortOrder === val ? 'rgba(192,57,43,0.1)' : 'transparent',
                border: `1px solid ${sortOrder === val ? '#c0392b' : '#1e1e1e'}`,
                color: sortOrder === val ? '#e74c3c' : '#6b6b6b',
                borderRadius: 8, padding: '7px 12px', fontSize: 13,
                cursor: 'pointer', fontWeight: 500
              }}>{label}</button>
            ))}
          </div>

          {/* Reset */}
          <button onClick={() => { setSearch(''); setBrand(''); setMaxPrice(3500000); setSortOrder(''); }} style={{
            width: '100%', background: 'transparent', border: '1px solid #1e1e1e',
            color: '#3a3a3a', borderRadius: 8, padding: '8px 12px',
            fontSize: 12, cursor: 'pointer', fontWeight: 500
          }}
            onMouseEnter={e => e.target.style.color = '#fff'}
            onMouseLeave={e => e.target.style.color = '#3a3a3a'}
          >Reset filters</button>

          {/* List a car */}
          {user && (
            <button onClick={() => setShowForm(!showForm)} style={{
              width: '100%', background: '#c0392b', color: '#fff',
              border: 'none', borderRadius: 10, padding: '10px 12px',
              fontSize: 13, fontWeight: 700, cursor: 'pointer', marginTop: 16
            }}
              onMouseEnter={e => e.target.style.background = '#e74c3c'}
              onMouseLeave={e => e.target.style.background = '#c0392b'}
            >+ List a Car</button>
          )}
        </div>

        {/* ── RIGHT: GRID ── */}
        <div style={{ flex: 1, minWidth: 0 }}>

          {/* Stats row */}
          <div style={{ display: 'flex', gap: 24, marginBottom: 20, alignItems: 'center' }}>
            <p style={{ color: '#3a3a3a', fontSize: 13 }}>
              <span style={{ color: '#fff', fontWeight: 700 }}>{cars.length}</span> cars found
            </p>
            {brand && (
              <span style={{ background: 'rgba(192,57,43,0.1)', border: '1px solid rgba(192,57,43,0.3)', color: '#e74c3c', borderRadius: 20, padding: '3px 10px', fontSize: 11, fontWeight: 600 }}>
                {brand} ×
              </span>
            )}
          </div>

          {/* Add car form */}
          {showForm && (
            <form onSubmit={handleSubmit}
              className="rounded-2xl p-6 mb-8 grid grid-cols-1 sm:grid-cols-2 gap-4"
              style={{ background: '#0f0f0f', border: '1px solid #1e1e1e' }}>
              <h3 className="col-span-full text-lg font-bold">List Your Car</h3>
              {[['title','Title'],['brand','Brand'],['model','Model'],['year','Year'],['price','Price ($)'],['mileage','Mileage (km)'],['image','Image URL (optional)']].map(([field, label]) => (
                <input key={field}
                  type={['year','price','mileage'].includes(field) ? 'number' : 'text'}
                  placeholder={label} value={form[field]}
                  onChange={e => setForm({...form, [field]: e.target.value})}
                  required={!['image','mileage'].includes(field)}
                  className={inputClass} style={inputStyle} />
              ))}
              <select value={form.fuelType} onChange={e => setForm({...form, fuelType: e.target.value})} className={inputClass} style={inputStyle}>
                {['Petrol','Diesel','Electric','Hybrid'].map(f => <option key={f} style={{background:'#0a0a0a'}}>{f}</option>)}
              </select>
              <select value={form.transmission} onChange={e => setForm({...form, transmission: e.target.value})} className={inputClass} style={inputStyle}>
                {['Manual','Automatic'].map(t => <option key={t} style={{background:'#0a0a0a'}}>{t}</option>)}
              </select>
              <textarea placeholder="Description" value={form.description}
                onChange={e => setForm({...form, description: e.target.value})}
                className="col-span-full text-sm text-white placeholder-gray-600 rounded-xl px-4 py-3 focus:outline-none resize-none h-20"
                style={inputStyle} />
              <div className="col-span-full flex gap-3">
                <button type="submit" style={{ background:'#c0392b', color:'#fff', border:'none', borderRadius:10, padding:'10px 24px', fontSize:13, fontWeight:700, cursor:'pointer' }}>List Car</button>
                <button type="button" onClick={() => setShowForm(false)} style={{ background:'#0a0a0a', border:'1px solid #2a2a2a', color:'#6b6b6b', borderRadius:10, padding:'10px 20px', fontSize:13, cursor:'pointer' }}>Cancel</button>
              </div>
            </form>
          )}

          {/* Car grid */}
          {loading ? (
            <div style={{ textAlign: 'center', padding: '80px 0', color: '#3a3a3a' }}>
              <p style={{ fontSize: 13, letterSpacing: 3, textTransform: 'uppercase' }}>Loading cars...</p>
            </div>
          ) : cars.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '80px 0', border: '1px solid #1e1e1e', borderRadius: 16 }}>
              <p style={{ color: '#6b6b6b', fontSize: 16, marginBottom: 8 }}>No cars match your filters</p>
              <p style={{ color: '#3a3a3a', fontSize: 13 }}>Try adjusting the price range or brand</p>
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 20 }}>
              {cars.map((car, i) => (
                <CarCard
                  key={car._id}
                  car={car}
                  index={i}
                  onWatchlist={(type, msg) => show(msg, type)}
                  onOpenModal={setSelectedCar}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default HomePage;