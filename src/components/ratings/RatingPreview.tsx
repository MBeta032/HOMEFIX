import type { IRating } from "../../interfaces/Rating/rating.interface"
import { RatingStars } from "./RatingStars"

interface RatingPreviewProps {
  rating: IRating
}

export function RatingPreview({ rating }: RatingPreviewProps) {
  const ratingDate = new Date(rating.createdAt).toLocaleDateString("es-CO", {
    day: "numeric",
    month: "long",
    year: "numeric",
  })

  return (
    <div className="rating-preview">
      <h4 className="rating-preview-title">Calificación guardada</h4>
      <RatingStars score={rating.score} readonly />

      {rating.comment && (
        <p className="rating-preview-comment">“{rating.comment}”</p>
      )}

      <p className="rating-preview-date">Calificada el: {ratingDate}</p>
    </div>
  )
}