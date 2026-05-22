import EmptyState from "../shared/EmptyState";
import ServicesCard from "../shared/ServicesCard";
import type { ServiceMock } from "../../interfaces/InterfaceServices";

interface ServiceListProps {
  services: ServiceMock[];
  selectedCategoryName: string;
}

function ServiceList({ services, selectedCategoryName }: ServiceListProps) {
  return (
    <div className="catalogo-services">
      <div className="services-section-header">
        <h2>{selectedCategoryName}</h2>
        <span>{services.length} servicios encontrados</span>
      </div>

      {services.length === 0 ? (
        <EmptyState
          title="No hay servicios en esta categoría"
          description="Por ahora no encontramos servicios disponibles para esta categoría."
        />
      ) : (
        <div className="services-grid">
          {services.map((service) => (
            <ServicesCard key={service.id} service={service} />
          ))}
        </div>
      )}
    </div>
  );
}

export default ServiceList;