import { useForm } from "react-hook-form";
import { InputComponent } from "../Input/Input.component";
// import { useNavigate } from "react-router-dom";
import * as Styled from "./DietaForm.style";

import { DietaService } from "../../../services/Dieta.service";

export const DietaForm = ({pacienteId}) => {
  const dietas = [
    { value: 'Low Carb', label: 'Low Carb' },
    { value: 'Dash', label: 'Dash' },
    { value: 'Paleolítica', label: 'Paleolítica' },
    { value: 'Cetogênica', label: 'Cetogênica' },
    { value: 'Dukan', label: 'Dukan' },
    { value: 'Mediterrânea', label: 'Mediterrânea' },
    { value: 'Outra', label: 'Outra' },
  ];

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const submitForm = async (data) => {
    data.pac_id = pacienteId;
    const dietaCadastrada = await DietaService.criarDieta(data);
    console.log(dietaCadastrada);
    dietaCadastrada ? alert('Dieta Cadastrada com Sucesso!') : alert('Erro')
    reset();
  };

  return (
    <Styled.Form onSubmit={handleSubmit(submitForm)}>

      <Styled.InputGroup className="InputGroup">
        <Styled.Titles>Dados</Styled.Titles>
        <InputComponent
          label="Nome da Dieta"
          id="die_nome"
          type="text"
          register={{
            ...register("die_nome", {
              required: {
                value: true,
                message: "O campo é obrigatório"
              },
              minLength: {
                value: 5,
                message: "O nome deve ter pelo menos 5 caracteres",
              },
              maxLength: {
                value: 100,
                message: "O nome não pode exceder 100 caracteres",
              },
            }),
          }}
          error={errors.die_nome}
        />
        <Styled.InputRow className="InputRow">
          <InputComponent
            label="Data"
            id="die_data"
            type="date"
            register={{
              ...register("die_data", {
                required: {
                  value: true,
                  message: "O campo é obrigatório"
                },
              }),
            }}
            error={errors.die_data}
          />
          <InputComponent
            label="Horário"
            id="die_hora"
            type="time"
            register={{
              ...register("die_hora", {
                required: {
                  value: true,
                  message: "O campo é obrigatório"
                },
              }),
            }}
            error={errors.die_hora}
          />
          <InputComponent
            label="Tipo de Dieta"
            id="die_tipo"
            type="select"
            options={dietas}
            register={{
              ...register("die_tipo", {
                required: {
                  value: true,
                  message: "O campo é obrigatório"
                },
              }),
            }}
            error={errors.die_tipo}
          />
        </Styled.InputRow>
        <Styled.InputRow className="InputRow">
          <InputComponent
            label="Descrição"
            id="die_descricao"
            type="textarea"
            register={{
              ...register("die_descricao", {
                required: {
                  value: true,
                  message: "O campo é obrigatório"
                },
                minLength: {
                  value: 10,
                  message: "A descrição deve ter pelo menos 10 caracteres",
                },
                maxLength: {
                  value: 1000,
                  message: "A descrição não pode exceder 1000 caracteres",
                },
              }),
            }}
            error={errors.die_descricao}
          />
        </Styled.InputRow>
      </Styled.InputGroup>

      <Styled.ButtonsWrapper>
        <Styled.Button
          $active={!Object(errors).length}
          type="button"
          disabled={Object(errors).length}
        >
          Editar
        </Styled.Button>
        <Styled.Button
          $color="red"
          $active={!Object(errors).length}
          type="button"
          disabled={Object(errors).length}
        >
          Deletar
        </Styled.Button>
        <Styled.Button
          $active={!Object(errors).length}
          type="submit"
          disabled={Object(errors).length}
        >
          Salvar
        </Styled.Button>
      </Styled.ButtonsWrapper>

    </Styled.Form>
  );
};
export default DietaForm;
