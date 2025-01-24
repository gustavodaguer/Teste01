const express = require("express");
const sequelize = require("./config/database");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./routes/auth");
const clientRoutes = require("./routes/clientRoutes");
const supplierRoutes = require("./routes/supplierRoutes");
const productRoutes = require("./routes/productRoutes");
const saleRoutes = require("./routes/saleRoutes");
const receivableRoutes = require("./routes/receivableRoutes");
const payableRoutes = require("./routes/payableRoutes");
const orderRoutes = require("./routes/orderRoutes");

const cron = require("node-cron");
const orderController = require("./controllers/orderController");

const app = express();
const port = 4321;

// Middleware para interpretar JSON
app.use(express.json());

// Habilitar CORS para permitir requisições do front-end (porta 3000)
app.use(cors());

// Sincroniza os modelos com o banco de dados
sequelize
  .sync({ force: false }) // O parâmetro 'force: false' não apaga os dados existentes
  .then(() => {
    console.log("Tabelas sincronizadas com o banco de dados.");
  })
  .catch((err) => {
    console.error("Erro ao sincronizar tabelas:", err);
  });

// Agendamento para verificar estoque e gerar pedidos diariamente às 6h
cron.schedule("0 6 * * *", () => {
  console.log("Verificando estoque para gerar pedidos de reabastecimento...");
  orderController.generateAutomaticOrder();
});

// Rotas de autenticação
app.use("/api/auth", authRoutes);

// Rotas de clientes
app.use("/api", clientRoutes);

// Rotas de fornecedores
app.use("/api", supplierRoutes);

// Rotas de produtos (estoque)
app.use("/api", productRoutes);

// Rotas de vendas
app.use("/api", saleRoutes);

// Rotas de contas a receber
app.use("/api", receivableRoutes);

// Rotas de contas a pagar
app.use("/api", payableRoutes);

// Rotas de pedidos
app.use("/api", orderRoutes);

// Servidor rodando
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
