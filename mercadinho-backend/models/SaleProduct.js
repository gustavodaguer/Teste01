const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

// Modelo intermediário para armazenar os produtos de uma venda
const SaleProduct = sequelize.define("SaleProduct", {
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  unitPrice: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
});

module.exports = SaleProduct;
