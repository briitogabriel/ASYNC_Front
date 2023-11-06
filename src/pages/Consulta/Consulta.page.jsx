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
  const {idPaciente, id} = useParams();
  const { showConfirm, ConfirmationModal } = useConfirmation();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const [pacienteData, setPacienteData] = useState({});
  const [consultaData, setConsultaData] = useState({
    con_motivo: '',
    con_data: getFormattedDate(),
    con_hora: getFormattedTime(),
    con_descricao: '',
    con_medicacao: '',
    con_dosagem_precaucoes: '',
    pac_id: ''
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

  const validateForm = () => {
    if (consultaData.con_motivo.length == 0 || consultaData.con_data.length == 0 || consultaData.con_hora.length == 0 || consultaData.con_descricao.length == 0 || consultaData.con_dosagem_precaucoes.length == 0) {
      showToast('Os campos Motivo, Data, Hora, Descrição e Dosagem/Precauções são obrigatórios.');
      return false;
    }
    if (consultaData.con_motivo.length < 8 || consultaData.con_motivo.length > 64) {
      showToast('O Motivo da Consulta deve conter entre 8 e 64 caracteres.');
      return false;
    }
    if (consultaData.con_descricao.length < 16 || consultaData.con_descricao.length > 1024) {
      showToast('A Descrição da Consulta deve conter entre 16 e 1024 caracteres.');
      return false;
    }
    if (consultaData.con_dosagem_precaucoes.length < 16 || consultaData.con_dosagem_precaucoes.length > 256) {
      showToast('A Dosagem/Precauções da Consulta deve conter entre 16 e 256 caracteres.');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {

      if (!validateForm()) {
        return;
      }

      const consultaDataCopy = {...consultaData};
      consultaDataCopy.con_data = getFormattedDate();
      consultaDataCopy.pac_id = pacienteData.pac_id;

      await ConsultaService.criarConsulta(JSON.stringify(consultaDataCopy));

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
        consultaDataCopy.con_data = getFormattedDate();
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
                    <label htmlFor="con_motivo" className="form-label">
                      Motivo da consulta:
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="con_motivo"
                      name="con_motivo"
                      required
                      minLength="8"
                      maxLength="64"
                      value={consultaData.con_motivo}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="col-md-4">
                    <label htmlFor="con_data" className="form-label">
                      Data da consulta:
                    </label>
                    <input
                      type="date"
                      className="form-control"
                      id="con_data"
                      name="con_data"
                      value={consultaData.con_data}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="col-md-4">
                    <label htmlFor="con_hora" className="form-label">
                      Horário:
                    </label>
                    <input
                      type="time"
                      className="form-control"
                      id="con_hora"
                      name="con_hora"
                      value={consultaData.con_hora}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col-md-12">
                    <label htmlFor="con_descricao" className="form-label">
                      Descrição do Problema:
                    </label>
                    <input
                      type='text'
                      className="form-control"
                      id="con_descricao"
                      name="con_descricao"
                      required
                      minLength="16"
                      maxLength="1024"
                      value={consultaData.con_descricao}
                      onChange={handleChange}
                    ></input>
                  </div>
                </div>

                <div className="row mb-3">
                  <div className="col-md-12">
                    <label htmlFor="con_medicacao" className="form-label">
                      Medicação Receitada:
                    </label>
                    <input
                      type='text'
                      className="form-control"
                      id="con_medicacao"
                      name="con_medicacao"
                      value={consultaData.con_medicacao}
                      onChange={handleChange}
                    ></input>
                  </div>
                </div>

                <div className="row mb-3">
                  <div className="col-md-12">
                    <label htmlFor="con_dosagem_precaucoes" className="form-label">
                      Dosagem e Precauções:
                    </label>
                    <input
                      type='text'
                      className="form-control"
                      id="con_dosagem_precaucoes"
                      name="con_dosagem_precaucoes"
                      required
                      minLength="16"
                      maxLength="256"
                      value={consultaData.con_dosagem_precaucoes}
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
