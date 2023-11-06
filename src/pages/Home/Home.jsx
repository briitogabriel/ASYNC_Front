
import Navbar from '../../components/MenuLateral/Navbar/Navbar';
import { useContext, useEffect, useState } from "react";
import { CardEstatistica } from "../../components/CardEstatistica/CardEstatistica.component";
import { PacienteService } from "../../services/Paciente.service";
import { ConsultaService } from "../../services/Consultas.service";
import { ExameService } from "../../services/Exames.service";
import { CardPaciente } from "../../components/CardPaciente/CardPaciente";
import { useForm } from "react-hook-form";
import "./Home.style.css";
import { UserService } from "../../services/Usuario.service";
import Message from '../../components/Message/Message';
import { AuthContext } from '../../contexts/auth.context';
import { CardUsuario } from '../../components/CardUsuario/CardUsuario';
import { MedicamentoService } from '../../services/Medicamentos.service';
import { DietaService } from '../../services/Dieta.service';
import { ExercicioService } from '../../services/Exercicio.service';

export const HomePage = () => {
  const { register, handleSubmit, reset } = useForm();
  const {auth} = useContext(AuthContext);

  const [qtdUsuarios, setQtdUsuarios] = useState({
    admins: 0,
    medicos: 0,
    enfermeiros: 0,
  });
  const [estatistica, setEstatistica] = useState({
    pacientes: 0,
    consultas: 0,
    exames: 0,
    medicamentos: 0,
    dietas: 0,
    exercicios: 0
  });
  const [usuarios, setUsuarios] = useState([]);
  const [usuario, setUsuario] = useState();
  const [pacientes, setPacientes] = useState([]);
  const [paciente, setPaciente] = useState();

  const calcularUsuarios = async () => {
    const usuariosDb = await UserService.getUsers();
    setUsuarios(usuariosDb);
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

    const medicamentos = await MedicamentoService.listarMedicamentos();
    const qtdMed = medicamentos.length;

    const dietas = await DietaService.listarDietas();
    const qtdDietas = dietas.data.length;

    const exercicios = await ExercicioService.listarExercicios();
    const qtdExercicios = exercicios.data.length;

    setEstatistica({
      pacientes: qtdPacientes ? qtdPacientes : 0,
      consultas: qtdConsultas ? qtdConsultas : 0,
      exames: qtdExames ? qtdExames : 0,
      medicamentos: qtdMed ? qtdMed : 0,
      dietas: qtdDietas ? qtdDietas : 0,
      exercicios: qtdExercicios ? qtdExercicios : 0
    });
  };

  useEffect(() => {
    calcularUsuarios();
    calcularEstatistica();
  }, []);

  const submitForm = async (data) => {
    try {
      if (data.info) {
        const paciente = pacientes.filter(
        (paciente) =>
          paciente.pac_nome.includes(data.info)||
          paciente.pac_telefone === (data.info) ||
          paciente.pac_email === (data.info)
      );

      if (!paciente) {
        throw new Error("Falha ao buscar paciente.");
      }
      setPaciente(paciente);
      reset();
      };

      if (data.usu) {
        const usuario = usuarios.filter(
          (usuario) => 
            usuario.nome.includes(data.usu) ||
            usuario.telefone === data.usu ||
            usuario.email === data.usu
        );

        if (!usuario) {
          throw new Error("Falha ao buscar usuário.");
        }
        setUsuario(usuario);
        reset();
      }
      
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <Navbar />
      <Message/>
      <div className="container mt-3">
        {auth.user.per_id === 1 && 
        <div>
          <h3 className="text-center title">Estatísticas de usuários</h3>
              <div className="row mt-3 justify-content-evenly">
                <CardEstatistica
                  className='col-md-3'
                  icon="bi-person-gear"
                  value={qtdUsuarios.admins}
                  label="Administradores"
                />
                <CardEstatistica
                  className='col-md-3'
                  icon="bi-person"
                  value={qtdUsuarios.medicos}
                  label="Médicos"
                />
                <CardEstatistica
                  className='col-md-3'
                  icon="bi-person"
                  value={qtdUsuarios.enfermeiros}
                  label="Enfermeiros"
                />
              </div>
        </div>
        }
        <div className="mt-3">
          <h3 className="text-center title">Estatísticas do sistema</h3>
        </div>
        <div className="row mt-3 justify-content-evenly">
          <CardEstatistica
            className='col-md-3'
            icon="bi-person-circle"
            value={estatistica.pacientes}
            label="Pacientes"
          />
          <CardEstatistica
            className='col-md-3'
            icon="bi-heart-pulse"
            value={estatistica.consultas}
            label="Consultas"
          />
          <CardEstatistica
            className='col-md-3'
            icon="bi-journal-text"
            value={estatistica.exames}
            label="Exames"
          />
        </div>
          <div className="row mt-3 justify-content-evenly">
            <CardEstatistica
              className='col-md-3'
              icon="bi-capsule-pill"
              value={estatistica.medicamentos}
              label="Medicamentos"
            />
            <CardEstatistica
              className='col-md-3'
              icon="bi-apple"
              value={estatistica.dietas}
              label="Dietas"
            />
            <CardEstatistica
              className='col-md-3'
              icon="bi-person-walking"
              value={estatistica.exercicios}
              label="Exercícios"
            />
          </div>
        {auth.user.per_id === 1 && 
          <div className="mt-4">
          <h3 className="title">Informações de usuarios</h3>
          <form onSubmit={handleSubmit(submitForm)} className="mt-3">
            <div className="input-group mb-3">
              <input
                type="text"
                name="usu"
                id="usu"
                className="form-control"
                placeholder="Digite o nome, telefone ou e-mail do usuário"
                aria-label="Digite o nome do usuário"
                {...register("usu")}
              />
            </div>
            <button
                type="submit"
                id="button-usu"
                className="btn btn-primary custom-margin"
              >
                Buscar
            </button>
          </form>
          <div className="row gap-1 justify-content-center">
            {!usuario ? (
              usuarios.map((usuario) => (
                <CardUsuario
                  key={usuario.usuarioId}
                  className="col-4 col-sm-4 mb-4"
                  usuario={usuario}
                />
              ))
            ) : (
              <CardUsuario
                key={usuario.usuarioId}
                className="col-4 col-sm-4 mb-4"
                usuario={usuario[0]}
              />
            )}
          </div>
        </div>
        }
        <div className="mt-4">
          <h3 className="title">Informações de pacientes</h3>
          <form onSubmit={handleSubmit(submitForm)} className="mt-3">
            <div className="input-group mb-3">
              <input
                type="text"
                name="info"
                id="info"
                className="form-control"
                placeholder="Digite o nome, telefone ou e-mail do paciente"
                aria-label="Digite o nome do paciente"
                aria-describedby="button-addon2"
                {...register("info")}
              />
              
            </div>
            <button
                className="btn btn-primary custom-margin"
                type="submit"
                id="button-addon2"
              >
                Buscar
            </button>
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
