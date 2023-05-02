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


module.exports = router;
