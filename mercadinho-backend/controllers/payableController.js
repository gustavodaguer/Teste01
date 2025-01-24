const Payable = require("../models/Payable");
const Supplier = require("../models/Supplier");

// Controlador para listar todas as contas a pagar
exports.getPayables = async (req, res) => {
  try {
    const payables = await Payable.findAll({ include: Supplier });
    res.json(payables);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Erro ao listar contas a pagar", details: error });
  }
};

// Controlador para buscar uma conta a pagar pelo ID
exports.getPayableById = async (req, res) => {
  try {
    const payable = await Payable.findByPk(req.params.id, {
      include: Supplier,
    });
    if (!payable) {
      return res.status(404).json({ error: "Conta a pagar não encontrada" });
    }
    res.json(payable);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Erro ao buscar conta a pagar", details: error });
  }
};

// Controlador para marcar uma conta como paga
exports.markAsPaid = async (req, res) => {
  try {
    const payable = await Payable.findByPk(req.params.id);
    if (!payable) {
      return res.status(404).json({ error: "Conta a pagar não encontrada" });
    }
    payable.status = "Pago";
    await payable.save();
    res.json({ message: "Conta a pagar marcada como paga", payable });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Erro ao atualizar status da conta", details: error });
  }
};
