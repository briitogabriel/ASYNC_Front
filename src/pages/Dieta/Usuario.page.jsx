import axios from 'axios';
import { useState, useContext } from 'react';
import { AuthContext } from '../../contexts/auth.context'

export const CadastroUsuario = () => {

  const { auth, setAuth } = useContext(AuthContext)

  const [nome, setNome] = useState("");
  const [genero, setGenero] = useState("");
  const [cpf, setCpf] = useState("");
  const [telefone, setTelefone] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [tipo, setTipo] = useState("");
  const [mensagem, setMensagem] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Falta validar campos do formulário

    const data = {
      nome,
      genero,
      cpf,
      telefone,
      email,
      senha,
      tipo,
    };

    axios.post("/cadastrar-usuario", data) // Falta validar a rota de criação
      .then((response) => {
        const result = response.data;
        if (result.success) {
          setMensagem(result.message);
        } else {
          setMensagem(`Erro: ${result.message}`);
        }
      })
      .catch((error) => {
        setMensagem(`Erro: ${error.message}`);
      });
  };

  return (
    <div>
      <h1>Cadastro de Usuário</h1>
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

        <label htmlFor="senha">Senha:</label>
        <input
          type="password"
          id="senha"
          name="senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          required
          minLength="6"
        /><br /><br />

        <label htmlFor="tipo">Tipo:</label>
        <select
          id="tipo"
          name="tipo"
          value={tipo}
          onChange={(e) => setTipo(e.target.value)}
          required
        >
          <option value="Médico">Médico</option>
          <option value="Administrador">Administrador</option>
          <option value="Enfermeiro">Enfermeiro</option>
        </select><br /><br />

        <button type="submit">Cadastrar</button>
      </form>

      <p>{mensagem}</p>
    </div>
  );
}
export default CadastroUsuario;