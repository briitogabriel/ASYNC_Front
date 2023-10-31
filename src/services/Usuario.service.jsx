import axios from 'axios';
import { LocalStorageService } from "./LocalStorage.service";

const getUsers = () => {
  return axios.get(`http://localhost:3333/api/usuarios`, {
    headers: {
      'Authorization': LocalStorageService.get('token')
    }
  })
  .then((res) => {
    return res.data
  })
  .catch((error) => {
    console.log(error)
    throw new Error("Erro ao listar usuários", error);
  });
};

const createUser = (data) => {
  return axios.post(`http://localhost:3333/api/usuarios`, data, {
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

const getUserById = (usuarioId) => {
  return axios.get(`http://localhost:3333/api/usuarios/${usuarioId}`, {
    headers: {
      'Authorization': LocalStorageService.get('token')
    }
  })
  .then((res) => {
    return res.data
  })
  .catch((error) => {
    console.log(error)
    throw new Error("Erro ao buscar dados do usuário", error);
  });
};

const deleteUser = (id) => {
  return axios.delete(`http://localhost:3333/api/usuarios/${usuarioId}`, {
    headers: {
      'Authorization': LocalStorageService.get('token')
    }
  })
  .then((res) => {
    return res.data
  })
  .catch((error) => {
    console.log(error)
    throw new Error("Erro ao deletar usuário", error);
  });
};

const updateUser = (usuarioId, data) => {
  return axios.put(`http://localhost:3333/api/consultas/${usuarioId}`, data, {
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
    throw new Error("Erro ao atualizar dados do usuário", error);
  });
};

export const UserService = {
  getUsers,
  createUser,
  getUserById,
  deleteUser,
  updateUser
};

