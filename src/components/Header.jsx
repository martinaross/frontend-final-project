import { useState } from 'react';
import logo from '../assets/logo.png';
import { Link } from 'react-router-dom';
import "../styles/components/Header.css"


const Header = () => {
  const [user, setUser] = useState()

  return (
    <header>
      <img src={logo} alt="Logo" />
      <nav>
        <ul>
          {
            user && <>
              <li><Link to="/dashboard">Dashboard</Link></li>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/about">Quiénes somos</Link></li>
              <button>Salir</button>
            </>
          }
          {
            !user && <>
              <li><Link to="/login">Iniciar sesion</Link></li>
              <li><Link to="/register">Registrate</Link></li>
              <li><Link to="/about">Quiénes somos</Link></li>
            </>
          }
        </ul>
      </nav>
    </header>
  )
}

export { Header }