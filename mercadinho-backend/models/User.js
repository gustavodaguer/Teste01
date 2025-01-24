const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

// Modelo de Usuário
const User = sequelize.define("User", {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role: {
    type: DataTypes.ENUM("Admin", "Gerente", "Caixa"),
    allowNull: false,
  },
});

module.exports = User;
