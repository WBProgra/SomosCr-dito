const { body } = require('express-validator');

const validateSucursal = [
  body('nombre')
    .trim()
    .notEmpty().withMessage('El nombre es requerido')
    .isLength({ min: 3, max: 100 }).withMessage('El nombre debe tener entre 3 y 100 caracteres'),
  
  body('direccion')
    .trim()
    .notEmpty().withMessage('La dirección es requerida')
    .isLength({ min: 5, max: 255 }).withMessage('La dirección debe tener entre 5 y 255 caracteres'),
  
  body('telefono')
    .trim()
    .notEmpty().withMessage('El teléfono es requerido')
    .matches(/^[0-9\-\+]{8,15}$/).withMessage('Formato de teléfono inválido')
];

module.exports = {
  validateSucursal
};