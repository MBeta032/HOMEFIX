import { useNavigate } from "react-router-dom";
import type { IService } from "../../interfaces/ServiceDetail/service.interface";
import Button from "../shared/Button";
import RatingStars from "../shared/RatingStars";

interface CartItemProps {
  service: IService;
  onRemove: (id: string) => void;
}

function formatPrice(price: number): string {
  return price.toLocaleString("es-CO", {
    style: "currency",
    currency: "COP",
    maximumFractionDigits: 0,
  });
}

export default function CartItem({ service, onRemove }: CartItemProps) {
  const navigate = useNavigate();

  function handleViewDetail(): void {
    navigate(`/service-detail/${service.id}`);
  }

  function handleRemove(): void {
    onRemove(service.id);
  }

  return (
    <article className="cart-item-card">
      <div className="cart-item-image">{service.image}</div>

      <div className="cart-item-content">
        <div className="cart-item-header">
          <div>
            <p className="cart-item-category">{service.category}</p>
            <h2>{service.name}</h2>
          </div>

          <strong className="cart-item-price">
            {formatPrice(service.price)}
          </strong>
        </div>

        <p className="cart-item-description">{service.description}</p>

        <div className="cart-item-info">
          <span>Empresa: {service.company}</span>
          <span>Duración: {service.duration}</span>
          <span>Zona: {service.zone}</span>
        </div>

        <RatingStars rating={service.rating} />

        <div className="cart-item-actions">
          <Button variant="primary" onClick={handleViewDetail}>
            Ver detalle
          </Button>

          <Button
            variant="secondary"
            className="cart-remove-button"
            onClick={handleRemove}
          >
            Eliminar
          </Button>
        </div>
      </div>
    </article>
  );
}