
import Navbar from '../../components/MenuLateral/Navbar/Navbar';
import { useEffect, useState } from "react";
import { CardEstatistica } from "../../components/CardEstatistica/CardEstatistica.component";
import { PacienteService } from "../../services/Paciente.service";
import { ConsultaService } from "../../services/Consultas.service";
import { ExameService } from "../../services/Exames.service";
import { CardPaciente } from "../../components/CardPaciente/CardPaciente";
import { useForm } from "react-hook-form";
import "./Home.style.css";
import { UserService } from "../../services/Usuario.service";

export const HomePage = () => {
  const { register, handleSubmit, reset } = useForm();

  const [qtdUsuarios, setQtdUsuarios] = useState({
    admins: 0,
    medicos: 0,
    enfermeiros: 0,
  });
  const [estatistica, setEstatistica] = useState({
    pacientes: 0,
    consultas: 0,
    exames: 0,
  });
  const [usuarios, setUsuarios] = useState([]);
  const [pacientes, setPacientes] = useState([]);
  const [paciente, setPaciente] = useState();

  const calcularUsuarios = async () => {
    const usuariosDb = await UserService.getUsers();
    setUsuarios(usuarios);
    let qtdAdmins = 0;
    let qtdMedicos = 0;
    let qtdEnfermeiros = 0;

    usuariosDb.map((usuario) => {
      if (usuario.permissao === 1) {
        qtdAdmins += 1;
      } else if (usuario.permissao === 2) {
        qtdMedicos += 1;
      } else if (usuario.permissao === 3) {
        qtdEnfermeiros += 1;
      } else {
        return;
      }
    });

    setQtdUsuarios({
      admins: qtdAdmins,
      medicos: qtdMedicos,
      enfermeiros: qtdEnfermeiros,
    });
  };

  const calcularEstatistica = async () => {
    const pacientes = await PacienteService.buscarPacientes();
    setPacientes(pacientes);
    const qtdPacientes = pacientes.length;

    const consultas = await ConsultaService.listarConsultas();
    const qtdConsultas = consultas.length;

    const exames = await ExameService.listarExames();
    const qtdExames = exames.length;

    setEstatistica({
      ...estatistica,
      pacientes: qtdPacientes,
      consultas: qtdConsultas,
      exames: qtdExames,
    });
  };

  useEffect(() => {
    calcularUsuarios();
    calcularEstatistica();
  }, []);

  const submitForm = async (data) => {
    try {
      const paciente = pacientes.filter(
        (paciente) =>
          data.info === paciente.pac_nome ||
          data.info === paciente.pac_telefone ||
          data.info === paciente.pac_email
      );

      if (!paciente) {
        throw new Error("Falha ao buscar paciente.");
      }
      setPaciente(paciente);
      reset();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="container mt-3">
        {/* {usuarios.forEach((usuario) => usuario.permissao === 1 &&)} */}
          <h3 className="text-center title">Estatísticas de usuários</h3>
            <div className="row mt-3 justify-content-evenly">
              <CardEstatistica
                icon="bi-person-gear"
                value={qtdUsuarios.admins}
                label="Administradores"
              />
              <CardEstatistica
                icon="bi-person"
                value={qtdUsuarios.medicos}
                label="Médicos"
              />
              <CardEstatistica
                icon="bi-person"
                value={qtdUsuarios.enfermeiros}
                label="Enfermeiros"
              />
            </div>
        <div className="mt-3">
          <h3 className="text-center title">Estatísticas do sistema</h3>
        </div>
        <div className="row mt-3 justify-content-evenly">
          <CardEstatistica
            icon="bi-person-circle"
            value={estatistica.pacientes}
            label="Pacientes"
          />
          <CardEstatistica
            icon="bi-heart-pulse"
            value={estatistica.consultas}
            label="Consultas"
          />
          <CardEstatistica
            icon="bi-journal-text"
            value={estatistica.exames}
            label="Exames"
          />
        </div>
        <div className="mt-4">
          <h3 className="title">Informações de pacientes</h3>
          <form onSubmit={handleSubmit(submitForm)} className="mt-3">
            <div className="input-group mb-3">
              <input
                type="text"
                name="info"
                id="info"
                className="form-control"
                placeholder="Digite o nome completo, telefone ou e-mail do paciente"
                aria-label="Digite o nome do paciente"
                aria-describedby="button-addon2"
                {...register("info")}
              />
              <button
                className="btn btn-outline-secondary"
                type="submit"
                id="button-addon2"
              >
                Buscar
              </button>
            </div>
          </form>
          <div className="row gap-1 justify-content-center">
            {!paciente ? (
              pacientes.map((paciente) => (
                <CardPaciente
                  key={paciente.pac_id}
                  className="col-4 col-sm-4 mb-4"
                  paciente={paciente}
                />
              ))
            ) : (
              <CardPaciente
                key={paciente.pac_id}
                className="col-4 col-sm-4 mb-4"
                paciente={paciente[0]}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
