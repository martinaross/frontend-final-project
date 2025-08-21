import { useState } from "react";
import { Layout } from "../components/Layout";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/UserContext";
import "../styles/pages/Register.css";

const Register = () => {
  const { setUser } = useAuth(); // debe existir en tu contexto
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const validate = () => {
    if (!username.trim() || !email.trim() || !password) {
      return "Debes completar todos los campos";
    }
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      return "Email inválido";
    }
    if (password.length < 6) {
      return "La contraseña debe tener al menos 6 caracteres";
    }
    return "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    const v = validate();
    if (v) {
      setError(v);
      return;
    }

    setSubmitting(true);
    try {
      // 1) Crear usuario en FakeStoreAPI
      const createRes = await fetch("https://fakestoreapi.com/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          username,
          password,
          // campos extra que la API acepta (evitan rechazos)
          name: { firstname: "User", lastname: "Demo" },
          address: {
            city: "demo", street: "demo", number: 1, zipcode: "00000",
            geolocation: { lat: "0", long: "0" }
          },
          phone: "000000"
        })
      });

      if (!createRes.ok) {
        throw new Error("No se pudo registrar. Probá con otro usuario/email.");
      }

      // 2) Login automático para cumplir setUser(true)
      const loginRes = await fetch("https://fakestoreapi.com/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password })
      });

      if (!loginRes.ok) {
        throw new Error("Usuario creado, pero el login falló.");
      }

      const { token } = await loginRes.json();

      // 3) Persistir sesión + marcar usuario autenticado en el contexto
      const payload = { username, token };
      localStorage.setItem("auth", JSON.stringify(payload));
      setUser(payload); // <- esto satisface el "setUser(true)" del feedback

      setSuccess("Usuario registrado y autenticado con éxito");
      // Redirigí donde prefieras (home/products)
      setTimeout(() => navigate("/"), 600);
    } catch (err) {
      setError(err.message || "Error del servidor");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Layout>
      <section className="register-page">
        <h2>Crear cuenta</h2>

        <form onSubmit={handleSubmit} className="register-form" noValidate>
          <div className="field">
            <label>Usuario</label>
            <input
              type="text"
              onChange={(e) => setUsername(e.target.value)}
              value={username}
              placeholder="ej: johnd"
              autoComplete="username"
            />
          </div>

          <div className="field">
            <label>Email</label>
            <input
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              placeholder="ej: john@doe.com"
              autoComplete="email"
            />
          </div>

          <div className="field">
            <label>Contraseña</label>
            <input
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              placeholder="******"
              autoComplete="new-password"
            />
          </div>

          {error && <p className="msg error">{error}</p>}
          {success && <p className="msg success">{success}</p>}

          <button disabled={submitting} type="submit">
            {submitting ? "Creando..." : "Crear cuenta"}
          </button>
        </form>

        <p className="hint">
          * Se validan campos y se integra con FakeStoreAPI para registro y login.
        </p>
      </section>
    </Layout>
  );
};

export { Register };
