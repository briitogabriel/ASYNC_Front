import { PacienteService } from "../../services/Paciente.service";
import { DietaService } from "../../services/Dieta.service";

import { getFormattedDate, getFormattedTime } from "../../utils/DateUtils";
import { useToast } from "../../contexts/ToastContext";
import Message from "../../components/Message/Message";
import useConfirmation from "../../hooks/useConfirmation";
import Autocomplete from "../../components/Autocomplete/Autocomplete";

import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Navbar from "../../components/MenuLateral/Navbar/Navbar";

const Dietas = () => {

  const tiposDietas = [
    { value: 'Low Carb', label: 'Low Carb' },
    { value: 'Dash', label: 'Dash' },
    { value: 'Paleolítica', label: 'Paleolítica' },
    { value: 'Cetogênica', label: 'Cetogênica' },
    { value: 'Dukan', label: 'Dukan' },
    { value: 'Mediterrânea', label: 'Mediterrânea' },
    { value: 'Outra', label: 'Outra' },
  ];

  const { idPaciente, idDieta } = null || useParams();
  const navigate = useNavigate();
  const { showConfirm, ConfirmationModal } = useConfirmation();
  const { showToast } = useToast();

  const [pacienteData, setPacienteData] = useState({});
  const [dietaData, setDietaData] = useState({
    die_nome: '',
    die_data: getFormattedDate(),
    die_hora: getFormattedTime(),
    die_tipo: 'Low Carb',
    die_descricao: '',
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
    const buscarDieta = async () => {
      try {
        const dietas = await DietaService.buscarDietasPorPaciente(paciente.pac_nome);
        const dieta = dietas.data.find(dieta => dieta.die_id == idDieta)
        setDietaData(dieta);
      } catch (error) {
        await showToast("Falha ao buscar dieta do paciente!");
        console.error(error);
      }
    };

    if (idDieta) {
      buscarDieta();
    }
  }, [idDieta]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDietaData((prevData) => ({ ...prevData, [name]: value }));
  };

  const validateForm = () => {
    if (dietaData.die_nome.length == 0 || dietaData.die_data.length == 0 || dietaData.die_hora.length == 0 || dietaData.die_tipo.length == 0 || dietaData.die_descricao.length == 0) {
      showToast('Os campos Nome, Data, Hora, Tipo e Descrição são obrigatórios.');
      return false;
    }
    if (dietaData.die_nome.length < 5 || dietaData.die_nome.length > 100) {
      showToast('O Nome da Dieta deve conter entre 5 e 100 caracteres.');
      return false;
    }
    if (dietaData.die_descricao.length < 10 || dietaData.die_descricao.length > 1000) {
      showToast('A Descrição da Dieta deve conter entre 10 e 1000 caracteres.');
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

      const dietaDataCopy = { ...dietaData };
      dietaDataCopy.die_data = getFormattedDate();
      dietaDataCopy.pac_id = pacienteData.pac_id;

      await DietaService.criarDieta(JSON.stringify(dietaDataCopy));

      await showToast(`Dieta do paciente "${pacienteData.pac_nome}" cadastrada com sucesso!`);
      setTimeout(redirectProntuarios, 3000);
    } catch (error) {
      await showToast("Falha ao salvar dieta do paciente!");
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

      const dietaDataCopy = { ...dietaData };
      dietaDataCopy.pac_id = idPaciente;
      dietaDataCopy.die_data = getFormattedDate();

      await DietaService.atualizarDieta(dietaDataCopy, idDieta);

      await showToast(`Dieta do paciente "${pacienteData.pac_nome}" atualizada com sucesso!`);
      setTimeout(redirectProntuarios, 3000);
    } catch (error) {
      console.error(error);
      await showToast("Falha ao atualizar dieta do paciente!");
    }
  };

  const handleDelete = async (e) => {
    showConfirm("Deseja realmente excluir este dieta?", async () => {
      try {
        await DietaService.deletarDieta(idDieta);
        await showToast(`Dieta do paciente "${pacienteData.pac_nome}" deletada com sucesso!`);
        setTimeout(redirectProntuarios, 3000);
      } catch (error) {
        await showToast("Falha ao deletar o dieta do paciente!");
      }
    });
  };

  const onSelect = (paciente) => {
    navigate(`/pacientes/${paciente.id}/dietas`);
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
              <h2 className="mb-0 text-blue">{idDieta ? 'Atualização' : 'Cadastro'} de Dieta</h2>
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
              <form className="mt-5" onSubmit={handleSubmit} id="form-dietas">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <span className="text-blue fw-bold fs-4">
                    Dieta de: {pacienteData && pacienteData.pac_nome}
                  </span>
                  <div className="d-flex">
                    {idDieta && (
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
                      disabled={!idDieta}
                      type="button"
                      className="btn btn-secondary me-2"
                      onClick={handleUpdate}
                    >
                      <i className="bi bi-pencil"></i> Salvar Edição
                    </button>
                    <button
                      disabled={!idDieta}
                      type="button"
                      className="btn btn-danger me-2"
                      onClick={handleDelete}
                    >
                      <i className="bi bi-trash"></i> Deletar
                    </button>
                    {!idDieta && (
                      <button type="submit" className="btn btn-primary">
                        <i className="bi bi-save"></i> Criar
                      </button>
                    )}
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col-md-12">
                    <label htmlFor="die_nome" className="form-label">
                      Nome da dieta:
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="die_nome"
                      name="die_nome"
                      required
                      minLength="5"
                      maxLength="100"
                      value={dietaData.die_nome}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col-md-4">
                    <label htmlFor="die_data" className="form-label">
                      Data da dieta:
                    </label>
                    <input
                      type="date"
                      className="form-control"
                      id="die_data"
                      name="die_data"
                      value={dietaData.die_data}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="col-md-4">
                    <label htmlFor="die_hora" className="form-label">
                      Horário da dieta:
                    </label>
                    <input
                      type="time"
                      className="form-control"
                      id="die_hora"
                      name="die_hora"
                      value={dietaData.die_hora}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="col-md-4">
                    <label htmlFor="die_tipo" className="form-label">
                      Tipo da dieta
                    </label>
                    <select
                      className="form-control"
                      id="die_tipo"
                      name="die_tipo"
                      value={dietaData.die_tipo}
                      onChange={handleChange}
                      required
                    >
                      <option value="default" disabled hidden>
                        {tiposDietas[0].label}
                      </option>
                      {tiposDietas.map((tipo) => (
                        <option key={tipo.value} value={tipo.value}>
                          {tipo.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="row mb-3">
                  <div className="col-md-12">
                    <label htmlFor="die_descricao" className="form-label">
                      Descrição da dieta:
                    </label>
                    <textarea
                      className="form-control"
                      id="die_descricao"
                      name="die_descricao"
                      required
                      minLength="10"
                      maxLength="1000"
                      rows="6"
                      value={dietaData.die_descricao}
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

export default Dietas;
