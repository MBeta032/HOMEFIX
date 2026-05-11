import { useNavigate } from "react-router-dom";
import Button from "../components/shared/Button";
import EmptyState from "../components/shared/EmptyState";
import PageHeader from "../components/shared/PageHeader";
import ServiceCard from "../components/shared/ServiceCard";
import { useHistory } from "../hooks/History/useHistory";
import type { IService } from "../interfaces/ServiceDetail/service.interface";
import "../styles/History/index.css";

export default function HistoryPage() {
  const navigate = useNavigate();
  const { history, clearHistory } = useHistory();

  function handleGoToServices(): void {
    navigate("/services");
  }

  return (
    <main className="history-page">
      <section className="history-container">
        <PageHeader
          title="Historial de servicios vistos"
          subtitle="Aquí puedes revisar los últimos servicios que consultaste."
          showBackButton
          onBack={handleGoToServices}
        />

        {history.length === 0 ? (
          <EmptyState
            title="Aún no has visto servicios."
            message="Cuando abras el detalle de un servicio, aparecerá aquí."
            actionText="Explorar servicios"
            onAction={handleGoToServices}
          />
        ) : (
          <>
            <div className="history-summary">
              <p>
                Servicios vistos: <strong>{history.length}</strong>
              </p>

              <Button variant="secondary" onClick={clearHistory}>
                Limpiar historial
              </Button>
            </div>

            <div className="history-grid">
              {history.map((service: IService) => (
                <ServiceCard key={service.id} service={service} />
              ))}
            </div>
          </>
        )}
      </section>
    </main>
  );
}