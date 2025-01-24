const express = require("express");
const router = express.Router();
const supplierController = require("../controllers/supplierController");
const authMiddleware = require("../middlewares/authMiddleware");

// Rota para criar um novo fornecedor (disponível para Admin e Gerente)
router.post(
  "/suppliers",
  authMiddleware(["Gerente", "Admin"]),
  supplierController.createSupplier
);

// Rota para listar todos os fornecedores (disponível para Admin e Gerente)
router.get(
  "/suppliers",
  authMiddleware(["Gerente", "Admin"]),
  supplierController.getSuppliers
);

// Rota para buscar um fornecedor específico pelo ID (disponível para Admin e Gerente)
router.get(
  "/suppliers/:id",
  authMiddleware(["Gerente", "Admin"]),
  supplierController.getSupplierById
);

// Rota para atualizar um fornecedor (disponível para Admin e Gerente)
router.put(
  "/suppliers/:id",
  authMiddleware(["Gerente", "Admin"]),
  supplierController.updateSupplier
);

// Rota para deletar um fornecedor (disponível apenas para Admin)
router.delete(
  "/suppliers/:id",
  authMiddleware(["Admin"]),
  supplierController.deleteSupplier
);

module.exports = router;
