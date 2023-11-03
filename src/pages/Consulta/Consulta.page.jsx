import React, { useEffect, useState } from 'react';
import { ConsultaService } from "../../services/Consultas.service";
import Navbar from '../../components/MenuLateral/Navbar/Navbar';


export const ConsultaPage = () => {
  const [motivoConsulta, setMotivoConsulta] = useState('');
  const [dataConsulta, setDataConsulta] = useState(new Date());
  const [horarioConsulta, setHorarioConsulta] = useState('');
  const [descricaoProblema, setDescricaoProblema] = useState('');
  const [medicacaoReceitada, setMedicacaoReceitada] = useState('');
  const [dosagemPrecaucoes, setDosagemPrecaucoes] = useState('');
  const [statusSistema, setStatusSistema] = useState(true);

   const handleSubmit = (e) => {
    e.preventDefault();

    const id = uuidv4();

    const data = {
        id,
        motivoConsulta,
        dataConsulta,
        horarioConsulta,
        descricaoProblema,
        medicacaoReceitada,
        dosagemPrecaucoes,
        statusSistema
    };

    ConsultaService.criarConsulta({ id: consultaId, ...data });

    setMensagem("Consulta cadastrada com sucesso!");

    setId("");
    setMotivoConsulta("");
    setDataConsulta("");
    setHorarioConsulta("");
    setDescricaoProblema("");
    setMedicacaoReceitada("");
    setDosagemPrecaucoes("");
    setStatusSistema("");
  };

  return (
    <div>
      <Navbar/>
      <h1>Dados da Consulta</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="motivoConsulta">Motivo da Consulta:</label>
        <input
          type="text"
          id="motivoConsulta"
          name="motivoConsulta"
          value={motivoConsulta}
          onChange={(e) => setMotivoConsulta(e.target.value)}
          required
          minLength="8"
          maxLength="64"
        /><br /><br />

        <label htmlFor="dataConsulta">Data da Consulta:</label>
            <input
              type="text"
              id="dataConsulta"
              name="dataConsulta"
              value={dataConsulta}
              onChange={(e) => setDataConsulta(e.target.value)}
              required
              minLength="8"
              maxLength="64"
            /><br /><br />

          <label htmlFor="horarioConsulta">Horário da Consulta:</label>
            <input
              type="text"
              id="horarioConsulta"
              name="horarioConsulta"
              value={horarioConsulta}
              onChange={(e) => setHorarioConsulta(e.target.value)}
              required
              minLength="8"
              maxLength="64"
            /><br /><br />
            
          <label htmlFor="descricaoProblema">Descrição do Problema:</label>
            <input
              type="text"
              id="descricaoProblema"
              name="descricaoProblema"
              value={descricaoProblema}
              onChange={(e) => setDescricaoProblema(e.target.value)}
              required
              minLength="8"
              maxLength="64"
            /><br /><br />
          
          <label htmlFor="medicacaoReceitada">Medicação Receitada:</label>
            <input
              type="text"
              id="medicacaoReceitada"
              name="medicacaoReceitada"
              value={medicacaoReceitada}
              onChange={(e) => setMedicacaoReceitada(e.target.value)}
              required
              minLength="8"
              maxLength="64"
            /><br /><br />

          <label htmlFor="dosagemPrecaucoes">Dosagem e Precauções:</label>
            <input
              type="text"
              id="dosagemPrecaucoes"
              name="dosagemPrecaucoes"
              value={dosagemPrecaucoes}
              onChange={(e) => setDosagemPrecaucoes(e.target.value)}
              required
              minLength="8"
              maxLength="64"
            /><br /><br />

          <label htmlFor="statusSistema">Status do Sistema:</label>
            <input
              type="text"
              id="statusSistema"
              name="statusSistema"
              value={statusSistema}
              onChange={(e) => setStatusSistema(e.target.value)}
              required
              minLength="8"
              maxLength="64"
            /><br /><br />                

        <button type="submit">Cadastrar</button>
      </form>

     {/*  <p>{mensagem}</p> */}
    </div>
  );
};

