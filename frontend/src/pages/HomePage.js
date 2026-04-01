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

  const [compareMode, setCompareMode] = useState(false);
  const [compareList, setCompareList] = useState([]);

  const { show, ToastContainer } = useToast();

  const [form, setForm] = useState({
    title: '', brand: '', model: '', year: '',
    price: '', mileage: '',
    fuelType: 'Petrol', transmission: 'Manual',
    image: '', description: ''
  });

  const user = JSON.parse(localStorage.getItem('velocityUser'));

  // ✅ FIXED FETCH FUNCTION
  const fetchCars = async () => {
    try {
      setLoading(true);

      const { data } = await getCars({ search, brand });

      let filtered = data.filter(c => c.price <= maxPrice);

      if (sortOrder === 'asc') {
        filtered.sort((a, b) => a.price - b.price);
      } else if (sortOrder === 'desc') {
        filtered.sort((a, b) => b.price - a.price);
      }

      setCars(filtered);

    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // ✅ dependencies fixed
  useEffect(() => {
    fetchCars();
  }, [search, brand, maxPrice, sortOrder]);

  // ✅ FORM SUBMIT
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await addCar({
        ...form,
        year: Number(form.year),
        price: Number(form.price),
        mileage: Number(form.mileage)
      });

      setShowForm(false);

      setForm({
        title: '', brand: '', model: '',
        year: '', price: '', mileage: '',
        fuelType: 'Petrol', transmission: 'Manual',
        image: '', description: ''
      });

      fetchCars();
      show('Car listed successfully ✓', 'success');

    } catch (err) {
      show(err.response?.data?.message || 'Error listing car', 'error');
    }
  };

  const inputStyle = {
    background: '#0a0a0a',
    border: '1px solid #2a2a2a'
  };

  const inputClass =
    "w-full text-sm text-white placeholder-gray-600 rounded-xl px-4 py-3 focus:outline-none";

  return (
    <div>
      <ToastContainer />

      {selectedCar && (
        <CarModal
          car={selectedCar}
          onClose={() => setSelectedCar(null)}
          onWatchlist={(type, msg) => show(msg, type)}
        />
      )}

      {/* FILTER BAR */}
      <div className="flex flex-wrap items-center gap-4 mb-8 p-4 rounded-2xl"
        style={{ background: '#0f0f0f', border: '1px solid #1e1e1e' }}>

        {/* PRICE */}
        <div style={{ flex: 1, minWidth: 200 }}>
          <div className="flex justify-between mb-1 text-xs">
            <span style={{ color: '#6b6b6b' }}>Max Price</span>
            <span style={{ color: '#c0392b', fontWeight: 700 }}>
              ${maxPrice.toLocaleString()}
            </span>
          </div>

          <input
            type="range"
            min="10000"
            max="3500000"
            step="5000"
            value={maxPrice}
            onChange={e => setMaxPrice(Number(e.target.value))}
            className="w-full"
            style={{ accentColor: '#c0392b' }}
          />
        </div>

        {/* SORT */}
        <select
          value={sortOrder}
          onChange={e => setSortOrder(e.target.value)}
          className="text-sm rounded-xl px-4 py-3"
          style={{ background: '#141414', border: '1px solid #2a2a2a', color: '#fff' }}
        >
          <option value="">Sort: Default</option>
          <option value="asc">Price: Low → High</option>
          <option value="desc">Price: High → Low</option>
        </select>

        {/* COMPARE */}
        <button
          onClick={() => setCompareMode(!compareMode)}
          className="px-4 py-2 rounded-xl text-sm font-semibold"
          style={{
            background: compareMode ? 'rgba(192,57,43,0.15)' : '#141414',
            border: `1px solid ${compareMode ? '#c0392b' : '#2a2a2a'}`,
            color: compareMode ? '#e74c3c' : '#6b6b6b'
          }}
        >
          {compareMode ? `Compare (${compareList.length}/2)` : '⚖ Compare'}
        </button>
      </div>

      {/* HERO */}
      <div className="relative flex items-center justify-center overflow-hidden"
        style={{ height: '70vh' }}>

        <img src={HERO_BG} alt=""
          className="absolute w-full h-full object-cover"
          style={{ filter: 'brightness(0.4)' }} />

        <div className="relative z-10 text-center px-6">
          <h1 className="text-5xl sm:text-7xl font-black">
            Own the Road.<br />
            <span style={{ color: '#c0392b' }}>Drive Different.</span>
          </h1>

          <p className="mt-4 text-gray-400">
            Discover performance, luxury, and power — all in one place.
          </p>
        </div>
      </div>

      {/* GRID */}
      <div className="max-w-7xl mx-auto px-6 py-12">

        {loading ? (
          <p className="text-center text-gray-500">Loading...</p>
        ) : cars.length === 0 ? (
          <p className="text-center text-gray-500">No cars found</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
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
  );
}

export default HomePage;