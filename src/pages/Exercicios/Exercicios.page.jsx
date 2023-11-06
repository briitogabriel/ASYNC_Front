import { PacienteService } from "../../services/Paciente.service";
import { ExercicioService } from "../../services/Exercicio.service";

import { getFormattedDate, getFormattedTime } from "../../utils/DateUtils";
import { useToast } from "../../contexts/ToastContext";
import Message from "../../components/Message/Message";
import useConfirmation from "../../hooks/useConfirmation";
import Autocomplete from "../../components/Autocomplete/Autocomplete";

import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Navbar from "../../components/MenuLateral/Navbar/Navbar";

const Exercicios = () => {

  const tiposExercicios = [
    { value: 'Resistência Aeróbica', label: 'Resistência Aeróbica' },
    { value: 'Resistência Muscular', label: 'Resistência Muscular' },
    { value: 'Flexibilidade', label: 'Flexibilidade' },
    { value: 'Força', label: 'Força' },
    { value: 'Agilidade', label: 'Agilidade' },
    { value: 'Outro', label: 'Outro' },
  ];

  const { idPaciente, idExercicio } = useParams();
  const navigate = useNavigate();
  const { showConfirm, ConfirmationModal } = useConfirmation();
  const { showToast } = useToast();

  const [pacienteData, setPacienteData] = useState({});
  const [exercicioData, setExercicioData] = useState({
    exe_nome: '',
    exe_data: getFormattedDate(),
    exe_hora: getFormattedTime(),
    exe_tipo: 'Resistência Aeróbica',
    exe_descricao: '',
    exe_qtd: '',
    pac_id: '',
  });

  useEffect(() => {

    const buscarPaciente = async () => {
      try {
        const paciente = await PacienteService.detalharPaciente(idPaciente);
        setPacienteData(paciente);
      } catch (error) {
        console.error(error);
      }
    };
    if (idPaciente) {
      buscarPaciente();
    }
  }, [idPaciente]);

  useEffect(() => {
    const buscarExercicio = async () => {
      try {
        const paciente = await PacienteService.detalharPaciente(idPaciente);
        const exercicios = await ExercicioService.buscarExerciciosPorPaciente(paciente.pac_nome);
        const exercicio = exercicios.data.find(exercicio => exercicio.exe_id == idExercicio)
        setExercicioData(exercicio);
      } catch (error) {
        await showToast("Falha ao buscar exercicio do paciente!");
        console.error(error);
      }
    };

    if (idExercicio) {
      buscarExercicio();
    }
  }, [idExercicio]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setExercicioData((prevData) => ({ ...prevData, [name]: value }));
  };

  const validateForm = () => {
    if (
      exercicioData.exe_nome.length == 0 ||
      exercicioData.exe_data.length == 0 ||
      exercicioData.exe_hora.length == 0 ||
      exercicioData.exe_tipo.length == 0 ||
      exercicioData.exe_descricao.length == 0 ||
      exercicioData.exe_qtd == 0
      ) {
      showToast('Os campos Nome, Quantidade, Data, Hora, Tipo e Descrição são obrigatórios.');
      return false;
    }
    if (exercicioData.exe_nome.length < 5 || exercicioData.exe_nome.length > 100) {
      showToast('O Nome da Exercicio deve conter entre 5 e 100 caracteres.');
      return false;
    }
    if (exercicioData.exe_descricao.length < 10 || exercicioData.exe_descricao.length > 1000) {
      showToast('A Descrição da Exercicio deve conter entre 10 e 1000 caracteres.');
      return false;
    }
    return true;
  };

  const redirectProntuarios = () => {
    let idRedirect = idPaciente ? idPaciente : pacienteSelecionado.id;
    navigate(`/prontuarios/${idRedirect}`);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {

      if (!validateForm()) {
        return;
      }

      const exercicioDataCopy = { ...exercicioData };
      exercicioDataCopy.exe_data = getFormattedDate();
      exercicioDataCopy.pac_id = pacienteData.pac_id;

      await ExercicioService.criarExercicio(JSON.stringify(exercicioDataCopy));

      await showToast(`Exercicio do paciente "${pacienteData.pac_nome}" cadastrado com sucesso!`);
      setTimeout(redirectProntuarios, 3000);
    } catch (error) {
      await showToast("Falha ao salvar exercicio do paciente!");
      console.error(error);
    }
  };

  const handleVoltar = () => {
    navigate(-1);
  };

  const handleUpdate = async (e) => {
    try {
      if (!validateForm()) {
        return;
      }

      const exercicioDataCopy = { ...exercicioData };
      exercicioDataCopy.exe_data = getFormattedDate();

      await ExercicioService.atualizarExercicio(exercicioDataCopy, idExercicio);

      await showToast(`Exercicio do paciente "${pacienteData.pac_nome}" atualizado com sucesso!`);
      setTimeout(redirectProntuarios, 3000);
    } catch (error) {
      console.error(error);
      await showToast("Falha ao atualizar exercicio do paciente!");
    }
  };

  const handleDelete = async (e) => {
    showConfirm("Deseja realmente excluir este exercicio?", async () => {
      try {
        await ExercicioService.deletarExercicio(idExercicio);
        await showToast(`Exercicio do paciente "${pacienteData.pac_nome}" deletado com sucesso!`);
        setTimeout(redirectProntuarios, 3000);
      } catch (error) {
        await showToast("Falha ao deletar o exercicio do paciente!");
      }
    });
  };

  const onSelect = (paciente) => {
    navigate(`/pacientes/${paciente.id}/exercicios`);
    // setPacienteSelecionado(paciente);
  };

  return (
    <>
      <Navbar />
      <div className="container">
        <Message />
        <ConfirmationModal />
        <div className="row">
          <div className="col-md-12">
            <div className="d-flex align-items-center mb-4">
              <i className="bi bi-clipboard-pulse fs-1 me-2 text-blue align-middle"></i>
              <h2 className="mb-0 text-blue">{idExercicio ? 'Atualização' : 'Cadastro'}  de Exercicio</h2>
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
              <form className="mt-5" onSubmit={handleSubmit} id="form-exercicios">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <span className="text-blue fw-bold fs-4">
                    Exercicio de: {pacienteData && pacienteData.pac_nome}
                  </span>
                  <div className="d-flex">
                    {idExercicio && (
                      <>
                        <button
                          type="button"
                          className="btn btn-light me-2"
                          onClick={handleVoltar}
                        >
                          <i className="bi bi-arrow-return-left"></i> Voltar
                        </button>
                      </>
                    )}
                    <button
                      disabled={!idExercicio}
                      type="button"
                      className="btn btn-secondary me-2"
                      onClick={handleUpdate}
                    >
                      <i className="bi bi-pencil"></i> Salvar Edição
                    </button>
                    <button
                      disabled={!idExercicio}
                      type="button"
                      className="btn btn-danger me-2"
                      onClick={handleDelete}
                    >
                      <i className="bi bi-trash"></i> Deletar
                    </button>
                    {!idExercicio && (
                      <button type="submit" className="btn btn-primary">
                        <i className="bi bi-save"></i> Criar
                      </button>
                    )}
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col-md-8">
                    <label htmlFor="exe_nome" className="form-label">
                      Nome do exercicio:
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="exe_nome"
                      name="exe_nome"
                      required
                      minLength="5"
                      maxLength="100"
                      value={exercicioData.exe_nome}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="col-md-4">
                    <label htmlFor="exe_qtd" className="form-label">
                      Quantidade de exercicios:
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      id="exe_qtd"
                      name="exe_qtd"
                      min="0"
                      step=".01"
                      pattern="^\d*(\.\d{0,2})?$"
                      value={exercicioData.exe_qtd}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col-md-4">
                    <label htmlFor="exe_data" className="form-label">
                      Data do exercicio:
                    </label>
                    <input
                      type="date"
                      className="form-control"
                      id="exe_data"
                      name="exe_data"
                      value={exercicioData.exe_data}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="col-md-4">
                    <label htmlFor="exe_hora" className="form-label">
                      Horário do exercicio:
                    </label>
                    <input
                      type="time"
                      className="form-control"
                      id="exe_hora"
                      name="exe_hora"
                      value={exercicioData.exe_hora}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="col-md-4">
                    <label htmlFor="exe_tipo" className="form-label">
                      Tipo do exercicio
                    </label>
                    <select
                      className="form-control"
                      id="exe_tipo"
                      name="exe_tipo"
                      value={exercicioData.exe_tipo}
                      onChange={handleChange}
                      required
                    >
                      <option value="default" disabled hidden>
                        {tiposExercicios[0].label}
                      </option>
                      {tiposExercicios.map((tipo) => (
                        <option key={tipo.value} value={tipo.value}>
                          {tipo.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="row mb-3">
                  <div className="col-md-12">
                    <label htmlFor="exe_descricao" className="form-label">
                      Descrição do exercicio:
                    </label>
                    <textarea
                      className="form-control"
                      id="exe_descricao"
                      name="exe_descricao"
                      required
                      minLength="10"
                      maxLength="1000"
                      rows="6"
                      value={exercicioData.exe_descricao}
                      onChange={handleChange}
                    ></textarea>
                  </div>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Exercicios;
