import React, { useState, useEffect } from "react";
import axios from "axios";

const Clientes = () => {
  const [clientes, setClientes] = useState([]);
  const [formData, setFormData] = useState({
    cpf: "",
    name: "",
    address: "",
    type: "Ouro",
    credit: "",
  });
  const [editingClient, setEditingClient] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    // Função para buscar todos os clientes
    const fetchClientes = async () => {
      try {
        const response = await axios.get("http://localhost:4321/api/clients", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setClientes(response.data);
      } catch (error) {
        console.error("Erro ao buscar clientes:", error);
      }
    };
    fetchClientes();
  }, []);

  // Função para lidar com o submit do formulário
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingClient) {
        // Atualizar cliente
        await axios.put(
          `http://localhost:4321/api/clients/${editingClient.id}`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
      } else {
        // Adicionar cliente
        await axios.post("http://localhost:4321/api/clients", formData, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
      }
      // Atualiza a lista de clientes
      const response = await axios.get("http://localhost:4321/api/clients", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setClientes(response.data);
      setFormData({ cpf: "", name: "", address: "", type: "Ouro", credit: "" });
      setEditingClient(null);
    } catch (error) {
      console.error("Erro ao salvar cliente:", error);
      setError("Erro ao salvar cliente");
    }
  };

  // Função para editar um cliente
  const handleEdit = (client) => {
    setEditingClient(client);
    setFormData({
      cpf: client.cpf,
      name: client.name,
      address: client.address,
      type: client.type,
      credit: client.credit,
    });
  };

  // Função para deletar um cliente
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:4321/api/clients/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      // Atualiza a lista de clientes após a exclusão
      const response = await axios.get("http://localhost:4321/api/clients", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setClientes(response.data);
    } catch (error) {
      console.error("Erro ao deletar cliente:", error);
      setError("Erro ao deletar cliente");
    }
  };

  return (
    <div className="container mt-5">
      <h2>Gerenciar Clientes</h2>
      {error && <div className="alert alert-danger">{error}</div>}

      {/* Formulário de adicionar/editar cliente */}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>CPF</label>
          <input
            type="text"
            className="form-control"
            value={formData.cpf}
            onChange={(e) => setFormData({ ...formData, cpf: e.target.value })}
            required
          />
        </div>
        <div className="form-group">
          <label>Nome</label>
          <input
            type="text"
            className="form-control"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
        </div>
        <div className="form-group">
          <label>Endereço</label>
          <input
            type="text"
            className="form-control"
            value={formData.address}
            onChange={(e) =>
              setFormData({ ...formData, address: e.target.value })
            }
            required
          />
        </div>
        <div className="form-group">
          <label>Tipo de Cliente</label>
          <select
            className="form-control"
            value={formData.type}
            onChange={(e) => setFormData({ ...formData, type: e.target.value })}
          >
            <option value="Ouro">Ouro</option>
            <option value="Prata">Prata</option>
            <option value="Bronze">Bronze</option>
          </select>
        </div>
        <div className="form-group">
          <label>Crédito</label>
          <input
            type="number"
            className="form-control"
            value={formData.credit}
            onChange={(e) =>
              setFormData({ ...formData, credit: e.target.value })
            }
            required
          />
        </div>
        <button type="submit" className="btn btn-primary mt-3">
          {editingClient ? "Atualizar Cliente" : "Adicionar Cliente"}
        </button>
      </form>

      {/* Lista de clientes */}
      <table className="table mt-5">
        <thead>
          <tr>
            <th>CPF</th>
            <th>Nome</th>
            <th>Endereço</th>
            <th>Tipo</th>
            <th>Crédito</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {clientes.map((cliente) => (
            <tr key={cliente.id}>
              <td>{cliente.cpf}</td>
              <td>{cliente.name}</td>
              <td>{cliente.address}</td>
              <td>{cliente.type}</td>
              <td>{cliente.credit}</td>
              <td>
                <button
                  className="btn btn-warning btn-sm"
                  onClick={() => handleEdit(cliente)}
                >
                  Editar
                </button>
                <button
                  className="btn btn-danger btn-sm ml-2"
                  onClick={() => handleDelete(cliente.id)}
                >
                  Excluir
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Clientes;
