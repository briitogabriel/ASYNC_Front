import axios from 'axios';
import { LocalStorageService } from './LocalStorage.service';

const criarExercicio = (exercicio) => {
  return axios.post(`${import.meta.env.VITE_APP_PORT}/api/exercicios`, exercicio, {
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
  return axios.get(`${import.meta.env.VITE_APP_PORT}/api/exercicios/${nomePaciente}`, {
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
  return axios.put(`${import.meta.env.VITE_APP_PORT}/api/exercicios/${idExercicio}`, exercicioData, {
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
  return axios.delete(`${import.meta.env.VITE_APP_PORT}/api/exercicios/${idExercicio}`, {
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

const listarExercicios = () => {
  return axios.get(`${import.meta.env.VITE_APP_PORT}/api/exercicios/admin`, {
    headers: {
      'Authorization': LocalStorageService.get('token')
    },
  })
  .then((res) => {
    return res.data
  })
  .catch((error) => {
    console.log(error.response.data)
    throw new Error("Erro ao detalhar dados do exercicio");
  });
}

export const ExercicioService = {
  criarExercicio,
  buscarExerciciosPorPaciente,
  atualizarExercicio,
  deletarExercicio,
  listarExercicios
};