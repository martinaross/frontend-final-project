import logo from '../assets/logo.png';

const Header = () => {
  return (
    <header>
      <img src={logo} alt="Logo" />
      <nav>
        <ul>
          <li><a href="/">Inicio</a></li>
          <li><a href="/dashboard">Dashboard</a></li>
          <li><a href="/login">Login</a></li>
          <li><a href="/registrate">Registrate</a></li>
          <button>Salir</button>
        </ul>
      </nav>
    </header>
  )
}

export { Header }