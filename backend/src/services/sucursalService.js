const Sucursal = require('../models/Sucursal');

class SucursalService {
  async getAll() {
    return await Sucursal.findAll({
      order: [['nombre', 'ASC']],
      where: { activa: true }
    });
  }

  async getById(id) {
    const sucursal = await Sucursal.findByPk(id);
    if (!sucursal) {
      throw new Error('Sucursal no encontrada');
    }
    return sucursal;
  }

  async create(sucursalData) {
    return await Sucursal.create(sucursalData);
  }

  async update(id, sucursalData) {
    const sucursal = await this.getById(id);
    return await sucursal.update(sucursalData);
  }

  async delete(id) {
    const sucursal = await this.getById(id);
    return await sucursal.update({ activa: false });
  }
}

module.exports = new SucursalService();