const express = require('express');
const User = require('../models/User');
const router = express.Router();

// Ruta para la página de registro de usuarios
router.get('/register', (req, res) => {
  res.render('register');
});

// Ruta para la acción de registro de usuarios
router.post('/register', async (req, res) => {
  const { username, name, password } = req.body;

  // Validar el nombre de usuario
  if (!/^[a-zA-Z0-9]+$/.test(username)) {
    return res.status(400).send('El nombre de usuario solo puede contener letras y números');
  }

  // Verificar que el nombre de usuario no existe ya en la base de datos
  const existingUser = await User.findOne({ username });
  if (existingUser) {
    return res.status(400).send('El nombre de usuario ya está en uso');
  }

  // Validar el nombre
  if (!/^[a-zA-Z ]+$/.test(name)) {
    return res.status(400).send('El nombre solo puede contener letras y espacios');
  }

  // Validar la contraseña
  if (!/^(?=.*[a-zA-Z])(?=.*\d).{6,}$/.test(password)) {
    return res.status(400).send('La contraseña debe contener al menos una letra y un número, y tener una longitud mínima de 6 caracteres');
  }

  try {
    const newUser = new User({ username, name, password });
    await newUser.save();
    res.redirect('/users/login');
  } catch (err) {
    console.log(err);
    res.redirect('/users/register');
  }
});


router.get('/login', (req, res) => {
  res.render('login', { errorMessage: null });
});

router.post('/login', async (req, res) => {
  try {
 
    const { username, password } = req.body;
    if (username !== 'usuario' || password !== 'contraseña') {
      throw new Error('usuario o contraseña incorrectas');
    }
    res.render('');
  } catch (error) {
    console.error(error);
    res.render('login', { errorMessage: error.message });
  }
});

module.exports = router;
