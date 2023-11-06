import React from 'react';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { UserService } from '../../services/Usuario.service';
import Logo from '../../assets/ASYNClab.png';
import './Usuario.css'; 

const CadastroUsuario = () => {
  const formSchema = Yup.object().shape({
    nome: Yup.string().required('Nome é obrigatório'),
    genero: Yup.string().required('Gênero é obrigatório'),
    cpf: Yup.string().required('CPF é obrigatório'),
    telefone: Yup.string().required('Telefone é obrigatório'),
    email: Yup.string().required('E-mail é obrigatório').email('E-mail inválido'),
    senha: Yup.string().required('Senha é obrigatória').min(6, 'A senha deve ter pelo menos 6 caracteres'),
    tipo: Yup.string().required('Tipo é obrigatório'),
  });

  const formOptions = { resolver: yupResolver(formSchema) };
  const { register, handleSubmit, reset, formState } = useForm(formOptions);
  const { errors } = formState;

  const onSubmit = async (data) => {
    console.log(data);

    const result = await UserService.createUser(data);

    if (result.success) {
      alert('Usuário cadastrado com sucesso!');
      reset();
    } else {
      alert('Erro ao cadastrar usuário. Verifique os dados e tente novamente.');
    }
  };

  return (
    <div>
      <main>
        <div className='content-usuario'>
          <h1 className='title-usuario'>
          <img  src={Logo}/> 
          < br/>
          Cadastro de Usuário
          </h1>
          < br/>
          <div className="container-usuario">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="form-group-usuario">
                <label htmlFor="nome">Nome Completo:</label>
                <input
                  type="text"
                  id="nome"
                  name="nome"
                  placeholder="Seu nome completo"
                  {...register('nome')}
                  className={`form-control ${errors.nome ? 'is-invalid' : ''}`}
                />
                <div className="invalid-feedback">{errors.nome?.message}</div>
              </div>

              <div className="form-group-usuario">
                <label htmlFor="genero">Gênero:</label>
                <select
                  id="genero"
                  name="genero"
                  {...register('genero')}
                  className={`form-control ${errors.genero ? 'is-invalid' : ''}`}
                >
                  <option value="">Selecione o gênero</option>
                  <option value="Masculino">Masculino</option>
                  <option value="Feminino">Feminino</option>
                  <option value="Outro">Outro</option>
                </select>
                <div className="invalid-feedback">{errors.genero?.message}</div>
              </div>

              <div className="form-group-usuario">
                <label htmlFor="cpf">CPF:</label>
                <input
                  type="text"
                  id="cpf"
                  name="cpf"
                  placeholder="123.456.789-00"
                  {...register('cpf')}
                  className={`form-control ${errors.cpf ? 'is-invalid' : ''}`}
                />
                <div className="invalid-feedback">{errors.cpf?.message}</div>
              </div>

              <div className="form-group-usuario">
                <label htmlFor="telefone">Telefone:</label>
                <input
                  type="text"
                  id="telefone"
                  name="telefone"
                  placeholder="(12) 3456-78901"
                  {...register('telefone')}
                  className={`form-control ${errors.telefone ? 'is-invalid' : ''}`}
                />
                <div className="invalid-feedback">{errors.telefone?.message}</div>
              </div>

              <div className="form-group-usuario">
                <label htmlFor="email">E-mail:</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="seuemail@email.com"
                  {...register('email')}
                  className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                />
                <div className="invalid-feedback">{errors.email?.message}</div>
              </div>

              <div className="form-group-usuario">
                <label htmlFor="senha">Senha:</label>
                <input
                  type="password"
                  id="senha"
                  name="senha"
                  placeholder="******"
                  {...register('senha')}
                  className={`form-control ${errors.senha ? 'is-invalid' : ''}`}
                />
                <div className="invalid-feedback">{errors.senha?.message}</div>
              </div>

              <div className="form-group-usuario">
                <label htmlFor="tipo">Tipo:</label>
                <select
                  id="tipo"
                  name="tipo"
                  {...register('tipo')}
                  className={`form-control ${errors.tipo ? 'is-invalid' : ''}`}
                >
                  <option value="">Selecione o tipo</option>
                  <option value="Médico">Médico</option>
                  <option value="Administrador">Administrador</option>
                  <option value="Enfermeiro">Enfermeiro</option>
                </select>
                <div className="invalid-feedback">{errors.tipo?.message}</div>
              </div>
              <button type="submit" className="button"><strong>Cadastrar</strong></button>
            </form>
          </div>

        </div>
      </main>
    </div>
  );
};

export default CadastroUsuario;
