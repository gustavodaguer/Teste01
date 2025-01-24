const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Client = require("./Client"); // Relacionamento com Cliente

// Modelo de Contas a Receber
const Receivable = sequelize.define("Receivable", {
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

// Relacionamento com Cliente
Receivable.belongsTo(Client, {
  foreignKey: {
    allowNull: false,
  },
});

module.exports = Receivable;
