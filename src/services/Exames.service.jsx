import axios from 'axios';
import { LocalStorageService } from './LocalStorage.service';

const detalharExame = (id) => {
  return axios.get(`${import.meta.env.VITE_APP_PORT}/api/exames/${id}`, {
    headers: {
      'Authorization': LocalStorageService.get('token')
    }
  })
  .then((res) => {
    return res.data
  })
  .catch((error) => {
    console.log(error)
    throw new Error("Erro ao detalhar dados do exame", error);
  });
};

const salvarExame = (exame) => {  
  return axios.post(`${import.meta.env.VITE_APP_PORT}/api/exames`, exame, {
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
    throw new Error("Erro ao salvar dados do exame", error);
  });
};

const atualizarExame = (exame) => {  
  return axios.put(`${import.meta.env.VITE_APP_PORT}/api/exames/${exame.exa_id}`, exame, {
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
    throw new Error("Erro ao atualizar dados do exame", error);
  });
};

const deletarExame = (id) => {
  return axios.delete(`${import.meta.env.VITE_APP_PORT}/api/exames/${id}`, {
    headers: {
      'Authorization': LocalStorageService.get('token')
    }
  })
  .then((res) => {
    return res.data
  })
  .catch((error) => {
    console.log(error)
    throw new Error("Erro ao detalhar dados do exame", error);
  });
};

const listarExamesPorPaciente = (id) => {
  return axios.get(`${import.meta.env.VITE_APP_PORT}/api/pacientes/${id}/exames`, {
    headers: {
      'Authorization': LocalStorageService.get('token')
    }
  })
  .then((res) => {
    return res.data
  })
  .catch((error) => {
    console.log(error)
    throw new Error("Erro ao detalhar dados do exame", error);
  });
};

const listarExames = () => {
  return axios.get(`${import.meta.env.VITE_APP_PORT}/api/exames`, {
    headers: {
      'Authorization': LocalStorageService.get('token')
    }
  })
  .then((res) => {
    return res.data
  })
  .catch((error) => {
    console.log(error)
    throw new Error("Erro ao listar exames");
  });
}

export const ExameService = {
  detalharExame,
  salvarExame,
  atualizarExame,
  deletarExame,
  listarExamesPorPaciente,
  listarExames
};