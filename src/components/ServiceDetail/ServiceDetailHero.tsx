import type { IService } from "../../interfaces/service.interface";
import RatingStars from "../shared/RatingStars";
import ServiceDetailActions from "./ServiceDetailActions";

interface ServiceDetailHeroProps {
  service: IService;
  onAddToCart: () => void;
  onRequestNow: () => void;
}

export default function ServiceDetailHero({
  service,
  onAddToCart,
  onRequestNow,
}: ServiceDetailHeroProps) {
  return (
    <article className="service-detail-main-card">
      <div className="service-detail-image">{service.image}</div>

      <div className="service-detail-info">
        <p className="service-category">{service.category}</p>

        <h1>{service.name}</h1>

        <p>{service.description}</p>

        <RatingStars rating={service.rating} />

        <ServiceDetailActions
          onAddToCart={onAddToCart}
          onRequestNow={onRequestNow}
        />
      </div>
    </article>
  );
}