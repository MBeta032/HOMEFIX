import { useNavigate } from "react-router-dom"
import RequestsEmptyState from "../components/requests/RequestsEmptyState"
import RequestsList from "../components/requests/RequestsList"
import RequestsSummary from "../components/requests/RequestsSummary"
import PageHeader from "../components/shared/PageHeader"
import { useRequests } from "../hooks/request/useRequests"
import type { IRequest } from "../interfaces/Requests/request.interface"
import "../styles/Requests.css"

function getRequestDateValue(request: IRequest): number {
  const date = new Date(request.createdAt)
  const dateValue = date.getTime()

  if (Number.isNaN(dateValue)) {
    return 0
  }

  return dateValue
}

export default function MyRequestsPage() {
  const navigate = useNavigate()
  const { requests, requestCount } = useRequests()

  const sortedRequests: IRequest[] = [...requests].sort(
    (firstRequest, secondRequest) =>
      getRequestDateValue(secondRequest) - getRequestDateValue(firstRequest)
  )

  function handleGoToCart(): void {
    navigate("/dashboard/carrito")
  }

  function handleGoToServices(): void {
    navigate("/dashboard/servicios")
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
          <RequestsEmptyState
            onGoToCart={handleGoToCart}
            onGoToServices={handleGoToServices}
          />
        ) : (
          <>
            <RequestsSummary requestCount={requestCount} />
            <RequestsList requests={sortedRequests} />
          </>
        )}
      </section>
    </main>
  )
}