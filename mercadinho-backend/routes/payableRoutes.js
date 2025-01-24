const express = require("express");
const router = express.Router();
const payableController = require("../controllers/payableController");
const authMiddleware = require("../middlewares/authMiddleware");

// Rota para listar todas as contas a pagar (disponível para Admin e Gerente)
router.get(
  "/payables",
  authMiddleware(["Gerente", "Admin"]),
  payableController.getPayables
);

// Rota para buscar uma conta a pagar específica pelo ID (disponível para Admin e Gerente)
router.get(
  "/payables/:id",
  authMiddleware(["Gerente", "Admin"]),
  payableController.getPayableById
);

// Rota para marcar uma conta como paga (disponível para Admin e Gerente)
router.put(
  "/payables/:id/pay",
  authMiddleware(["Gerente", "Admin"]),
  payableController.markAsPaid
);

module.exports = router;
