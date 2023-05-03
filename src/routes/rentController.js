const express = require('express');
const Rent = require('../models/Rent');
const User = require('../models/User');
const Car = require('../models/car');
const router = express.Router();

// Acción para mostrar el formulario de registro de alquileres
router.get('/add', (req, res) => {
  res.render('addRent');
});

router.post('/add', async (req, res) => {
  const { rentnumber, username, platenumber, rentdate } = req.body;

  try {
    const user = await User.findOne({ username });
    const car = await Car.findOne({ platenumber });

    if (!user || !car) {
      return res.status(400).send('ya existe');
    }

    const rent = await Rent.findOne({ rentnumber });
    if (rent) {
      return res.status(400).send('El número de alquiler ya existe');
    }

    if (car.state !== 'disponible') {
      return res.status(400).send('El carro no está disponible');
    }

    const newRent = new Rent({ rentnumber, username, platenumber, rentdate });
    await newRent.save();

    // Cambiar estado del carro a "alquilado"
    car.state = 'alquilado';
    await car.save();

    res.redirect('/rents/list');
  } catch (err) {
    console.log(err);
    res.redirect('/rents/add');
  }
});

// Acción para listar alquileres
router.get('/list', async (req, res) => {
  const rents = await Rent.find();
  res.render('listRents', { rents });
});

router.get('*', (req, res) => {
  res.redirect('/rents/list');
});

// Acción para listar alquileres
router.get('/list', async (req, res) => {
  const rents = await Rent.find();
  res.render('listRents', { rents });
});
router.get('*', (req, res) => {
  res.redirect('/rents/list');
});

module.exports = router;
