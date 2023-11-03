import React, { useState, useEffect } from 'react';
import Navbar from '../../components/MenuLateral/Navbar/Navbar';
import { useEffect, useState } from "react";
import { CardEstatistica } from "../../components/CardEstatistica/CardEstatistica.component";
import { PacienteService } from "../../services/Paciente.service";

export const Home = () => {
    const [estatistica, setEstatistica] = useState({});
  
    const calcularEstatistica = async () => {
        const pacientes = await PacienteService.buscarPacientes();

        setEstatistica({pacientes: pacientes.lengh})
    }

    return <div>
        <Navbar/>
        <div className="mt-3">
            <h4>Home</h4>
            <div className="row"></div>
        </div>
    </div>;
};