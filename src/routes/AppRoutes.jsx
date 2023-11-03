import React, {useState} from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { DietaPage } from "../pages/Dieta/Dieta.page.jsx";
import Login from '../pages/Login/Login.page.jsx';
import Home from '../pages/Home/Home';
import Exames from '../pages/Exames/Exames.page.jsx';
import Usuario from "../pages/Usuario/Usuario.page";
import DetalhaProntuario from "../pages/DetalhaProntuario/DetalhaProntuario.page";
import Prontuarios from '../pages/Prontuarios/Prontuarios.page.jsx';
import Pacientes from '../pages/Pacientes/Pacientes.page.jsx'
import { ToastProvider } from '../contexts/ToastContext';
// import Content from '../components/Content/Content';
import Navbar from '../components/MenuLateral/Navbar/Navbar.jsx';
import Toolbar from '../components/Toolbar/Toolbar.page.jsx';

export const AppRoutes = () => {

  return (
  <ToastProvider>
      <Routes>               
        <Route path="/home" element={<Home />} />
        <Route path="/usuarios/login" element={<Login />} />
        <Route path="/">
          <Route path="/lateralmenu" element={<Navbar/>}/>
          <Route path="/toolbar" element={<Toolbar/>}/>
          <Route path="/cadastrar-dieta" element={<DietaPage />} />
          <Route path="/cadastrar-usuario" element={<Usuario />} />
          <Route path="/prontuarios" element={<Prontuarios />} />
          <Route path="/prontuarios/:idPaciente" element={<DetalhaProntuario />} />
          <Route path="/exames" element={<Exames />} />
          <Route path="/pacientes/:idPaciente/exames" element={<Exames />} />
          <Route path="/pacientes/:idPaciente/exames/:id" element={<Exames />} />
          <Route path="/cadastrar-paciente" element={<Pacientes />} />
        </Route>
        <Route path="*" element={<p>Página não existe</p>} />
      </Routes>
    </ToastProvider>
  );
};
