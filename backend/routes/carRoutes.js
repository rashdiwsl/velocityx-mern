const express = require('express');
const router = express.Router();
const Car = require('../models/Car');
const { protect } = require('../middleware/authMiddleware');

router.get('/', async (req, res) => {
  try {
    const { brand, year, search } = req.query;
    let filter = {};
    if (brand) filter.brand = brand;
    if (year) filter.year = year;
    if (search) filter.title = { $regex: search, $options: 'i' };

    const cars = await Car.find(filter).populate('seller', 'name email');
    res.json(cars);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/', protect, async (req, res) => {
  try {
    const car = await Car.create({ ...req.body, seller: req.user._id });
    res.status(201).json(car);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.delete('/:id', protect, async (req, res) => {
  try {
    const car = await Car.findById(req.params.id);
    if (!car) return res.status(404).json({ message: 'Car not found' });
    if (car.seller.toString() !== req.user._id.toString())
      return res.status(401).json({ message: 'Not authorized' });
    await car.deleteOne();
    res.json({ message: 'Car removed' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
router.patch('/:id/status', protect, async (req, res) => {
  try {
    const car = await Car.findById(req.params.id);
    if (!car) return res.status(404).json({ message: 'Car not found' });
    if (car.seller.toString() !== req.user._id.toString())
      return res.status(401).json({ message: 'Not authorized' });
    car.status = req.body.status;
    await car.save();
    res.json(car);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
module.exports = router;