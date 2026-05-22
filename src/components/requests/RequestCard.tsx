import { useState } from "react";
import type { IRequest } from "../../interfaces/Requests/request.interface";
import { useRatings } from "../../hooks/rating/useRatings";
import { RatingForm } from "../ratings/RatingForm";
import { RatingPreview } from "../ratings/RatingPreview";

interface Props {
  request: IRequest;
}

export function RequestCard({ request }: Props) {
  const { isRated, getRatingByRequestId } = useRatings();
  const [showForm, setShowForm] = useState<boolean>(false);

  const rated = isRated(request.id);
  const existingRating = getRatingByRequestId(request.id);

  return (
    <div className="request-card">
      {/* Datos principales de la solicitud */}
      <div className="request-card__header">
        <h3 className="request-card__service">{request.serviceName}</h3>
        <span className={`request-card__badge request-card__badge--${request.status.toLowerCase().replace(" ", "-")}`}>
          {request.status}
        </span>
      </div>

      <div className="request-card__body">
        <p className="request-card__info">
          <span className="request-card__label">Empresa:</span> {request.company}
        </p>
        <p className="request-card__info">
          <span className="request-card__label">Precio aprox.:</span> ${request.price.toLocaleString("es-CO")}
        </p>
        <p className="request-card__info">
          <span className="request-card__label">Método de pago:</span> {request.paymentMethod}
        </p>
        <p className="request-card__info">
          <span className="request-card__label">Dirección:</span>{" "}
          {request.address}, {request.neighborhood}, {request.city}
        </p>
        <p className="request-card__info">
          <span className="request-card__label">Zona:</span> {request.serviceZone}
        </p>
        <p className="request-card__info">
          <span className="request-card__label">Fecha deseada:</span>{" "}
          {request.desiredDate} a las {request.desiredTime}
        </p>
        {request.problemDescription && (
          <p className="request-card__info">
            <span className="request-card__label">Descripción:</span>{" "}
            {request.problemDescription}
          </p>
        )}
        <p className="request-card__info request-card__info--date">
          Creada el:{" "}
          {new Date(request.createdAt).toLocaleDateString("es-CO", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
        </p>
      </div>

      {/* Sección de calificación */}
      <div className="request-card__rating">
        {request.status !== "Finalizada" && (
          <p className="rating-pending">
            Podrás calificar cuando el servicio finalice.
          </p>
        )}

        {request.status === "Finalizada" && !rated && !showForm && (
          <button
            type="button"
            className="rating-btn"
            onClick={() => setShowForm(true)}
          >
            Calificar servicio
          </button>
        )}

        {request.status === "Finalizada" && !rated && showForm && (
          <RatingForm request={request} />
        )}

        {request.status === "Finalizada" && rated && existingRating && (
          <RatingPreview rating={existingRating} />
        )}
      </div>
    </div>
  );
}
