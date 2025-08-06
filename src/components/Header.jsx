import logo from '../assets/logo.png';

const Header = () => {
  return (
    <header>
      <img src={logo} alt="Logo" />
      <nav>
        <ul>
          <li><Link to="/dashboard">Dashboard</Link></li>
          <li><Link to="/">Inicio</Link></li>
          <li><Link to="/login">Login</Link></li>
          <li><Link to="/registrate">Registrate</Link></li>
          <button>Salir</button>
        </ul>
      </nav>
    </header>
  )
}

export { Header }