import React from "react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  return (
    <div className="container mt-5">
      <h2>Dashboard</h2>
      <div className="row">
        <div className="col-md-4">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Gerenciar Clientes</h5>
              <p className="card-text">
                Ver e gerenciar todos os clientes cadastrados.
              </p>
              <Link to="/clientes" className="btn btn-primary">
                Acessar
              </Link>
            </div>
          </div>
        </div>
        <div className="col-md-4 mt-4">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Registrar Venda</h5>
              <p className="card-text">
                Registrar uma nova venda para um cliente.
              </p>
              <Link to="/registrar-venda" className="btn btn-primary">
                Acessar
              </Link>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Gerenciar Produtos</h5>
              <p className="card-text">
                Ver e gerenciar o estoque de produtos.
              </p>
              <Link to="/produtos" className="btn btn-primary">
                Acessar
              </Link>
            </div>
          </div>
        </div>
        <div className="col-md-4 mt-4">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Gerenciar Estoque</h5>
              <p className="card-text">
                Ver e gerenciar o estoque de produtos.
              </p>
              <Link to="/estoque" className="btn btn-primary">
                Acessar
              </Link>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Gerenciar Fornecedores</h5>
              <p className="card-text">
                Ver e gerenciar todos os fornecedores cadastrados.
              </p>
              <Link to="/fornecedores" className="btn btn-primary">
                Acessar
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
