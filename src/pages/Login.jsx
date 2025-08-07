import { Layout } from "../components/Layout"

const Login = () => {
  return (
    <Layout>
      <h1>Inicia sesión</h1>
      <section>
        <h2>Hola, bienvenido de nuevo</h2>
        <form>
          <div>
            <label >Email:</label>
            <input type="email" />
          </div>
          <div>
            <label >Password:</label>
            <input type="password" />
          </div>
          <button>Enter</button>
        </form>
      </section>
    </Layout>
  )
}

export { Login }