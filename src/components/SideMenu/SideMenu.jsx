import React from 'react';
import { Link } from 'react-router-dom';

const SideMenu = () => {
  return (
    <div>
      <ul className={`nav flex-column d-md-block`}>
        <li className="nav-item">
          <Link to="/usuarios/login" className="btn btn-primary btn-light side-menu__button"><i className="bi bi-bar-chart"></i> Início</Link>
        </li>
        <li className="nav-item">
          <Link to="/prontuarios" className="btn btn-primary btn-light side-menu__button"><i className="bi bi-journals"></i> Listar Prontuário</Link>
        </li>
        <li className="nav-item">
          <Link to="/cadastrar-usuario" className="btn btn-primary btn-light side-menu__button"><i className="bi bi-journals"></i> Cadastrar Usuários</Link>
        </li>
        <li className="nav-item">
          <Link to="/cadastrar-dieta" className="btn btn-primary btn-light side-menu__button"><i className="bi bi-journals"></i> Cadastrar Dieta</Link>
        </li>
      </ul>
    </div>
  );
};

export default SideMenu;