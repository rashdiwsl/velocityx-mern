import React, { useEffect, useState } from "react";
import axios from "axios";

const GaragePage = () => {
  const [garage, setGarage] = useState([]);

  const fetchGarage = async () => {
    const res = await axios.get("http://localhost:5000/api/garage");
    setGarage(res.data);
  };

  const removeCar = async (id) => {
    await axios.delete(`http://localhost:5000/api/garage/${id}`);
    fetchGarage();
  };

  useEffect(() => {
    fetchGarage();
  }, []);

  return (
    <div className="bg-gray-900 min-h-screen p-8 text-white">
      <h1 className="text-3xl font-bold mb-6">My Garage</h1>
      <div className="flex flex-wrap">
        {garage.map((car) => (
          <div
            key={car._id}
            className="bg-gray-800 p-4 m-2 rounded-lg shadow-lg w-64"
          >
            <img
              src={car.image}
              alt={car.name}
              className="h-40 w-full object-cover rounded mb-2"
            />
            <h2 className="text-xl font-bold">{car.name}</h2>
            <p className="text-red-500 font-semibold">${car.price}</p>
            <button
              onClick={() => removeCar(car._id)}
              className="mt-2 bg-red-500 px-4 py-1 rounded hover:bg-red-600"
            >
              Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GaragePage;