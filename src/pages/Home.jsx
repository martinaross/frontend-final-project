import { useEffect, useState } from "react";
import { Layout } from "../components/Layout";
import "../styles/pages/Home.css"

const Home = () => {
  const [products, setProducts] = useState([]);
  const [user, setUser] = useState(null);

  const fechingProducts = async () => {
    try {
      const response = await fetch("https://fakestoreapi.com/products", { method: "GET" });
      if (!response.ok) throw new Error(`Error fetch: ${response.status}`);
      const data = await response.json();
      setProducts(data);
    } catch (err) {
      console.error("Error al obtener productos:", err);
      setProducts([]);
    }
  };

  useEffect(() => {
    fechingProducts();
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`https://fakestoreapi.com/products/${id}`, { method: "DELETE" });
      if (!response.ok) throw new Error(`Error delete: ${response.status}`);
      setProducts((prev) => prev.filter((p) => p.id !== id));
    } catch (err) {
      console.error("No se pudo borrar:", err);
    }
  };

  const handleUpdate = async (id) => {
    // TODO: implementar update (PUT/PATCH)
    console.log("Actualizar producto:", id);
  };

  return (
    <Layout>
      <section>
        <h1>Doggy</h1>
        <p>Catálogo</p>

        <div>
          {products.length === 0 ? (
            <p>Cargando productos...</p>
          ) : (
            products.map((product) => (
              <div key={product.id}>
                <h2>{product.title}</h2>
                <img src={product.image} alt={`imagen de ${product.title}`} />
                <p>${product.price}</p>
                <p>{product.description}</p>
                <p>{product.category}</p>

                {user && (
                  <div>
                    <button onClick={() => handleUpdate(product.id)}>Actualizar</button>
                    <button onClick={() => handleDelete(product.id)}>Borrar</button>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </section>
    </Layout>
  );
};

export { Home };
