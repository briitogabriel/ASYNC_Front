import Navbar from '../../components/MenuLateral/Navbar/Navbar';
import { useEffect, useState } from "react";
import { CardEstatistica } from "../../components/CardEstatistica/CardEstatistica.component";
import { PacienteService } from "../../services/Paciente.service";
import { ConsultaService } from '../../services/Consultas.service';

export const HomePage = () => {
    const [estatistica, setEstatistica] = useState({});
  
    useEffect( () => {
        const calcularEstatistica = async () => {
            const pacientes = await PacienteService.buscarPacientes();
            const qtdPacientes = pacientes.lenght;

            const consultas = await ConsultaService.listarConsultas();
            const qtdConsultas = consultas.lenght;

            setEstatistica({pacientes: qtdPacientes, cosultas: qtdConsultas, exames: 0});
        };
         calcularEstatistica();
        
    }, []);

    return <div>
        <Navbar/>
        <div className="container mt-3">
            <h4>Estatísticas do sistema</h4>
            <div className="row mt-3">
                <CardEstatistica icon='bi-person-circle' value={estatistica.pacientes} label='Pacientes' />
                <CardEstatistica icon='bi-heart-pulse' value={estatistica.pacientes} label='Consultas' />
                <CardEstatistica icon='bi-journal-text' value={estatistica.pacientes} label='Exames' />
            </div>
        </div>
    </div>;
};