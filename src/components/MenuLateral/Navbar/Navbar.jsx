import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Menu from '../../../assets/menu.png';
import { SidebarData } from '../SidebarData/SidebarData';
import Close from '../../../assets/fechar.png'
import Logo from '../../../assets/ASYNClab.png'
import './Navbar.css';
// import Toolbar from '../../Toolbar/Toolbar';
// import { AuthService } from '../../../services/AuthService';

function Navbar(){

  const navigate = useNavigate();

  const handleOut= () =>{
    // AuthService.Set(null)
    navigate('/usuarios/login')
  }

  const [sidebar, setSidebar] = useState(false);

  const showSidebar = () => {
    setSidebar(!sidebar);
  }

  return(
    <div>
      <div className="navbar">
        <div className='click-menu'>
          <img className='click-menu-open' style={{ marginTop: -15, width: 35, height: 35, cursor:'pointer' }} src={Menu} onClick={showSidebar}/>
          <img style={{  width: 250, height: 80, cursor:'pointer' }} src={Logo}/>
        </div>
      </div>
      <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
        <ul className='nav-menu-items'>
          <li className='navbar-toggle'>
            <Link to="#" className='menu-bars'>
              <img className='click-menu' style={{ width: 35, height: 35, cursor:'pointer' }} src={Close} onClick={showSidebar}/>
            </Link>          
          </li>
          {SidebarData.map((item, index) =>{
            return(
              <li key={index} className={item.cName}>
                <Link to={item.path}>
                  {item.icon}
                  <span> {item.title}</span>
                </Link>
              </li>
            )
          })}
          <li className='nav' onClick={handleOut}> Logout</li>
        </ul> 
      </nav>
      
    </div>
  );
}

export default Navbar