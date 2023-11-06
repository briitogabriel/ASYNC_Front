import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import Logo from "../../assets/ASYNClab.png";
import { UserService } from "../../services/Usuario.service";
import "./Resetar.css";
import { useToast } from "../../contexts/ToastContext";
import { useContext } from "react";
import { AuthContext } from "../../contexts/auth.context";
// import { LocalStorageService } from "../../services/LocalStorage.service";
import Message from "../../components/Message/Message";

export const Resetar = () => {
  const { showToast } = useToast();
  const navigate = useNavigate();
  // const { setAuth } = useContext(AuthContext);

  const formSchema = Yup.object().shape({
    email: Yup.string()
      .required("E-mail é obrigatório")
      .email("Email inválido"),
    senha: Yup.string().required("Senha é obrigatória"),
  });

  const formOptions = { resolver: yupResolver(formSchema) };
  const { register, handleSubmit, reset, formState } = useForm(formOptions);
  const { errors } = formState;

  // const onSubmit = async (data) => {
  //     const loginData = await UserService.login(data);

  //     if (!loginData) {
  //       showToast("Usuário não cadastrado");
  //       reset();
  //       return;
  //     }

  //     if (loginData.success) {
  //       LocalStorageService.set("token", loginData.data.token);
  //       setAuth({
  //         user: loginData.data.user,
  //         token: loginData.data.token,
  //         isLogged: loginData.success,
  //       });
  //       navigate("/");
  //       showToast("Bem vindo(a)!");
  //     } else {
  //       showToast("Usuário não cadastrado");
  //       reset();
  //       return;
  //     }
  // };

  const onSubmit = async (data) => {
      const usuariosCadastrados = await UserService.getUsers();
      const usuarioEncontrado = usuariosCadastrados.find(usuario => usuario.email == data.email)

      if (!usuarioEncontrado) {
        showToast("Usuário não encontrado");
        reset();
        return;
      }

      if (usuarioEncontrado) {
        const dadosResetar = {
          usu_id: usuarioEncontrado.usuarioId,
          usu_email: usuarioEncontrado.email,
          usu_senha: data.senha
        }

        await UserService.resetarSenha(JSON.stringify(dadosResetar));

        navigate("/");
        showToast(`Senha do usuário ${usuarioEncontrado.nome} resetada com sucesso!`);
      } else {
        showToast("Problema no reset de senha.");
        reset();
        return;
      }
  };

  const navigateLogin = () => {
    navigate(`/usuarios/login`);
  };

  return (
    <div>
      <main>
        <Message/>
        <div className="content-login">
          <h1 className="tiltle-login">
            <img src={Logo} />
          </h1>
          <div className="container-login">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="form-group">
                <label htmlFor="exampleInputEmail1">Email</label>
                <input
                  name="email"
                  type="email"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  placeholder="seuemail@email.com"
                  {...register("email")}
                  className={`form-control ${errors.email ? "is-invalid" : ""}`}
                />
                <div className="invalid-feedback">{errors.email?.message}</div>
              </div>

              <div className="form-group">
                <label htmlFor="exampleInputPassword1">Senha</label>
                <input
                  name="senha"
                  type="password"
                  id="exampleInputPassword1"
                  placeholder="********"
                  {...register("senha")}
                  className={`form-control ${errors.senha ? "is-invalid" : ""}`}
                />
                <div className="invalid-feedback">{errors.senha?.message}</div>
              </div>

              <button type="submit" className="button">
                <strong>Redefinir Senha</strong>
              </button>
            </form>
          </div>

          <div className="bottom-login">
            <p className="obs">
              <a className="click" onClick={navigateLogin}>
                Retornar ao Login
              </a>
            </p>
          </div>

        </div>
      </main>
    </div>
  );
};
export default Resetar;
