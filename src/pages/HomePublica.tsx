import { useNavigate } from "react-router-dom";
import PublicNavbar from "../components/shared/PublicNavbar";
import Button from "../components/shared/Button";
import SectionTitle from "../components/shared/SectionTitle";
import ServiceCard from "../components/services/ServiceCard";
import {
  beneficiosHome,
  pasosHome,
  serviciosPrincipales,
} from "../data/services.data";
import "../styles/HomePublica.css";

function HomePublica() {
  const navigate = useNavigate();

  return (
    <div className="home-page">
      <PublicNavbar
        onLoginClick={() => navigate("/login")}
        onRegisterClick={() => navigate("/registro")}
      />

      <main>
        <section className="home-hero">
          <div className="home-hero-content">
            <span className="home-hero-label">Servicios para tu hogar</span>

            <h2>Soluciones confiables para cada rincón de tu hogar.</h2>

            <p>
              Encuentra servicios de plomería, electricidad, limpieza,
              jardinería, pintura y mantenimiento desde una sola plataforma.
            </p>

            <div className="home-search-box">
              <input
                type="text"
                placeholder="¿Qué servicio necesitas?"
                aria-label="Buscar servicio"
              />
              <Button
                text="Buscar"
                onClick={() => navigate("/registro")}
                variant="primary"
              />
            </div>
          </div>

          <div className="home-hero-visual">
            <div className="home-hero-card">
              <span className="home-hero-icon">🧰</span>
              <h3>HomeFix</h3>
              <p>Servicios rápidos, organizados y pensados para clientes.</p>
            </div>
          </div>
        </section>

        <section id="como-funciona" className="home-section home-steps-section">
          <SectionTitle
            title="Así funciona HomeFix"
            description="Solicitar un servicio para tu hogar será un proceso sencillo y organizado."
          />

          <div className="home-steps-grid">
            {pasosHome.map((paso) => (
              <article key={paso.titulo} className="home-step-card">
                <span>{paso.icono}</span>
                <h4>{paso.titulo}</h4>
                <p>{paso.descripcion}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="servicios" className="home-section home-services-section">
          <SectionTitle
            title="Servicios principales"
            description="Estas son algunas de las categorías que HomeFix tendrá disponibles para sus usuarios."
          />

          <div className="home-services-grid">
            {serviciosPrincipales.map((servicio) => (
              <ServiceCard key={servicio.nombre} service={servicio} />
            ))}
          </div>
        </section>

        <section id="beneficios" className="home-section home-benefits-section">
          <div className="home-benefits-header">
            <span>HomeFix</span>
            <h3>Tu hogar, más organizado.</h3>
          </div>

          <div className="home-benefits-grid">
            {beneficiosHome.map((beneficio) => (
              <article key={beneficio.titulo} className="home-benefit-card">
                <span>{beneficio.icono}</span>
                <h4>{beneficio.titulo}</h4>
                <p>{beneficio.descripcion}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="home-about-section">
          <div>
            <span className="home-about-label">Sobre nosotros</span>
            <h3>Una plataforma académica enfocada en servicios del hogar</h3>
            <p>
              HomeFix nace como una propuesta web para organizar solicitudes de
              servicios domésticos. Su objetivo es facilitar que un cliente
              pueda encontrar, guardar y solicitar servicios de forma clara.
            </p>
          </div>

          <div className="home-about-card">
            <h4>¿Qué busca resolver?</h4>
            <p>
              Centralizar servicios del hogar, mejorar la organización de las
              solicitudes y construir una experiencia simple para el cliente.
            </p>
          </div>
        </section>
      </main>

      <footer className="home-footer">
        <div className="home-footer-brand">
          <span>⚡</span>
          <strong>HomeFix</strong>
        </div>

        <p>Soluciones confiables para cada rincón de tu hogar.</p>
      </footer>
    </div>
  );
}

export default HomePublica;