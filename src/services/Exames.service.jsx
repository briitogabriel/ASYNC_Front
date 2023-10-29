import axios from 'axios';
import { LocalStorageService } from './LocalStorage.service';

const detalharExame = (id) => {
  return axios.get(`http://localhost:3333/api/exames/${id}`, {
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
  return axios.post(`http://localhost:3333/api/exames`, exame, {
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
  return axios.put(`http://localhost:3333/api/exames/${exame.exa_id}`, exame, {
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
  return axios.delete(`http://localhost:3333/api/exames/${id}`, {
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
  return axios.get(`http://localhost:3333/api/pacientes/${id}/exames`, {
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

export const ExameService = {
  detalharExame,
  salvarExame,
  atualizarExame,
  deletarExame,
  listarExamesPorPaciente
};