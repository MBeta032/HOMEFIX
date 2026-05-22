import type { ServiceMock } from "../../interfaces/InterfaceServices"
import { getTopRatedServices } from "../../utils/UtilServices"
import EmptyState from "../shared/EmptyState"
import ServicesCard from "../shared/ServicesCard"

interface TopRatedServicesProps {
  services: ServiceMock[]
}

function TopRatedServices({ services }: TopRatedServicesProps) {
  const topServices = getTopRatedServices(services, 5)

  return (
    <section className="top-rated-section">
      <div className="top-rated-header">
        <div>
          <h2>Servicios mejor valorados</h2>
          <p>
            Top 5 calculado según los filtros actuales y ordenado con árbol
            binario de búsqueda.
          </p>
        </div>

        <span>Top {topServices.length}</span>
      </div>

      {topServices.length === 0 ? (
        <EmptyState
          title="No hay servicios valorados"
          description="Cambia los filtros o limpia la búsqueda para ver servicios destacados."
        />
      ) : (
        <div className="services-grid top-rated-grid">
          {topServices.map((service) => (
            <ServicesCard key={service.id} service={service} />
          ))}
        </div>
      )}
    </section>
  )
}

export default TopRatedServices