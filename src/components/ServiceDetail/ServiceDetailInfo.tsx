import type { IService } from "../../interfaces/ServiceDetail/service.interface";
import InfoItem from "../shared/InfoItem";

interface ServiceDetailInfoProps {
  service: IService;
}

function formatPrice(price: number): string {
  return price.toLocaleString("es-CO", {
    style: "currency",
    currency: "COP",
    maximumFractionDigits: 0,
  });
}

export default function ServiceDetailInfo({ service }: ServiceDetailInfoProps) {
  return (
    <article className="service-detail-card">
      <h2>Información del servicio</h2>

      <div className="service-detail-data">
        <InfoItem label="Precio estimado" value={formatPrice(service.price)} />
        <InfoItem label="Duración estimada" value={service.duration} />
        <InfoItem label="Categoría" value={service.category} />
        <InfoItem label="Empresa o proveedor" value={service.company} />
        <InfoItem label="Zona de cobertura" value={service.zone} />
        <InfoItem label="Disponibilidad" value={service.availability} />
      </div>
    </article>
  );
}