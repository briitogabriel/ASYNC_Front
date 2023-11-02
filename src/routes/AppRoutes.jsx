import React, {useState} from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import Dietas from "../pages/Dieta/Dieta.page.jsx";
import Login from '../pages/Login/Login.page.jsx';
import Home from '../pages/Home/Home';
import Exames from '../pages/Exames/Exames.page.jsx';
import Usuario from "../pages/Usuario/Usuario.page";
import DetalhaProntuario from "../pages/DetalhaProntuario/DetalhaProntuario.page";
import Prontuarios from '../pages/Prontuarios/Prontuarios.page.jsx';
import { ToastProvider } from '../contexts/ToastContext';
// import Toolbar from '../components/Toolbar/Toolbar';
// import Message from '../components/Message/Message';
// import SideMenu from '../components/SideMenu/SideMenu';
// import Content from '../components/Content/Content';
import Navbar from '../components/MenuLateral/Navbar/Navbar.jsx';

export const AppRoutes = () => {

  const location = useLocation();
  const isLoginPage = location.pathname === '/login';
  const [isMenuOpen, setIsMenuOpen] = useState(true);
  const estaLogado = () => true;

  const onToggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
  <ToastProvider>
      <Routes>               
        <Route path="/home" element={<Home />} />
        <Route path="/usuarios/login" element={<Login />} />
        <Route path="/">
          <Route path="/lateralmenu" element={<Navbar/>}/>
          <Route path="/cadastrar-dieta" element={<Dietas />} />
          <Route path="/cadastrar-usuario" element={<Usuario />} />
          <Route path="/prontuarios" element={<Prontuarios />} />
          <Route path="/prontuarios/:idPaciente" element={<DetalhaProntuario />} />
          <Route path="/exames" element={<Exames />} />
          <Route path="/pacientes/:idPaciente/exames" element={<Exames />} />
          <Route path="/pacientes/:idPaciente/exames/:id" element={<Exames />} />
        </Route>
        <Route path="*" element={<p>Página não existe</p>} />
      </Routes>
    </ToastProvider>
  );
};
