import type { ServiceMock } from "../../interfaces/InterfaceServices"

interface CheckoutServicePanelProps {
  services: ServiceMock[]
  selectedService: ServiceMock | undefined
  requestedServiceIds: string[]
  cancelledServiceIds: string[]
  requestedCount: number
  cancelledCount: number
  totalServices: number
  cartCount: number
  cartTotal: number
  onSelectService: (serviceId: string) => void
}

function formatPrice(price: number): string {
  return price.toLocaleString("es-CO", {
    style: "currency",
    currency: "COP",
    maximumFractionDigits: 0,
  })
}

export default function CheckoutServicePanel({
  services,
  selectedService,
  requestedServiceIds,
  cancelledServiceIds,
  requestedCount,
  cancelledCount,
  totalServices,
  cartCount,
  cartTotal,
  onSelectService,
}: CheckoutServicePanelProps) {
  return (
    <section className="checkout-summary-card">
      <h2>Servicios del carrito</h2>

      <p className="checkout-summary-description">
        Selecciona un servicio, configura sus datos y crea la solicitud. Luego
        puedes continuar con el siguiente servicio del carrito.
      </p>

      <div className="checkout-progress-box">
        <span>Progreso</span>

        <strong>
          {requestedCount} creadas / {cancelledCount} canceladas /{" "}
          {totalServices} servicios
        </strong>
      </div>

      {selectedService && (
        <div className="checkout-current-service">
          <span>Configurando ahora</span>

          <strong>{selectedService.name}</strong>

          <p>
            Este servicio tendrá su propia fecha, hora, dirección y descripción
            del problema.
          </p>
        </div>
      )}

      <div className="request-services-list">
        {services.map((service) => {
          const isRequested = requestedServiceIds.includes(service.id)
          const isCancelled = cancelledServiceIds.includes(service.id)
          const isSelected = selectedService?.id === service.id

          return (
            <article
              key={service.id}
              className={`request-service-card ${
                isSelected ? "request-service-card-active" : ""
              } ${isRequested ? "request-service-card-done" : ""} ${
                isCancelled ? "request-service-card-cancelled" : ""
              }`}
            >
              <div className="request-service-top">
                <div className="request-service-image">{service.image}</div>

                <div className="request-service-info">
                  <span className="request-service-id">ID {service.id}</span>

                  <h3>{service.name}</h3>

                  <p>{service.company}</p>

                  <small>Zona de cobertura: {service.zone}</small>
                </div>
              </div>

              <div className="request-service-footer">
                <strong>{formatPrice(service.price)}</strong>

                {isRequested ? (
                  <span className="request-service-created">
                    Solicitud creada
                  </span>
                ) : isCancelled ? (
                  <span className="request-service-cancelled">
                    Servicio cancelado
                  </span>
                ) : (
                  <button
                    type="button"
                    className="request-service-select-button"
                    onClick={() => onSelectService(service.id)}
                  >
                    {isSelected ? "Configurando" : "Solicitar este servicio"}
                  </button>
                )}
              </div>
            </article>
          )
        })}
      </div>

      <div className="checkout-total-box">
        <span>Servicios en carrito:</span>
        <strong>{cartCount}</strong>
      </div>

      <div className="checkout-total-box">
        <span>Total aproximado:</span>
        <strong>{formatPrice(cartTotal)}</strong>
      </div>

      <p className="checkout-note">
        La cola funciona bajo FIFO: cada solicitud se agrega en el orden en que
        el cliente la confirma.
      </p>
    </section>
  )
}