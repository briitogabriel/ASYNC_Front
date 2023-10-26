import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dieta from "../pages/Dieta/Dieta.page";
import Prontuarios from '../pages/Prontuarios/Prontuarios';
import { ToastProvider } from '../contexts/ToastContext';
import Message from '../components/Message/Message';
import SideMenu from '../components/SideMenu/SideMenu';


export const AppRoutes = () => {
  return (
    <ToastProvider>
      <Message />
      <div>
      </div>
      <Router>
        <SideMenu />
        <Routes>
          <Route path="/usuarios/login" element={<p>Login page</p>} />
          <Route path="/">  {/*REMOVI POIS NÃO ESTAVA ENTRANDO NO ENDPOINT ->>> element={<p>Layout</p>}>*/}
            <Route index element={<p>Página inicial</p>} />
            <Route path="/cadastrar-dieta" element={<Dieta />} />
            <Route path="/prontuarios" element={<Prontuarios />} />
          </Route>
          <Route path="*" element={<p>Página não existe</p>} />
        </Routes>
      </Router>
    </ToastProvider>
  );
};
