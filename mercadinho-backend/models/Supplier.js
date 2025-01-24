const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

// Modelo de Fornecedor
const Supplier = sequelize.define("Supplier", {
  cnpj: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  companyName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  address: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  maxInstallments: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

module.exports = Supplier;
