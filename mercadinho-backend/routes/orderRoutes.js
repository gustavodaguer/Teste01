const express = require("express");
const router = express.Router();
const orderController = require("../controllers/orderController");
const authMiddleware = require("../middlewares/authMiddleware");

// Rota para listar todos os pedidos (disponível para Admin e Gerente)
router.get(
  "/orders",
  authMiddleware(["Gerente", "Admin"]),
  orderController.getOrders
);

// Rota para gerar automaticamente pedidos de reabastecimento (disponível para Admin e Gerente)
router.post(
  "/orders/generate",
  authMiddleware(["Gerente", "Admin"]),
  orderController.generateAutomaticOrder
);

module.exports = router;
