import type { IService } from "../interfaces/service.interface";

interface ServiceDetailCardProps {
  service: IService;
}

function formatPrice(price: number): string {
  return new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    maximumFractionDigits: 0,
  }).format(price);
}

function ServiceDetailCard({ service }: ServiceDetailCardProps) {
  return (
    <article className="service-detail-card">
      <div className="service-detail-visual" aria-label={service.category}>
        {service.image}
      </div>

      <div className="service-detail-content">
        <span className="service-detail-category">{service.category}</span>
        <h1>{service.name}</h1>
        <p className="service-detail-description">{service.description}</p>

        <div className="service-detail-grid">
          <p>
            <strong>Precio estimado:</strong> {formatPrice(service.price)}
          </p>
          <p>
            <strong>Duración estimada:</strong> {service.duration}
          </p>
          <p>
            <strong>Calificación:</strong> ⭐ {service.rating} / 5
          </p>
          <p>
            <strong>Proveedor:</strong> {service.provider}
          </p>
          <p>
            <strong>Zona de cobertura:</strong> {service.coverageZone}
          </p>
          <p>
            <strong>Disponibilidad:</strong> {service.availability}
          </p>
        </div>
      </div>
    </article>
  );
}

export default ServiceDetailCard;
