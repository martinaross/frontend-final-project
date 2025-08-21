import { useEffect, useMemo, useState } from "react";
import { Layout } from "../components/Layout";
import { useAuth } from "../context/UserContext";
import "../styles/pages/Home.css";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState("");


  const [query, setQuery] = useState("");

  const [showPopup, setShowPopup] = useState(false);
  const [productToEdit, setProductToEdit] = useState(null);
  const [titleEdit, setTitleEdit] = useState("");
  const [priceEdit, setPriceEdit] = useState("");
  const [descriptionEdit, setDescriptionEdit] = useState("");
  const [categoryEdit, setCategoryEdit] = useState("");
  const [imageEdit, setImageEdit] = useState("");


  const [formErrors, setFormErrors] = useState({});

  const { user } = useAuth();

  const fetchingProducts = async () => {
    try {
      setLoading(true);
      setFetchError("");
      const response = await fetch("https://fakestoreapi.com/products");
      if (!response.ok) throw new Error("No se pudieron cargar los productos");
      const data = await response.json();
      setProducts(data);
    } catch (err) {
      setFetchError(err.message || "Error al cargar productos");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchingProducts();
  }, []);


  const filteredProducts = useMemo(() => {
    const needle = query.trim().toLowerCase();
    if (!needle) return products;
    return products.filter((p) => {
      const title = p.title?.toLowerCase() || "";
      const cat = p.category?.toLowerCase() || "";
      const price = String(p.price ?? "");
      return (
        title.includes(needle) ||
        cat.includes(needle) ||
        price.includes(needle)
      );
    });
  }, [products, query]);

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`https://fakestoreapi.com/products/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        setProducts((prev) => prev.filter((p) => p.id !== id));
      } else {
        console.error("No se pudo borrar");
        alert("No se pudo borrar el producto.");
      }
    } catch (err) {
      console.error(err);
      alert("Error de red al borrar el producto.");
    }
  };

  const handleOpenEdit = (product) => {
    setProductToEdit(product);
    setTitleEdit(product.title || "");
    setPriceEdit(product.price ?? "");
    setDescriptionEdit(product.description || "");
    setCategoryEdit(product.category || "");
    setImageEdit(product.image || "");
    setFormErrors({});
    setShowPopup(true);
  };

  const handleCloseEdit = () => {
    setShowPopup(false);
    setProductToEdit(null);
    setFormErrors({});
  };


  const validateEdit = () => {
    const err = {};
    if (!titleEdit.trim()) err.title = "El título es obligatorio";
    if (!descriptionEdit.trim())
      err.description = "La descripción es obligatoria";
    const n = Number(priceEdit);
    if (!(n > 0)) err.price = "El precio debe ser mayor a 0";
    if (!categoryEdit.trim()) err.category = "La categoría es obligatoria";
    try {
      if (!imageEdit.trim()) throw new Error("La URL es obligatoria");

      new URL(imageEdit);
    } catch {
      err.image = "URL de imagen inválida";
    }
    return err;

  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!productToEdit) return;

    const err = validateEdit();
    setFormErrors(err);
    if (Object.keys(err).length) return;

    const updatedProduct = {
      id: productToEdit.id,
      title: titleEdit.trim(),
      price: Number(priceEdit),
      description: descriptionEdit.trim(),
      category: categoryEdit.trim(),
      image: imageEdit.trim(),
    };

    try {
      const response = await fetch(
        `https://fakestoreapi.com/products/${productToEdit.id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updatedProduct),
        }
      );

      if (response.ok) {
        const data = await response.json();
        setProducts((prev) =>
          prev.map((p) => (p.id === productToEdit.id ? data : p))
        );
        handleCloseEdit();
      } else {
        console.error("No se pudo actualizar");
        alert("No se pudo actualizar el producto.");
      }
    } catch (error) {
      console.log(error);
      alert("Error de red al actualizar el producto.");
    }
  };

  return (
    <Layout>
      <section className="home-header">
        <h1>MultiCompra</h1>
        <p>Catálogo</p>
      </section>

      <section className="toolbar">
        <input
          type="search"
          className="search-input"
          placeholder="Buscar por título, categoría o precio..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          aria-label="Buscar productos"
        />
        {query && (
          <button className="clear-btn" onClick={() => setQuery("")}>
            Limpiar
          </button>
        )}
        <span className="results">{filteredProducts.length} resultados</span>
      </section>

      <section>
        {loading ? (
          <p>Cargando productos...</p>
        ) : fetchError ? (
          <p className="error">{fetchError}</p>
        ) : filteredProducts.length === 0 ? (
          <p className="muted">
            No hay resultados para <strong>{query}</strong>.
          </p>
        ) : (
          <div className="products-grid">
            {filteredProducts.map((product) => (
              <article key={product.id} className="product-card">
                <h2 className="product-title" title={product.title}>
                  {product.title}
                </h2>
                <img
                  width="120"
                  height="120"
                  src={product.image}
                  alt={`Imagen de ${product.title}`}
                  loading="lazy"
                />
                <p className="product-price">${product.price}</p>
                <p className="product-desc">{product.description}</p>
                <p className="product-cat">
                  <strong>{product.category}</strong>
                </p>

                {user && (
                  <div className="admin-actions">
                    <button onClick={() => handleOpenEdit(product)}>
                      Actualizar
                    </button>
                    <button onClick={() => handleDelete(product.id)}>
                      Borrar
                    </button>
                  </div>
                )}
              </article>
            ))}
          </div>
        )}
      </section>

      {showPopup && (
        <section className="popup-edit" role="dialog" aria-modal="true">
          <div className="popup-header">
            <h2>Editando producto</h2>
            <button className="close" onClick={handleCloseEdit}>
              Cerrar
            </button>
          </div>

          <form onSubmit={handleUpdate} className="edit-form" noValidate>
            <label>
              Título
              <input
                type="text"
                placeholder="Ingrese el título"
                value={titleEdit}
                onChange={(e) => setTitleEdit(e.target.value)}
              />
              {formErrors.title && (
                <small className="error">{formErrors.title}</small>
              )}
            </label>

            <label>
              Precio
              <input
                type="number"
                step="0.01"
                placeholder="Ingrese el precio"
                value={priceEdit}
                onChange={(e) => setPriceEdit(e.target.value)}
              />
              {formErrors.price && (
                <small className="error">{formErrors.price}</small>
              )}
            </label>

            <label>
              Descripción
              <textarea
                placeholder="Ingrese la descripción"
                value={descriptionEdit}
                onChange={(e) => setDescriptionEdit(e.target.value)}
                rows={4}
              />
              {formErrors.description && (
                <small className="error">{formErrors.description}</small>
              )}
            </label>

            <label>
              Categoría
              <input
                type="text"
                placeholder="Ingrese la categoría"
                value={categoryEdit}
                onChange={(e) => setCategoryEdit(e.target.value)}
              />
              {formErrors.category && (
                <small className="error">{formErrors.category}</small>
              )}
            </label>

            <label>
              URL de imagen
              <input
                type="text"
                placeholder="Ingrese la URL de la imagen"
                value={imageEdit}
                onChange={(e) => setImageEdit(e.target.value)}
              />
              {formErrors.image && (
                <small className="error">{formErrors.image}</small>
              )}
            </label>

            <div className="edit-actions">
              <button type="submit">Actualizar</button>
              <button type="button" onClick={handleCloseEdit}>
                Cancelar
              </button>
            </div>
          </form>
        </section>
      )}
    </Layout>
  );
};

export { Home };
