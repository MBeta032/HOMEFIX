import { Navigate, Route, Routes } from "react-router-dom";
import ServiceCard from "../components/shared/ServiceCard";
import { services } from "../data/service.data";
import ServiceDetailPage from "../pages/ServiceDetailPage";

function ServicesMockPage() {
  return (
    <main className="service-list-page">
      <section className="service-list-container">
        <h1>Servicios HomeFix</h1>
        <p>Selecciona un servicio para ver su detalle.</p>

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
    <Routes>
      <Route path="/" element={<Navigate to="/services" />} />

      <Route path="/services" element={<ServicesMockPage />} />

      <Route path="/service-detail/:id" element={<ServiceDetailPage />} />

      <Route path="*" element={<Navigate to="/services" />} />
    </Routes>
  );
}