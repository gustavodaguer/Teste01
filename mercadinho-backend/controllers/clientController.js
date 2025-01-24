const Client = require("../models/Client");

// Controlador para criar um cliente
exports.createClient = async (req, res) => {
  try {
    const { cpf, name, address, type, credit } = req.body;
    const client = await Client.create({ cpf, name, address, type, credit });
    res.status(201).json(client);
  } catch (error) {
    res.status(400).json({ error: "Erro ao criar cliente", details: error });
  }
};

// Controlador para listar todos os clientes
exports.getClients = async (req, res) => {
  try {
    const clients = await Client.findAll();
    res.json(clients);
  } catch (error) {
    res.status(500).json({ error: "Erro ao listar clientes", details: error });
  }
};

// Controlador para obter um cliente pelo ID
exports.getClientById = async (req, res) => {
  try {
    const client = await Client.findByPk(req.params.id);
    if (!client) {
      return res.status(404).json({ error: "Cliente não encontrado" });
    }
    res.json(client);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar cliente", details: error });
  }
};

// Controlador para atualizar um cliente
exports.updateClient = async (req, res) => {
  try {
    const { cpf, name, address, type, credit } = req.body;
    const client = await Client.findByPk(req.params.id);
    if (!client) {
      return res.status(404).json({ error: "Cliente não encontrado" });
    }

    client.cpf = cpf || client.cpf;
    client.name = name || client.name;
    client.address = address || client.address;
    client.type = type || client.type;
    client.credit = credit || client.credit;

    await client.save();
    res.json(client);
  } catch (error) {
    res
      .status(400)
      .json({ error: "Erro ao atualizar cliente", details: error });
  }
};

// Controlador para deletar um cliente
exports.deleteClient = async (req, res) => {
  try {
    const client = await Client.findByPk(req.params.id);
    if (!client) {
      return res.status(404).json({ error: "Cliente não encontrado" });
    }
    await client.destroy();
    res.json({ message: "Cliente deletado com sucesso" });
  } catch (error) {
    res.status(500).json({ error: "Erro ao deletar cliente", details: error });
  }
};
