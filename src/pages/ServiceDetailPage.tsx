import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { viewedServicesStack } from "../algorithms/ViewedServicesStack";
import ServiceDetailCard from "../components/ServiceDetailCard";
import { services } from "../data/services.data";
import type { IService } from "../interfaces/service.interface";
import "../styles/ServiceDetail.css";

function findServiceById(id: string | undefined): IService | undefined {
  return services.find((service) => service.id === id);
}

function ServiceDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [message, setMessage] = useState<string>("");

  const service = findServiceById(id);

  useEffect(() => {
    if (service) {
      viewedServicesStack.push(service.id);
    }
  }, [service]);

  function handleBack(): void {
    navigate("/Home");
  }

  function handleRequestService(): void {
    setMessage(`Solicitud preparada para este servicio: ${service?.name}.`);
  }

  if (!service) {
    return (
      <main className="service-detail-page">
        <section className="service-not-found">
          <h1>Servicio no encontrado</h1>
          <p>No pudimos encontrar la información de este servicio.</p>
          <button type="button" className="service-secondary-button" onClick={handleBack}>
            Volver a servicios
          </button>
        </section>
      </main>
    );
  }

  return (
    <main className="service-detail-page">
      <section className="service-detail-header">
        <p className="service-detail-label">Detalle del servicio</p>
        <h2>Revisa la información antes de solicitarlo</h2>
      </section>

      <ServiceDetailCard service={service} />

      <section className="service-detail-sections">
        <div className="service-detail-section">
          <h3>Qué incluye</h3>
          <ul>
            {service.includes.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>

        <div className="service-detail-section">
          <h3>Qué no incluye</h3>
          <ul>
            {service.notIncludes.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>

        <div className="service-detail-section service-detail-section-wide">
          <h3>Recomendaciones antes de solicitarlo</h3>
          <ul>
            {service.recommendations.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="service-detail-actions">
        <button type="button" className="service-secondary-button" onClick={handleBack}>
          Volver
        </button>
        <button type="button" className="service-primary-button" onClick={handleRequestService}>
          Solicitar servicio
        </button>
      </section>

      {message && <p className="service-request-message">{message}</p>}
    </main>
  );
}

export default ServiceDetailPage;
