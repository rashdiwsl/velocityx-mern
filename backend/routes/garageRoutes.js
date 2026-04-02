const express = require('express');
const router = express.Router();
const Garage = require('../models/Garage');
const { protect } = require('../middleware/authMiddleware');

router.get('/', protect, async (req, res) => {
  try {
    let garage = await Garage.findOne({ user: req.user._id }).populate('cars');
    if (!garage) garage = await Garage.create({ user: req.user._id, cars: [] });
    res.json(garage);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/add/:carId', protect, async (req, res) => {
  try {
    let garage = await Garage.findOne({ user: req.user._id });
    if (!garage) garage = await Garage.create({ user: req.user._id, cars: [] });

    const alreadyIn = garage.cars.map(id => id.toString()).includes(req.params.carId);
    if (alreadyIn) {
      return res.status(400).json({ message: 'Already in your Watchlist' });
    }

    garage.cars.push(req.params.carId);
    await garage.save();
    res.json(garage);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.delete('/remove/:carId', protect, async (req, res) => {
  try {
    const garage = await Garage.findOne({ user: req.user._id });
    garage.cars = garage.cars.filter(id => id.toString() !== req.params.carId);
    await garage.save();
    res.json(garage);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;