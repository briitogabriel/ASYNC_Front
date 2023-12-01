import axios from 'axios';
import { LocalStorageService } from './LocalStorage.service';

const criarConsulta = (data) => {
  return axios.post(`${import.meta.env.VITE_APP_PORT}/api/consultas`, data, {
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


const detalharConsulta = (id) => {
  return axios.get(`${import.meta.env.VITE_APP_PORT}/api/consultas/${id}`, {
    headers: {
      'Authorization': LocalStorageService.get('token')
    }
  })
  .then((res) => {
    return res.data
  })
  .catch((error) => {
    console.log(error)
    throw new Error("Erro ao detalhar dados da consulta", error);
  });
};

const salvarConsulta = (consulta) => {  
  return axios.post(`${import.meta.env.VITE_APP_PORT}/api/consultas`, consulta, {
    headers: {
      'Authorization': LocalStorageService.get('token')
    }
  })
  .then((res) => {
    return res.data
  })
  .catch((error) => {
    console.log(error)
    throw new Error("Erro ao salvar dados da consulta", error);
  });
};

const atualizarConsulta = (consulta) => {  
  return axios.put(`${import.meta.env.VITE_APP_PORT}/api/consultas/${consulta.con_id}`, consulta, {
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
    throw new Error("Erro ao atualizar dados da consulta", error);
  });
};

const deletarConsulta = (id) => {
  return axios.delete(`${import.meta.env.VITE_APP_PORT}/api/consultas/${id}`, {
    headers: {
      'Authorization': LocalStorageService.get('token')
    }
  })
  .then((res) => {
    return res.data
  })
  .catch((error) => {
    console.log(error)
    throw new Error("Erro ao detalhar dados da consulta", error);
  });
};

const listarConsultasPorPaciente = (id) => {
  return axios.get(`${import.meta.env.VITE_APP_PORT}/api/pacientes/${id}/consultas`, {
    headers: {
      'Authorization': LocalStorageService.get('token')
    }
  })
  .then((res) => {
    return res.data
  })
  .catch((error) => {
    console.log(error)
    throw new Error("Erro ao detalhar dados da consulta", error);
  });
};

const listarConsultas = () => {
  return axios.get(`${import.meta.env.VITE_APP_PORT}/api/consultas`, {
    headers: {
      'Authorization': LocalStorageService.get('token')
    }
  })
  .then((res) => {
    return res.data
  })
  .catch((error) => {
    console.log(error)
    throw new Error("Erro ao listar consultas");
  });
}

export const ConsultaService = {
  criarConsulta,
  detalharConsulta,
  salvarConsulta,
  atualizarConsulta,
  deletarConsulta,
  listarConsultasPorPaciente,
  listarConsultas
};