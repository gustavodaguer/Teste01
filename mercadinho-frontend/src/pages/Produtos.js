import React, { useState, useEffect } from "react";
import axios from "axios";

const Produtos = () => {
  const [produtos, setProdutos] = useState([]);
  const [fornecedores, setFornecedores] = useState([]);
  const [formData, setFormData] = useState({
    barcode: "",
    name: "",
    unitOfMeasure: "",
    stockQuantity: "",
    costPrice: "",
    salePrice: "",
    promotionPrice: "",
    minQuantity: "",
    maxQuantity: "",
    supplierId: "",
  });
  const [editingProduct, setEditingProduct] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    // Função para buscar todos os produtos
    const fetchProdutos = async () => {
      try {
        const response = await axios.get("http://localhost:4321/api/products", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setProdutos(response.data);
      } catch (error) {
        console.error("Erro ao buscar produtos:", error);
      }
    };

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

    fetchProdutos();
    fetchFornecedores();
  }, []);

  // Função para lidar com o submit do formulário
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingProduct) {
        // Atualizar produto
        await axios.put(
          `http://localhost:4321/api/products/${editingProduct.id}`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
      } else {
        // Adicionar produto
        await axios.post("http://localhost:4321/api/products", formData, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
      }
      // Atualiza a lista de produtos
      const response = await axios.get("http://localhost:4321/api/products", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setProdutos(response.data);
      setFormData({
        barcode: "",
        name: "",
        unitOfMeasure: "",
        stockQuantity: "",
        costPrice: "",
        salePrice: "",
        promotionPrice: "",
        minQuantity: "",
        maxQuantity: "",
        supplierId: "",
      });
      setEditingProduct(null);
    } catch (error) {
      console.error("Erro ao salvar produto:", error);
      setError("Erro ao salvar produto");
    }
  };

  // Função para editar um produto
  const handleEdit = (product) => {
    setEditingProduct(product);
    setFormData({
      barcode: product.barcode,
      name: product.name,
      unitOfMeasure: product.unitOfMeasure,
      stockQuantity: product.stockQuantity,
      costPrice: product.costPrice,
      salePrice: product.salePrice,
      promotionPrice: product.promotionPrice,
      minQuantity: product.minQuantity,
      maxQuantity: product.maxQuantity,
      supplierId: product.SupplierId,
    });
  };

  // Função para deletar um produto
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:4321/api/products/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      // Atualiza a lista de produtos após a exclusão
      const response = await axios.get("http://localhost:4321/api/products", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setProdutos(response.data);
    } catch (error) {
      console.error("Erro ao deletar produto:", error);
      setError("Erro ao deletar produto");
    }
  };

  return (
    <div className="container mt-5">
      <h2>Gerenciar Produtos</h2>
      {error && <div className="alert alert-danger">{error}</div>}

      {/* Formulário de adicionar/editar produto */}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Código de Barras</label>
          <input
            type="text"
            className="form-control"
            value={formData.barcode}
            onChange={(e) =>
              setFormData({ ...formData, barcode: e.target.value })
            }
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
          <label>Unidade de Medida</label>
          <input
            type="text"
            className="form-control"
            value={formData.unitOfMeasure}
            onChange={(e) =>
              setFormData({ ...formData, unitOfMeasure: e.target.value })
            }
            required
          />
        </div>
        <div className="form-group">
          <label>Quantidade em Estoque</label>
          <input
            type="number"
            className="form-control"
            value={formData.stockQuantity}
            onChange={(e) =>
              setFormData({ ...formData, stockQuantity: e.target.value })
            }
            required
          />
        </div>
        <div className="form-group">
          <label>Preço de Custo</label>
          <input
            type="number"
            step="0.01"
            className="form-control"
            value={formData.costPrice}
            onChange={(e) =>
              setFormData({ ...formData, costPrice: e.target.value })
            }
            required
          />
        </div>
        <div className="form-group">
          <label>Preço de Venda</label>
          <input
            type="number"
            step="0.01"
            className="form-control"
            value={formData.salePrice}
            onChange={(e) =>
              setFormData({ ...formData, salePrice: e.target.value })
            }
            required
          />
        </div>
        <div className="form-group">
          <label>Preço de Promoção (Opcional)</label>
          <input
            type="number"
            step="0.01"
            className="form-control"
            value={formData.promotionPrice}
            onChange={(e) =>
              setFormData({ ...formData, promotionPrice: e.target.value })
            }
          />
        </div>
        <div className="form-group">
          <label>Quantidade Mínima</label>
          <input
            type="number"
            className="form-control"
            value={formData.minQuantity}
            onChange={(e) =>
              setFormData({ ...formData, minQuantity: e.target.value })
            }
            required
          />
        </div>
        <div className="form-group">
          <label>Quantidade Máxima</label>
          <input
            type="number"
            className="form-control"
            value={formData.maxQuantity}
            onChange={(e) =>
              setFormData({ ...formData, maxQuantity: e.target.value })
            }
            required
          />
        </div>
        <div className="form-group">
          <label>Fornecedor</label>
          <select
            className="form-control"
            value={formData.supplierId}
            onChange={(e) =>
              setFormData({ ...formData, supplierId: e.target.value })
            }
            required
          >
            <option value="">Selecione um fornecedor</option>
            {fornecedores.map((fornecedor) => (
              <option key={fornecedor.id} value={fornecedor.id}>
                {fornecedor.companyName}
              </option>
            ))}
          </select>
        </div>
        <button type="submit" className="btn btn-primary mt-3">
          {editingProduct ? "Atualizar Produto" : "Adicionar Produto"}
        </button>
      </form>

      {/* Lista de produtos */}
      <table className="table mt-5">
        <thead>
          <tr>
            <th>Código de Barras</th>
            <th>Nome</th>
            <th>Unidade de Medida</th>
            <th>Quantidade</th>
            <th>Preço de Custo</th>
            <th>Preço de Venda</th>
            <th>Preço de Promoção</th>
            <th>Fornecedor</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {produtos.map((produto) => (
            <tr key={produto.id}>
              <td>{produto.barcode}</td>
              <td>{produto.name}</td>
              <td>{produto.unitOfMeasure}</td>
              <td>{produto.stockQuantity}</td>
              <td>{produto.costPrice}</td>
              <td>{produto.salePrice}</td>
              <td>{produto.promotionPrice || "N/A"}</td>
              <td>
                {fornecedores.find((f) => f.id === produto.SupplierId)
                  ?.companyName || "N/A"}
              </td>
              <td>
                <button
                  className="btn btn-warning btn-sm"
                  onClick={() => handleEdit(produto)}
                >
                  Editar
                </button>
                <button
                  className="btn btn-danger btn-sm ml-2"
                  onClick={() => handleDelete(produto.id)}
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

export default Produtos;
