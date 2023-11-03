import React, {useState} from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { DietaPage } from "../pages/Dieta/Dieta.page.jsx";
import Login from '../pages/Login/Login';
import Exames from '../pages/Exames/Exames.page.jsx';
import Usuario from "../pages/Usuario/Usuario.page";
import DetalhaProntuario from "../pages/DetalhaProntuario/DetalhaProntuario.page";
import Prontuarios from '../pages/Prontuarios/Prontuarios.page.jsx';
import { ToastProvider } from '../contexts/ToastContext';
import Toolbar from '../components/Toolbar/Toolbar';
import Message from '../components/Message/Message';
import SideMenu from '../components/SideMenu/SideMenu';
import Content from '../components/Content/Content';
import { Home } from '../pages/Home/Home.jsx';

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
      <div className="container-root">
        <Toolbar />
        <Message />
        {!isLoginPage && estaLogado() && (
          <div className="row">
            <div className={isMenuOpen ? "col-md-3" : "col-md-1"}>
              <SideMenu isMenuOpen={isMenuOpen} onToggleMenu={onToggleMenu} />
            </div>
            <div className={isMenuOpen ? "col-md-9" : "col-md-11"}>
              <Content>
                <Routes>
                  <Route path="/home" element={<Home />} />
                  <Route path="/usuarios/login" element={<p>Login page</p>} />
                  <Route path="/">
                    <Route path="/cadastrar-dieta" element={<DietaPage />} />
                    <Route path="/cadastrar-usuario" element={<Usuario />} />
                    <Route path="/prontuarios" element={<Prontuarios />} />
                    <Route path="/prontuarios/:idPaciente" element={<DetalhaProntuario />} />
                    <Route path="/exames" element={<Exames />} />
                    <Route path="/pacientes/:idPaciente/exames" element={<Exames />} />
                    <Route path="/pacientes/:idPaciente/exames/:id" element={<Exames />} />
                  </Route>
                  <Route path="*" element={<p>Página não existe</p>} />
                </Routes>
              </Content>
            </div>
          </div>
        )}
        {(isLoginPage || !estaLogado()) && (
          <div className="row">
            <div className="col-md-12">
              <Login />
            </div>
          </div>
        )}
      </div>
    </ToastProvider>
  );
};
