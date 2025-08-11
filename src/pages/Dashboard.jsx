import { useState } from "react"
import { Layout } from "../components/Layout"

const Dashboard = () => {
  const [name, setName] = useState()
  const [price, setPrice] = useState()
  const [description, setDescription] = useState()

  const handleSumit = (e) => {
    e.preventDefault()
    const newProduct = {
      id: crypto.randomUUID(),
      name: name,
      price: price,
      description: description,
    }

    console.log(newProduct)
  }

  return (
    <Layout>
      <h1>Panel de Administración</h1>
      <section>
        <h2>Cargar nuevo producto</h2>
        <form onSubmit={handleSumit}>
          <div>
            <label>Nombre del producto:</label>
            <input type="text" name="nombre" onChange={(e) => setName(e.target.value)} />
          </div>
          <div>
            <label>Precio:</label>
            <input type="number" name="precio" onChange={(e) => setPrice(e.target.value)} />
          </div>
          <div>
            <label>Descripción:</label>
            <input type="descripcion" rows="4" onChange={(e) => setDescription(e.target.value)} />
          </div>
          <button>Guardar producto</button>
        </form>
      </section>
    </Layout>
  )
}

export { Dashboard }