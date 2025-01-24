const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Order = require("./Order");
const Product = require("./Product");

// Modelo intermediário para armazenar os produtos de um pedido
const OrderProduct = sequelize.define("OrderProduct", {
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  unitCostPrice: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
});

// Relacionamento entre Pedido e Produto (muitos para muitos)
Order.belongsToMany(Product, { through: OrderProduct });
Product.belongsToMany(Order, { through: OrderProduct });

module.exports = OrderProduct;
