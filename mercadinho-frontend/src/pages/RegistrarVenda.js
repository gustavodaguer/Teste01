import React, { useState, useEffect } from "react";
import axios from "axios";

const RegistrarVenda = () => {
  const [clientes, setClientes] = useState([]);
  const [produtos, setProdutos] = useState([]);
  const [selectedCliente, setSelectedCliente] = useState("");
  const [carrinho, setCarrinho] = useState([]);
  const [tipoPagamento, setTipoPagamento] = useState("Cartão de Crédito");
  const [installments, setInstallments] = useState(1); // Novo estado para parcelas
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    // Carrega os clientes
    const fetchClientes = async () => {
      try {
        const response = await axios.get("http://localhost:4321/api/clients", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        setClientes(response.data);
      } catch (error) {
        console.error("Erro ao buscar clientes:", error);
      }
    };

    // Carrega os produtos
    const fetchProdutos = async () => {
      try {
        const response = await axios.get("http://localhost:4321/api/products", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        setProdutos(response.data);
      } catch (error) {
        console.error("Erro ao buscar produtos:", error);
      }
    };

    fetchClientes();
    fetchProdutos();
  }, []);

  // Função para adicionar um produto ao carrinho
  const handleAddToCart = (product) => {
    setCarrinho([...carrinho, { ...product, quantity: 1 }]);
  };

  // Função para atualizar a quantidade de um produto no carrinho
  const handleQuantityChange = (productId, quantity) => {
    setCarrinho(
      carrinho.map((item) =>
        item.id === productId ? { ...item, quantity: Number(quantity) } : item
      )
    );
  };

  // Função para remover um produto do carrinho
  const handleRemoveFromCart = (productId) => {
    setCarrinho(carrinho.filter((item) => item.id !== productId));
  };

  // Função para registrar a venda
  const handleRegistrarVenda = async () => {
    try {
      const vendaData = {
        clientId: Number(selectedCliente),
        products: carrinho.map((item) => ({
          productId: item.id,
          quantity: item.quantity,
        })),
        paymentType: tipoPagamento,
        deliveryAddress: "Minha casa",
        installments: tipoPagamento === "Cartão de Crédito" ? installments : 1, // Inclui parcelas se for cartão de crédito
      };

      const response = await axios.post(
        "http://localhost:4321/api/sales",
        vendaData,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );

      setMessage("Venda registrada com sucesso!");
      setCarrinho([]);
      setSelectedCliente("");
      setTipoPagamento("Cartão de Crédito");
      setInstallments(1); // Redefine parcelas após o registro
    } catch (error) {
      console.error("Erro ao registrar venda:", error);
      setError("Erro ao registrar venda");
    }
  };

  return (
    <div className="container mt-5">
      <h2>Registrar Venda</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      {message && <div className="alert alert-success">{message}</div>}

      <div className="form-group">
        <label>Cliente</label>
        <select
          className="form-control"
          value={selectedCliente}
          onChange={(e) => setSelectedCliente(e.target.value)}
          required
        >
          <option value="">Selecione um cliente</option>
          {clientes.map((cliente) => (
            <option key={cliente.id} value={cliente.id}>
              {cliente.name}
            </option>
          ))}
        </select>
      </div>

      <h4>Produtos</h4>
      <table className="table mt-3">
        <thead>
          <tr>
            <th>Produto</th>
            <th>Quantidade em Estoque</th>
            <th>Preço</th>
            <th>Ação</th>
          </tr>
        </thead>
        <tbody>
          {produtos.map((produto) => (
            <tr key={produto.id}>
              <td>{produto.name}</td>
              <td>{produto.stockQuantity}</td>
              <td>R$ {Number(produto.salePrice).toFixed(2) || "N/A"}</td>
              <td>
                <button
                  className="btn btn-primary"
                  onClick={() => handleAddToCart(produto)}
                >
                  Adicionar ao Carrinho
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <h4>Carrinho</h4>
      <table className="table mt-3">
        <thead>
          <tr>
            <th>Produto</th>
            <th>Quantidade</th>
            <th>Preço Unitário</th>
            <th>Subtotal</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {carrinho.map((item) => (
            <tr key={item.id}>
              <td>{item.name}</td>
              <td>
                <input
                  type="number"
                  value={item.quantity}
                  onChange={(e) =>
                    handleQuantityChange(item.id, e.target.value)
                  }
                  min="1"
                  max={item.stockQuantity}
                  className="form-control"
                  style={{ width: "80px" }}
                />
              </td>
              <td>R$ {Number(item.salePrice).toFixed(2)}</td>
              <td>R$ {(item.quantity * item.salePrice).toFixed(2)}</td>
              <td>
                <button
                  className="btn btn-danger"
                  onClick={() => handleRemoveFromCart(item.id)}
                >
                  Remover
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="form-group">
        <label>Tipo de Pagamento</label>
        <select
          className="form-control"
          value={tipoPagamento}
          onChange={(e) => setTipoPagamento(e.target.value)}
          required
        >
          <option value="Cartão de Crédito">Cartão de Crédito</option>
          <option value="Cartão de Débito">Cartão de Débito</option>
          <option value="Pix">Pix</option>
          <option value="Loja">Fiado (30 dias)</option>
        </select>
      </div>

      {/* Campo de Parcelas Condicional */}
      {tipoPagamento === "Cartão de Crédito" && (
        <div className="form-group">
          <label>Parcelas</label>
          <input
            type="number"
            className="form-control"
            value={installments}
            onChange={(e) => setInstallments(Number(e.target.value))}
            min="1"
            max="12"
          />
        </div>
      )}

      <button className="btn btn-success mt-3" onClick={handleRegistrarVenda}>
        Registrar Venda
      </button>
    </div>
  );
};

export default RegistrarVenda;
