import React from 'react';
import { Link } from 'react-router-dom';

const SideMenu = () => {
  return (
    <div>
      <ul className={`nav flex-column d-md-block`}>
        <li className="nav-item">
          <Link to="/" className="btn btn-primary btn-light side-menu__button"><i className="bi bi-bar-chart"></i> INÍCIO</Link>
        </li>
        <li className="nav-item">
          <Link to="/prontuarios" className="btn btn-primary btn-light side-menu__button"><i className="bi bi-journals"></i> LISTAR PRONTUÁRIO</Link>
        </li>
      </ul>
    </div>
  );
};

export default SideMenu;