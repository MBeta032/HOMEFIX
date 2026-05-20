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
    <div className="home-container">
      <PublicNavbar
        onLoginClick={() => navigate("/login")}
        onRegisterClick={() => navigate("/registro")}
      />

      <main>
        <section className="home-hero">
          <h2>Soluciones confiables para cada rincón de tu hogar.</h2>
          <p>
            Encuentra servicios para el hogar de forma sencilla, organizada y
            pensada para las necesidades del cliente.
          </p>
          <Button
            text="Comenzar ahora"
            onClick={() => navigate("/registro")}
            variant="primary"
          />
        </section>

        <section className="home-servicios">
          <SectionTitle
            title="Nuestros servicios"
            description="Estas son algunas de las soluciones que podrás encontrar en HomeFix."
          />

          <div className="servicios-grid">
            {serviciosPrincipales.map((servicio) => (
              <ServiceCard key={servicio.nombre} service={servicio} />
            ))}
          </div>
        </section>

        <section className="home-section home-how-it-works">
          <SectionTitle
            title="Cómo funciona"
            description="HomeFix busca que pedir un servicio para el hogar sea claro desde el primer momento."
          />

          <div className="home-info-grid">
            {pasosHome.map((paso) => (
              <article key={paso.numero} className="home-info-card">
                <span className="home-step-number">{paso.numero}</span>
                <h4>{paso.titulo}</h4>
                <p>{paso.descripcion}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="home-section home-benefits">
          <SectionTitle
            title="Beneficios"
            description="Una plataforma pensada para centralizar servicios básicos del hogar."
          />

          <div className="home-info-grid">
            {beneficiosHome.map((beneficio) => (
              <article key={beneficio.titulo} className="home-info-card">
                <h4>{beneficio.titulo}</h4>
                <p>{beneficio.descripcion}</p>
              </article>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

export default HomePublica;