const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

// Modelo de Cliente
const Client = sequelize.define("Client", {
  cpf: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  address: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  type: {
    type: DataTypes.ENUM("Ouro", "Prata", "Bronze"),
    allowNull: false,
  },
  credit: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
});

module.exports = Client;
