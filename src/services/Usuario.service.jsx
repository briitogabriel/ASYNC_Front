import axios from 'axios';
import { LocalStorageService } from "./LocalStorage.service";

const login = (usuario) => {
  return axios.post(`${import.meta.env.VITE_APP_PORT}/api/usuarios/login`, usuario, {
    headers: {
      'Authorization': LocalStorageService.get('token')
    }
  })
  .then((res) => {
    return res.data
  })
  .catch((error) => {
    console.error(error.response.data.message);
  });
};

const getUsers = () => {
  return axios.get(`${import.meta.env.VITE_APP_PORT}/api/usuarios`, {
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
  return axios.post(`${import.meta.env.VITE_APP_PORT}/api/usuarios`, data, {
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
  return axios.get(`${import.meta.env.VITE_APP_PORT}/api/usuarios/${usuarioId}`, {
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
  return axios.delete(`${import.meta.env.VITE_APP_PORT}/api/usuarios/${usuarioId}`, {
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
  return axios.put(`${import.meta.env.VITE_APP_PORT}/api/consultas/${usuarioId}`, data, {
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

const resetarSenha = (data) => {
  return axios.patch(`${import.meta.env.VITE_APP_PORT}/api/usuarios/resetar-senha`, data, {
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
    throw new Error("Erro ao resetar senha do usuário", error);
  });
};

export const UserService = {
  login,
  getUsers,
  createUser,
  getUserById,
  deleteUser,
  updateUser,
  resetarSenha
};

