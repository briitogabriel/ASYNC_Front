import DietaForm from "../../components/Form/Dieta/DietaForm";
import { PacienteService } from "../../services/Paciente.service";
import * as Styled from './Dieta.style';

import { useEffect, useState } from "react";

export const DietaPage = () => {

  const [pacientes, setPacientes] = useState([]);
  const [pacienteSelecionado, setPacienteSelecionado] = useState('');
  const [idSelecionado, setIdSelecionado] = useState(0);

  useEffect(() => {
    const buscarPacientes = async () => {
      const dados = await PacienteService.buscarPacientes();
      if (dados) {
        setPacientes(dados);
      }
    };

    buscarPacientes();
  }, [])

  const handleChange = ({ target }) => {
    setPacienteSelecionado(target.value)
    let dadosPaciente = pacientes.find(paciente => (paciente.pac_nome === target.value))
    dadosPaciente ? setIdSelecionado(dadosPaciente.pac_id) : setIdSelecionado(-1)
  }

    return (
        <>
          <Styled.DietaPage>
            <Styled.Title>Selecione um Paciente para cadastrar a Dieta</Styled.Title>
            {pacientes.length > 0 ? (
              <>
                <Styled.Select list="pacientes" value={pacienteSelecionado} onChange={(e) => handleChange(e)} />
                <datalist id="pacientes">
                  {pacientes.map((paciente) => (
                    <option key={paciente.pac_id} value={paciente.pac_nome} />
                  ))}
                </datalist>
              </>
            ) : (
              <p>Nenhum paciente encontrado</p>
            )}
            {idSelecionado === 0 ? (
              <Styled.Title>Nenhum paciente selecionado</Styled.Title>
            ) : idSelecionado === -1 ? (
              <Styled.Title>Paciente "{pacienteSelecionado}" não encontrado</Styled.Title>
            ) : (
              <>
                <Styled.Title>Preencha os campos da Dieta para o Paciente "{pacienteSelecionado}"</Styled.Title>
                <DietaForm pacienteId={idSelecionado}/>
              </>
            )}
          </Styled.DietaPage>
        </>
    )
}