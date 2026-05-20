import type { IService } from "../../interfaces/Home/service.interface";

interface ServiceCardProps {
  service: IService;
}

function ServiceCard({ service }: ServiceCardProps) {
  return (
    <article className="servicio-card">
      <span className="servicio-icono">{service.icono}</span>
      <p>{service.nombre}</p>
    </article>
  );
}

export default ServiceCard;