import { useNavigate } from "react-router-dom";
import type { IService } from "../../interfaces/ServiceDetail/service.interface";
import Button from "./Button";
import RatingStars from "./RatingStars";

interface ServiceCardProps {
  service: IService;
}

function formatPrice(price: number): string {
  return price.toLocaleString("es-CO", {
    style: "currency",
    currency: "COP",
    maximumFractionDigits: 0,
  });
}

export default function ServiceCard({ service }: ServiceCardProps) {
  const navigate = useNavigate();

  function handleViewDetail(): void {
    navigate(`/service-detail/${service.id}`);
  }

  return (
    <article className="service-card">
      <div className="service-card-image">{service.image}</div>

      <div className="service-card-content">
        <p className="service-card-category">{service.category}</p>

        <h2>{service.name}</h2>

        <p>{service.description}</p>

        <RatingStars rating={service.rating} />

        <div className="service-card-footer">
          <strong>{formatPrice(service.price)}</strong>

          <Button variant="primary" onClick={handleViewDetail}>
            Ver detalle
          </Button>
        </div>
      </div>
    </article>
  );
}