interface RatingStarsProps {
  rating: number;
}

export default function RatingStars({ rating }: RatingStarsProps) {
  const totalStars: number = 5;
  const roundedRating: number = Math.round(rating);

  return (
    <div className="rating-stars">
      <span>
        {Array.from({ length: totalStars }).map((_, index: number) => (
          <span key={index}>
            {index < roundedRating ? "★" : "☆"}
          </span>
        ))}
      </span>

      <strong>{rating.toFixed(1)}</strong>
    </div>
  );
}