import logo from '../assets/logo.png';
import { Link } from 'react-router-dom';


const Header = () => {
  return (
    <header>
      <img src={logo} alt="Logo" />
      <nav>
        <ul>
          <li><Link to="/dashboard">Dashboard</Link></li>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/login">Iniciar sesion</Link></li>
          <li><Link to="/register">Registrate</Link></li>
          <li><Link to="/about">Quiénes somos</Link></li>
          <button>Salir</button>
        </ul>
      </nav>
    </header>
  )
}

export { Header }