import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dieta from "./pages/Dieta/Dieta.page";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/cadastrar-dieta" element={<Dieta />} />
          {/* <Route path="/login" element={<LoginPage />} />
          <Route path="/" element={<HomePage />}></Route> */}
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
