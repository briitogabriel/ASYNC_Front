import axios from 'axios';
import { LocalStorageService } from './LocalStorage.service';

const buscarProntuarios = (nome) => {
  return axios.get(`http://localhost:${import.meta.env.VITE_APP_PORT}/api/prontuarios?nome=${nome}`, {
    headers: {
      'Authorization': LocalStorageService.get('token')
    }
  })
  .then((res) => {
    return res.data != null ? res.data : []
  })
  .catch((error) => {
    console.log(error)
    throw new Error("Erro ao buscar dados do prontuario", error);
  });
};

export const ProntuarioService = {
  buscarProntuarios,
};