import { useNavigate, useParams } from "react-router";
import Autocomplete from "../../components/Autocomplete/Autocomplete";
import Navbar from "../../components/MenuLateral/Navbar/Navbar";
import useConfirmation from "../../hooks/useConfirmation";
import { useEffect, useState } from "react";
import { PacienteService } from "../../services/Paciente.service";
import { getFormattedDate, getFormattedTime } from "../../utils/DateUtils";
import { MedicamentoService } from "../../services/Medicamentos.service";
import { useToast } from "../../contexts/ToastContext";

export const MedicamentosPage = () => {
  const {pacienteId, id} = useParams();
  const { showConfirm, ConfirmationModal } = useConfirmation();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const [pacienteData, setPacienteData] = useState({});
  const [medicamentoData, setMedicamentoData] = useState({
    med_data: getFormattedDate(),
    med_hora: getFormattedTime(),
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
        const fetchMedicamentoData = async () => {
            try {
                const medicamento = await MedicamentoService.detalharMedicamento(id);
                setMedicamentoData(medicamento);
            } catch (error) {
                showToast('Falha ao buscar medicamento do paciente!');
                console.error(error);
            }
        };
        if (id) {
            fetchMedicamentoData();
        }
    }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMedicamentoData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const medicamentoDataCopy = {...medicamentoData};
        medicamentoDataCopy.med_data = getFormattedDate();
        medicamentoDataCopy.pac_id = pacienteData.pac_id;

        await MedicamentoService.salvarMedicamento(JSON.stringify(medicamentoDataCopy));

        showToast(`Medicamento do paciente "${pacienteData.pac_nome}" cadastrado com sucesso!`);
        navigate(`/prontuarios/${pacienteData.pac_id}`);
    } catch (error) {
        showToast('Erro ao cadastrar medicamento');
        console.error(error)
    }
  };

  const handleUpdate = async () => {
    try {
        const medicamentoDataCopy = {...medicamentoData};
        medicamentoDataCopy.med_data = getFormattedDate();
        medicamentoDataCopy.pac_id = pacienteData.pac_id;

        await MedicamentoService.atualizarMedicamento(medicamentoDataCopy);

        showToast(`Medicamento do paciente "${pacienteData.pac_nome}" atualizado com sucesso!`);
        navigate(`/prontuarios/${pacienteData.pac_id}`);
    } catch (error) {
        showToast('Erro ao cadastrar medicamento');
        console.error(error)
    }
  };

  const handleDelete = () => {
    showConfirm('Deseja realmente excluir este medicamento?', async () => {
        try {
            await MedicamentoService.deletarMedicamento(id);
            showToast(`Medicamento do paciente "${pacienteData.pac_nome}" deletado com sucesso!`);
            navigate(`/prontuarios/${pacienteData.pac_id}`);
        } catch (error) {
            showToast('Falha ao deletar medicamento!');
            console.error(error);
        }
    });
  };

  

  const onSelect = (paciente) => {
    navigate(`/pacientes/${paciente.id}/medicamentos`);
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
              <h2 className="mb-0 text-blue">Cadastro de Medicamento</h2>
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
                    Medicamento para: {pacienteData && pacienteData.pac_nome}
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
                    <label htmlFor="med_nome" className="form-label">
                      Nome do medicamento:
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="med_nome"
                      name="med_nome"
                      required
                      minLength="5"
                      maxLength="100"
                      value={medicamentoData.med_nome}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="col-md-4">
                    <label htmlFor="med_data" className="form-label">
                      Data da prescrição:
                    </label>
                    <input
                      type="date"
                      className="form-control"
                      id="med_data"
                      name="med_data"
                      value={medicamentoData.med_data}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="col-md-4">
                    <label htmlFor="med_hora" className="form-label">
                      Horário:
                    </label>
                    <input
                      type="time"
                      className="form-control"
                      id="med_hora"
                      name="med_hora"
                      value={medicamentoData.med_hora}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col-md-12">
                    <label htmlFor="med_descricao" className="form-label">
                      Descrição:
                    </label>
                    <input
                      type='text'
                      className="form-control"
                      id="med_descricao"
                      name="med_descricao"
                      required
                      minLength="10"
                      maxLength="100"
                      value={medicamentoData.med_descricao}
                      onChange={handleChange}
                    ></input>
                  </div>
                </div>
                <div className="row mb-3">
                    <div className="col-md-4 mb-3">
                        <label htmlFor="med_tipo" className="form-label">Tipo do medicamento:</label>
                        <select defaultValue='dafault' className="form-control" name="med_tipo" id="med_tipo" onChange={handleChange}> 
                            <option value="default" desabled="true" hidden> </option>
                            <option value="Cápsula">Cápsula</option>
                            <option value="Comprimido">Comprimido</option>
                            <option value="Líquido">Líquido</option>
                            <option value="Creme">Creme</option>
                            <option value="Gel">Gel</option>
                            <option value="Inalação">Inalação</option>
                            <option value="Injeção">Injeção</option>
                            <option value="Spray">Spray</option>
                        </select>
                    </div>
                  <div className="col-md-4 mb-3">
                    <label htmlFor="med_qtd" className="form-label">
                      Quantidade:
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      id="med_qtd"
                      name="med_qtd"
                      value={medicamentoData.exa_qtd}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="col-md-4 mb-3">
                        <label htmlFor="med_unidade" className="form-label">Unidade:</label>
                        <select defaultValue='dafault' className="form-control" name="med_unidade" id="med_unidade" onChange={handleChange}> 
                            <option value="default" desabled="true" hidden> </option>
                            <option value="mg">mg</option>
                            <option value="mcg">mcg</option>
                            <option value="g">g</option>
                            <option value="mL">mL</option>
                            <option value="%">%</option>
                        </select>
                  </div>
                </div>

                <div className="row mb-3">
                  <div className="col-md-12">
                    <label htmlFor="med_observacoes" className="form-label">
                      Observações:
                    </label>
                    <textarea
                      className="form-control"
                      id="med_observacoes"
                      name="med_observacoes"
                      required
                      minLength="10"
                      maxLength="1000"
                      rows="10"
                      value={medicamentoData.med_observacoes}
                      onChange={handleChange}
                    ></textarea>
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
