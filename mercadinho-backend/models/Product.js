const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Supplier = require("./Supplier"); // Relacionamento com Fornecedor

// Modelo de Produto (Estoque)
const Product = sequelize.define("Product", {
  barcode: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  unitOfMeasure: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  stockQuantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  costPrice: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  salePrice: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  promotionPrice: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: true, // Campo opcional, apenas se o produto estiver em promoção
  },
  minQuantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  maxQuantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

// Definindo o relacionamento entre Produto e Fornecedor (muitos para um)
Product.belongsTo(Supplier, {
  foreignKey: {
    allowNull: false,
  },
});

module.exports = Product;
