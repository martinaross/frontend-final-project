import { useState } from "react"
import { Layout } from "../components/Layout"
import { useAuth } from "../context/UserContext"
import { useNavigate } from "react-router-dom"
import "../styles/pages/Login.css";

const Login = () => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const { login } = useAuth()

  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault()
    const isLogin = await login(username, password)
    if (isLogin) {
      setUsername("")
      setPassword("")
      navigate("/")
    }
  }

  return (
    <Layout>

      <section>
        <h2>Hola, bienvenido de nuevo</h2>

        <form onSubmit={handleLogin}>
          <div>
            <label htmlFor="username">Email o usuario:</label>
            <input
              id="username"
              type="text"
              placeholder="tuemail@dominio.com o usuario"
              autoComplete="username"
              onChange={(e) => setUsername(e.target.value)}
              value={username}
              required
            />
          </div>

          <div>
            <label htmlFor="password">Contraseña:</label>
            <input
              id="password"
              type="password"
              placeholder="••••••••"
              autoComplete="current-password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              required
            />
          </div>

          <button type="submit">Ingresar</button>
        </form>
      </section>
    </Layout>
  )
}

export { Login }
