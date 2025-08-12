import { Layout } from "../components/Layout";
import "../styles/pages/NotFound.css";
import characterImg from "../assets/404.png";


const NotFound = () => {
  return (
    <Layout>
      <div className="notfound-container">
        <img src={characterImg} alt="404" className="notfound-character" />
        <h1 className="notfound-title">404</h1>
        <h2 className="notfound-subtitle">Página no encontrada</h2>
        <p className="notfound-text">
          Lo sentimos, la página que buscas no existe o ha sido movida.
        </p>
        <a href="/" className="notfound-link">
          Verificá la URL o Volvé al inicio
        </a>
      </div>
    </Layout>
  );
};

export { NotFound };
