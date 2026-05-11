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
import "../styles/Requests/index.css";

function formatPrice(price: number): string {
  return price.toLocaleString("es-CO", {
    style: "currency",
    currency: "COP",
    maximumFractionDigits: 0,
  });
}

export default function RequestPage() {
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
              <h2>Servicios pendientes por enviar solicitud</h2>

              <p className="checkout-summary-description">
                Selecciona un servicio por su ID. Solo se enviará la solicitud
                del servicio seleccionado.
              </p>

              <div className="checkout-services-list">
                {cartItems.map((service: IService) => (
                  <article key={service.id} className="checkout-service-item">
                    <div className="checkout-service-main">
                      <div className="checkout-service-image">
                        {service.image}
                      </div>

                      <div>
                        <p className="checkout-service-id">
                          ID del servicio: {service.id}
                        </p>

                        <h3>{service.name}</h3>

                        <span>{service.company}</span>

                        <small>{service.zone}</small>
                      </div>
                    </div>

                    <div className="checkout-service-bottom">
                      <strong>{formatPrice(service.price)}</strong>

                      <Button
                        variant="primary"
                        onClick={() => handleSelectService(service)}
                      >
                        Seleccionar ID {service.id}
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
                <span>Total aproximado pendiente:</span>
                <strong>{formatPrice(cartTotal)}</strong>
              </div>

              <p className="checkout-note">
                La zona no se pregunta aquí porque viene desde el servicio
                disponible. Más adelante se podrá manejar la disponibilidad por
                zonas usando grafos.
              </p>
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
                  <h2>Selecciona un servicio</h2>

                  <p>
                    Elige uno de los servicios pendientes para crear su solicitud.
                    Los demás servicios seguirán guardados en el carrito.
                  </p>

                  <div className="checkout-no-selection-icon">🧰</div>
                </section>
              )}
            </section>
          </section>
        )}
      </section>
    </main>
  );
}