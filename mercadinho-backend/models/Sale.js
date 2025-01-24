const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Client = require("./Client"); // Relacionamento com Cliente
const Product = require("./Product"); // Relacionamento com Produto

// Modelo de Venda
const Sale = sequelize.define("Sale", {
  saleDate: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
  deliveryAddress: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  totalValue: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  paymentType: {
    type: DataTypes.ENUM(
      "Cartão de Crédito",
      "Cartão de Débito",
      "Pix",
      "Loja"
    ),
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM("Paga", "Pendente"),
    allowNull: false,
  },
});

// Definindo o relacionamento entre Venda e Cliente (muitos para um)
Sale.belongsTo(Client, {
  foreignKey: {
    allowNull: false,
  },
});

// Definindo o relacionamento entre Venda e Produto (muitos para muitos)
Sale.belongsToMany(Product, { through: "SaleProduct" });

module.exports = Sale;
