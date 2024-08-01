import Logo from '../images/Logo.png';
import { Link } from 'react-router-dom';
import './header.css'; 

function Header() {
  return (
    <div className="header">
      <Link to="/"><div className="logo">
      <img src={Logo} alt="Logo" />
        <p className='logo-text'>FormBot</p>  
      </div></Link>
      <div className="header-buttons">
        <Link to="/login"><button className='signin-button'>Sign in</button></Link>
     <Link to="/signup"><button className='create-button'>Create a FormBot</button></Link> 
      </div>
    </div>
  );
}

export default Header;