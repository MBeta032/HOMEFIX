import ServiceDetailHero from "../components/ServiceDetail/ServiceDetailHero"
import ServiceDetailInfo from "../components/ServiceDetail/ServiceDetailInfo"
import ServiceDetailListCard from "../components/ServiceDetail/ServiceDetailListCard"
import ServiceNotFound from "../components/ServiceDetail/ServiceNotFound"
import { useServiceDetail } from "../hooks/ServiceDetail/useServiceDetail"
import "../styles/Services.css"

function ServiceDetail() {
  const {
    service,
    handleBack,
    handleAddToCart,
    handleRequestNow,
  } = useServiceDetail()

  if (!service) {
    return (
      <main className="dashboard-page">
        <ServiceNotFound onBack={handleBack} />
      </main>
    )
  }

  return (
    <main className="dashboard-page">
      <section className="service-detail-page">
        <div className="service-detail-topbar">
          <button
            type="button"
            className="service-detail-btn service-detail-btn-secondary"
            onClick={handleBack}
          >
            ← Volver a servicios
          </button>
        </div>

        <ServiceDetailHero
          service={service}
          onAddToCart={handleAddToCart}
          onRequestNow={handleRequestNow}
        />

        <section className="service-detail-grid">
          <ServiceDetailInfo service={service} />

          <ServiceDetailListCard
            title="Qué incluye"
            items={service.includes}
          />

          <ServiceDetailListCard
            title="Qué no incluye"
            items={service.excludes}
          />

          <ServiceDetailListCard
            title="Ideal para"
            items={service.idealFor}
          />

          <ServiceDetailListCard
            title="Proceso del servicio"
            items={service.serviceProcess}
          />

          <ServiceDetailListCard
            title="Recomendaciones antes de solicitarlo"
            items={service.recommendations}
          />
        </section>
      </section>
    </main>
  )
}

export default ServiceDetail