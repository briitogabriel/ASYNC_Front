import axios from 'axios';
import { LocalStorageService } from './LocalStorage.service';

const criarDieta = (dieta) => {
  return axios.post('http://localhost:3333/api/dietas', dieta, {
    headers: {
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

// SOMENTE MOCK DE PACIENTES NO SERVICE DE DIETAS -> APAGAR DEPOIS
const buscarPacientes = () => {
  return axios.get('http://localhost:3333/api/dietas/pacientes')
  .then((res) => {
    return res.data
  })
  .catch((error) => {
    console.log(error.response.data)
    return false
  });
};

export const DietaService = {
  criarDieta,
  buscarPacientes,
};