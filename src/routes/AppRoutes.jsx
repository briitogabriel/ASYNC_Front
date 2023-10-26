import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { DietaPage } from "../pages/Dieta/Dieta.page.jsx";
import Usuario from "../pages/Usuario/Usuario.page";
import Login from "../pages/Login/Login.page.jsx";

export const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/usuarios/login" element={<p>Login page</p>}/>
        <Route path="/">  {/*REMOVI POIS NÃO ESTAVA ENTRANDO NO ENDPOINT ->>> element={<p>Layout</p>}>*/}
          <Route index element={<p>Página inicial</p>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/cadastrar-dieta" element={<DietaPage />} />
          <Route path="/cadastrar-usuario" element={<Usuario />} />
        </Route>
        <Route path="*" element={<p>Página não existe</p>} />
      </Routes>
    </Router>
  );
};
