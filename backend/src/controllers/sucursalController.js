const sucursalService = require('../services/sucursalService');
const { validateSucursal } = require('../validations/sucursalValidation');

const sucursalController = {
  getAll: async (req, res, next) => {
    try {
      const sucursales = await sucursalService.getAll();
      res.json(sucursales);
    } catch (error) {
      next(error);
    }
  },

  getById: async (req, res, next) => {
    try {
      const sucursal = await sucursalService.getById(req.params.id);
      res.json(sucursal);
    } catch (error) {
      next(error);
    }
  },

  create: [
    ...validateSucursal,
    async (req, res, next) => {
      try {
        const nuevaSucursal = await sucursalService.create(req.body);
        res.status(201).json(nuevaSucursal);
      } catch (error) {
        next(error);
      }
    }
  ],

  update: [
    ...validateSucursal,
    async (req, res, next) => {
      try {
        const sucursalActualizada = await sucursalService.update(req.params.id, req.body);
        res.json(sucursalActualizada);
      } catch (error) {
        next(error);
      }
    }
  ],

  delete: async (req, res, next) => {
    try {
      await sucursalService.delete(req.params.id);
      res.status(204).end();
    } catch (error) {
      next(error);
    }
  }
};

module.exports = sucursalController;