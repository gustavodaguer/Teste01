const Sale = require("../models/Sale");
const Client = require("../models/Client");
const Product = require("../models/Product");
const SaleProduct = require("../models/SaleProduct");
const Receivable = require("../models/Receivable");
const Order = require("../models/Order");
const OrderProduct = require("../models/OrderProduct");
const Supplier = require("../models/Supplier");

// Função para verificar o estoque e gerar pedido de reabastecimento se necessário
async function checkAndRestockProduct(productId) {
  const product = await Product.findByPk(productId, { include: Supplier });

  if (!product) {
    console.error(`Produto com ID ${productId} não encontrado.`);
    return;
  }

  // Se o estoque estiver abaixo ou igual à quantidade mínima, faça o reabastecimento
  if (product.stockQuantity <= product.minQuantity) {
    const quantityToOrder = product.maxQuantity - product.stockQuantity;
    const totalCost = quantityToOrder * product.costPrice;

    try {
      // Cria um novo pedido para o fornecedor do produto
      const order = await Order.create({
        totalValue: totalCost,
        SupplierId: product.SupplierId,
      });

      // Adiciona o produto ao pedido com a quantidade necessária
      await OrderProduct.create({
        OrderId: order.id,
        ProductId: product.id,
        quantity: quantityToOrder,
        unitCostPrice: product.costPrice,
      });

      // Atualiza o estoque do produto para a quantidade máxima
      await product.update({ stockQuantity: product.maxQuantity });

      console.log(
        `Pedido de reabastecimento gerado para o produto ${product.name}`
      );
    } catch (error) {
      console.error("Erro ao criar pedido de reabastecimento:", error);
    }
  }
}

// Controlador para registrar uma venda
exports.createSale = async (req, res) => {
  try {
    const {
      clientId,
      deliveryAddress,
      paymentType,
      products,
      installments = 1,
    } = req.body;

    // Verifica se o cliente existe
    const client = await Client.findByPk(clientId);
    if (!client) {
      return res.status(404).json({ error: "Cliente não encontrado" });
    }

    // Calcula o valor total da venda e verifica a disponibilidade no estoque
    let totalValue = 0;
    for (const item of products) {
      const product = await Product.findByPk(item.productId);
      if (!product) {
        return res
          .status(404)
          .json({ error: `Produto ${item.productId} não encontrado` });
      }
      // Verifica se a quantidade desejada está disponível no estoque
      if (item.quantity > product.stockQuantity) {
        return res.status(400).json({
          error: `Estoque insuficiente para o produto ${product.name}`,
        });
      }
      totalValue += product.salePrice * item.quantity;
    }

    // Verifica se o crédito do cliente é suficiente no caso de pagamento "Loja"
    if (paymentType === "Loja" && totalValue > client.credit) {
      return res
        .status(400)
        .json({ error: "Venda excede o limite de crédito do cliente" });
    }

    // Cria o registro da venda
    const sale = await Sale.create({
      ClientId: clientId,
      deliveryAddress,
      totalValue,
      paymentType,
      status: paymentType === "Loja" ? "Pendente" : "Paga",
    });

    // Relaciona os produtos à venda e atualiza o estoque
    for (const item of products) {
      const product = await Product.findByPk(item.productId);
      await SaleProduct.create({
        SaleId: sale.id,
        ProductId: item.productId,
        quantity: item.quantity,
        unitPrice: product.salePrice,
      });

      // Atualiza a quantidade no estoque do produto
      await product.update({
        stockQuantity: product.stockQuantity - item.quantity,
      });

      // Verifica o estoque e gera pedido de reabastecimento se necessário
      await checkAndRestockProduct(item.productId);
    }

    // Adiciona parcelas em Contas a Receber (Receivables) com base no tipo de pagamento
    const today = new Date();
    const installmentAmount = totalValue / installments;

    if (paymentType === "Loja" || paymentType === "Cartão de Crédito") {
      for (let i = 0; i < installments; i++) {
        const dueDate = new Date(today);
        dueDate.setMonth(today.getMonth() + i);

        await Receivable.create({
          ClientId: clientId,
          amount: installmentAmount,
          dueDate,
        });
      }
    }

    res.status(201).json({
      message:
        "Venda registrada com sucesso, estoque atualizado e pedido de reabastecimento gerado, se necessário",
      sale,
    });
  } catch (error) {
    console.error("Erro ao registrar venda:", error);
    res.status(500).json({
      error: "Erro ao registrar venda",
      details: error.message || error,
    });
  }
};

// Controlador para listar todas as vendas
exports.getSales = async (req, res) => {
  try {
    const sales = await Sale.findAll({ include: [Client, Product] });
    res.json(sales);
  } catch (error) {
    res.status(500).json({ error: "Erro ao listar vendas", details: error });
  }
};

// Controlador para buscar uma venda específica pelo ID
exports.getSaleById = async (req, res) => {
  try {
    const sale = await Sale.findByPk(req.params.id, {
      include: [Client, Product],
    });
    if (!sale) {
      return res.status(404).json({ error: "Venda não encontrada" });
    }
    res.json(sale);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar venda", details: error });
  }
};
