import { useState } from "react"
import { Layout } from "../components/Layout"

const Register = () => {
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  const handleSumit = () => {
    e.preventDefault()
    setError("")

    if (!username || !email || !password) { setError("Debes completar todos los campos") } return

    const newUser = {
      username,
      email,
      password,
    }
    console.log(newUser)
    setUsername("")
    setPassword("")
    setEmail("")
  }

  return (
    <Layout>
      <section>
        <h2>Bienvenido</h2>
        <form onSubmit={handleSumit}>
          <div>
            <label >Username</label>
            <input type="texto" onChange={(e) => setUsername(e.target.value)}
              value={username} />
          </div>
          <div>
            <label >Email:</label>
            <input
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
          </div>
          <div>
            <label >Password:</label>
            <input type="password" onChange={(e) => setPassword(e.target.value)}
              value={password} />
          </div>
          <button>Sign up </button>
        </form>

        {
          error && <p>{error}</p>
        }
      </section>

    </Layout>
  )
}

export { Register }