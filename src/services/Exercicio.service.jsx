import axios from 'axios';
import { LocalStorageService } from './LocalStorage.service';

const criarExercicio = (exercicio) => {
  return axios.post(`http://localhost:${import.meta.env.VITE_APP_PORT}/api/exercicio`, exercicio, {
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

const buscarExerciciosPorPaciente = (nomePaciente) => {
  return axios.get(`http://localhost:${import.meta.env.VITE_APP_PORT}/api/exercicios/${nomePaciente}`, {
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
    throw new Error("Erro ao detalhar dados do exercicio", error);
  });
};

const atualizarExercicio = (exercicioData, idExercicio) => {
  return axios.put(`http://localhost:${import.meta.env.VITE_APP_PORT}/api/exercicios/${idExercicio}`, exercicioData, {
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
    throw new Error("Erro ao atualizar dados do exercicio", error);
  });
};

const deletarExercicio = (idExercicio) => {
  return axios.delete(`http://localhost:${import.meta.env.VITE_APP_PORT}/api/exercicios/${idExercicio}`, {
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
    throw new Error("Erro ao deletar exercicio", error);
  });
};

export const ExercicioService = {
  criarExercicio,
  buscarExerciciosPorPaciente,
  atualizarExercicio,
  deletarExercicio,
};