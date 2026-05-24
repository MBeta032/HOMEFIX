import { useState } from "react"
import type { IRequest } from "../../interfaces/Requests/request.interface"
import { useRatings } from "../../hooks/rating/useRatings"
import Button from "../shared/Button"
import { RatingForm } from "./RatingForm"
import { RatingPreview } from "./RatingPreview"

interface RequestRatingSectionProps {
  request: IRequest
}

export function RequestRatingSection({ request }: RequestRatingSectionProps) {
  const { isRated, getRatingByRequestId } = useRatings()
  const [showRatingForm, setShowRatingForm] = useState<boolean>(false)

  const isFinished = request.status === "Finalizada"
  const hasRating = isRated(request.id)
  const rating = getRatingByRequestId(request.id)

  function handleOpenRatingForm(): void {
    setShowRatingForm(true)
  }

  function handleRatingSaved(): void {
    setShowRatingForm(false)
  }

  return (
    <div className="request-card-section request-rating-section">
      <h3>Calificación del servicio</h3>

      {!isFinished && (
        <p className="rating-pending">
          Podrás calificar cuando el servicio finalice.
        </p>
      )}

      {isFinished && hasRating && rating && <RatingPreview rating={rating} />}

      {isFinished && !hasRating && !showRatingForm && (
        <Button variant="success" onClick={handleOpenRatingForm}>
          Calificar servicio
        </Button>
      )}

      {isFinished && !hasRating && showRatingForm && (
        <RatingForm request={request} onSaved={handleRatingSaved} />
      )}
    </div>
  )
}