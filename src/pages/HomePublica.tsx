import { useNavigate } from "react-router-dom";
import "../styles/HomePublica.css";

const servicios = [
  { icono: "🔧", nombre: "Plomería" },
  { icono: "⚡", nombre: "Electricidad" },
  { icono: "🪚", nombre: "Carpintería" },
  { icono: "🎨", nombre: "Pintura" },
  { icono: "🧹", nombre: "Limpieza" },
  { icono: "🌿", nombre: "Jardinería" },
  { icono: "🔌", nombre: "Electrodomésticos" },
  { icono: "🏠", nombre: "Mantenimiento" },
];

function HomePublica() {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <nav className="home-nav">
        <h1 className="home-logo">HomeFix</h1>
        <div className="home-nav-botones">
          <button onClick={() => navigate("/login")}>Iniciar sesión</button>
          <button onClick={() => navigate("/registro")} className="btn-primary">
            Registrarse
          </button>
        </div>
      </nav>

      <section className="home-hero">
        <h2>Soluciones confiables para cada rincón de tu hogar.</h2>
        <p>Encuentra el servicio que necesitas, cuando lo necesitas.</p>
        <button onClick={() => navigate("/registro")} className="btn-primary">
          Comenzar ahora
        </button>
      </section>

      <section className="home-servicios">
        <h3>Nuestros servicios</h3>
        <div className="servicios-grid">
          {servicios.map((s) => (
            <div key={s.nombre} className="servicio-card">
              <span className="servicio-icono">{s.icono}</span>
              <p>{s.nombre}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default HomePublica;