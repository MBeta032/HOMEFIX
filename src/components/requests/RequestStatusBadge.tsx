import type { RequestStatus } from "../../interfaces/Requests/request.interface";

interface RequestStatusBadgeProps {
  status: RequestStatus;
}

function getStatusClass(status: RequestStatus): string {
  switch (status) {
    case "Pendiente":
      return "request-status-pending";

    case "Asignada":
      return "request-status-assigned";

    case "En proceso":
      return "request-status-progress";

    case "Finalizada":
      return "request-status-finished";

    case "Cancelada":
      return "request-status-cancelled";

    default:
      return "request-status-pending";
  }
}

export default function RequestStatusBadge({
  status,
}: RequestStatusBadgeProps) {
  return (
    <span className={`request-status-badge ${getStatusClass(status)}`}>
      {status}
    </span>
  );
}