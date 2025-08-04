const { DataTypes } = require('sequelize');
const db = require('../config/database');

const Sucursal = db.define('Sucursal', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: {
        msg: 'El nombre es requerido'
      },
      len: {
        args: [3, 100],
        msg: 'El nombre debe tener entre 3 y 100 caracteres'
      }
    }
  },
  direccion: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: {
        msg: 'La dirección es requerida'
      },
      len: {
        args: [5, 255],
        msg: 'La dirección debe tener entre 5 y 255 caracteres'
      }
    }
  },
  telefono: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: {
        msg: 'El teléfono es requerido'
      },
      is: {
        args: /^[0-9\-\+]{8,15}$/,
        msg: 'Formato de teléfono inválido'
      }
    }
  },
  activa: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  },
  createdAt: {
    type: DataTypes.DATE,
    field: 'created_at'
  },
  updatedAt: {
    type: DataTypes.DATE,
    field: 'updated_at'
  }
}, {
  tableName: 'sucursales',
  timestamps: true,
  underscored: true
});

module.exports = Sucursal;