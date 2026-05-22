interface Props {
  score: number;
  onSelect?: (value: number) => void;
  readonly?: boolean;
}

export function RatingStars({ score, onSelect, readonly = false }: Props) {
  return (
    <div className="rating-stars">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          className={`rating-star ${star <= score ? "rating-star--filled" : "rating-star--empty"}`}
          onClick={() => !readonly && onSelect && onSelect(star)}
          disabled={readonly}
          aria-label={`${star} estrella${star > 1 ? "s" : ""}`}
        >
          {star <= score ? "★" : "☆"}
        </button>
      ))}
    </div>
  );
}
