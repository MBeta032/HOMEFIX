import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/HomePublica.css";
import { services } from "../data/services.data";
import { AuthContext } from "../context/AuthContext";





function Dashboard() {
  const [zona, setZona] = useState("");
  const [resultado, setResultado] = useState("");

    const context = useContext(AuthContext)


    if (!context) {
        throw new Error("AuthContext no disponible")
    }

    const { user, logout } = context


    const navigate = useNavigate()

  function handleBuscar() {
    if (zona.trim() === "") {
      setResultado("Por favor ingresa una zona o barrio.");
      return;
    }
    setResultado(`Buscando servicios en: ${zona}`);
  }

    const handleLogout = async () => {
        await logout()
        navigate("/login")
    }

  return (
    <div className="home-container">
        <nav className="home-nav">
        <h1 className="home-logo">HomeFix</h1>

        <div className="home-nav-botones">

            {user ? (
            <button onClick={handleLogout}>
                Cerrar sesión
            </button>
            ) : (
            <>
                <button onClick={() => navigate("/login")}>
                Iniciar sesión
                </button>

                <button
                onClick={() => navigate("/registro")}
                className="btn-primary"
                >
                Registrarse
                </button>
            </>
            )}

        </div>
        </nav>

      <section className="home-hero">
        <h2>Soluciones confiables para cada rincón de tu hogar.</h2>
        <p>Encuentra el servicio que necesitas, cuando lo necesitas.</p>
        <button onClick={() => navigate("/registro")} className="btn-primary">
          Comenzar ahora
        </button>
      </section>

      <section className="home-busqueda">
        <h3>¿Dónde necesitas el servicio?</h3>
        <div className="busqueda-contenedor">
          <input
            type="text"
            placeholder="Ingresa tu barrio o zona"
            value={zona}
            onChange={(e) => setZona(e.target.value)}
            className="busqueda-input"
          />
          <button onClick={handleBuscar} className="btn-primary">
            Buscar servicios
          </button>
        </div>
        {resultado && <p className="busqueda-resultado">{resultado}</p>}
      </section>

      <section className="home-servicios">
        <h3>Nuestros servicios</h3>
        <div className="servicios-grid">
          {services.map((service) => (
            <div
              key={service.id}
              className="servicio-card"
              onClick={() => navigate(`/servicios/${service.id}`)}
            >
              <span className="servicio-icono">{service.image}</span>
              <p>{service.name}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Dashboard;