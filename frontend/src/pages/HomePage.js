import React, { useEffect, useState } from "react";
import { getCars } from "../services/api";
import CarCard from "../components/CarCard";

const HomePage = () => {
  const [cars, setCars] = useState([]);

  useEffect(() => {
    const fetchCars = async () => {
      const data = await getCars();
      setCars(data);
    };
    fetchCars();
  }, []);

  return (
    <div className="bg-gray-900 min-h-screen p-8">
      <h1 className="text-4xl text-white font-bold mb-8">VelocityX Garage</h1>
      <div className="flex flex-wrap">
        {cars.map((car) => (
          <CarCard key={car._id} car={car} />
        ))}
      </div>
    </div>
  );
};

export default HomePage;