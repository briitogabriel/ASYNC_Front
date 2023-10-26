import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { DietaPage } from "../pages/Dieta/Dieta.page.jsx";
import Usuario from "../pages/Usuario/Usuario.page";
import Prontuarios from '../pages/Prontuarios/Prontuarios.page.jsx';
import { ToastProvider } from '../contexts/ToastContext';
import Message from '../components/Message/Message';
import SideMenu from '../components/SideMenu/SideMenu';

export const AppRoutes = () => {
  return (
    <ToastProvider>
      <Message />
      <Router>
        <SideMenu />
        <Routes>
          <Route path="/usuarios/login" element={<p>Login page</p>} />
          <Route path="/"> 
            <Route path="/cadastrar-dieta" element={<DietaPage />} />
            <Route path="/cadastrar-usuario" element={<Usuario />} />
            <Route path="/prontuarios" element={<Prontuarios />} />
          </Route>
          <Route path="*" element={<p>Página não existe</p>} />
        </Routes>
      </Router>
    </ToastProvider>
  );
};
