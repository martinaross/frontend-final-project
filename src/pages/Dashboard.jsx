import { useState } from "react"
import { Layout } from "../components/Layout"

const Dashboard = () => {
  const [name, setName] = useState("")
  const [price, setPrice] = useState("")
  const [description, setDescription] = useState("")
  const [product, setProduct] = useState(null)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)

    // Validaciones
    if (!name || !price || !description) {
      setError("Completa todos los campos requeridos")
      return
    }
    if (name.trim().length < 3) {
      setError("El nombre del producto debe tener al menos 3 caracteres")
      return
    }
    const priceNumber = Number(price)
    if (Number.isNaN(priceNumber) || priceNumber <= 0) {
      setError("El precio debe ser un número mayor a 0")
      return
    }

    const newProduct = {
      id: crypto.randomUUID(),
      title: name.trim(),
      price: priceNumber,
      description: description.trim(),
      category: "",
      image: "",
    }

    try {
      setLoading(true)
      const response = await fetch("https://fakestoreapi.com/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newProduct),
      })

      if (!response.ok) {
        throw new Error(`Error ${response.status}`)
      }

      const data = await response.json()
      // Mostrar lo que respondió la API (si no, mostramos lo que enviamos)
      setProduct(data?.id ? data : newProduct)

      // Reset de formulario
      setName("")
      setPrice("")
      setDescription("")
    } catch (err) {
      setError("No se pudo guardar el producto. Inténtalo de nuevo.")
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Layout>
      <h1>Panel de Administración</h1>
      <section>
        <h2>Cargar nuevo producto</h2>

        <form onSubmit={handleSubmit} style={{ maxWidth: 520, display: "grid", gap: 12 }}>
          <div>
            <label htmlFor="nombre">Nombre del producto</label>
            <input
              id="nombre"
              type="text"
              name="nombre"
              placeholder="Ej: Campera SM"
              onChange={(e) => setName(e.target.value)}
              value={name}
            />
          </div>

          <div>
            <label htmlFor="precio">Precio</label>
            <input
              id="precio"
              type="number"
              name="precio"
              min="0"
              step="0.01"
              placeholder="0.00"
              onChange={(e) => setPrice(e.target.value)}
              value={price}
            />
          </div>

          <div>
            <label htmlFor="descripcion">Descripción</label>
            <textarea
              id="descripcion"
              name="descripcion"
              rows={4}
              placeholder="Detalles del producto"
              onChange={(e) => setDescription(e.target.value)}
              value={description}
            />
          </div>

          {error && <p style={{ color: "tomato", margin: 0 }}>{error}</p>}

          <button type="submit" disabled={loading}>
            {loading ? "Guardando..." : "Guardar producto"}
          </button>
        </form>

        {product && (
          <div style={{ marginTop: 24 }}>
            <h3>{product.title}</h3>
            <p>${product.price}</p>
            <p>{product.description}</p>
          </div>
        )}
      </section>
    </Layout>
  )
}

export { Dashboard }
