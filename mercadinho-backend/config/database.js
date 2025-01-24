const { Sequelize } = require("sequelize");
require("dotenv").config();

// Configuração do Sequelize para conectar ao PostgreSQL
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    dialect: "postgres",
  }
);

module.exports = sequelize;
