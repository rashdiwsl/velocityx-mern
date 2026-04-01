import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getGarage, removeFromGarage } from '../api';

function GaragePage() {
  const [garage, setGarage] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('velocityUser'));

  useEffect(() => {
    if (!user) { navigate('/login'); return; }
    fetchGarage();
  }, []);

  const fetchGarage = async () => {
    try {
      const { data } = await getGarage();
      setGarage(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleRemove = async (carId) => {
    try {
      await removeFromGarage(carId);
      fetchGarage();
    } catch (err) {
      alert('Error removing car');
    }
  };

  if (loading) return <div className="text-center py-20 text-gray-500">Loading your garage...</div>;

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <div className="mb-10">
        <h1 className="text-4xl font-black mb-2">
          My Garage<span className="text-velocity-red">.</span>
        </h1>
        <p className="text-gray-500">Your personal collection, {user?.name?.split(' ')[0]}.</p>
      </div>

      {!garage?.cars?.length ? (
        <div className="text-center py-20 border border-velocity-border rounded-2xl">
          <p className="text-gray-500 text-lg mb-4">Your garage is empty</p>
          <button onClick={() => navigate('/')}
            className="bg-velocity-red hover:bg-velocity-redHover text-white font-medium px-6 py-3 rounded-xl transition-colors">
            Browse Cars
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {garage.cars.map(car => (
            <div key={car._id} className="bg-velocity-card border border-velocity-border rounded-2xl overflow-hidden hover:border-gray-600 transition-all duration-300 group">
              <div className="h-48 bg-velocity-dark flex items-center justify-center overflow-hidden">
                {car.image
                  ? <img src={car.image} alt={car.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                  : <div className="text-6xl">🚗</div>
                }
              </div>
              <div className="p-5">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-bold text-lg">{car.title}</h3>
                  <span className="text-velocity-red font-bold">${car.price?.toLocaleString()}</span>
                </div>
                <div className="flex gap-2 flex-wrap mb-4">
                  <span className="bg-velocity-dark text-gray-400 text-xs px-2 py-1 rounded-md">{car.brand}</span>
                  <span className="bg-velocity-dark text-gray-400 text-xs px-2 py-1 rounded-md">{car.year}</span>
                  <span className="bg-velocity-dark text-gray-400 text-xs px-2 py-1 rounded-md">{car.fuelType}</span>
                </div>
                <button onClick={() => handleRemove(car._id)}
                  className="w-full border border-red-500/30 hover:border-velocity-red hover:text-velocity-red text-gray-400 text-sm font-medium py-2.5 rounded-xl transition-all duration-200">
                  Remove from Garage
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default GaragePage;