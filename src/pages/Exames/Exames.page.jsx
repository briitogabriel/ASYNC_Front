import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Autocomplete from '../../components/Autocomplete/Autocomplete';
import { v4 as uuidv4 } from 'uuid';
import { useToast } from '../../contexts/ToastContext';
import { getFormattedDate, getFormattedTime } from "../../utils/DateUtils";
import useConfirmation from '../../hooks/useConfirmation';
import { PacienteService } from '../../services/Paciente.service';
import { ExameService } from '../../services/Exames.service';


const Exames = () => {
    const { idPaciente, id } = useParams();
    const navigate = useNavigate();
    const { showConfirm, ConfirmationModal } = useConfirmation();
    const { showToast } = useToast();

    const [pacienteData, setPacienteData] = useState({});
    const [exameData, setExameData] = useState({
        exa_data: getFormattedDate(),
        exa_hora: getFormattedTime(),
    });

    useEffect(() => {
        const fetchPacienteData = async () => {
            try {
                const paciente = await PacienteService.detalharPaciente(idPaciente);
                setPacienteData(paciente);
            } catch (error) {
                console.error(error);
            }
        };
        if (idPaciente) {
            fetchPacienteData();
        }
    }, [idPaciente]);

    useEffect(() => {
        const fetchExameData = async () => {
            try {
                const exame = await ExameService.detalharExame(id);
                setExameData(exame);
            } catch (error) {
                showToast('Falha ao buscar exame do paciente!');
                console.error(error);
            }
        };
        if (id) {
            fetchExameData();
        }
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setExameData((prevData) => ({ ...prevData, [name]: value }));
    };

    const validateForm = () => {
        if (exameData.exa_resultados.length <= 15 || exameData.exa_resultados.length > 1000) {
            showToast('O Resultado do Exame deve conter entre 15 e 1000 caracteres.');
            return false;
        }
        return true;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {

            if(!validateForm()){
                return;
            }

            const exameDataCopy = { ...exameData };
            exameDataCopy.id = uuidv4();
            exameDataCopy.exa_data = getFormattedDate();
            exameDataCopy.pac_id = pacienteData.pac_id;

            await ExameService.salvarExame(JSON.stringify(exameDataCopy));

            showToast(`Exame do paciente "${pacienteData.pac_nome}" cadastrado com sucesso!`);
            navigate(`/prontuarios/${pacienteData.pac_id}`);
        } catch (error) {
            showToast('Falha ao salvar exame do paciente!');
            console.error(error);
        }
    }

    const handleVoltar = () => {
        navigate(-1);
    };

    const handleUpdate = async (e) => {
        try {

            if(!validateForm()){
                return;
            }
            
            const exameDataCopy = { ...exameData };
            exameDataCopy.pac_id = idPaciente;
            exameDataCopy.exa_data = getFormattedDate();

            await ExameService.atualizarExame(exameDataCopy);

            showToast(`Exame do paciente "${pacienteData.pac_nome}" atualizada com sucesso!`);
            navigate('/home');
        } catch (error) {
            console.error(error);
            showToast('Falha ao atualizar exame do paciente!');
        }
    }

    const handleDelete = async (e) => {

        showConfirm('Deseja realmente excluir este exame?', async () => {
            try {

                await ExameService.deletarExame(id);
                showToast(`Exame do paciente "${pacienteData.pac_nome}" deletado com sucesso!`);
                navigate('/home');
            } catch (error) {
                showToast('Falha ao deletar o exame do paciente!');
            }
        });
    };

    const onSelect = (paciente) => {
        navigate(`/pacientes/${paciente.id}/exames`);
    }

    return (
        <div className="container">
            <ConfirmationModal />
            <div className="row">
                <div className="col-md-12">
                    <div className="d-flex align-items-center mb-4">
                        <i className="bi bi-clipboard-pulse fs-1 me-2 text-blue align-middle"></i>
                        <h2 className="mb-0 text-blue">Cadastro de Exame</h2>
                    </div>
                    <div className="input-group mb-3">

                        <Autocomplete
                            id="autocomplete-paciente"
                            placeholder="Digite o nome do paciente"
                            onChange={onSelect}
                        />
                        <button className="btn btn-primary" type="button" id="buscar-paciente">
                            <i className="bi bi-search"></i>
                        </button>

                    </div>

                    {pacienteData && pacienteData.pac_id && (
                        <form className="mt-5" onSubmit={handleSubmit}>
                            <div className="d-flex justify-content-between align-items-center mb-3">
                                <span className="text-blue fw-bold fs-4">Exame para: {pacienteData && pacienteData.pac_nome}</span>
                                <div className="d-flex">
                                    {id && (
                                        <>
                                            <button type="button" className="btn btn-light me-2" onClick={handleVoltar}>
                                                <i className="bi bi-arrow-return-left"></i> Voltar
                                            </button>
                                        </>
                                    )}
                                    <button disabled={!id} type="button" className="btn btn-secondary me-2" onClick={handleUpdate}>
                                        <i className="bi bi-pencil"></i> Editar
                                    </button>
                                    <button disabled={!id} type="button" className="btn btn-danger me-2" onClick={handleDelete}>
                                        <i className="bi bi-trash"></i> Deletar
                                    </button>
                                    {!id && <button type="submit" className="btn btn-primary">
                                        <i className="bi bi-save"></i> Salvar
                                    </button>}
                                </div>
                            </div>
                            <div className="row mb-3">
                                <div className="col-md-4">
                                    <label htmlFor="exa_nome" className="form-label">Nome do exame:</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="exa_nome"
                                        name="exa_nome"
                                        required
                                        minLength="6"
                                        maxLength="60"
                                        value={exameData.exa_nome}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="col-md-4">
                                    <label htmlFor="exa_data" className="form-label">Data do exame:</label>
                                    <input
                                        type="date"
                                        className="form-control"
                                        id="exa_data"
                                        name="exa_data"
                                        value={exameData.exa_data}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="col-md-4">
                                    <label htmlFor="exa_hora" className="form-label">Horário do exame:</label>
                                    <input
                                        type="time"
                                        className="form-control"
                                        id="exa_hora"
                                        name="exa_hora"
                                        value={exameData.exa_hora}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                            </div>
                            <div className="row mb-3">

                                <div className="col-md-8 mb-3">
                                    <label htmlFor="exa_tipo" className="form-label">Tipo do Exame</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="exa_tipo"
                                        name="exa_tipo"
                                        value={exameData.exa_tipo}
                                        onChange={handleChange}
                                        required
                                        minLength="5"
                                        maxLength="30"
                                    />
                                </div>
                                <div className="col-md-4 mb-3">
                                    <label htmlFor="exa_laboratorio" className="form-label">Laboratório</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="exa_laboratorio"
                                        name="exa_laboratorio"
                                        value={exameData.exa_laboratorio}
                                        onChange={handleChange}
                                        required
                                        minLength="5"
                                        maxLength="30"
                                    />
                                </div>
                            </div>


                            <div className="row mb-3">
                                <div className="col-md-12">
                                    <label htmlFor="exa_url_documento" className="form-label">URL do documento do Exame:</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="exa_url_documento"
                                        name="exa_url_documento"
                                        value={exameData.exa_url_documento}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>

                            <div className="row mb-3">
                                <div className="col-md-12">
                                    <label htmlFor="exa_resultados" className="form-label">Resultado do Exame:</label>
                                    <textarea
                                        className="form-control"
                                        id="exa_resultados"
                                        name="exa_resultados"
                                        required
                                        minLength="15"
                                        maxLength="1000"
                                        rows="10"
                                        value={exameData.exa_resultados}
                                        onChange={handleChange}
                                    ></textarea>
                                </div>
                            </div>

                        </form>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Exames;
