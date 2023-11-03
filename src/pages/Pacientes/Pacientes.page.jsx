import React, { useEffect, useState } from 'react';
import PacienteForm from "../../components/Form/Paciente/PacienteForm.component"
import { PacienteService } from "../../services/Paciente.service";


const CadastroPaciente = () => {
  const [nome, setNome] = useState("");
  const [genero, setGenero] = useState("");
  const [nascimento, setNascimento] = useState("");
  const [cpf, setCpf] = useState("");
  const [rg, setRg] = useState("");
  const [estadoCivil, setEstadoCivil] = useState("");
  const [telefone, setTelefone] = useState("");
  const [email, setEmail] = useState("");
  const [contatoEmergencia, setContatoEmergencia] = useState("");
  const [alergias, setAlergias] = useState("");
  const [cuidadosEspeciais, setCuidadosEspeciais] = useState("");
  const [convenio, setConvenio] = useState("");
  const [numeroConvenio, setNumeroConvenio] = useState("");
  const [validadeConvenio, setValidadeConvenio] = useState("");
  const [cep, setCep] = useState("");
  const [cidade, setCidade] = useState("");
  const [logradouro, setLogradouro] = useState("");
  const [compNumero, setCompNumero] = useState("");
  const [compComplemento, setCompComplemento] = useState("");
  const [compBairro, setCompBairro] = useState("");
  const [compPontoReferencia, setCompPontoReferencia] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const id = uuidv4();

    const data = {
        id,
        nome,
        genero,
        nascimento,
        cpf,
        rg,
        estadoCivil,
        telefone,
        email,
        naturalidade,
        contatoEmergencia,
        alergias,
        cuidadosEspeciais, 
        convenio,
        numeroConvenio,
        validadeConvenio,
        cep, 
        cidade, 
        logradouro,
        compNumero, 
        compComplemento,
        compBairro, 
        compPontoReferencia
    };

    PacienteService.criarPacientes(data);

    setMensagem("Paciente cadastrado com sucesso!");

    setId("");
    setNome("");
    setGenero("");
    setNascimento("");
    setCpf("");
    setRg("");
    setEstadoCivil("");
    setTelefone("");
    setEmail("");
    setNaturalidade("");
    setContatoEmergencia("");
    setAlergias("");
    setCuidadosEspeciais("");
    setConvenio("");
    setNumeroConvenio("");
    setValidadeConvenio("");
    setCep("");
    setCidade("");
    setLogradouro("");
    setCompNumero("");
    setCompComplemento("");
    setCompBairro("");
    setCompPontoReferencia("");
  };

  return (
    <div>
      <Navbar/>
      <h1>Cadastro de Paciente</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="nome">Nome Completo:</label>
        <input
          type="text"
          id="nome"
          name="nome"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          required
          minLength="8"
          maxLength="64"
        /><br /><br />

        <label htmlFor="genero">Gênero:</label>
        <select
          id="genero"
          name="genero"
          value={genero}
          onChange={(e) => setGenero(e.target.value)}
          required
        >
          <option value="Masculino">Masculino</option>
          <option value="Feminino">Feminino</option>
          <option value="Outro">Outro</option>
        </select><br /><br />

        <label htmlFor="nascimento">Data de Nascimento:</label>
        <input
          type="text"
          id="nascimento"
          name="nascimento"
          value={nascimento}
          onChange={(e) => setNascimento(e.target.value)}
          required
          minLength="8"
          maxLength="64"
        /><br /><br />

        <label htmlFor="cpf">CPF:</label>
        <input
          type="text"
          id="cpf"
          name="cpf"
          value={cpf}
          onChange={(e) => setCpf(e.target.value)}
          required
          pattern="\d{3}\.\d{3}\.\d{3}-\d{2}"
        /><br /><br />

        <label htmlFor="rg">RG:</label>
        <input
          type="text"
          id="rg"
          name="rg"
          value={rg}
          onChange={(e) => setRg(e.target.value)}
          required
        /><br /><br />

        <label htmlFor="estadoCivil">Estado Civil:</label>
        <input
          type="text"
          id="estadoCivil"
          name="estadoCivil"
          value={estadoCivil}
          onChange={(e) => setEstadoCivil(e.target.value)}
          required
          minLength="8"
          maxLength="64"
        /><br /><br />

        <label htmlFor="telefone">Telefone:</label>
        <input
          type="text"
          id="telefone"
          name="telefone"
          value={telefone}
          onChange={(e) => setTelefone(e.target.value)}
          required
          pattern="\(\d{2}\) \d{1} \d{4}-\d{5}"
        /><br /><br />

        <label htmlFor="email">E-mail:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        /><br /><br />

        <label htmlFor="naturalidade">Naturalidade:</label>
        <input
          type="text"
          id="naturalidade"
          name="naturalidade"
          value={naturalidade}
          onChange={(e) => setNaturalidade(e.target.value)}
          required
        /><br /><br />

        <label htmlFor="contatoEmergencia">Contato de Emergência:</label>
        <input
          type="text"
          id="contatoEmergencia"
          name="contatoEmergencia"
          value={contatoEmergencia}
          onChange={(e) => setContatoEmergencia(e.target.value)}
          required
        /><br /><br />

        <label htmlFor="alergias">Alergias:</label>
        <input
          type="text"
          id="alergias"
          name="alergias"
          value={alergias}
          onChange={(e) => setAlergias(e.target.value)}
          required
        /><br /><br />

        <label htmlFor="cuidadosEspeciais">Cuidados Especiais:</label>
        <input
          type="text"
          id="cuidadosEspeciais"
          name="cuidadosEspeciais"
          value={cuidadosEspeciais}
          onChange={(e) => setCuidadosEspeciais(e.target.value)}
          required
        /><br /><br />

        <label htmlFor="convenio">Convênio:</label>
        <input
          type="text"
          id="convenio"
          name="convenio"
          value={convenio}
          onChange={(e) => setConvenio(e.target.value)}
          required
        /><br /><br />

        <label htmlFor="numeroConvenio">Número do Convênio:</label>
        <input
          type="text"
          id="numeroConvenio"
          name="numeroConvenio"
          value={numeroConvenio}
          onChange={(e) => setCuidadosEspeciais(e.target.value)}
          required
        /><br /><br />

        <label htmlFor="validadeConvenio">Validade do Convênio:</label>
        <input
          type="text"
          id="validadeConvenio"
          name="validadeConvenio"
          value={validadeConvenio}
          onChange={(e) => setValidadeConvenio(e.target.value)}
          required
        /><br /><br />

        <label htmlFor="cep">Cep:</label>
        <input
          type="text"
          id="cep"
          name="cep"
          value={cep}
          onChange={(e) => setCep(e.target.value)}
          required
        /><br /><br />

        <label htmlFor="cidade">Cidade:</label>
        <input
          type="text"
          id="cidade"
          name="cidade"
          value={cidade}
          onChange={(e) => setCidade(e.target.value)}
          required
        /><br /><br />

        <label htmlFor="logradouro">Logradouro:</label>
        <input
          type="text"
          id="logradouro"
          name="logradouro"
          value={logradouro}
          onChange={(e) => setLogradouro(e.target.value)}
          required
        /><br /><br />

        <label htmlFor="compNumero">Número:</label>
        <input
          type="text"
          id="compNumero"
          name="compNumero"
          value={compNumero}
          onChange={(e) => setCompNumero(e.target.value)}
          required
        /><br /><br />

        <label htmlFor="compComplemento">Complemento:</label>
        <input
          type="text"
          id="compComplemento"
          name="compComplemento"
          value={compComplemento}
          onChange={(e) => setCompComplemento(e.target.value)}
          required
        /><br /><br />

      <label htmlFor="compBairro">Bairro:</label>
        <input
          type="text"
          id="compBairro"
          name="compBairro"
          value={compBairro}
          onChange={(e) => setCompBairro(e.target.value)}
          required
        /><br /><br />

        <label htmlFor="compPontoReferencia">Ponto de Referência:</label>
        <input
          type="text"
          id="compPontoReferencia"
          name="compPontoReferencia"
          value={compPontoReferencia}
          onChange={(e) => setCompPontoReferencia(e.target.value)}
          required
        /><br /><br />

        <button type="submit">Cadastrar</button>
      </form>

      <p>{mensagem}</p>
    </div>
  );
};

export default CadastroPaciente;
