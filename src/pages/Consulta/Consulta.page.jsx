import React, { useEffect, useState } from 'react';
import Autocomplete from "../../components/Autocomplete/Autocomplete";
import { ConsultaService } from "../../services/Consultas.service";
import Navbar from '../../components/MenuLateral/Navbar/Navbar';
import { PacienteService } from "../../services/Paciente.service";
import { getFormattedDate, getFormattedTime } from "../../utils/DateUtils";
import useConfirmation from "../../hooks/useConfirmation";
import { useNavigate, useParams } from "react-router";
import { useToast } from "../../contexts/ToastContext";


export const ConsultaPage = () => {
  const {pacienteId, id} = useParams();
  const { showConfirm, ConfirmationModal } = useConfirmation();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const [pacienteData, setPacienteData] = useState({});
  const [consultaData, setConsultaData] = useState({
    dataConsulta: getFormattedDate(),
    horarioConsulta: getFormattedTime(),
  });

  useEffect(() => {
    const fetchPacienteData = async () => {
        try {
            const paciente = await PacienteService.detalharPaciente(pacienteId);
            setPacienteData(paciente);
        } catch (error) {
            console.error(error);
        }
    };
    if (pacienteId) {
        fetchPacienteData();
    }
}, [pacienteId]);

    useEffect(() => {
        const fetchConsultaData = async () => {
            try {
                const consulta = await ConsultaService.detalharConsulta(id);
                setConsultaData(consulta);
            } catch (error) {
                showToast('Falha ao procurar consulta do paciente!');
                console.error(error);
            }
        };
        if (id) {
            fetchConsultaData();
        }
    }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setConsultaData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const consultaDataCopy = {...consultaData};
        consultaDataCopy.consultaData = getFormattedDate();
        consultaDataCopy.pac_id = pacienteData.pac_id;

        await ConsultaService.salvarConsulta(JSON.stringify(consultaDataCopy));

        showToast(`Consulta do paciente "${pacienteData.pac_nome}" cadastrado com sucesso!`);
        navigate(`/prontuarios/${pacienteData.pac_id}`);
    } catch (error) {
        showToast('Erro ao cadastrar consulta');
        console.error(error)
    }
  };

  const handleUpdate = async () => {
    try {
        const consultaDataCopy = {...consultaData};
        consultaDataCopy.consultaData = getFormattedDate();
        consultaDataCopy.pac_id = pacienteData.pac_id;

        await ConsultaService.atualizarConsulta(consultaDataCopy);

        showToast(`Consulta do paciente "${pacienteData.pac_nome}" atualizada com sucesso!`);
        navigate(`/prontuarios/${pacienteData.pac_id}`);
    } catch (error) {
        showToast('Erro ao cadastrar consulta');
        console.error(error)
    }
  };

  const handleDelete = () => {
    showConfirm('Deseja realmente excluir esta consulta?', async () => {
        try {
            await ConsultaService.deletarConsulta(id);
            showToast(`Consulta do paciente "${pacienteData.pac_nome}" deletada com sucesso!`);
            navigate(`/prontuarios/${pacienteData.pac_id}`);
        } catch (error) {
            showToast('Falha ao deletar consulta!');
            console.error(error);
        }
    });
  };

  const onSelect = (paciente) => {
    navigate(`/pacientes/${paciente.id}/consultas`);
  }; 

  return (
    <main>
      <Navbar />
      <div className="container">
        <ConfirmationModal />
        <div className="row">
          <div className="col-md-12">
            <div className="d-flex align-items-center mb-4">
              <i className="bi bi-clipboard-pulse fs-1 me-2 text-blue align-middle"></i>
              <h2 className="mb-0 text-blue">Cadastro de Consulta</h2>
            </div>
            <div className="input-group mb-3">
              <Autocomplete
                id="autocomplete-paciente"
                placeholder="Digite o nome do paciente"
                onChange={onSelect}
              />
              <button
                className="btn btn-primary"
                type="button"
                id="buscar-paciente"
              >
                <i className="bi bi-search"></i>
              </button>
            </div>
            {pacienteData && pacienteData.pac_id && (
              <form className="mt-5" onSubmit={handleSubmit}>
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <span className="text-blue fw-bold fs-4">
                    Consulta para: {pacienteData && pacienteData.pac_nome}
                  </span>
                  <div className="d-flex">
                    <button
                      disabled={!id}
                      type="button"
                      className="btn btn-secondary me-2"
                      onClick={handleUpdate}
                    >
                      <i className="bi bi-pencil"></i> Editar
                    </button>
                    <button
                      disabled={!id}
                      type="button"
                      className="btn btn-danger me-2"
                      onClick={handleDelete}
                    >
                      <i className="bi bi-trash"></i> Deletar
                    </button>
                    {!id && (
                      <button type="submit" className="btn btn-primary">
                        <i className="bi bi-save"></i> Salvar
                      </button>
                    )}
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col-md-4">
                    <label htmlFor="motivoConsulta" className="form-label">
                      Motivo da consulta:
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="motivoConsulta"
                      name="motivoConsulta"
                      required
                      minLength="8"
                      maxLength="64"
                      value={consultaData.motivoConsulta}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="col-md-4">
                    <label htmlFor="dataConsulta" className="form-label">
                      Data da consulta:
                    </label>
                    <input
                      type="date"
                      className="form-control"
                      id="dataConsulta"
                      name="dataConsulta"
                      value={consultaData.dataConsulta}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="col-md-4">
                    <label htmlFor="horarioConsulta" className="form-label">
                      Horário:
                    </label>
                    <input
                      type="time"
                      className="form-control"
                      id="horarioConsulta"
                      name="horarioConsulta"
                      value={consultaData.horarioConsulta}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col-md-12">
                    <label htmlFor="descricaoProblema" className="form-label">
                      Descrição do Problema:
                    </label>
                    <input
                      type='text'
                      className="form-control"
                      id="descricaoProblema"
                      name="descricaoProblema"
                      required
                      minLength="8"
                      maxLength="64"
                      value={consultaData.descricaoProblema}
                      onChange={handleChange}
                    ></input>
                  </div>
                </div>

                <div className="row mb-3">
                  <div className="col-md-12">
                    <label htmlFor="medicacaoReceitada" className="form-label">
                      Medicação Receitada:
                    </label>
                    <input
                      type='text'
                      className="form-control"
                      id="medicacaoReceitada"
                      name="medicacaoReceitada"
                      required
                      minLength="8"
                      maxLength="64"
                      value={consultaData.medicacaoReceitada}
                      onChange={handleChange}
                    ></input>
                  </div>
                </div>

                <div className="row mb-3">
                  <div className="col-md-12">
                    <label htmlFor="dosagemPrecaucoes" className="form-label">
                      Dosagem e Precauções:
                    </label>
                    <input
                      type='text'
                      className="form-control"
                      id="dosagemPrecaucoes"
                      name="dosagemPrecaucoes"
                      required
                      minLength="8"
                      maxLength="64"
                      value={consultaData.dosagemPrecaucoes}
                      onChange={handleChange}
                    ></input>
                  </div>
                </div>

                <div className="row mb-3">
                  <div className="col-md-12">
                    <label htmlFor="statusSistema" className="form-label">
                      Status do Sistema:
                    </label>
                    <input
                      type='text'
                      className="form-control"
                      id="statusSistema"
                      name="statusSistema"
                      required
                      minLength="8"
                      maxLength="64"
                      value={consultaData.statusSistema}
                      onChange={handleChange}
                    ></input>
                  </div>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};
