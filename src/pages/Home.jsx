import { useEffect, useState } from "react"
import { Layout } from "../components/Layout"
import { useAuth } from "../context/UserContext"
import "../styles/pages/Home.css";

const Home = () => {
  const [products, setProducts] = useState([])
  const [showPopup, setShowPopup] = useState(false)
  const [productToEdit, setProductToEdit] = useState(null)
  const [titleEdit, setTitleEdit] = useState("")
  const [priceEdit, setPriceEdit] = useState("")
  const [descriptionEdit, setDescriptionEdit] = useState("")
  const [categoryEdit, setCategoryEdit] = useState("")
  const [imageEdit, setImageEdit] = useState("")

  const { user } = useAuth()

  const fetchingProducts = async () => {
    try {
      const response = await fetch("https://fakestoreapi.com/products")
      const data = await response.json()
      setProducts(data)
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    fetchingProducts()
  }, [])

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`https://fakestoreapi.com/products/${id}`, { method: "DELETE" })
      if (response.ok) {
        setProducts(prev => prev.filter(p => p.id !== id))
      } else {
        console.error("No se pudo borrar")
      }
    } catch (err) {
      console.error(err)
    }
  }

  const handleOpenEdit = (product) => {
    setProductToEdit(product)
    setTitleEdit(product.title)
    setPriceEdit(product.price)
    setDescriptionEdit(product.description)
    setCategoryEdit(product.category)
    setImageEdit(product.image)
    setShowPopup(true)
  }

  const handleCloseEdit = () => {
    setShowPopup(false)
    setProductToEdit(null)
  }

  // Update con PUT (podrías cambiar a PATCH si querés enviar campos parciales)
  const handleUpdate = async (e) => {
    e.preventDefault()

    if (!productToEdit) return

    const updatedProduct = {
      id: productToEdit.id,
      title: titleEdit,
      price: Number(priceEdit),
      description: descriptionEdit,
      category: categoryEdit,
      image: imageEdit
    }

    try {
      const response = await fetch(`https://fakestoreapi.com/products/${productToEdit.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedProduct)
      })

      if (response.ok) {
        const data = await response.json()
        setProducts(prev =>
          prev.map(p => (p.id === productToEdit.id ? data : p))
        )
        handleCloseEdit()
      } else {
        console.error("No se pudo actualizar")
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Layout>
      <section>
        <h1>MultiCompra</h1>
        <p>Catálogo</p>
      </section>

      <section>
        {products.length === 0 ? (
          <p>Cargando productos...</p>
        ) : (
          <div>
            {products.map(product => (
              <div key={product.id}>
                <h2>{product.title}</h2>
                <img width="80" src={product.image} alt={`Imagen de ${product.title}`} />
                <p>${product.price}</p>
                <p>{product.description}</p>
                <p><strong>{product.category}</strong></p>

                {user && (
                  <div>
                    <button onClick={() => handleOpenEdit(product)}>Actualizar</button>
                    <button onClick={() => handleDelete(product.id)}>Borrar</button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </section>

      {showPopup && (
        <section className="popup-edit">
          <h2>Editando producto</h2>
          <button onClick={handleCloseEdit}>Cerrar</button>
          <form onSubmit={handleUpdate}>
            <input
              type="text"
              placeholder="Ingrese el título"
              value={titleEdit}
              onChange={(e) => setTitleEdit(e.target.value)}
              required
            />
            <input
              type="number"
              step="0.01"
              placeholder="Ingrese el precio"
              value={priceEdit}
              onChange={(e) => setPriceEdit(e.target.value)}
              required
            />
            <textarea
              placeholder="Ingrese la descripción"
              value={descriptionEdit}
              onChange={(e) => setDescriptionEdit(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Ingrese la categoría"
              value={categoryEdit}
              onChange={(e) => setCategoryEdit(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Ingrese la URL de la imagen"
              value={imageEdit}
              onChange={(e) => setImageEdit(e.target.value)}
              required
            />
            <button>Actualizar</button>
          </form>
        </section>
      )}
    </Layout>
  )
}

export { Home }
