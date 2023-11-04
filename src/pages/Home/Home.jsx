import Navbar from '../../components/MenuLateral/Navbar/Navbar';
import { useEffect, useState } from "react";
import { CardEstatistica } from "../../components/CardEstatistica/CardEstatistica.component";
import { PacienteService } from "../../services/Paciente.service";
import { ConsultaService } from '../../services/Consultas.service';
import { ExameService } from '../../services/Exames.service';
import { CardPaciente } from '../../components/CardPaciente/CardPaciente';

export const HomePage = () => {
    const [estatistica, setEstatistica] = useState({
        pacientes:0,
        consultas:0,
        exames:0
    });
    const [pacientes, setPacientes] = useState([]);
    const [pacienteSelecionado, setPacienteSelecionado] = useState();
    const [paciente, setPaciente] = useState({});
    
    useEffect(() => {
        const calcularEstatistica = async () => {
            const pacientes = await PacienteService.buscarPacientes();
            setPacientes(pacientes);
            const qtdPacientes = pacientes.length;

            const consultas = await ConsultaService.listarConsultas();
            const qtdConsultas = consultas.length;

            const exames = await ExameService.listarExames();
            const qtdExames = exames.length;

            setEstatistica({pacientes: qtdPacientes, consultas: qtdConsultas, exames: qtdExames});
        };
        calcularEstatistica();
    }, []);

    const handleChange = (e) => {
        const data = e.target.value;
        setPacienteSelecionado(data)
    }

    const handleSearch = async () => {
        try {
            const response = await PacienteService.detalharPaciente(pacienteSelecionado);

            if (!response.ok) {
            throw new Error("Falha ao buscar paciente.")
            };

            setPaciente(response);
            console.log(paciente);
        } catch (error) {
            console.error(error)
        };        
    };    

    return <div>
        <Navbar/>
        <div className="container mt-3">
            <h4>Estatísticas do sistema</h4>
            <div className="row mt-3">
                <CardEstatistica icon='bi-person-circle' value={estatistica.pacientes} label='Pacientes' />
                <CardEstatistica icon='bi-heart-pulse' value={estatistica.consultas} label='Consultas' />
                <CardEstatistica icon='bi-journal-text' value={estatistica.exames} label='Exames' />
            </div>
            <div className="mt-4">
            <h4>Informações de pacientes</h4>
            <form onSubmit={handleSearch} className='mt-3'>
                <div className="input-group mb-3">
                    <input type="text" className="form-control" placeholder="Digite o nome, telefone ou e-mail do paciente" aria-label="Digite o nome do paciente" aria-describedby="button-addon2"  onChange={handleChange} />
                    <button className="btn btn-outline-secondary" type="submit" id="button-addon2">Buscar</button>
                </div>
            </form>
            <div className="row">
                {pacientes.map((paciente) => (
                    <CardPaciente key={paciente.pac_id} className="col-4 col-sm-4 mb-4" paciente={paciente} />
                ))}
            </div>
        </div>
        </div>
        
    </div>
};