import EmptyState from "../shared/EmptyState";

interface ServiceNotFoundProps {
  onBack: () => void;
}

export default function ServiceNotFound({ onBack }: ServiceNotFoundProps) {
  return (
    <section className="service-detail-page">
      <div className="service-not-found">
        <EmptyState
          title="Servicio no encontrado."
          description="Este servicio todavía no existe o el id no es válido."
        />

        <button
          type="button"
          className="service-detail-btn"
          onClick={onBack}
        >
          Volver a servicios
        </button>
      </div>
    </section>
  );
}