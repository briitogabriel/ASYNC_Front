import axios from 'axios';
import { LocalStorageService } from './LocalStorage.service';

const buscarProntuarios = (nome) => {
  return axios.get(`http://localhost:3333/api/prontuarios?nome=${nome}`, {
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