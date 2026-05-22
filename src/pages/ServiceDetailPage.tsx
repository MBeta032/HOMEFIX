import PageHeader from "../components/shared/PageHeader"
import ServiceDetailHero from "../components/ServiceDetail/ServiceDetailHero"
import ServiceDetailInfo from "../components/ServiceDetail/ServiceDetailInfo"
import ServiceDetailList from "../components/ServiceDetail/ServiceDetailList"
import ServiceNotFound from "../components/ServiceDetail/ServiceNotFound"
import { useServiceDetail } from "../hooks/ServiceDetail/useServiceDetail"
import "../styles/Services.css"

export default function ServiceDetailPage() {
  const { service, handleBack, handleAddToCart, handleRequestNow } =
    useServiceDetail()

  if (!service) {
    return <ServiceNotFound onBack={handleBack} />
  }

  return (
    <main className="service-detail-page">
      <div className="service-detail-topbar">
        <button
          type="button"
          className="service-detail-btn service-detail-btn-secondary"
          onClick={handleBack}
        >
          ← Volver a servicios
        </button>
      </div>

      <PageHeader
        title="Detalle del servicio"
        subtitle="Revisa la información antes de solicitar el servicio."
      />

      <ServiceDetailHero
        service={service}
        onAddToCart={handleAddToCart}
        onRequestNow={handleRequestNow}
      />

      <section className="service-detail-grid">
        <ServiceDetailInfo service={service} />

        <ServiceDetailList title="Qué incluye" items={service.includes} />

        <ServiceDetailList title="Qué no incluye" items={service.excludes} />

        <ServiceDetailList title="Ideal para" items={service.idealFor} />

        <ServiceDetailList
          title="Proceso del servicio"
          items={service.serviceProcess}
        />

        <ServiceDetailList
          title="Recomendaciones antes de solicitarlo"
          items={service.recommendations}
        />
      </section>
    </main>
  )
}