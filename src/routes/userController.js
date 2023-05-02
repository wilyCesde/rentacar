const express = require('express');
const User = require('../models/User');
const router = express.Router();

// Ruta para la página de inicio de sesión
router.get('/login', (req, res) => {
  res.render('login');
});

// Ruta para la acción de inicio de sesión
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });

    if (!user || user.password !== password) {
      return res.status(400).send('El nombre de usuario o la contraseña son incorrectos');
    }

    // Aquí puedes agregar el manejo de sesiones y autenticación (por ejemplo, con Passport.js)

    res.redirect('/home'); // Redirige al usuario a la página de los carros después de iniciar sesión correctamente
  } catch (err) {
    console.log(err);
    res.redirect('/users/login');
  }
});


// Ruta para la página de registro de usuarios
router.get('/register', (req, res) => {
  res.render('register');
});

// Ruta para la acción de registro de usuarios
router.post('/register', async (req, res) => {
  const { username, name, password } = req.body;

  try {
    const newUser = new User({ username, name, password });
    await newUser.save();
    res.redirect('/users/login');
  } catch (err) {
    console.log(err);
    res.redirect('/users/register');
  }
});

module.exports = router;
