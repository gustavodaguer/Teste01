const express = require("express");
const router = express.Router();
const receivableController = require("../controllers/receivableController");
const authMiddleware = require("../middlewares/authMiddleware");

// Rota para listar todas as contas a receber (disponível para Admin e Gerente)
router.get(
  "/receivables",
  authMiddleware(["Gerente", "Admin"]),
  receivableController.getReceivables
);

// Rota para buscar uma conta a receber específica pelo ID (disponível para Admin e Gerente)
router.get(
  "/receivables/:id",
  authMiddleware(["Gerente", "Admin"]),
  receivableController.getReceivableById
);

// Rota para marcar uma conta como paga (disponível para Admin e Gerente)
router.put(
  "/receivables/:id/pay",
  authMiddleware(["Gerente", "Admin"]),
  receivableController.markAsPaid
);

module.exports = router;
