import axios from 'axios';
import { useState } from 'react';

export const App = () => {
  let initialState = {
    die_nome: "Dieta da lua",
    die_data: "2023-10-01",
    die_hora: "00:00:00",
    die_tipo: "Low Carb",
    die_descricao: "Come tudo menos a lua",
    pac_id: 1
  }
    const inputStyle = {border: "1px solid black", height: 75, "padding": 10}
    const [dieta, setDieta] = useState(initialState)
    const [response, setResponse] = useState()

    const sumbitForm = (e) => {
      e.preventDefault()
      axios.post('http://localhost:3333/api/dietas', dieta)
      .then((res) => {
        setResponse(res.data)
        setDieta(initialState)
        console.log(res.data)
      })
      .catch(function (error) {
        console.log(error);
      });
    }
    const onChangeHandler = (event) => {
      const {name, value} = event
        setDieta((prev) => {
          return {...prev, [name]: value}
        })
    }
     return(
          <form onSubmit={sumbitForm}>
            <table style={inputStyle}>
              <tbody>
                <tr><td>Nome:</td><td><input type="text" name="die_nome" value={dieta.die_nome} onChange={(e) => onChangeHandler(e.target)}/></td></tr>
                <tr><td>Data:</td><td><input type="date" name="die_data" value={dieta.die_data} onChange={(e) => onChangeHandler(e.target)}/></td></tr>
                <tr><td>Hora:</td><td><input type="time" name="die_hora" value={dieta.die_hora} onChange={(e) => onChangeHandler(e.target)}/></td></tr>
                <tr><td>Tipo:</td><td><input type="text" name="die_tipo" value={dieta.die_tipo} onChange={(e) => onChangeHandler(e.target)}/></td></tr>
                <tr><td>Descrição:</td><td><input type="text" name="die_descricao" value={dieta.die_descricao} onChange={(e) => onChangeHandler(e.target)}/></td></tr>
                <tr><td ><button type="submit">Submit</button></td></tr>
                {response?.response && <tr><td colSpan={2}>{response.response}</td></tr>}
              </tbody>
            </table>
          </form>
     )
   }
export default App;