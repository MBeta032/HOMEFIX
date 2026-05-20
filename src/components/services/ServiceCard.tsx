import type { IService } from "../../interfaces/Home/service.interface";

interface ServiceCardProps {
  service: IService;
}

function ServiceCard({ service }: ServiceCardProps) {
  return (
    <article className="service-card">
      <span className="service-card-icon">{service.icono}</span>

      <div>
        <h4>{service.nombre}</h4>
        <p>{service.descripcion}</p>
      </div>
    </article>
  );
}

export default ServiceCard;