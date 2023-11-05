import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import Logo from "../../assets/ASYNClab.png";
import { UserService } from "../../services/Usuario.service";
import "./Login.css";
import { useToast } from "../../contexts/ToastContext";
import { useContext } from "react";
import { AuthContext } from "../../contexts/auth.context";
import { LocalStorageService } from "../../services/LocalStorage.service";

export const Login = () => {
  const { showToast } = useToast();
  const navigate = useNavigate();
  const { setAuth } = useContext(AuthContext);

  const formSchema = Yup.object().shape({
    email: Yup.string()
      .required("E-mail é obrigatório")
      .email("Email inválido"),
    senha: Yup.string().required("Senha é obrigatória"),
  });

  const formOptions = { resolver: yupResolver(formSchema) };
  const { register, handleSubmit, reset, formState } = useForm(formOptions);
  const { errors } = formState;

  const onSubmit = async (data) => {
    try {
      const loginData = await UserService.login(data);

      if (!loginData) {
        showToast("Usuário não cadastrado");
        reset();
        return;
      }

      if (loginData.success) {
        LocalStorageService.set("token", loginData.data.token);
        setAuth({
          user: loginData.data.user,
          token: loginData.data.token,
          isLogged: loginData.success,
        });
        navigate("/");
        return alert("Bem vindo(a)!");
      } else {
        alert("Usuário não cadastrado");
        reset();
        return;
      }
    } catch (error) {
      console.error("Ocorreu um erro na solicitação", error);
    }
  };

  return (
    <div>
      <main>
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
                <strong>Entrar</strong>
              </button>
            </form>
          </div>

          {/* Resetar senha */}
          <div className="bottom-login">
            <p className="obs">
              Esqueceu a senha??{" "}
              <a href="#" className="click">
                {" "}
                Crie uma nova aqui!
              </a>
            </p>
          </div>

          <div className="bottom-login">
            <p className="obs">
              Não possui conta??{" "}
              <a
                className="click"
                onClick={() =>
                  alert(
                    "Por favor, contate o seu administrador para realização de cadastro de novo usúario."
                  )
                }
              >
                {" "}
                Clique aqui para mais informações.
              </a>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};
export default Login;
