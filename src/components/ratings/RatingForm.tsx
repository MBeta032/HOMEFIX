import { useState } from "react"
import type { IRequest } from "../../interfaces/Requests/request.interface"
import type { IRating } from "../../interfaces/Rating/rating.interface"
import { useRatings } from "../../hooks/rating/useRatings"
import { RatingStars } from "./RatingStars"
import Button from "../shared/Button"
import {
  confirmAction,
  showSuccessAlert,
  showWarningAlert,
} from "../../utils/alerts"

interface RatingFormProps {
  request: IRequest
  onSaved?: () => void
}

export function RatingForm({ request, onSaved }: RatingFormProps) {
  const { addRating, isRated } = useRatings()
  const [score, setScore] = useState<number>(0)
  const [comment, setComment] = useState<string>("")
  const [error, setError] = useState<string>("")
  const [success, setSuccess] = useState<boolean>(false)

  async function handleSubmit(): Promise<void> {
    if (request.status !== "Finalizada") {
      showWarningAlert(
        "Servicio no finalizado",
        "Solo puedes calificar servicios que ya estén finalizados."
      )
      return
    }

    if (isRated(request.id)) {
      showWarningAlert(
        "Servicio ya calificado",
        "Esta solicitud ya tiene una calificación guardada."
      )
      return
    }

    if (score < 1 || score > 5) {
      setError("Selecciona una puntuación entre 1 y 5 estrellas.")
      showWarningAlert(
        "Puntuación requerida",
        "Selecciona una puntuación entre 1 y 5 antes de guardar."
      )
      return
    }

    const confirmed = await confirmAction(
      "Guardar calificación",
      "Después de guardar la calificación, esta solicitud quedará marcada como calificada.",
      "Sí, guardar"
    )

    if (!confirmed) {
      return
    }

    const newRating: IRating = {
      id: crypto.randomUUID(),
      requestId: request.id,
      serviceId: request.serviceId,
      serviceName: request.serviceName,
      company: request.company,
      score,
      comment: comment.trim(),
      createdAt: new Date().toISOString(),
    }

    addRating(newRating)
    setSuccess(true)
    setError("")

    showSuccessAlert(
      "Calificación guardada",
      "Gracias por compartir tu experiencia con HomeFix."
    )

    if (onSaved) {
      onSaved()
    }
  }

  if (success) {
    return (
      <p className="rating-success">✅ Calificación guardada correctamente.</p>
    )
  }

  return (
    <div className="rating-form">
      <h4 className="rating-form-title">Califica tu experiencia</h4>
      <p className="rating-form-subtitle">
        Tu opinión ayuda a mejorar la calidad de los servicios.
      </p>

      <div className="rating-form-field">
        <span className="rating-form-label">Puntuación</span>
        <RatingStars score={score} onSelect={setScore} />
      </div>

      <div className="rating-form-field">
        <label className="rating-form-label" htmlFor={`comment-${request.id}`}>
          Comentario opcional
        </label>
        <textarea
          id={`comment-${request.id}`}
          className="rating-form-textarea"
          placeholder="Cuéntanos cómo fue tu experiencia..."
          value={comment}
          onChange={(event) => setComment(event.target.value)}
          rows={3}
          maxLength={200}
        />
        <span className="rating-form-counter">{comment.length}/200</span>
      </div>

      {error && <p className="rating-form-error">{error}</p>}

      <Button variant="success" onClick={() => void handleSubmit()}>
        Guardar calificación
      </Button>
    </div>
  )
}
