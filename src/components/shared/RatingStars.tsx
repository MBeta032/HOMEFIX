import type { RatingStarsProps } from "../../interfaces/Interfacecomponents"

function RatingStars({ value, onChange }: RatingStarsProps) {
  return (
    <div className="rating-stars">
      <label className="select-label">Valoración mínima</label>

      <div className="stars-container">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            className={`star-button ${star <= value ? "star-active" : ""}`}
            onClick={() => onChange(star === value ? 0 : star)}
            title={`${star} estrellas o más`}
          >
            {star <= value ? "★" : "☆"}
          </button>
        ))}

        {value > 0 && (
          <button
            type="button"
            className="star-clear"
            onClick={() => onChange(0)}
            title="Limpiar valoración"
          >
            x
          </button>
        )}
      </div>
    </div>
  )
}

export default RatingStars