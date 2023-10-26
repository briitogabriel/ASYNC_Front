import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { DietaPage } from "../pages/Dieta/Dieta.page.jsx";
import Usuario from "../pages/Usuario/Usuario.page";

export const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/usuarios/login" element={<p>Login page</p>}/>
        <Route path="/">
          <Route index element={<p>Página inicial</p>}/>
          <Route path="/cadastrar-dieta" element={<DietaPage />} />
          <Route path="/cadastrar-usuario" element={<Usuario />} />
        </Route>
        <Route path="*" element={<p>Página não existe</p>} />
      </Routes>
    </Router>
  );
};
