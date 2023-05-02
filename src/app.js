const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(morgan('tiny'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  res.setHeader(
    'Content-Security-Policy',
    "default-src 'self'; font-src 'self' data:; img-src 'self' data:; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://code.jquery.com https://cdn.jsdelivr.net/npm/@popperjs/core@2.9.3 https://maxcdn.bootstrapcdn.com; style-src 'self' 'unsafe-inline' https://maxcdn.bootstrapcdn.com"
  );
  next();
});

// Configuración de EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Importación y uso de rutas
const routes = require('./routes');
app.use('/', routes);

// Conexión a la base de datos
mongoose.connect('mongodb://localhost:27017/rentacardb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Inicio del servidor
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
