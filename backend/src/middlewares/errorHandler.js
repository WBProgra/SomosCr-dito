function errorHandler(err, req, res, next) {
  console.error(err.stack);

  if (err.name === 'SequelizeValidationError') {
    return res.status(400).json({
      errors: err.errors.map(e => ({
        field: e.path,
        message: e.message
      }))
    });
  }

  if (err.message === 'Sucursal no encontrada') {
    return res.status(404).json({ message: err.message });
  }

  res.status(500).json({ message: 'Error interno del servidor' });
}

module.exports = errorHandler;