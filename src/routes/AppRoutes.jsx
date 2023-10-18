import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dieta from "../pages/Dieta/Dieta.page";

export const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/cadastrar-dieta" element={<Dieta />} />
        <Route path="*" element={<p>Página não existe</p>} />
      </Routes>
    </Router>
  );
};
