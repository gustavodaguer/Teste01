const Supplier = require("../models/Supplier");

// Controlador para criar um fornecedor
exports.createSupplier = async (req, res) => {
  try {
    const { cnpj, companyName, address, phone, email, maxInstallments } =
      req.body;
    const supplier = await Supplier.create({
      cnpj,
      companyName,
      address,
      phone,
      email,
      maxInstallments,
    });
    res.status(201).json(supplier);
  } catch (error) {
    res.status(400).json({ error: "Erro ao criar fornecedor", details: error });
  }
};

// Controlador para listar todos os fornecedores
exports.getSuppliers = async (req, res) => {
  try {
    const suppliers = await Supplier.findAll();
    res.json(suppliers);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Erro ao listar fornecedores", details: error });
  }
};

// Controlador para obter um fornecedor pelo ID
exports.getSupplierById = async (req, res) => {
  try {
    const supplier = await Supplier.findByPk(req.params.id);
    if (!supplier) {
      return res.status(404).json({ error: "Fornecedor não encontrado" });
    }
    res.json(supplier);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Erro ao buscar fornecedor", details: error });
  }
};

// Controlador para atualizar um fornecedor
exports.updateSupplier = async (req, res) => {
  try {
    const { cnpj, companyName, address, phone, email, maxInstallments } =
      req.body;
    const supplier = await Supplier.findByPk(req.params.id);
    if (!supplier) {
      return res.status(404).json({ error: "Fornecedor não encontrado" });
    }

    supplier.cnpj = cnpj || supplier.cnpj;
    supplier.companyName = companyName || supplier.companyName;
    supplier.address = address || supplier.address;
    supplier.phone = phone || supplier.phone;
    supplier.email = email || supplier.email;
    supplier.maxInstallments = maxInstallments || supplier.maxInstallments;

    await supplier.save();
    res.json(supplier);
  } catch (error) {
    res
      .status(400)
      .json({ error: "Erro ao atualizar fornecedor", details: error });
  }
};

// Controlador para deletar um fornecedor
exports.deleteSupplier = async (req, res) => {
  try {
    const supplier = await Supplier.findByPk(req.params.id);
    if (!supplier) {
      return res.status(404).json({ error: "Fornecedor não encontrado" });
    }
    await supplier.destroy();
    res.json({ message: "Fornecedor deletado com sucesso" });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Erro ao deletar fornecedor", details: error });
  }
};
