import { useState } from "react";
import type { IRequest } from "../../interfaces/Requests/request.interface";
import type { IRating } from "../../interfaces/Rating/rating.interface";
import { useRatings } from "../../hooks/rating/useRatings";
import { RatingStars } from "./RatingStars";

interface Props {
  request: IRequest;
}

export function RatingForm({ request }: Props) {
  const { addRating } = useRatings();
  const [score, setScore] = useState<number>(0);
  const [comment, setComment] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<boolean>(false);

  function handleSubmit(): void {
    if (score === 0) {
      setError("Selecciona una puntuación antes de guardar.");
      return;
    }

    const newRating: IRating = {
      id: crypto.randomUUID(),
      requestId: request.id,
      serviceId: request.serviceId,
      serviceName: request.serviceName,
      company: request.company,
      score,
      comment,
      createdAt: new Date().toISOString(),
    };

    addRating(newRating);
    setSuccess(true);
    setError("");
  }

  if (success) {
    return (
      <p className="rating-success">✅ Calificación guardada correctamente.</p>
    );
  }

  return (
    <div className="rating-form">
      <h4 className="rating-form__title">Califica tu experiencia</h4>
      <p className="rating-form__subtitle">
        Tu opinión ayuda a mejorar la calidad de los servicios.
      </p>

      <div className="rating-form__field">
        <span className="rating-form__label">Puntuación</span>
        <RatingStars score={score} onSelect={setScore} />
      </div>

      <div className="rating-form__field">
        <label className="rating-form__label" htmlFor={`comment-${request.id}`}>
          Comentario
        </label>
        <textarea
          id={`comment-${request.id}`}
          className="rating-form__textarea"
          placeholder="Cuéntanos cómo fue tu experiencia..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          rows={3}
        />
      </div>

      {error && <p className="rating-form__error">{error}</p>}

      <button
        type="button"
        className="rating-form__btn"
        onClick={handleSubmit}
      >
        Guardar calificación
      </button>
    </div>
  );
}
