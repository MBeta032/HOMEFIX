import { useNavigate, useParams } from "react-router-dom"
import EmptyState from "../components/shared/EmptyState"
import { servicesMock } from "../data/ServicesMock"
import "../styles/Services.css"

function formatPrice(price: number): string {
  return price.toLocaleString("es-CO", {
    style: "currency",
    currency: "COP",
    maximumFractionDigits: 0,
  })
}

function renderStars(rating: number): string {
  const roundedRating = Math.max(0, Math.min(5, Math.round(rating)))
  const activeStars = "★".repeat(roundedRating)
  const inactiveStars = "☆".repeat(5 - roundedRating)

  return `${activeStars}${inactiveStars}`
}

function ServiceDetail() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()

  const service = servicesMock.find((item) => item.id === id)

  function handleBack(): void {
    navigate("/dashboard/servicios")
  }

  function handleAddToCart(): void {
    alert("Esta función se conectará en HU-013.")
  }

  function handleRequestNow(): void {
    alert("Esta función se conectará en HU-015.")
  }

  if (!service) {
    return (
      <main className="dashboard-page">
        <section className="service-detail-page">
          <button
            type="button"
            className="service-detail-btn service-detail-btn-secondary"
            onClick={handleBack}
          >
            ← Volver a servicios
          </button>

          <div className="service-not-found">
            <EmptyState
              title="Servicio no encontrado"
              description="El servicio que intentas consultar no existe o no está disponible."
            />
          </div>
        </section>
      </main>
    )
  }

  return (
    <main className="dashboard-page">
      <section className="service-detail-page">
        <div className="service-detail-topbar">
          <button
            type="button"
            className="service-detail-btn service-detail-btn-secondary"
            onClick={handleBack}
          >
            ← Volver a servicios
          </button>
        </div>

        <section className="service-detail-hero">
          <div className="service-detail-image">{service.image}</div>

          <div className="service-detail-hero-content">
            <div className="service-detail-hero-header">
              <span className="service-card-category">{service.category}</span>

              <span
                className={`service-card-availability ${
                  service.availability === "Disponible"
                    ? "available"
                    : "unavailable"
                }`}
              >
                {service.availability}
              </span>
            </div>

            <h1>{service.name}</h1>

            <p className="service-detail-company">{service.company}</p>

            <p className="service-detail-description">{service.description}</p>

            <div className="service-detail-summary">
              <span>📍 {service.zone}</span>
              <span>⏱ {service.duration}</span>
              <span>⭐ {renderStars(service.rating)} {service.rating}</span>
            </div>

            <div className="service-detail-price-row">
              <strong>{formatPrice(service.price)}</strong>

              <div className="service-detail-actions">
                <button
                  type="button"
                  className="service-detail-btn service-detail-btn-secondary"
                  onClick={handleAddToCart}
                >
                  Agregar al carrito
                </button>

                <button
                  type="button"
                  className="service-detail-btn"
                  onClick={handleRequestNow}
                >
                  Solicitar ahora
                </button>
              </div>
            </div>
          </div>
        </section>

        <section className="service-detail-grid">
          <article className="service-detail-card">
            <h2>Información del servicio</h2>

            <div className="service-detail-data">
              <div className="info-item">
                <span>Precio estimado</span>
                <strong>{formatPrice(service.price)}</strong>
              </div>

              <div className="info-item">
                <span>Duración estimada</span>
                <strong>{service.duration}</strong>
              </div>

              <div className="info-item">
                <span>Empresa o proveedor</span>
                <strong>{service.company}</strong>
              </div>

              <div className="info-item">
                <span>Zona de cobertura</span>
                <strong>{service.zone}</strong>
              </div>

              <div className="info-item">
                <span>Nivel de urgencia</span>
                <strong>{service.urgencyLevel}</strong>
              </div>

              <div className="info-item">
                <span>Garantía</span>
                <strong>{service.warranty}</strong>
              </div>

              <div className="info-item">
                <span>Nota de pago</span>
                <strong>{service.paymentNote}</strong>
              </div>
            </div>
          </article>

          <article className="service-detail-card">
            <h2>Qué incluye</h2>

            <ul className="service-detail-list">
              {service.includes.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>

          <article className="service-detail-card">
            <h2>Qué no incluye</h2>

            <ul className="service-detail-list">
              {service.excludes.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>

          <article className="service-detail-card">
            <h2>Ideal para</h2>

            <ul className="service-detail-list">
              {service.idealFor.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>

          <article className="service-detail-card">
            <h2>Proceso del servicio</h2>

            <ul className="service-detail-list">
              {service.serviceProcess.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>

          <article className="service-detail-card">
            <h2>Recomendaciones antes de solicitarlo</h2>

            <ul className="service-detail-list">
              {service.recommendations.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
        </section>
      </section>
    </main>
  )
}

export default ServiceDetail