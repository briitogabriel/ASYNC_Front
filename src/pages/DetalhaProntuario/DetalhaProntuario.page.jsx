import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useToast } from '../../contexts/ToastContext';
import { Link } from 'react-router-dom';
import { PacienteService } from '../../services/Paciente.service';
import { ExameService } from '../../services/Exames.service';
import { ConsultaService } from '../../services/Consultas.service';
import { getFormattedDate, getFormattedTime } from "../../utils/DateUtils";
import { DietaService } from '../../services/Dieta.service';

const DetalhaProntuario = () => {
    const { idPaciente } = useParams();
    const [pacienteData, setPacienteData] = useState({});
    const [consultas, setConsultas] = useState([]);
    const [exames, setExames] = useState([]);
    const [dietas, setDietas] = useState(null);
    const { showToast } = useToast();

    useEffect(() => {
        const fetchPacienteData = async () => {
            try {
                const paciente = await PacienteService.detalharPaciente(idPaciente);
                setPacienteData(paciente);
                fetchDietas(paciente);
            } catch (error) {
                console.error(error);
                showToast('Falha ao buscar os dados do paciente');
            }
        };

        const fetchConsultas = async () => {
            try {
                const consultas = await ConsultaService.listarConsultasPorPaciente(idPaciente)
                setConsultas(consultas);
            } catch (error) {
                console.error(error);
                showToast('Falha ao buscar as consultas, backend está implementado?');
            }
        };

        const fetchExames = async () => {
            try {
                const exames = await ExameService.listarExamesPorPaciente(idPaciente)
                setExames(exames);
            } catch (error) {
                console.error(error);
                showToast('Falha ao buscar os exames');
            }
        };

        const fetchDietas = async (paciente) => {
            try {
                const dietas = await DietaService.buscarDietasPorPaciente(paciente.pac_nome)
                setDietas(dietas);
            } catch (error) {
                console.error(error);
                showToast('Falha ao buscar as dietas');
            }
        };

        fetchPacienteData();
        fetchConsultas();
        fetchExames();
    }, [idPaciente]);

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-12">
                    <div className="d-flex align-items-center mb-4">
                        <i className="bi bi-file-earmark-text fs-1 me-2 text-blue align-middle"></i>
                        <h2 className="mb-0 text-blue">Prontuário Médico</h2>
                    </div>

                    <div className="card mb-4">
                        <div className="card-body">
                            <h5 className="card-title mb-4 mt-1">Dados do Paciente</h5>
                            <p className="card-text">
                                <strong>Nome Completo:</strong> {pacienteData.pac_nome}
                            </p>
                            <p className="card-text">
                                <strong>Convênio:</strong> {pacienteData.pac_convenio}
                            </p>
                            <p className="card-text">
                                <strong>Alergias:</strong> {pacienteData.pac_alergias || 'Nenhuma alergia registrada'}
                            </p>
                            <p className="card-text">
                                <strong>Contato de Emergência:</strong> {pacienteData.pac_contato_emergencia || 'Nenhum contato de emergência especificado'}
                            </p>
                            <p className="card-text">
                                <strong>Cuidados específicos:</strong> {pacienteData.pac_cuidados_especiais || 'Nenhum cuidado específico registrado'}
                            </p>
                        </div>
                    </div>

                    <div className="card">
                        <div className="card-body d-flex justify-content-between align-items-center">
                            <h5 className="card-title">Consultas</h5>
                            <Link to={`/pacientes/${idPaciente}/consultas`}>
                                <button type="button" className="btn btn-info">
                                    <i className="bi bi-hospital"></i> Cadastrar
                                </button>
                            </Link>
                        </div>
                        {consultas.length > 0 ? (
                            <ul className="list-group p-3">
                                {consultas.slice(0, 5).map((consulta) => (
                                    <li key={consulta.con_id} className="list-group-item d-flex justify-content-between align-items-center">
                                        <span>
                                            <span className="fw-bold">Data:</span> {consulta.con_data}
                                            <span className="fw-bold">- Horário:</span> {consulta.con_hora}
                                            <span className="fw-bold">- Motivo:</span> {consulta.con_motivo}
                                        </span>
                                        <Link to={`/pacientes/${pacienteData.pac_id}/consultas/${consulta.con_id}`}>
                                            <button type="button" className="btn btn-secondary">
                                                <i className="bi bi-search"></i>
                                            </button>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <div className="card-body">
                                <p>Nenhuma consulta registrada</p>
                            </div>
                        )}

                    </div>

                    <div className="card mt-4">
                        <div className="card-body d-flex justify-content-between align-items-center">
                            <h5 className="card-title">Exames</h5>
                            <Link to={`/pacientes/${idPaciente}/exames`}>
                                <button type="button" className="btn btn-info">
                                    <i className="bi bi-clipboard-pulse"></i> Cadastrar
                                </button>
                            </Link>
                        </div>
                        {exames.length > 0 ? (
                            <ul className="list-group p-3">
                                {exames.slice(0, 5).map((exame) => (
                                    <li key={exame.exa_id} className="list-group-item d-flex justify-content-between align-items-center">
                                        <span>
                                            <span className="fw-bold">Data:</span> {exame.exa_data}
                                            <span className="fw-bold"> - Horário:</span> {exame.exa_hora}
                                            <span className="fw-bold"> - Tipo:</span> {exame.exa_tipo}
                                        </span>
                                        <Link to={`/pacientes/${pacienteData.pac_id}/exames/${exame.exa_id}`}>
                                            <button type="button" className="btn btn-secondary">
                                                <i className="bi bi-search"></i>
                                            </button>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <div className="card-body">
                                <p>Nenhum exame registrado</p>
                            </div>
                        )}
                    </div>

                    <div className="card mt-4">
                        <div className="card-body d-flex justify-content-between align-items-center">
                            <h5 className="card-title">Dietas</h5>
                            <Link to={`/dietas`}>
                                <button type="button" className="btn btn-info">
                                    <i className="bi bi-clipboard-pulse"></i> Cadastrar
                                </button>
                            </Link>
                        </div>
                        {dietas ? (
                            <ul className="list-group p-3">
                                {dietas.data.map((dieta) => (
                                    <li key={dieta.die_id} className="list-group-item d-flex justify-content-between align-items-center">
                                        <span>
                                            <span className="fw-bold">Data:</span> {dieta.die_data}
                                            <span className="fw-bold"> - Horário:</span> {dieta.die_hora}
                                            <span className="fw-bold"> - Tipo:</span> {dieta.die_tipo}
                                        </span>
                                        <Link to={`/pacientes/${pacienteData.pac_id}/dietas/${dieta.die_id}`}>
                                            <button type="button" className="btn btn-secondary">
                                                <i className="bi bi-search"></i>
                                            </button>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <div className="card-body">
                                <p>Nenhuma dieta registrada</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div >
    );
};

export default DetalhaProntuario;