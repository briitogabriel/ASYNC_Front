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
import Navbar from '../components/MenuLateral/Navbar/Navbar.jsx';
import Toolbar from '../components/Toolbar/Toolbar.page.jsx';
import { PacientesPage } from '../pages/Pacientes/Pacientes.page.jsx';
import { MedicamentosPage } from '../pages/Medicamentos/Medicamentos.page.jsx';
import { ConsultaPage } from '../pages/Consulta/Consulta.page.jsx';

export const AppRoutes = () => {

  return (
  <ToastProvider>
      <Routes>               
        <Route path="/home" element={<Home />} />
        <Route path="/usuarios/login" element={<Login />} />
        <Route path="/">
          <Route path="/lateralmenu" element={<Navbar/>}/>
          <Route path="/toolbar" element={<Toolbar/>}/>
          <Route path="/cadastrar-dieta" element={<Dietas />} />
          <Route path="/cadastrar-usuario" element={<Usuario />} />
          <Route path="/prontuarios" element={<Prontuarios />} />
          <Route path="/prontuarios/:idPaciente" element={<DetalhaProntuario />} />
          <Route path="/exames" element={<Exames />} />
          <Route path="/pacientes/:idPaciente/exames" element={<Exames />} />
          <Route path="/pacientes/:idPaciente/exames/:id" element={<Exames />} />
          <Route path="/pacientes" element={<PacientesPage />} />
          <Route path="/medicamentos" element={<MedicamentosPage />}/>
          <Route path="pacientes/:pacienteId/medicamentos" element={<MedicamentosPage />}/>
          <Route path="/consultas" element={<ConsultaPage />} />
        </Route>
        <Route path="*" element={<p>Página não existe</p>} />
      </Routes>
    </ToastProvider>
  );
};
