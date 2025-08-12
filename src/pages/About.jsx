import { Layout } from "../components/Layout";
import "../styles/pages/About.css";
import aboutImg from "../assets/about.png";

const About = () => {
  return (
    <Layout>
      <div className="about-container">
        <div className="about-text">
          <h1 className="about-title">
            Sobre<br />Nosotros
            <span className="about-badge">2025</span>
          </h1>
          <section className="about-section">
            <h2>De qué trata el proyecto<p className="about-note">
              Nuestra segunda iteración de diseño y experiencia de compra comienza aquí.
            </p></h2>

            <p>
              MultiCompra es una plataforma de compras en línea que reúne una
              gran variedad de productos en un solo lugar, ofreciendo una
              experiencia rápida, segura y cómoda.
            </p>
          </section>

          <section className="about-section">
            <h2>A quién está dirigido</h2>
            <p>
              Está diseñada para cualquier persona que quiera comprar desde la
              comodidad de su hogar, ya sea un comprador ocasional o frecuente.
            </p>
          </section>

          <section className="about-section">
            <h2>Tecnologías y enfoques utilizados</h2>
            <p>
              Desarrollada con React para la interfaz, CSS modular para estilos
              y Fetch API para conexión con datos externos, siguiendo buenas
              prácticas de diseño responsive y accesibilidad.
            </p>
          </section>
        </div>

        <div className="about-image">
          <img src={aboutImg} alt="Ilustración sobre nosotros" />
        </div>
      </div>
    </Layout>
  );
};

export { About };
