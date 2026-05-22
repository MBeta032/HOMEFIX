import { getTopRatedServices } from "../../utils/UtilServices"
import EmptyState from "../shared/EmptyState"
import ServicesCard from "../shared/ServicesCard"

function TopRatedServices() {
  const topServices = getTopRatedServices(5)

  return (
    <section className="top-rated-section">
      <div className="top-rated-header">
        <div>
          <h2>Servicios mejor valorados</h2>
          <p>
            Servicios destacados ordenados por valoración usando un árbol
            binario de búsqueda.
          </p>
        </div>

        <span>Top {topServices.length}</span>
      </div>

      {topServices.length === 0 ? (
        <EmptyState
          title="No hay servicios valorados"
          description="Cuando existan servicios con valoración aparecerán en esta sección."
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