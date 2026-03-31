import express from "express";
import Car from "../models/Car.js";

const router = express.Router();

let garage = [];

// Add to garage
router.post("/add", async (req, res) => {
  const { carId } = req.body;
  const car = await Car.findById(carId);
  garage.push(car);
  res.json(garage);
});

// Get garage
router.get("/", (req, res) => {
  res.json(garage);
});

// Remove from garage
router.delete("/:id", (req, res) => {
  garage = garage.filter((c) => c._id != req.params.id);
  res.json(garage);
});

export default router;