const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");
const authMiddleware = require("../middlewares/authMiddleware");

// Rota para criar um novo produto (disponível para Gerente e Admin)
router.post(
  "/products",
  authMiddleware(["Gerente", "Admin"]),
  productController.createProduct
);

// Rota para listar todos os produtos (disponível para Admin e Gerente)
router.get(
  "/products",
  authMiddleware(["Gerente", "Admin"]),
  productController.getProducts
);

// Rota para buscar um produto específico pelo ID (disponível para Admin e Gerente)
router.get(
  "/products/:id",
  authMiddleware(["Gerente", "Admin"]),
  productController.getProductById
);

// Rota para atualizar um produto (disponível para Gerente e Admin)
router.put(
  "/products/:id",
  authMiddleware(["Gerente", "Admin"]),
  productController.updateProduct
);

// Rota para deletar um produto (disponível apenas para Admin)
router.delete(
  "/products/:id",
  authMiddleware(["Admin"]),
  productController.deleteProduct
);

module.exports = router;
