import * as FaIcon from "react-icons/fa";
import * as BsIcon from "react-icons/bs";

const style = { color: "var(--black-purple)"};

export const SidebarData =  [
  {
    title: 'Home',
    path: '/',
    icon: <FaIcon.FaClinicMedical style={style}/>,
    cName: 'nav-text',
  },
  {
    title: 'Cadastro de Paciente',
    path: '/pacientes',
    icon: <BsIcon.BsFillPersonVcardFill style={style}/>,
    cName: 'nav-text',
  },
  {
    title: 'Cadastro de Exame',
    path: '/exames',
    icon: <FaIcon.FaNotesMedical style={style}/>,
    cName: 'nav-text',
  },
  {
    title: 'Cadastro de Consulta',
    path: '/consultas',
    icon: <FaIcon.FaFileMedicalAlt style={style}/>,
    cName: 'nav-text',
  },
  {
    title: 'Cadastro de Medicamento',
    path: '/medicamentos',
    icon: <BsIcon.BsCapsulePill style={style}/>,
    cName: 'nav-text',
  },
  {
    title: 'Cadastro de Dieta',
    path: '/dietas',
    icon: <FaIcon.FaAppleAlt style={style}/>,
    cName: 'nav-text',
  },
  {
    title: 'Cadastro de Exercício',
    path: '/exercicios',
    icon: <FaIcon.FaRunning style={style}/>,
    cName: 'nav-text',
  },

]