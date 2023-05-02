const express = require('express');
const Car = require('../models/car');
const router = express.Router();

// Acción para mostrar el formulario de registro de autos
router.get('/add', (req, res) => {
  res.render('addCar');
});

// Acción para guardar un auto
router.post('/add', async (req, res) => {
  const { platenumber, brand, state } = req.body;

  try {
    const newCar = new Car({ platenumber, brand, state });
    await newCar.save();
    res.redirect('/cars/list');
  } catch (err) {
    console.log(err);
    res.redirect('/cars/add');
  }
});
// Acción para listar autos
router.get('/list', async (req, res) => {
  const cars = await Car.find();
  res.render('listCars', { cars });
});

router.get('*', (req, res) => {
  res.redirect('/cars/list');
});

module.exports = router;
