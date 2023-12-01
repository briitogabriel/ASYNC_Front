import axios from 'axios';
import { LocalStorageService } from './LocalStorage.service';

const criarDieta = (dieta) => {
  return axios.post(`${import.meta.env.VITE_APP_PORT}/api/dietas`, dieta, {
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
  return axios.get(`${import.meta.env.VITE_APP_PORT}/api/dietas/${nomePaciente}`, {
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
    throw new Error("Erro ao detalhar dados da dieta", error);
  });
};

const atualizarDieta = (dietaData, idDieta) => {
  return axios.put(`${import.meta.env.VITE_APP_PORT}/api/dietas/${idDieta}`, dietaData, {
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
  return axios.delete(`${import.meta.env.VITE_APP_PORT}/api/dietas/${idDieta}`, {
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

const listarDietas = () => {
  return axios.get(`${import.meta.env.VITE_APP_PORT}/api/dietas/admin`, {
    headers: {
      'Authorization': LocalStorageService.get('token')
    },
  })
  .then((res) => {
    return res.data
  })
  .catch((error) => {
    console.log(error)
    throw new Error("Erro ao detalhar dados da dieta");
  });
}

export const DietaService = {
  criarDieta,
  buscarDietasPorPaciente,
  atualizarDieta,
  deletarDieta,
  listarDietas
};