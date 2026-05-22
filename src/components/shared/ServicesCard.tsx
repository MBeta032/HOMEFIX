import { useNavigate } from "react-router-dom"
import type { ServiceMock } from "../../interfaces/InterfaceServices"

function ServicesCard({ service }: { service: ServiceMock }) {
  const navigate = useNavigate()

  return (
    <div className="service-card">
      <div className="service-card-header">
        <span className="service-card-category">{service.category}</span>

        <span
          className={`service-card-availability ${
            service.availability === "Disponible" ? "available" : "unavailable"
          }`}
        >
          {service.availability}
        </span>
      </div>

      <h3 className="service-card-name">{service.name}</h3>
      <p className="service-card-company">{service.company}</p>
      <p className="service-card-description">{service.description}</p>

      <div className="service-card-info">
        <span>📍 {service.zone}</span>
        <span>⏱ {service.duration}</span>
        <span>⭐ {service.rating.toFixed(1)}</span>
      </div>

      <div className="service-card-footer">
        <span className="service-card-price">
          ${service.price.toLocaleString("es-CO")}
        </span>

        <button
          className="btn-primary"
          onClick={() => navigate(`/dashboard/servicios/${service.id}`)}
        >
          Ver detalle
        </button>
      </div>
    </div>
  )
}

export default ServicesCard