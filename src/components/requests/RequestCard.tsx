import { useNavigate } from "react-router-dom";
import type { IRequest } from "../../interfaces/Requests/request.interface";
import Button from "../shared/Button";
import RequestStatusBadge from "./RequestStatusBadge";

interface RequestCardProps {
  request: IRequest;
}

function formatPrice(price: number): string {
  return price.toLocaleString("es-CO", {
    style: "currency",
    currency: "COP",
    maximumFractionDigits: 0,
  });
}

function formatDesiredDate(dateValue: string): string {
  const dateParts = dateValue.split("-");

  if (dateParts.length !== 3) {
    return dateValue;
  }

  const year = Number(dateParts[0]);
  const month = Number(dateParts[1]) - 1;
  const day = Number(dateParts[2]);

  const date = new Date(year, month, day);

  if (Number.isNaN(date.getTime())) {
    return dateValue;
  }

  return date.toLocaleDateString("es-CO", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function formatTime(timeValue: string): string {
  const timeParts = timeValue.split(":");

  if (timeParts.length < 2) {
    return timeValue;
  }

  const hours = Number(timeParts[0]);
  const minutes = Number(timeParts[1]);

  const date = new Date(2026, 0, 1, hours, minutes);

  if (Number.isNaN(date.getTime())) {
    return timeValue;
  }

  return date.toLocaleTimeString("es-CO", {
    hour: "numeric",
    minute: "2-digit",
  });
}

function formatCreatedAt(createdAt: string): string {
  const date = new Date(createdAt);

  if (Number.isNaN(date.getTime())) {
    return createdAt;
  }

  return date.toLocaleDateString("es-CO", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function RequestCard({ request }: RequestCardProps) {
  const navigate = useNavigate();

  function handleViewService(): void {
    navigate("/services");
  }

  return (
    <article className="request-card">
      <div className="request-card-header">
        <div>
          <p className="request-card-code">{request.id}</p>
          <h2>{request.serviceName}</h2>
          <p>{request.company}</p>
        </div>

        <RequestStatusBadge status={request.status} />
      </div>

      <div className="request-card-section">
        <h3>Información del servicio</h3>

        <div className="request-info-grid">
          <div className="request-info-item">
            <span>Precio aproximado</span>
            <strong>{formatPrice(request.price)}</strong>
          </div>

          <div className="request-info-item">
            <span>Método de pago</span>
            <strong>{request.paymentMethod}</strong>
          </div>

          <div className="request-info-item">
            <span>Fecha deseada</span>
            <strong>{formatDesiredDate(request.desiredDate)}</strong>
          </div>

          <div className="request-info-item">
            <span>Hora deseada</span>
            <strong>{formatTime(request.desiredTime)}</strong>
          </div>
        </div>
      </div>

      <div className="request-card-section">
        <h3>Ubicación del cliente</h3>

        <div className="request-info-grid">
          <div className="request-info-item">
            <span>Dirección</span>
            <strong>{request.address}</strong>
          </div>

          <div className="request-info-item">
            <span>Barrio</span>
            <strong>{request.neighborhood}</strong>
          </div>

          <div className="request-info-item">
            <span>Ciudad</span>
            <strong>{request.city}</strong>
          </div>

          <div className="request-info-item">
            <span>Zona de cobertura</span>
            <strong>{request.serviceZone}</strong>
          </div>
        </div>
      </div>

      <div className="request-card-section">
        <h3>Problema reportado</h3>
        <p className="request-problem-description">
          {request.problemDescription}
        </p>
      </div>

      <div className="request-card-footer">
        <p>
          Creada el: <strong>{formatCreatedAt(request.createdAt)}</strong>
        </p>

        <Button variant="primary" onClick={handleViewService}>
          Ver detalle del servicio
        </Button>
      </div>
    </article>
  );
}