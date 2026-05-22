import type { IRating } from "../../interfaces/Rating/rating.interface";
import { RatingStars } from "./RatingStars";

interface Props {
  rating: IRating;
}

export function RatingPreview({ rating }: Props) {
  const fecha = new Date(rating.createdAt).toLocaleDateString("es-CO", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="rating-preview">
      <h4 className="rating-preview__title">Tu calificación</h4>
      <RatingStars score={rating.score} readonly />
      {rating.comment && (
        <p className="rating-preview__comment">{rating.comment}</p>
      )}
      <p className="rating-preview__date">Calificada el: {fecha}</p>
    </div>
  );
}
