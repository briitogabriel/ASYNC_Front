import axios from 'axios';
import { LocalStorageService } from './LocalStorage.service';

const salvarMedicamento = (medicamento) => {
    return axios.post(`http://localhost:${import.meta.env.VITE_APP_PORT}/api/medicamentos`, medicamento, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': LocalStorageService.get('token')
        }
    })
    .then((res) => {
        return res.data
    })
    .catch((error) => {
        console.error(error.response.data);
        throw new Error("Erro ao cadastrar medicamento.")
    })
};

const detalharMedicamento = (id) => {
    return axios.get(`http://localhost:${import.meta.env.VITE_APP_PORT}/api/medicamentos/${id}`, {
        headers: {
            'Authorization': LocalStorageService.get('token')
          }
    })
    .then((res) => {
        return res.data
      })
      .catch((error) => {
        console.error(error.response.data)
        throw new Error("Erro ao detalhar dados do medicamento");
      });
}

const atualizarMedicamento = (medicamento) => {
    return axios.put(`http://localhost:${import.meta.env.VITE_APP_PORT}/api/medicamentos/${medicamento.med_id}`, medicamento, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': LocalStorageService.get('token')
          }
    })
    .then((res) => {
        return res.data
    })
    .catch((error) => {
        console.error(error.response.data);
        throw new Error("Erro ao atualizar dados do medicamento.")
    })
};

const deletarMedicamento = (id) => {
    return axios.delete(`http://localhost:${import.meta.env.VITE_APP_PORT}/api/medicamentos/${id}`, medicamento, {
        headers: {
            'Authorization': LocalStorageService.get('token')
          }
    })
    .then((res) => {
        return res.data
    })
    .catch((error) => {
        console.error(error.response.data);
        throw new Error("Erro ao deletar medicamento.")
    })
};

const listarMedicamentosPorPaciente = (user) => {
    return axios.get(`http://localhost:${import.meta.env.VITE_APP_PORT}/api/medicamentos/?userName=${user}`, {
      headers: {
        'Authorization': LocalStorageService.get('token')
      }
    })
    .then((res) => {
      return res.data
    })
    .catch((error) => {
      console.log(error)
      throw new Error("Erro ao detalhar dados do medicamento", error);
    });
  };
const listarMedicamentos = () => {
    return axios.get(`http://localhost:${import.meta.env.VITE_APP_PORT}/api/medicamentos`, {
        headers: {
            'Authorization': LocalStorageService.get('token')
          }
    })
    .then((res) => {
        return res.data
      })
      .catch((error) => {
        console.error(error.response.data)
        throw new Error("Erro ao detalhar dados do medicamento");
      });
}

export const MedicamentoService = {
    salvarMedicamento,
    detalharMedicamento,
    atualizarMedicamento,
    deletarMedicamento,
    listarMedicamentosPorPaciente,
    listarMedicamentos
};