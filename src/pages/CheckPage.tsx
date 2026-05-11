import { useState } from "react";
import { useNavigate } from "react-router-dom";
import RequestForm from "../components/requests/RequestForm";
import Button from "../components/shared/Button";
import EmptyState from "../components/shared/EmptyState";
import PageHeader from "../components/shared/PageHeader";
import { useCart } from "../hooks/cart/useCart";
import { useRequests } from "../hooks/request/useRequests";
import type { IService } from "../interfaces/ServiceDetail/service.interface";
import type { IRequestFormData } from "../interfaces/Requests/request.interface";
import "../styles/Check/index.css";

function formatPrice(price: number): string {
  return price.toLocaleString("es-CO", {
    style: "currency",
    currency: "COP",
    maximumFractionDigits: 0,
  });
}

export default function CheckPage() {
  const navigate = useNavigate();

  const { cartItems, cartCount, cartTotal, removeFromCart } = useCart();
  const { createRequestFromService } = useRequests();

  const [selectedService, setSelectedService] = useState<IService | null>(null);
  const [successMessage, setSuccessMessage] = useState<string>("");

  function handleGoToCart(): void {
    navigate("/cart");
  }

  function handleSelectService(service: IService): void {
    setSelectedService(service);
    setSuccessMessage("");
  }

  function handleCancelSelection(): void {
    setSelectedService(null);
  }

  function handleConfirmRequest(formData: IRequestFormData): void {
    if (!selectedService) {
      return;
    }

    createRequestFromService(selectedService, formData);
    removeFromCart(selectedService.id);

    setSuccessMessage(
      `Solicitud creada correctamente para el servicio "${selectedService.name}".`
    );

    setSelectedService(null);
  }

  return (
    <main className="checkout-page">
      <section className="checkout-container">
        <PageHeader
          title="Confirmar solicitud"
          subtitle="Selecciona un servicio del carrito y crea una solicitud pendiente."
          showBackButton
          onBack={handleGoToCart}
        />

        {successMessage && (
          <section className="checkout-success-message">
            <strong>{successMessage}</strong>
            <p>
              La solicitud quedó guardada como pendiente y fue agregada a la
              cola de solicitudes.
            </p>
          </section>
        )}

        {cartItems.length === 0 ? (
          <EmptyState
            title="No tienes servicios para confirmar."
            message="Agrega servicios al carrito antes de crear una solicitud."
            actionText="Volver al carrito"
            onAction={handleGoToCart}
          />
        ) : (
          <section className="checkout-layout">
            <section className="checkout-summary-card">
              <h2>Servicios pendientes</h2>

              <p className="checkout-summary-description">
                Selecciona el servicio que quieres solicitar. Los demás seguirán
                guardados en el carrito.
              </p>

              <div className="request-services-list">
                {cartItems.map((service: IService) => (
                  <article
                    key={service.id}
                    className={`request-service-card ${
                      selectedService?.id === service.id
                        ? "request-service-card-selected"
                        : ""
                    }`}
                  >
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

                        <small>{service.zone}</small>
                      </div>
                    </div>

                    <div className="request-service-footer">
                      <strong>{formatPrice(service.price)}</strong>

                      <Button
                        variant="primary"
                        onClick={() => handleSelectService(service)}
                      >
                        Solicitar
                      </Button>
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

            </section>

            <section className="checkout-form-card">
              {selectedService ? (
                <RequestForm
                  selectedService={selectedService}
                  onSubmit={handleConfirmRequest}
                  onCancel={handleCancelSelection}
                />
              ) : (
                <section className="checkout-no-selection">
                  <div className="checkout-no-selection-icon">🧰</div>

                  <h2>Selecciona un servicio</h2>

                  <p>
                    Elige uno de los servicios pendientes para crear su solicitud.
                    Solo se enviará el servicio seleccionado.
                  </p>
                </section>
              )}
            </section>
          </section>
        )}
      </section>
    </main>
  );
}