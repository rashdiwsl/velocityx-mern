import { useEffect, useState } from "react";
import { getCars } from "../services/api";
import CarCard from "../components/CarCard";

const HomePage = () => {
  const [cars, setCars] = useState([]);

  useEffect(() => {
    getCars().then((res) => setCars(res.data));
  }, []);

  return (
    <div className="bg-gray-900 min-h-screen p-5">
      <h1 className="text-white text-3xl mb-4">VelocityX Garage</h1>

      <div className="flex flex-wrap">
        {cars.map((car) => (
          <CarCard key={car._id} car={car} />
        ))}
      </div>
    </div>
  );
};

export default HomePage;