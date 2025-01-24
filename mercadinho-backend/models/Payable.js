const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Supplier = require("./Supplier"); // Relacionamento com Fornecedor

// Modelo de Contas a Pagar
const Payable = sequelize.define("Payable", {
  dueDate: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  amount: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM("Pendente", "Pago"),
    allowNull: false,
    defaultValue: "Pendente",
  },
});

// Relacionamento com Fornecedor
Payable.belongsTo(Supplier, {
  foreignKey: {
    allowNull: false,
  },
});

module.exports = Payable;
