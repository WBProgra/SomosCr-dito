require('dotenv').config();
const express = require('express');
const cors = require('cors');
const sucursalRoutes = require('./routes/sucursalRoutes');
const errorHandler = require('./middlewares/errorHandler');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/sucursales', sucursalRoutes);

// Error handling
app.use(errorHandler);

// Database connection
const db = require('./config/database');
db.authenticate()
  .then(() => {
    console.log('Conexión a la base de datos establecida');
    return db.sync({ alter: true });
  })
  .then(() => console.log('Modelos sincronizados'))
  .catch(err => console.error('Error de conexión:', err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});