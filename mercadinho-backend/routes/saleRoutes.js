const express = require("express");
const router = express.Router();
const saleController = require("../controllers/saleController");
const authMiddleware = require("../middlewares/authMiddleware");

// Rota para registrar uma nova venda (disponível para Caixa, Gerente e Admin)
router.post(
  "/sales",
  authMiddleware(["Caixa", "Gerente", "Admin"]),
  saleController.createSale
);

// Rota para listar todas as vendas (disponível para Admin e Gerente)
router.get(
  "/sales",
  authMiddleware(["Gerente", "Admin"]),
  saleController.getSales
);

// Rota para buscar uma venda específica pelo ID (disponível para Admin e Gerente)
router.get(
  "/sales/:id",
  authMiddleware(["Gerente", "Admin"]),
  saleController.getSaleById
);

module.exports = router;
