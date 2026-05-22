import { useNavigate } from "react-router-dom"
import EmptyState from "../components/shared/EmptyState"
import PageHeader from "../components/shared/PageHeader"
import ServicesCard from "../components/shared/ServicesCard"
import { useHistory } from "../hooks/History/useHistory"
import "../styles/History.css"
import "../styles/Services.css"

function History() {
  const navigate = useNavigate()
  const { history, clearHistory } = useHistory()

  function handleGoToServices(): void {
    navigate("/dashboard/servicios")
  }

  return (
    <section className="history-page">
      <PageHeader
        title="Historial de servicios vistos"
        subtitle="Consulta los últimos servicios que revisaste y vuelve rápido a su detalle."
      />

      {history.length === 0 ? (
        <div className="history-empty-card">
          <EmptyState
            title="Aún no has visto servicios"
            description="Cuando abras el detalle de un servicio, aparecerá en esta sección."
          />

          <button
            type="button"
            className="service-detail-btn"
            onClick={handleGoToServices}
          >
            Explorar servicios
          </button>
        </div>
      ) : (
        <>
          <div className="history-summary">
            <div>
              <h2>Servicios recientes</h2>
              <p>
                Mostrando <strong>{history.length}</strong> servicios vistos.
                El último servicio consultado aparece primero.
              </p>
            </div>

            <div className="history-actions">
              <button
                type="button"
                className="service-detail-btn service-detail-btn-secondary"
                onClick={handleGoToServices}
              >
                Ver más servicios
              </button>

              <button
                type="button"
                className="history-clear-button"
                onClick={clearHistory}
              >
                Limpiar historial
              </button>
            </div>
          </div>

          <div className="services-grid history-grid">
            {history.map((service) => (
              <ServicesCard key={service.id} service={service} />
            ))}
          </div>
        </>
      )}
    </section>
  )
}

export default History