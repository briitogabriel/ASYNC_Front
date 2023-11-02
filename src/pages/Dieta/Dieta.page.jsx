import { PacienteService } from "../../services/Paciente.service";
import { DietaService } from "../../services/Dieta.service";

import { getFormattedDate, getFormattedTime } from "../../utils/DateUtils";
import { useToast } from "../../contexts/ToastContext";
import useConfirmation from "../../hooks/useConfirmation";
import Autocomplete from "../../components/Autocomplete/Autocomplete";

import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const Dietas = () => {
  // const { idPaciente, id } = useParams();
  const [pacienteSelecionado, setPacienteSelecionado] = useState(null);
  const navigate = useNavigate();
  const { showConfirm, ConfirmationModal } = useConfirmation();
  const { showToast } = useToast();

  const [pacienteData, setPacienteData] = useState({});
  const [dietaData, setDietaData] = useState({
    die_data: getFormattedDate(),
    die_hora: getFormattedTime(),
  });

  useEffect(() => {
    const buscarPaciente = async () => {
      try {
        const paciente = await PacienteService.detalharPaciente(pacienteSelecionado.id);
        setPacienteData(paciente);
      } catch (error) {
        console.error(error);
      }
    };
    if (pacienteSelecionado) {
      buscarPaciente();
    }
  }, [pacienteSelecionado]);

  useEffect(() => {
    const buscarDietas = async () => {
      try {
        const dieta = await DietaService.detalharDieta(pacienteSelecionado.label);
        setDietaData(dieta);
      } catch (error) {
        showToast("Falha ao buscar dieta do paciente!");
        console.error(error);
      }
    };
    if (pacienteSelecionado) {
      buscarDietas();
    }
  }, [pacienteSelecionado]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDietaData((prevData) => ({ ...prevData, [name]: value }));
  };

  const validateForm = () => {
    // if (dietaData.die_resultados.length <= 15 || dietaData.die_resultados.length > 1000) {
    //     showToast('O Resultado da Dieta deve conter entre 15 e 1000 caracteres.');
    //     return false;
    // }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!validateForm()) {
        return;
      }

      const dietaDataCopy = { ...dietaData };
      dietaDataCopy.die_data = getFormattedDate();
      dietaDataCopy.pac_id = pacienteData.pac_id;

      await DietaService.salvarDieta(JSON.stringify(dietaDataCopy));

      showToast(
        `Dieta do paciente "${pacienteData.pac_nome}" cadastrada com sucesso!`
      );
      navigate(`/prontuarios/${pacienteData.pac_id}`);
    } catch (error) {
      showToast("Falha ao salvar dieta do paciente!");
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
      dietaDataCopy.pac_id = pacienteSelecionado.id;
      dietaDataCopy.die_data = getFormattedDate();

      await DietaService.atualizarDieta(dietaDataCopy);

      showToast(
        `Dieta do paciente "${pacienteData.pac_nome}" atualizada com sucesso!`
      );
      navigate("/home");
    } catch (error) {
      console.error(error);
      showToast("Falha ao atualizar dieta do paciente!");
    }
  };

  const handleDelete = async (e) => {
    showConfirm("Deseja realmente excluir este dieta?", async () => {
      try {
        await DietaService.deletarDieta(pacienteSelecionado);
        showToast(
          `Dieta do paciente "${pacienteData.pac_nome}" deletada com sucesso!`
        );
        navigate("/home");
      } catch (error) {
        showToast("Falha ao deletar o dieta do paciente!");
      }
    });
  };

  const onSelect = (paciente) => {
    // navigate(`/pacientes/${paciente.id}/dietas`);
    setPacienteSelecionado(paciente);
  };

  return (
    <div className="container">
      <ConfirmationModal />
      <div className="row">
        <div className="col-md-12">
          <div className="d-flex align-items-center mb-4">
            <i className="bi bi-clipboard-pulse fs-1 me-2 text-blue align-middle"></i>
            <h2 className="mb-0 text-blue">Cadastro de Dietas</h2>
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
                  Dieta para: {pacienteData && pacienteData.pac_nome}
                </span>
                <div className="d-flex">
                  {pacienteSelecionado.id && (
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
                    disabled={!pacienteSelecionado.id}
                    type="button"
                    className="btn btn-secondary me-2"
                    onClick={handleUpdate}
                  >
                    <i className="bi bi-pencil"></i> Editar
                  </button>
                  <button
                    disabled={!pacienteSelecionado.id}
                    type="button"
                    className="btn btn-danger me-2"
                    onClick={handleDelete}
                  >
                    <i className="bi bi-trash"></i> Deletar
                  </button>
                  {!pacienteSelecionado.id && (
                    <button type="submit" className="btn btn-primary">
                      <i className="bi bi-save"></i> Salvar
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
                    minLength="6"
                    maxLength="60"
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
                  <input
                    type="text"
                    className="form-control"
                    id="die_tipo"
                    name="die_tipo"
                    value={dietaData.die_tipo}
                    onChange={handleChange}
                    required
                    minLength="5"
                    maxLength="30"
                  />
                </div>
              </div>

              <div className="row mb-3">
                <div className="col-md-12">
                  <label htmlFor="die_descricao" className="form-label">
                    Resultado da dieta:
                  </label>
                  <textarea
                    className="form-control"
                    id="die_descricao"
                    name="die_descricao"
                    required
                    minLength="15"
                    maxLength="1000"
                    rows="10"
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
  );
};

export default Dietas;
