import axios from 'axios';
import { LocalStorageService } from './LocalStorage.service';

const buscarPacientes = () => {
  return axios.get(`http://localhost:${import.meta.env.VITE_APP_PORT}/api/pacientes`, {
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

export const PacienteService = {
  buscarPacientes,
};