import { useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'
import Logo from '../../assets/ASYNClab.png';
// import { UserService } from '../../services/DoctorsServices/UserService';
import './Login.css'
// import { AuthService } from '../../services/AuthService';

export const Login = () => {

  const navigate = useNavigate();

  const formSchema = Yup.object().shape({
    email: Yup.string()
      .required('E-mail is mandatory')
      .email('Email is invalid'),
    password: Yup.string()
      .required('Password is mendatory')
  })
  
  const formOptions = { resolver: yupResolver(formSchema) };
  const { register, handleSubmit, reset, formState } = useForm(formOptions);
  const { errors } = formState;

  function onSubmit(data) {

    const user = UserService.ShowByEmail(data.email);

    if(!user){
      alert('Usuário não cadastrado');
      reset();
      return;
    }

    if(user.password === data.password && user){
      AuthService.Set(user);
      navigate('/cadastrar-usuario');
      return alert("Bem vindo(a)!")
    } else {
      alert('Usuário não cadastrado');
      reset();
      return;
    }
  }

  return(
    <div>
      <main>
        <div className='content-login'>
          <h1 className='tiltle-login'>
          <img  src={Logo}/> 
            </h1>
          <div className="container-login">

            <form onSubmit={handleSubmit(onSubmit)}>

              <div className="form-group">
                <label htmlFor="exampleInputEmail1">Email</label>
                <input name="email" type="email" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="seuemail@email.com" {...register('email')} className={`form-control ${errors.email ? 'is-invalid' : ''}`}/>
                <div className="invalid-feedback">{errors.email?.message}</div>
              </div>

              <div className="form-group">
                <label htmlFor="exampleInputPassword1">Senha</label>
                <input name="password" type="password" id="exampleInputPassword1" placeholder="********" {...register('password')} className={`form-control ${errors.password ? 'is-invalid' : ''}`}/>
                <div className="invalid-feedback">{errors.password?.message}</div>
              </div>

              <button type="submit" className="button"><strong>Entrar</strong></button>

            </form>

          </div>

          <div className='bottom-login'>
            <p className="obs">Esqueceu a senha?? <a href="#" className="click"> Crie uma nova aqui!</a></p>
          </div>

          <div className='bottom-login'>
            <p className="obs">Não possui conta?? <a className="click" onClick={() => alert('Por favor, contate o seu administrador para realização de cadastro de novo usúario.')}> Clique aqui para mais informações.</a></p>
          </div>

        </div>
      </main>
    </div>
  );
}
export default Login;