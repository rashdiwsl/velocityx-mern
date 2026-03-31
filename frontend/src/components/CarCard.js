import { addToGarage } from "../services/api";

const CarCard = ({ car }) => {
  return (
    <div className="bg-gray-800 text-white p-4 rounded w-64 m-2">
      <img src={car.image} alt="" className="h-40 w-full object-cover"/>
      <h2>{car.name}</h2>
      <p>${car.price}</p>

      <button
        onClick={() => addToGarage(car._id)}
        className="bg-red-500 px-3 py-1 mt-2"
      >
        Add to Garage
      </button>
    </div>
  );
};

export default CarCard;