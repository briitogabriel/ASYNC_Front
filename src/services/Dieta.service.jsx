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

const buscarDietasPorPaciente = (nomePaciente) => {
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

const atualizarDieta = (dietaData, idDieta) => {
  return axios.put(`http://localhost:${import.meta.env.VITE_APP_PORT}/api/dietas/${idDieta}`, dietaData, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': LocalStorageService.get('token')
    }
  })
  .then((res) => {
    return res.data
  })
  .catch((error) => {
    console.log(error)
    throw new Error("Erro ao atualizar dados da dieta", error);
  });
};

const deletarDieta = (idDieta) => {
  return axios.delete(`http://localhost:${import.meta.env.VITE_APP_PORT}/api/dietas/${idDieta}`, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': LocalStorageService.get('token')
    }
  })
  .then((res) => {
    return res.data
  })
  .catch((error) => {
    console.log(error)
    throw new Error("Erro ao deletar dieta", error);
  });
};

export const DietaService = {
  criarDieta,
  buscarDietasPorPaciente,
  atualizarDieta,
  deletarDieta,
};