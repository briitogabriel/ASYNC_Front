// import { useEffect } from 'react';
// import { useState } from 'react'
import Usuario from '../../assets/usuario.png'
// import { AuthService } from '../../services/AuthService';
import './Toolbar.css'

function Toolbar(){

  // const [user, setUser]  = useState();

  // useEffect(()=>{

  //   setUser(AuthService.get())

  // }, [])

  return(
    <>
    <div className="container-tool">
      <img className='click-menu' style={{ width: 40, height: 40, cursor:'pointer' }} src={Usuario}/>
    </div>
    {/* <div className='name-tool'>
      <span>{user?.name} </span>
    </div> */}
    </>
  )
}

export default Toolbar