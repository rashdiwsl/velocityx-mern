import express from "express";
import Car from "../models/Car.js";

const router = express.Router();

// In-memory Garage (for simplicity)
let garage = [];

// Add car to garage
router.post("/add", async (req, res) => {
  const { carId } = req.body;
  const car = await Car.findById(carId);
  if (!car) return res.status(404).json({ message: "Car not found" });
  garage.push(car);
  res.json(garage);
});

// Get garage items
router.get("/", (req, res) => {
  res.json(garage);
});

// Remove car
router.delete("/:carId", (req, res) => {
  garage = garage.filter((c) => c._id !== req.params.carId);
  res.json(garage);
});

export default router;