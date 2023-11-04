import { useNavigate } from "react-router-dom";
import { UserService } from "../../../services/User/User.service";

export const FormUsuarioComponent = () => {
    const {
        register,
        handleSubmit,
        reset,
        formState: {errors}
    } = useForm();

    const navigate = useNavigate();

    const submitForm = (data) => {
        const {email, password, repeatPassword} = data;
        console.log(data);

        if (UserService.ShowByEmail(email)) {
            alert('Usuário já cadastrado');
            reset();
            return
        }

        if (password !== repeatPassword) {
            alert('As senhas não conferem');
            reset();
            return
        }
 
        UserService.Create(data);
        navigate('/login')
    }

    return (
        <Styled.Form onSubmit={handleSubmit(submitForm)}>
            <Styled.Title>Cadastre-se</Styled.Title>
            <Styled.InputGroup>
            <InputComponent
          type="text"
          id="name"
          placeholder="Primeiro nome"
          register={register('name', {
            required: true,
          })}
          error={errors.name}
        />
        <InputComponent
          type="email"
          id="email"
          placeholder="E-mail"
          register={register('email', {
            required: true,
            validate: { matchPath: (v) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) },
          })}
          error={errors.email}
        />
        <InputComponent
          type="password"
          id="password"
          placeholder="Senha"
          register={register('password', {
            required: true,
            minLength: 8,
          })}
          error={errors.password}
        />
        <InputComponent
          type="password"
          id="repeatPassword"
          placeholder="Digite sua senha novamente"
          register={register('repeatPassword', {
            required: true,
            minLength: 8,
          })}
          error={errors.repeatPassword}
        />
            </Styled.InputGroup>
            <Styled.Button $active={!errors.email && !errors.password && !errors.name} type="submit" disabled={errors.email || errors.password || errors.name}>Cadastrar</Styled.Button>
        </Styled.Form>
    )
}