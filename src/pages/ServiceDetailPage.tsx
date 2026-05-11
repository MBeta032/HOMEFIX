import PageHeader from "../components/shared/PageHeader";
import ServiceDetailHero from "../components/ServiceDetail/ServiceDetailHero";
import ServiceDetailInfo from "../components/ServiceDetail/ServiceDetailInfo";
import ServiceDetailList from "../components/ServiceDetail/ServiceDetailList";
import ServiceNotFound from "../components/ServiceDetail/ServiceNotFound";
import { useServiceDetail } from "../hooks/ServiceDetail/userServiceDetail";

export default function ServiceDetailPage() {
  const {
    service,
    handleBack,
    handleAddToCart,
    handleRequestNow,
  } = useServiceDetail();

  if (!service) {
    return <ServiceNotFound onBack={handleBack} />;
  }

  return (
    <main className="service-detail-page">
      <section className="service-detail-header">
        <PageHeader
          title="Detalle del servicio"
          subtitle="Revisa la información antes de solicitar el servicio."
          showBackButton
          onBack={handleBack}
        />

        <ServiceDetailHero
          service={service}
          onAddToCart={handleAddToCart}
          onRequestNow={handleRequestNow}
        />
      </section>

      <section className="service-detail-grid">
        <ServiceDetailInfo service={service} />

        <ServiceDetailList title="Qué incluye" items={service.includes} />

        <ServiceDetailList title="Qué no incluye" items={service.excludes} />

        <ServiceDetailList
          title="Recomendaciones antes de solicitarlo"
          items={service.recommendations}
        />
      </section>
    </main>
  );
}