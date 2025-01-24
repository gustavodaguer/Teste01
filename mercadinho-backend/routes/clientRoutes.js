const express = require("express");
const router = express.Router();
const clientController = require("../controllers/clientController");
const authMiddleware = require("../middlewares/authMiddleware");

// Rota para criar um novo cliente (disponível para Gerente e Admin)
router.post(
  "/clients",
  authMiddleware(["Gerente", "Admin"]),
  clientController.createClient
);

// Rota para listar todos os clientes (disponível para Admin e Gerente)
router.get(
  "/clients",
  authMiddleware(["Gerente", "Admin"]),
  clientController.getClients
);

// Rota para buscar um cliente específico pelo ID (disponível para Admin e Gerente)
router.get(
  "/clients/:id",
  authMiddleware(["Gerente", "Admin"]),
  clientController.getClientById
);

// Rota para atualizar um cliente (disponível para Gerente e Admin)
router.put(
  "/clients/:id",
  authMiddleware(["Gerente", "Admin"]),
  clientController.updateClient
);

// Rota para deletar um cliente (disponível apenas para Admin)
router.delete(
  "/clients/:id",
  authMiddleware(["Admin"]),
  clientController.deleteClient
);

module.exports = router;
