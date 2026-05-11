import { useNavigate } from "react-router-dom";
import RequestCard from "../components/requests/RequestCard";
import Button from "../components/shared/Button";
import PageHeader from "../components/shared/PageHeader";
import { useRequests } from "../hooks/request/useRequests";
import type { IRequest } from "../interfaces/Requests/request.interface";
import "../styles/Requests/index.css";

function getRequestDateValue(request: IRequest): number {
  const date = new Date(request.createdAt);
  const dateValue = date.getTime();

  if (Number.isNaN(dateValue)) {
    return 0;
  }

  return dateValue;
}

export default function RequestsPage() {
  const navigate = useNavigate();
  const { requests, requestCount } = useRequests();

  const sortedRequests: IRequest[] = [...requests].sort(
    (firstRequest, secondRequest) =>
      getRequestDateValue(secondRequest) - getRequestDateValue(firstRequest)
  );

  function handleGoToCart(): void {
    navigate("/cart");
  }

  function handleGoToServices(): void {
    navigate("/services");
  }

  return (
    <main className="requests-page">
      <section className="requests-container">
        <PageHeader
          title="Mis solicitudes"
          subtitle="Consulta el estado de los servicios que has solicitado en HomeFix."
          showBackButton
          onBack={handleGoToServices}
        />

        {requests.length === 0 ? (
          <section className="requests-empty-card">
            <div className="requests-empty-icon">📋</div>

            <h2>Aún no tienes solicitudes.</h2>

            <p>
              Cuando confirmes servicios desde el carrito, aparecerán aquí para
              que puedas revisar su estado.
            </p>

            <div className="requests-empty-actions">
              <Button variant="primary" onClick={handleGoToCart}>
                Ir al carrito
              </Button>

              <Button variant="secondary" onClick={handleGoToServices}>
                Explorar servicios
              </Button>
            </div>
          </section>
        ) : (
          <>
            <section className="requests-summary-card">
              <div>
                <p>Total de solicitudes</p>
                <strong>{requestCount}</strong>
              </div>

              <span>
                Las solicitudes se muestran de la más reciente a la más antigua.
              </span>
            </section>

            <section className="requests-list">
              {sortedRequests.map((request: IRequest) => (
                <RequestCard key={request.id} request={request} />
              ))}
            </section>
          </>
        )}
      </section>
    </main>
  );
}