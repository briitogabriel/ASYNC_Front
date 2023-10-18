import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dieta from "../pages/Dieta/Dieta.page";

export const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/usuarios/login" element={<p>Login page</p>}/>
        <Route path="/" element={<p>Layout</p>}>
          <Route index element={<p>Página inicial</p>}/>
          <Route path="/cadastrar-dieta" element={<Dieta />} />
        </Route>
        <Route path="*" element={<p>Página não existe</p>} />
      </Routes>
    </Router>
  );
};
