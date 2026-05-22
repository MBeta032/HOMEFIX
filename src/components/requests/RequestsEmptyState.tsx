import Button from "../shared/Button"

interface RequestsEmptyStateProps {
  onGoToCart: () => void
  onGoToServices: () => void
}

export default function RequestsEmptyState({
  onGoToCart,
  onGoToServices,
}: RequestsEmptyStateProps) {
  return (
    <section className="requests-empty-card">
      <div className="requests-empty-icon">📋</div>

      <h2>Aún no tienes solicitudes.</h2>

      <p>
        Cuando confirmes servicios desde el carrito, aparecerán aquí para que
        puedas revisar su estado.
      </p>

      <div className="requests-empty-actions">
        <Button variant="primary" onClick={onGoToCart}>
          Ir al carrito
        </Button>

        <Button variant="secondary" onClick={onGoToServices}>
          Explorar servicios
        </Button>
      </div>
    </section>
  )
}