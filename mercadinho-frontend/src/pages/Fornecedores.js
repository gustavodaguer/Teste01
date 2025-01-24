import React, { useState, useEffect } from "react";
import axios from "axios";

const Fornecedores = () => {
  const [fornecedores, setFornecedores] = useState([]);
  const [formData, setFormData] = useState({
    cnpj: "",
    companyName: "",
    address: "",
    phone: "",
    email: "",
    maxInstallments: "",
  });
  const [editingSupplier, setEditingSupplier] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    // Função para buscar todos os fornecedores
    const fetchFornecedores = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4321/api/suppliers",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setFornecedores(response.data);
      } catch (error) {
        console.error("Erro ao buscar fornecedores:", error);
      }
    };
    fetchFornecedores();
  }, []);

  // Função para lidar com o submit do formulário
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingSupplier) {
        // Atualizar fornecedor
        await axios.put(
          `http://localhost:4321/api/suppliers/${editingSupplier.id}`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
      } else {
        // Adicionar fornecedor
        await axios.post("http://localhost:4321/api/suppliers", formData, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
      }
      // Atualiza a lista de fornecedores
      const response = await axios.get("http://localhost:4321/api/suppliers", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setFornecedores(response.data);
      setFormData({
        cnpj: "",
        companyName: "",
        address: "",
        phone: "",
        email: "",
        maxInstallments: "",
      });
      setEditingSupplier(null);
    } catch (error) {
      console.error("Erro ao salvar fornecedor:", error);
      setError("Erro ao salvar fornecedor");
    }
  };

  // Função para editar um fornecedor
  const handleEdit = (supplier) => {
    setEditingSupplier(supplier);
    setFormData({
      cnpj: supplier.cnpj,
      companyName: supplier.companyName,
      address: supplier.address,
      phone: supplier.phone,
      email: supplier.email,
      maxInstallments: supplier.maxInstallments,
    });
  };

  // Função para deletar um fornecedor
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:4321/api/suppliers/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      // Atualiza a lista de fornecedores após a exclusão
      const response = await axios.get("http://localhost:4321/api/suppliers", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setFornecedores(response.data);
    } catch (error) {
      console.error("Erro ao deletar fornecedor:", error);
      setError("Erro ao deletar fornecedor");
    }
  };

  return (
    <div className="container mt-5">
      <h2>Gerenciar Fornecedores</h2>
      {error && <div className="alert alert-danger">{error}</div>}

      {/* Formulário de adicionar/editar fornecedor */}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>CNPJ</label>
          <input
            type="text"
            className="form-control"
            value={formData.cnpj}
            onChange={(e) => setFormData({ ...formData, cnpj: e.target.value })}
            required
          />
        </div>
        <div className="form-group">
          <label>Razão Social</label>
          <input
            type="text"
            className="form-control"
            value={formData.companyName}
            onChange={(e) =>
              setFormData({ ...formData, companyName: e.target.value })
            }
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
          <label>Telefone</label>
          <input
            type="text"
            className="form-control"
            value={formData.phone}
            onChange={(e) =>
              setFormData({ ...formData, phone: e.target.value })
            }
            required
          />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            className="form-control"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            required
          />
        </div>
        <div className="form-group">
          <label>Número Máximo de Parcelas</label>
          <input
            type="number"
            className="form-control"
            value={formData.maxInstallments}
            onChange={(e) =>
              setFormData({ ...formData, maxInstallments: e.target.value })
            }
            required
          />
        </div>
        <button type="submit" className="btn btn-primary mt-3">
          {editingSupplier ? "Atualizar Fornecedor" : "Adicionar Fornecedor"}
        </button>
      </form>

      {/* Lista de fornecedores */}
      <table className="table mt-5">
        <thead>
          <tr>
            <th>CNPJ</th>
            <th>Razão Social</th>
            <th>Endereço</th>
            <th>Telefone</th>
            <th>Email</th>
            <th>Máx. Parcelas</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {fornecedores.map((fornecedor) => (
            <tr key={fornecedor.id}>
              <td>{fornecedor.cnpj}</td>
              <td>{fornecedor.companyName}</td>
              <td>{fornecedor.address}</td>
              <td>{fornecedor.phone}</td>
              <td>{fornecedor.email}</td>
              <td>{fornecedor.maxInstallments}</td>
              <td>
                <button
                  className="btn btn-warning btn-sm"
                  onClick={() => handleEdit(fornecedor)}
                >
                  Editar
                </button>
                <button
                  className="btn btn-danger btn-sm ml-2"
                  onClick={() => handleDelete(fornecedor.id)}
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

export default Fornecedores;
