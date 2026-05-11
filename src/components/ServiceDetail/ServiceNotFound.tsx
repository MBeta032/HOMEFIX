import Button from "../shared/Button";

interface ServiceNotFoundProps {
  onBack: () => void;
}

export default function ServiceNotFound({ onBack }: ServiceNotFoundProps) {
  return (
    <main className="service-detail-page">
      <section className="service-not-found">
        <h1>Servicio no encontrado.</h1>

        <p>Este servicio todavía no existe o el id no es válido.</p>

        <Button variant="primary" onClick={onBack}>
          Volver
        </Button>
      </section>
    </main>
  );
}