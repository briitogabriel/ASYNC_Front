import Usuario from '../../assets/usuario.png'
import { AuthContext } from '../../contexts/auth.context';
import { useContext } from "react";
import './Toolbar.css'

function Toolbar(){

  const {auth} = useContext(AuthContext);

  return(
    <>
    <div className="container-tool">
      <img className='click-menu' style={{ width: 40, height: 40, cursor:'pointer' }} src={Usuario}/>
    </div>
    <div className='name-tool'>
      <span>{auth.user.usu_nome} </span>
    </div>
    </>
  )
}

export default Toolbar