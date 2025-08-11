import { useEffect, useState } from "react"

import { Layout } from "../components/Layout"

const Home = () => {
  const [products, setProducts] = useState([])
  const [user, setUser] = useState()

  const fechingProducts = async () => {
    const response = await fetch("https://fakestoreapi.com/products", { method: "GET" })
    const data = await response.json()

    setProducts(data)
  }

  useEffect(() => {
    fechingProducts()
  }, [])

  const handleDelete = async (id) => {
    const response = await fetch(`https://fakestoreapi.com/products/${id}`, { method: "DELETE" })

    console.log(response)

    if (response.ok) {
      setProducts(prevProduct => prevProduct.filter((product) => product.id != id))
    }
  }

  return (
    <Layout>
      <section>
        <h1>Doggy</h1>
        <p>Catálogo</p>
        <div>
          {
            products.map((product) => <div key={product.id}><h2 key={product.id}>{products.title}</h2>
              <img src={product.image} alt={`imagen de ${product.title}`} />
              <p>${product.price}</p>
              <p>{product.description}</p>
              <p>{product.category}</p>
              {
                user && <div>
                  <button>Actualizar</button>
                  <button onClick={() => handleDelete(product.id)}>Borrar</button>
                </div>
              }
            </div>)
          }
        </div>
      </section>
    </Layout >
  )
}

export { Home }