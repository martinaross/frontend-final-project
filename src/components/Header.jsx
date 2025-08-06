const Header = () => {
  return (
    <header>
      <a class="navbar-brand" href="#">
        <img src="./assets/logo.png" alt="imagen de logo" />
        Bootstrap
      </a>
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