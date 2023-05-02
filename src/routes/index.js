const express = require('express');
const router = express.Router();

// Importar controladores
const userController = require('./userController');
const carController = require('./carController');
const rentController = require('./rentController');

// Rutas
router.use('/users', userController);
router.use('/cars', carController);
router.use('/rents', rentController);

router.get('/', (req, res) => {
  res.redirect('/users/login');
});

router.get('/home', (req, res) => {
  res.render('home');
});

router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });

    if (!user || user.password !== password) {
      return res.status(400).send('El nombre de usuario o la contraseña son incorrectos');
    }

    // Aquí puedes agregar el manejo de sesiones y autenticación (por ejemplo, con Passport.js)

    res.redirect('/home'); // Redirige al usuario a la página principal después de iniciar sesión correctamente
  } catch (err) {
    console.log(err);
    res.redirect('/users/login');
  }
});


module.exports = router;
