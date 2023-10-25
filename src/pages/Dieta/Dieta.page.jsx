import DietaForm from "../../components/Form/Dieta/DietaForm";
import * as Styled from './Dieta.style';

export const DietaPage = () => {

  const paciente = {  //NECESSÁRIO PUXAR MÉTODO PARA BUSCAR PACIENTES + ID
    id: 1,
    nome: 'Teste teste'
  }

    return (
        <>
          <Styled.PatientRegister>
            <Styled.Title>Preencha os campos para cadastrar uma nova Dieta</Styled.Title>
            <DietaForm paciente={paciente}/>
          </Styled.PatientRegister>
        </>
    )
}