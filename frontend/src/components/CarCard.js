import { addToGarage } from "../services/api";

const CarCard = ({ car }) => {

  const handleAddToGarage = () => {
    const token = localStorage.getItem("token"); // check if user is logged in

    if (!token) {
      alert("Please login first");
      return;
    }

    // if logged in, call addToGarage API
    addToGarage(car._id, token)
      .then(() => {
        alert("Car added to garage!");
      })
      .catch((err) => {
        console.error(err);
        alert("Failed to add car. Try again.");
      });
  };

  return (
    <div className="bg-gray-800 text-white p-4 rounded w-64 m-2">
      <img src={car.image} alt={car.name} className="h-40 w-full object-cover"/>
      <h2>{car.name}</h2>
      <p>${car.price}</p>

      <button
        onClick={handleAddToGarage}
        className="bg-red-500 px-3 py-1 mt-2 hover:bg-red-600 transition"
      >
        Add to Garage
      </button>
    </div>
  );
};

export default CarCard;