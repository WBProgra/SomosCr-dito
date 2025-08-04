const express = require('express');
const router = express.Router();
const sucursalController = require('../controllers/sucursalController');

router.get('/', sucursalController.getAll);
router.get('/:id', sucursalController.getById);
router.post('/', sucursalController.create);
router.put('/:id', sucursalController.update);
router.delete('/:id', sucursalController.delete);

module.exports = router;