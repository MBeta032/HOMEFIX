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

export default function CheckoutPage() {
  const navigate = useNavigate();

  const { cartItems, cartCount, cartTotal, clearCart } = useCart();
  const { createRequestsFromCart } = useRequests();

  const [successMessage, setSuccessMessage] = useState<string>("");

  function handleGoToCart(): void {
    navigate("/cart");
  }

  function handleConfirmRequest(formData: IRequestFormData): void {
    const createdRequests = createRequestsFromCart(cartItems, formData);

    clearCart();

    if (createdRequests.length === 1) {
      setSuccessMessage("Solicitud creada correctamente.");
      return;
    }

    setSuccessMessage("Solicitudes creadas correctamente.");
  }

  if (successMessage) {
    return (
      <main className="checkout-page">
        <section className="checkout-container">
          <section className="checkout-success-card">
            <div className="checkout-success-icon">✅</div>

            <h1>{successMessage}</h1>

            <p>
              Tus servicios fueron convertidos en solicitudes pendientes. En la
              siguiente historia de usuario se podrá construir la pantalla para
              verlas.
            </p>

            <Button variant="primary" onClick={handleGoToCart}>
              Volver al carrito
            </Button>
          </section>
        </section>
      </main>
    );
  }

  return (
    <main className="checkout-page">
      <section className="checkout-container">
        <PageHeader
          title="Confirmar solicitud"
          subtitle="Completa los datos necesarios para crear tus solicitudes pendientes."
          showBackButton
          onBack={handleGoToCart}
        />

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
              <h2>Servicios a solicitar</h2>

              <div className="checkout-services-list">
                {cartItems.map((service: IService) => (
                  <article key={service.id} className="checkout-service-item">
                    <div className="checkout-service-image">{service.image}</div>

                    <div>
                      <p>{service.category}</p>
                      <h3>{service.name}</h3>
                      <span>{service.company}</span>
                    </div>

                    <strong>{formatPrice(service.price)}</strong>
                  </article>
                ))}
              </div>

              <div className="checkout-total-box">
                <span>Total de servicios:</span>
                <strong>{cartCount}</strong>
              </div>

              <div className="checkout-total-box">
                <span>Total aproximado:</span>
                <strong>{formatPrice(cartTotal)}</strong>
              </div>

              <p className="checkout-note">
                Se creará una solicitud pendiente por cada servicio del carrito.
              </p>
            </section>

            <RequestForm
              serviceCount={cartCount}
              onSubmit={handleConfirmRequest}
            />
          </section>
        )}
      </section>
    </main>
  );
}