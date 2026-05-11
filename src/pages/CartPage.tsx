import { useNavigate } from "react-router-dom";
import CartItem from "../components/cart/CartItem";
import CartSummary from "../components/cart/CartSummary";
import EmptyState from "../components/shared/EmptyState";
import PageHeader from "../components/shared/PageHeader";
import { useCart } from "../hooks/cart/useCart";
import type { IService } from "../interfaces/ServiceDetail/service.interface";
import "../styles/Cart/index.css";

export default function CartPage() {
  const navigate = useNavigate();

  const { cartItems, cartCount, cartTotal, removeFromCart } = useCart();

  function handleGoToServices(): void {
    navigate("/services");
  }

  return (
    <main className="cart-page">
      <section className="cart-container">
        <PageHeader
          title="Carrito de servicios"
          subtitle="Revisa los servicios que agregaste antes de confirmar tu solicitud."
          showBackButton
          onBack={handleGoToServices}
        />

        {cartItems.length === 0 ? (
          <EmptyState
            title="Tu carrito está vacío."
            message="Agrega servicios desde el detalle para verlos aquí antes de solicitar."
            actionText="Explorar servicios"
            onAction={handleGoToServices}
          />
        ) : (
          <section className="cart-layout">
            <div className="cart-items-list">
              {cartItems.map((service: IService) => (
                <CartItem
                  key={service.id}
                  service={service}
                  onRemove={removeFromCart}
                />
              ))}
            </div>

            <CartSummary cartCount={cartCount} cartTotal={cartTotal} />
          </section>
        )}
      </section>
    </main>
  );
}