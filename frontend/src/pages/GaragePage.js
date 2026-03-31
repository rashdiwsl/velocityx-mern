import { useEffect, useState } from "react";
import { getGarage, removeFromGarage } from "../services/api";

const GaragePage = () => {
  const [garage, setGarage] = useState([]);

  const load = () => {
    getGarage().then((res) => setGarage(res.data));
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <div className="bg-gray-900 min-h-screen p-5 text-white">
      <h1 className="text-3xl mb-4">My Garage</h1>

      {garage.length === 0 ? (
        <p>No cars yet</p>
      ) : (
        garage.map((car) => (
          <div key={car._id}>
            {car.name}
            <button onClick={() => {
              removeFromGarage(car._id);
              load();
            }}>
              Remove
            </button>
          </div>
        ))
      )}
    </div>
  );
};

export default GaragePage;