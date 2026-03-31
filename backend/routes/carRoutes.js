import express from "express";
import Car from "../models/Car.js";

const router = express.Router();

// Add car
router.post("/", async (req, res) => {
  const car = new Car(req.body);
  await car.save();
  res.json(car);
});

// Get all cars
router.get("/", async (req, res) => {
  const cars = await Car.find();
  res.json(cars);
});

export default router;