import type { ServiceMock } from "../../interfaces/InterfaceServices"
import ServiceDetailActions from "./ServiceDetailActions"

interface ServiceDetailHeroProps {
  service: ServiceMock
  onAddToCart: () => void
  onRequestNow: () => void
}

function renderStars(rating: number): string {
  const roundedRating = Math.max(0, Math.min(5, Math.round(rating)))
  const activeStars = "★".repeat(roundedRating)
  const inactiveStars = "☆".repeat(5 - roundedRating)

  return `${activeStars}${inactiveStars}`
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
        <p className="service-card-category">{service.category}</p>

        <h1>{service.name}</h1>

        <p>{service.description}</p>

        <div className="service-detail-rating">
          <span className="service-detail-stars">
            {renderStars(service.rating)}
          </span>

          <strong>{service.rating.toFixed(1)}</strong>
        </div>

        <ServiceDetailActions
          onAddToCart={onAddToCart}
          onRequestNow={onRequestNow}
          availability={service.availability}
        />
      </div>
    </article>
  )
}