import axios from 'axios';
import { LocalStorageService } from './LocalStorage.service';

const detalharConsulta = (id) => {
  return axios.get(`http://localhost:3333/api/consultas/${id}`, {
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
  return axios.post(`http://localhost:3333/api/consultas`, consulta, {
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
    throw new Error("Erro ao salvar dados da consulta", error);
  });
};

const atualizarConsulta = (consulta) => {  
  return axios.put(`http://localhost:3333/api/consultas/${consulta.con_id}`, consulta, {
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
  return axios.delete(`http://localhost:3333/api/consultas/${id}`, {
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
  return axios.get(`http://localhost:3333/api/pacientes/${id}/consultas`, {
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

export const ConsultaService = {
  detalharConsulta,
  salvarConsulta,
  atualizarConsulta,
  deletarConsulta,
  listarConsultasPorPaciente
};