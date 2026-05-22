import { useState } from "react"
import { useNavigate } from "react-router-dom"
import RequestForm from "../components/requests/RequestForm"
import EmptyState from "../components/shared/EmptyState"
import PageHeader from "../components/shared/PageHeader"
import { useCart } from "../hooks/cart/useCart"
import { useRequests } from "../hooks/request/useRequests"
import type { IRequestFormData } from "../interfaces/Requests/request.interface"
import "../styles/Checkout.css"

function formatPrice(price: number): string {
  return price.toLocaleString("es-CO", {
    style: "currency",
    currency: "COP",
    maximumFractionDigits: 0,
  })
}

export default function RequestPage() {
  const navigate = useNavigate()

  const { cartItems, cartCount, cartTotal, clearCart } = useCart()
  const { createRequestsFromCart } = useRequests()

  const [successMessage, setSuccessMessage] = useState<string>("")

  function handleGoToCart(): void {
    navigate("/dashboard/carrito")
  }

  function handleGoToServices(): void {
    navigate("/dashboard/servicios")
  }

  function handleConfirmRequest(formData: IRequestFormData): void {
    if (cartItems.length === 0) {
      return
    }

    const createdRequests = createRequestsFromCart(cartItems, formData)

    clearCart()

    setSuccessMessage(
      `Se crearon ${createdRequests.length} solicitud(es) pendiente(s) correctamente.`
    )
  }

  return (
    <main className="checkout-page">
      <section className="checkout-container">
        <PageHeader
          title="Confirmar solicitud"
          subtitle="Revisa los servicios del carrito y crea solicitudes pendientes."
          showBackButton
          onBack={handleGoToCart}
        />

        {successMessage && (
          <section className="checkout-success-message">
            <strong>{successMessage}</strong>
            <p>
              Las solicitudes quedaron guardadas como pendientes y fueron
              agregadas a la cola de atención.
            </p>
          </section>
        )}

        {cartItems.length === 0 ? (
          <EmptyState
            title="No tienes servicios para confirmar."
            description="Agrega servicios al carrito antes de crear una solicitud."
            actionText="Explorar servicios"
            onAction={handleGoToServices}
          />
        ) : (
          <section className="checkout-layout">
            <section className="checkout-summary-card">
              <h2>Servicios a confirmar</h2>

              <p className="checkout-summary-description">
                Al confirmar, cada servicio del carrito se convertirá en una
                solicitud pendiente.
              </p>

              <div className="request-services-list">
                {cartItems.map((service) => (
                  <article key={service.id} className="request-service-card">
                    <div className="request-service-top">
                      <div className="request-service-image">
                        {service.image}
                      </div>

                      <div className="request-service-info">
                        <span className="request-service-id">
                          ID {service.id}
                        </span>

                        <h3>{service.name}</h3>

                        <p>{service.company}</p>

                        <small>Zona de cobertura: {service.zone}</small>
                      </div>
                    </div>

                    <div className="request-service-footer">
                      <strong>{formatPrice(service.price)}</strong>
                    </div>
                  </article>
                ))}
              </div>

              <div className="checkout-total-box">
                <span>Servicios pendientes:</span>
                <strong>{cartCount}</strong>
              </div>

              <div className="checkout-total-box">
                <span>Total aproximado:</span>
                <strong>{formatPrice(cartTotal)}</strong>
              </div>

              <p className="checkout-note">
                La cola funciona bajo FIFO: las primeras solicitudes creadas
                quedarán primero en la atención pendiente.
              </p>
            </section>

            <section className="checkout-form-card">
              <RequestForm
                services={cartItems}
                onSubmit={handleConfirmRequest}
                onCancel={handleGoToCart}
              />
            </section>
          </section>
        )}
      </section>
    </main>
  )
}