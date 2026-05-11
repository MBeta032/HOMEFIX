import { Navigate, Route, Routes } from "react-router-dom";
import CartCounter from "../components/cart/CartCounter";
import ServiceCard from "../components/shared/ServiceCard";
import { CartProvider } from "../context/Cart/CartContext";
import { services } from "../data/service.data";
import CartPage from "../pages/CartPage";

function ServicesMockPage() {
  return (
    <main className="service-list-page">
      <section className="service-list-container">
        <div className="cart-counter-bar">
          <div>
            <h1>Servicios HomeFix</h1>
            <p>Selecciona un servicio para ver su detalle.</p>
          </div>

          <CartCounter />
        </div>

        <div className="service-list-grid">
          {services.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      </section>
    </main>
  );
}

export default function AppRouter() {
  return (
    <CartProvider>
        <Routes>
          <Route path="/" element={<Navigate to="/services" />} />

          <Route path="/services" element={<ServicesMockPage />} />

          <Route path="/cart" element={<CartPage />} />

          <Route path="*" element={<Navigate to="/services" />} />
        </Routes>
    </CartProvider>
  );
}