const Receivable = require("../models/Receivable");
const Client = require("../models/Client");

// Controlador para listar todas as contas a receber
exports.getReceivables = async (req, res) => {
  try {
    const receivables = await Receivable.findAll({ include: Client });
    res.json(receivables);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Erro ao listar contas a receber", details: error });
  }
};

// Controlador para buscar uma conta a receber pelo ID
exports.getReceivableById = async (req, res) => {
  try {
    const receivable = await Receivable.findByPk(req.params.id, {
      include: Client,
    });
    if (!receivable) {
      return res.status(404).json({ error: "Conta a receber não encontrada" });
    }
    res.json(receivable);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Erro ao buscar conta a receber", details: error });
  }
};

// Controlador para marcar uma conta como paga
exports.markAsPaid = async (req, res) => {
  try {
    const receivable = await Receivable.findByPk(req.params.id);
    if (!receivable) {
      return res.status(404).json({ error: "Conta a receber não encontrada" });
    }
    receivable.status = "Pago";
    await receivable.save();
    res.json({ message: "Conta a receber marcada como paga", receivable });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Erro ao atualizar status da conta", details: error });
  }
};
