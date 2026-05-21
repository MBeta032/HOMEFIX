import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PublicNavbar from "../components/shared/PublicNavbar";
import SearchBox from "../components/shared/SearchBox";
import SectionTitle from "../components/shared/SectionTitle";
import EmptyState from "../components/shared/EmptyState";
import ServiceCard from "../components/services/ServiceCard";
import {
  beneficiosHome,
  pasosHome,
  serviciosPrincipales,
} from "../data/services.data";
import { zonasDisponibles } from "../data/zones.data";
import type { IZoneCoverage } from "../interfaces/Home/zone.interface";
import "../styles/HomePublica.css";

function HomePublica() {
  const navigate = useNavigate();
  const [zonaBuscada, setZonaBuscada] = useState<string>("");
  const [zonaEncontrada, setZonaEncontrada] = useState<IZoneCoverage | null>(null);
  const [mensajeBusqueda, setMensajeBusqueda] = useState<string>(
    "Escribe una zona, barrio o dirección para revisar cobertura."
  );
  const [busquedaRealizada, setBusquedaRealizada] = useState<boolean>(false);

  function handleBuscarZona() {
    const textoBusqueda = zonaBuscada.trim().toLowerCase();

    if (textoBusqueda === "") {
      setZonaEncontrada(null);
      setBusquedaRealizada(false);
      setMensajeBusqueda("Ingresa una zona, barrio o dirección para buscar cobertura.");
      return;
    }

    const resultado = zonasDisponibles.find((zona) => {
      const coincideZona = zona.zona.toLowerCase().includes(textoBusqueda);
      const coincideBarrio = zona.barrios.some((barrio) =>
        barrio.toLowerCase().includes(textoBusqueda)
      );

      return coincideZona || coincideBarrio;
    });

    setBusquedaRealizada(true);

    if (resultado) {
      setZonaEncontrada(resultado);
      setMensajeBusqueda(`Tenemos servicios disponibles en ${resultado.zona}.`);
      return;
    }

    setZonaEncontrada(null);
    setMensajeBusqueda("Por ahora no encontramos servicios disponibles en esta zona.");
  }

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

            <SearchBox
              value={zonaBuscada}
              placeholder="Ingresa tu barrio, zona o dirección"
              buttonText="Buscar"
              onChange={setZonaBuscada}
              onSearch={handleBuscarZona}
            />

            <div className="zone-search-result">
              {!busquedaRealizada && (
                <p className="zone-message zone-message-initial">
                  {mensajeBusqueda}
                </p>
              )}

              {busquedaRealizada && zonaEncontrada && (
                <div className="zone-message zone-message-success">
                  <h4>{mensajeBusqueda}</h4>
                  <p>
                    Barrios relacionados: {zonaEncontrada.barrios.join(", ")}.
                  </p>
                  <p>
                    Servicios disponibles: {zonaEncontrada.serviciosDisponibles.join(", ")}.
                  </p>
                </div>
              )}

              {busquedaRealizada && !zonaEncontrada && (
                <EmptyState
                  title="Sin cobertura por ahora"
                  description={mensajeBusqueda}
                />
              )}
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