import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dieta from "./pages/Dieta/Dieta.page";
import Usuario from "./pages/Usuario/Usuario.page";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/cadastrar-dieta" element={<Dieta />} />
          {/* <Route path="/login" element={<LoginPage />} />
          <Route path="/" element={<HomePage />}></Route> */}
          <Route path="/cadastrar-usuario" element={<Usuario />} />
          <Route
            path="*"
            element={
              <>
                <p>Página não existe</p>
              </>
            }
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
