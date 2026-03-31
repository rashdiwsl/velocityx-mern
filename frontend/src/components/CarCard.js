import React from "react";

const CarCard = ({ car }) => {
  return (
    <div className="bg-gray-800 text-white rounded-lg shadow-lg p-4 m-2 w-64 hover:scale-105 transition-transform">
      <img
        src={car.image}
        alt={car.name}
        className="rounded-lg h-40 w-full object-cover mb-2"
      />
      <h2 className="text-xl font-bold">{car.name}</h2>
      <p className="text-gray-300">{car.description}</p>
      <p className="text-red-500 font-semibold mt-2">${car.price}</p>
    </div>
  );
};

export default CarCard;