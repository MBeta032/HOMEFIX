import RequestForm from "../components/requests/RequestForm"
import CheckoutServicePanel from "../components/requests/CheckotServicePanel"
import EmptyState from "../components/shared/EmptyState"
import PageHeader from "../components/shared/PageHeader"
import { useCheckoutRequestFlow } from "../hooks/request/useCheckoutRequestFlow"
import "../styles/Checkout.css"

export default function CheckoutRequestPage() {
  const checkout = useCheckoutRequestFlow()

  return (
    <main className="checkout-page">
      <section className="checkout-container">
        <PageHeader
          title="Confirmar solicitud"
          subtitle="Configura cada servicio por separado para asignarle su propia fecha, hora, dirección y descripción."
          showBackButton
          onBack={checkout.handleGoToCart}
        />

        {checkout.successMessage && (
          <section className="checkout-success-message">
            <strong>{checkout.successMessage}</strong>

            <p>
              Cada servicio confirmado queda guardado como una solicitud
              pendiente dentro de la cola de atención.
            </p>
          </section>
        )}

        {checkout.cartItems.length === 0 ? (
          <EmptyState
            title="No tienes servicios pendientes por configurar."
            description="Agrega servicios al carrito o revisa las solicitudes que ya fueron creadas."
            actionText="Ver mis solicitudes"
            onAction={checkout.handleGoToRequests}
          />
        ) : (
          <section className="checkout-layout">
            <CheckoutServicePanel
              services={checkout.cartItems}
              selectedService={checkout.selectedService}
              requestedServiceIds={checkout.requestedServiceIds}
              cancelledServiceIds={checkout.cancelledServiceIds}
              requestedCount={checkout.requestedCount}
              cancelledCount={checkout.cancelledCount}
              totalServices={checkout.totalServices}
              cartCount={checkout.cartCount}
              cartTotal={checkout.cartTotal}
              onSelectService={checkout.handleSelectService}
            />

            <section className="checkout-form-card">
              {checkout.selectedService ? (
                <>
                  <div className="checkout-form-current-title">
                    <span>Formulario para</span>

                    <h2>{checkout.selectedService.name}</h2>
                  </div>

                  <RequestForm
                    services={[checkout.selectedService]}
                    onSubmit={checkout.handleConfirmRequest}
                    onCancel={checkout.handleCancelCurrentService}
                    submitText="Crear solicitud de este servicio"
                    cancelText="Cancelar este servicio"
                  />
                </>
              ) : (
                <EmptyState
                  title="Todas las solicitudes fueron configuradas."
                  description="Puedes revisar tus solicitudes creadas desde la sección Mis solicitudes."
                  actionText="Ver mis solicitudes"
                  onAction={checkout.handleGoToRequests}
                />
              )}
            </section>
          </section>
        )}
      </section>
    </main>
  )
}