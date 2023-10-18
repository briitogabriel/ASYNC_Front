import axios from 'axios';
import { useState, useContext } from 'react';
import { AuthContext } from '../../contexts/auth.context'

export const Dieta = () => {

  const { auth, setAuth } = useContext(AuthContext)

  let initialUsuario = {
    email: "admin@asynclab.com",
	  senha: "admin123"
  }
  let initialDieta = {
    die_nome: "Dieta da lua",
    die_data: "2023-10-01",
    die_hora: "00:00:00",
    die_tipo: "Low Carb",
    die_descricao: "Come tudo menos a lua",
    pac_id: 1   // TRAZER DE FORMA DINÂMICA NO FRONT VIA INPUT
  }
    const inputStyle = {border: "1px solid black", height: 75, "padding": 10}
    const [dieta, setDieta] = useState(initialDieta)
    const [usuario, setUsuario] = useState(initialUsuario)

    const sumbitUsuario = (e) => {
      e.preventDefault()
      axios.post('http://localhost:3333/api/usuarios/login', usuario)
      .then((res) => {
        setAuth({
          user: 'Admin',    // TRAZER NO LOGIN - VER SE ALTERA A ESTRUTURA DO ENDPOINT
          token: `${res.data.data}`,
          isLogged: true,
        });
        setUsuario(initialUsuario)
        console.log(auth)
      })
      .catch(function (error) {
        console.log(error);
      });
    }
    const onChangeHandler = (event) => {
      const {name, value} = event
        setUsuario((prev) => {
          return {...prev, [name]: value}
        })
    }

    const sumbitDieta = (e) => {
      e.preventDefault()
      axios.post('http://localhost:3333/api/dietas', dieta, {
        headers: {
          'Authorization': `${auth.token}`
        }
      })
      .then((res) => {
        setDieta(initialDieta)
        console.log(res.data)
      })
      .catch(function (error) {
        console.log(error.response.data);
      });
    }
    const onChangeDieta = (event) => {
      const {name, value} = event
        setDieta((prev) => {
          return {...prev, [name]: value}
        })
    }

      return(
        <>
          <form onSubmit={sumbitUsuario}>
            <table style={inputStyle}>
              <tbody>
                <tr><td>Email:</td><td><input type="text" name="email" value={usuario.email} onChange={(e) => onChangeHandler(e.target)}/></td></tr>
                <tr><td>Senha:</td><td><input type="text" name="senha" value={usuario.senha} onChange={(e) => onChangeHandler(e.target)}/></td></tr>
                <tr><td ><button type="submit">Submit</button></td></tr>
              </tbody>
            </table>
          </form>

          <form onSubmit={sumbitDieta}>
            <table style={inputStyle}>
              <tbody>
                <tr><td>Nome:</td><td><input type="text" name="die_nome" value={dieta.die_nome} onChange={(e) => onChangeDieta(e.target)}/></td></tr>
                <tr><td>Data:</td><td><input type="date" name="die_data" value={dieta.die_data} onChange={(e) => onChangeDieta(e.target)}/></td></tr>
                <tr><td>Hora:</td><td><input type="time" name="die_hora" value={dieta.die_hora} onChange={(e) => onChangeDieta(e.target)}/></td></tr>
                <tr><td>Tipo:</td><td><input type="text" name="die_tipo" value={dieta.die_tipo} onChange={(e) => onChangeDieta(e.target)}/></td></tr>
                <tr><td>Descrição:</td><td><input type="text" name="die_descricao" value={dieta.die_descricao} onChange={(e) => onChangeDieta(e.target)}/></td></tr>
                <tr><td ><button type="submit">Submit</button></td></tr>
              </tbody>
            </table>
          </form>
        
        </>
      )
   }
export default Dieta;