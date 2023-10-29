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

const detalharPaciente = (id) => {
  return axios.get(`http://localhost:3333/api/pacientes/${id}`, {
    headers: {
      'Authorization': LocalStorageService.get('token')
    }
  })
  .then((res) => {
    return res.data
  })
  .catch((error) => {
    console.log(error)
    throw new Error("Erro ao buscar dados do paciente", error);
  });
};

export const PacienteService = {
  buscarPacientes,
  detalharPaciente,
};