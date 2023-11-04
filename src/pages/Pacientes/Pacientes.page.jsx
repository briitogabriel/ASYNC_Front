import React, { useEffect, useState } from 'react';
import Autocomplete from "../../components/Autocomplete/Autocomplete";
import { ConsultaService } from "../../services/Consultas.service";
import Navbar from '../../components/MenuLateral/Navbar/Navbar';
import { PacienteService } from "../../services/Paciente.service";
import { ProntuarioService } from "../../services/Prontuarios.service";
import { getFormattedDate, getFormattedTime } from "../../utils/DateUtils";
import useConfirmation from "../../hooks/useConfirmation";
import { useNavigate, useParams } from "react-router";
import { useToast } from "../../contexts/ToastContext";


export const PacientesPage = () => {
  const {pacienteId, id} = useParams();
  const { showConfirm, ConfirmationModal } = useConfirmation();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const [pacienteData, setPacienteData] = useState({});

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setConsultaData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const pacienteDataCopy = {...pacienteData};
        pacienteDataCopy.pac_id = pacienteData.pac_id;

        await PacienteService.salvarPaciente(JSON.stringify(pacienteDataCopy));

        showToast(`Cadastro do paciente "${pacienteData.pac_nome}" realizado com sucesso!`);
        navigate(`/pacientes/${pacienteData.pac_id}`);
    } catch (error) {
        showToast('Erro ao cadastrar paciente');
        console.error(error)
    }
  };

  const handleUpdate = async () => {
    try {
        const pacienteDataCopy = {...pacienteData};
        pacienteDataCopy.pac_id = pacienteData.pac_id;

        await PacienteService.atualizarPaciente(pacienteDataCopy);

        showToast(`Cadastro do paciente "${pacienteData.pac_nome}" atualizado com sucesso!`);
        navigate(`/pacientes/${pacienteData.pac_id}`);
    } catch (error) {
        showToast('Erro ao cadastrar paciente');
        console.error(error)
    }
  };

  const handleDelete = () => {
    showConfirm('Deseja realmente excluir este cadastro?', async () => {
        try {
            await PacienteService.deletarPaciente(id);
            showToast(`Cadastro do paciente "${pacienteData.pac_nome}" deletado com sucesso!`);
            navigate(`/pacientes/${pacienteData.pac_id}`);
        } catch (error) {
            showToast('Falha ao deletar cadastro!');
            console.error(error);
        }
    });
  };

  const onSelect = (paciente) => {
    navigate(`/pacientes/${paciente.id}`);
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
              <h2 className="mb-0 text-blue">Cadastro de Paciente</h2>
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
                    Cadastro de: {pacienteData && pacienteData.pac_nome}
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
                    <label htmlFor="nome" className="form-label">
                    Nome Completo:
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="nome"
                      name="nome"
                      required
                      minLength="8"
                      maxLength="64"
                      value={pacienteData.nome}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="col-md-4">
                    <label htmlFor="genero" className="form-label">
                    Gênero:
                    </label>
                    <select defaultValue='default' className="form-control" name="genero" id="genero" onChange={handleChange}> 
                            <option value="default" desabled="true" hidden> </option>
                            <option value="Masculino">Masculino</option>
                            <option value="Feminino">Feminino</option>
                            <option value="Outros">Outros</option>
                        </select>
                  </div>
                  <div className="col-md-4">
                    <label htmlFor="nascimento" className="form-label">
                      Data de Nascimento:
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="nascimento"
                      name="nascimento"
                      value={pacienteData.nascimento}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col-md-12">
                    <label htmlFor="cpf" className="form-label">
                      CPF:
                    </label>
                    <input
                      type='text'
                      className="form-control"
                      id="cpf"
                      name="cpf"
                      required
                      pattern="\d{3}\.\d{3}\.\d{3}-\d{2}"
                      value={pacienteData.cpf}
                      onChange={handleChange}
                    ></input>
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col-md-12">
                    <label htmlFor="rg" className="form-label">
                      RG:
                    </label>
                    <input
                      type='text'
                      className="form-control"
                      id="rg"
                      name="rg"
                      required
                      value={pacienteData.rg}
                      onChange={handleChange}
                    ></input>
                  </div>
                </div>
                <div className="row mb-3">
                    <div className="col-md-4 mb-3">
                        <label htmlFor="estadoCivil" className="form-label">Estado Civil:</label>
                        <input
                      type='text'
                      className="form-control"
                      id="estadoCivil"
                      name="estadoCivil"
                      required
                      value={pacienteData.estadoCivil}
                      onChange={handleChange}
                    ></input>
                    </div>
                  <div className="col-md-4 mb-3">
                    <label htmlFor="telefone" className="form-label">
                      Telefone:
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="telefone"
                      name="telefone"
                      value={pacienteData.telefone}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="col-md-4 mb-3">
                        <label htmlFor="email" className="form-label">E-mail:</label>
                        <input
                      type="text"
                      className="form-control"
                      id="email"
                      name="email"
                      value={pacienteData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="row mb-3">
                  <div className="col-md-12">
                    <label htmlFor="naturalidade" className="form-label">
                    Naturalidade:
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="naturalidade"
                      name="naturalidade"
                      value={pacienteData.naturalidade}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col-md-12">
                    <label htmlFor="contatoEmergencia" className="form-label">
                    Contato de Emergencia:
                    </label>
                    <input
                      type='text'
                      className="form-control"
                      id="contatoEmergencia"
                      name="contatoEmergencia"
                      required
                      value={pacienteData.contatoEmergencia}
                      onChange={handleChange}
                    ></input>
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col-md-12">
                    <label htmlFor="alergias" className="form-label">
                    Alergias:
                    </label>
                    <input
                      type='text'
                      className="form-control"
                      id="alergias"
                      name="alergias"
                      required
                      value={pacienteData.alergias}
                      onChange={handleChange}
                    ></input>
                  </div>
                </div>
                <div className="row mb-3">
                    <div className="col-md-4 mb-3">
                        <label htmlFor="cuidadosEspeciais" className="form-label">Cuidados Especiais:</label>
                        <input
                      type='text'
                      className="form-control"
                      id="cuidadosEspeciais"
                      name="cuidadosEspeciais"
                      required
                      value={pacienteData.cuidadosEspeciais}
                      onChange={handleChange}
                    ></input>
                    </div>
                  <div className="col-md-4 mb-3">
                    <label htmlFor="convenio" className="form-label">
                    Convenio:
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="convenio"
                      name="convenio"
                      value={pacienteData.convenio}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="col-md-4 mb-3">
                        <label htmlFor="numeroConvenio" className="form-label">Numero do Convenio:</label>
                        <input
                      type="text"
                      className="form-control"
                      id="numeroConvenio"
                      name="numeroConvenio"
                      value={pacienteData.numeroConvenio}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="row mb-3">
                  <div className="col-md-12">
                    <label htmlFor="validadeConvenio" className="form-label">
                    Validade do Convenio:
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="validadeConvenio"
                      name="validadeConvenio"
                      value={pacienteData.validadeConvenio}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col-md-12">
                    <label htmlFor="cep" className="form-label">
                    Cep:
                    </label>
                    <input
                      type='text'
                      className="form-control"
                      id="cep"
                      name="cep"
                      required
                      value={pacienteData.cep}
                      onChange={handleChange}
                    ></input>
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col-md-12">
                    <label htmlFor="cidade" className="form-label">
                    Cidade:
                    </label>
                    <input
                      type='text'
                      className="form-control"
                      id="cidade"
                      name="cidade"
                      required
                      value={pacienteData.cidade}
                      onChange={handleChange}
                    ></input>
                  </div>
                </div>
                <div className="row mb-3">
                    <div className="col-md-4 mb-3">
                        <label htmlFor="logradouro" className="form-label">Logradouro:</label>
                        <input
                      type='text'
                      className="form-control"
                      id="logradouro"
                      name="logradouro"
                      required
                      value={pacienteData.logradouro}
                      onChange={handleChange}
                    ></input>
                    </div>
                  <div className="col-md-4 mb-3">
                    <label htmlFor="compNumero" className="form-label">
                    Numero:
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="compNumero"
                      name="compNumero"
                      value={pacienteData.compNumero}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="col-md-4 mb-3">
                        <label htmlFor="compComplemento" className="form-label">Complemento:</label>
                        <input
                      type="text"
                      className="form-control"
                      id="compComplemento"
                      name="compComplemento"
                      value={pacienteData.compComplemento}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="row mb-3">
                  <div className="col-md-12">
                    <label htmlFor="compBairro" className="form-label">
                    Bairro:
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="compBairro"
                      name="compBairro"
                      value={pacienteData.compBairro}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="row mb-3">
                  <div className="col-md-12">
                    <label htmlFor="compPontoReferencia" className="form-label">
                    Ponto de Referência:
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="compPontoReferencia"
                      name="compPontoReferencia"
                      value={pacienteData.compPontoReferencia}
                      onChange={handleChange}
                      required
                    />
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
