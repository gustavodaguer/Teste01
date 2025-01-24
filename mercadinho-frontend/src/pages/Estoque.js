import React, { useState, useEffect } from "react";
import axios from "axios";

const Estoque = () => {
  const [produtos, setProdutos] = useState([]);
  const [error, setError] = useState("");
  const [message] = useState("");

  useEffect(() => {
    // Função para buscar produtos e suas quantidades no estoque
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
        setError("Erro ao buscar produtos");
      }
    };

    fetchProdutos();
  }, []);

  return (
    <div className="container mt-5">
      <h2>Gerenciamento de Estoque</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      {message && <div className="alert alert-success">{message}</div>}

      <table className="table mt-3">
        <thead>
          <tr>
            <th>Produto</th>
            <th>Quantidade em Estoque</th>
            <th>Quantidade Mínima</th>
            <th>Quantidade Máxima</th>
          </tr>
        </thead>
        <tbody>
          {produtos.map((produto) => (
            <tr key={produto.id}>
              <td>{produto.name}</td>
              <td>{produto.stockQuantity}</td>
              <td>{produto.minQuantity}</td>
              <td>{produto.maxQuantity}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Estoque;
