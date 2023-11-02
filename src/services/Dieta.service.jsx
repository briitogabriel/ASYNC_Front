import axios from 'axios';
import { LocalStorageService } from './LocalStorage.service';

const criarDieta = (dieta) => {
  return axios.post(`http://localhost:${import.meta.env.VITE_APP_PORT}/api/dietas`, dieta, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': LocalStorageService.get('token')
    }
  })
  .then((res) => {
    return res.data
  })
  .catch((error) => {
    console.log(error.response.data)
    return false
  });
};

// const detalharDieta = (nomePaciente) => {
//   return axios.get(`http://localhost:${import.meta.env.VITE_APP_PORT}/api/dietas/`, {
//     headers: {
//       'Content-Type': 'application/json',
//       'Authorization': LocalStorageService.get('token')
//     },
//     params: {
//       pac_nome: nomePaciente
//     }
//   })
//   .then((res) => {
//     return res.data
//   })
//   .catch((error) => {
//     console.log(error)
//     throw new Error("Erro ao detalhar dados da dieta", error);
//   });
// };

const listarDietasPorPaciente = (nomePaciente) => {
  return axios.get(`http://localhost:${import.meta.env.VITE_APP_PORT}/api/dietas/${nomePaciente}`, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': LocalStorageService.get('token')
    },
  })
  .then((res) => {
    return res.data
  })
  .catch((error) => {
    console.log(error)
    throw new Error("Erro ao detalhar dados do exame", error);
  });
};

export const DietaService = {
  criarDieta,
  // detalharDieta,
  listarDietasPorPaciente,
};