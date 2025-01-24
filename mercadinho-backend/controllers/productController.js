const Product = require("../models/Product");
const Supplier = require("../models/Supplier");
const Payable = require("../models/Payable");

// Controlador para criar um produto
exports.createProduct = async (req, res) => {
  try {
    const {
      barcode,
      name,
      unitOfMeasure,
      stockQuantity,
      costPrice,
      salePrice,
      promotionPrice,
      minQuantity,
      maxQuantity,
      supplierId,
    } = req.body;

    // Verifica se o fornecedor existe
    const supplier = await Supplier.findByPk(supplierId);
    if (!supplier) {
      return res.status(404).json({ message: "Fornecedor não encontrado" });
    }

    // Cria o produto
    const product = await Product.create({
      barcode,
      name,
      unitOfMeasure,
      stockQuantity,
      costPrice,
      salePrice,
      promotionPrice,
      minQuantity,
      maxQuantity,
      SupplierId: supplierId,
    });

    // Calcula o valor total do pedido inicial (quantidade * preço de custo)
    const totalCost = stockQuantity * costPrice;

    // Criação das contas a pagar com base no número de parcelas do fornecedor
    const installmentAmount = totalCost / supplier.maxInstallments;
    const today = new Date();

    // Gera as parcelas para as contas a pagar
    for (let i = 0; i < supplier.maxInstallments; i++) {
      const dueDate = new Date(today);
      dueDate.setMonth(today.getMonth() + i);

      await Payable.create({
        SupplierId: supplier.id,
        amount: installmentAmount,
        dueDate,
      });
    }

    res.status(201).json({
      message: "Produto criado com sucesso e contas a pagar geradas",
      product,
    });
  } catch (error) {
    console.error("Erro ao criar produto:", error);
    res.status(500).json({
      message: "Erro ao criar produto e registrar contas a pagar",
      error,
    });
  }
};

// Controlador para listar todos os produtos
exports.getProducts = async (req, res) => {
  try {
    const products = await Product.findAll();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: "Erro ao listar produtos", details: error });
  }
};

// Controlador para obter um produto pelo ID
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) {
      return res.status(404).json({ error: "Produto não encontrado" });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar produto", details: error });
  }
};

// Controlador para atualizar um produto
exports.updateProduct = async (req, res) => {
  try {
    const {
      barcode,
      name,
      unitOfMeasure,
      stockQuantity,
      costPrice,
      salePrice,
      promotionPrice,
      minQuantity,
      maxQuantity,
      supplierId,
    } = req.body;

    const product = await Product.findByPk(req.params.id);
    if (!product) {
      return res.status(404).json({ error: "Produto não encontrado" });
    }

    // Atualiza os dados do produto, se forem fornecidos
    product.barcode = barcode || product.barcode;
    product.name = name || product.name;
    product.unitOfMeasure = unitOfMeasure || product.unitOfMeasure;
    product.stockQuantity = stockQuantity || product.stockQuantity;
    product.costPrice = costPrice || product.costPrice;
    product.salePrice = salePrice || product.salePrice;
    product.promotionPrice = promotionPrice || product.promotionPrice;
    product.minQuantity = minQuantity || product.minQuantity;
    product.maxQuantity = maxQuantity || product.maxQuantity;
    product.SupplierId = supplierId || product.SupplierId;

    await product.save();
    res.json(product);
  } catch (error) {
    res
      .status(400)
      .json({ error: "Erro ao atualizar produto", details: error });
  }
};

// Controlador para deletar um produto
exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) {
      return res.status(404).json({ error: "Produto não encontrado" });
    }
    await product.destroy();
    res.json({ message: "Produto deletado com sucesso" });
  } catch (error) {
    res.status(500).json({ error: "Erro ao deletar produto", details: error });
  }
};
