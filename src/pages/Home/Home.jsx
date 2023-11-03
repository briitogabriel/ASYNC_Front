import { useEffect, useState } from "react";
import { CardEstatistica } from "../../components/CardEstatistica/CardEstatistica.component";
import { PacienteService } from "../../services/Paciente.service";

export const Home = () => {
    const [estatistica, setEstatistica] = useState({});

    const calcularEstatistica = async () => {
        const pacientes = await PacienteService.buscarPacientes();

        setEstatistica({pacientes: pacientes.lengh})
    }

    
    
    return (
        <div className="container mt-3">
            <h4>Estatísticas do Sistema</h4>
            <div className="row">
                <CardEstatistica label="Pacientes" value={estatistica.pacientes} icon="bi-person-circle" />
                <CardEstatistica label="Consultas" value={2} icon="bi-heart-pulse" />
                <CardEstatistica label="Exames" value={3} icon="bi-journal-text" />
            </div>
        </div>
    )
};