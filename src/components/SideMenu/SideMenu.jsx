import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './SideMenu.scss';

const SideMenu = ({isMenuOpen, onToggleMenu}) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userPassword');
    navigate(`/login`);
  }

  return (
    <div className={`text-light side-menu`} style={{ height: '100vh' }}>
      <ul className={`nav flex-column ${isMenuOpen ? ' d-md-block' : ' d-none'}`}>
        <li className="nav-menu-title">
          <span> Geral</span>
        </li>
        <li className="nav-item">
          <Link to="/home" className="btn btn-primary btn-light side-menu__button"><i className="bi bi-bar-chart"></i> INÍCIO</Link>
        </li>
        <li className="nav-item">
          <button className="btn btn-primary btn-light side-menu__button" onClick={handleLogout}><i className="bi bi-box-arrow-left"></i> SAIR</button>
        </li>
        <li className="nav-menu-title">
          <span> Pacientes</span>
        </li>
        <li className="nav-item">
          <Link to="/prontuarios" className="btn btn-primary btn-light side-menu__button"><i className="bi bi-journals"></i> Listar Prontuário</Link>
        </li>
        <li className="nav-item">
          <Link to="/exames" className="btn btn-primary btn-light side-menu__button"><i className="bi bi-journals"></i> Listar Exames</Link>
        </li>
        <li className="nav-item">
          <Link to="/cadastrar-usuario" className="btn btn-primary btn-light side-menu__button"><i className="bi bi-journals"></i> Cadastrar Usuários</Link>
        </li>
        <li className="nav-item">
          <Link to="/cadastrar-dieta" className="btn btn-primary btn-light side-menu__button"><i className="bi bi-journals"></i> Cadastrar Dieta</Link>
        </li>        
      </ul>
      <button className="btn btn-sm btn-light side-menu__toggle-btn mt-4" onClick={() => onToggleMenu()}>
        {isMenuOpen ? <i className="bi bi-arrow-bar-left"></i> : <i className="bi bi-arrow-bar-right"></i>}
      </button>
    </div>
  );
};

export default SideMenu;