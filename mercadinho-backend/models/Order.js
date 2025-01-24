const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Supplier = require("./Supplier");

// Modelo de Pedido
const Order = sequelize.define("Order", {
  orderDate: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
  totalValue: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM("Pendente", "Concluído"),
    allowNull: false,
    defaultValue: "Pendente",
  },
});

// Relacionamento com Fornecedor (cada pedido é para um fornecedor)
Order.belongsTo(Supplier, {
  foreignKey: {
    allowNull: false,
  },
});

module.exports = Order;
