import type { ICoverageNode } from "../../interfaces/coverageGraph.interface"

interface CoverageGraphViewProps {
  selectedZone: ICoverageNode | null
  companies: ICoverageNode[]
  services: ICoverageNode[]
  adjacency: string[]
}

export function CoverageGraphView({
  selectedZone,
  companies,
  services,
  adjacency,
}: CoverageGraphViewProps) {
  if (!selectedZone) {
    return (
      <section className="coverage-empty">
        <h3>Selecciona una zona</h3>
        <p>
          Elige una zona de Cali para consultar las empresas y servicios
          conectados dentro del grafo de cobertura.
        </p>
      </section>
    )
  }

  return (
    <section className="coverage-panel">
      <article className="coverage-zone-card">
        <span>Nodo tipo zona</span>
        <h2>{selectedZone.label}</h2>
        <p>{selectedZone.description}</p>
      </article>

      <div className="coverage-grid">
        <article className="coverage-list-card">
          <h3>Empresas conectadas</h3>

          {companies.length > 0 ? (
            <div className="coverage-list">
              {companies.map((company) => (
                <div key={company.id} className="coverage-node company">
                  <small>Empresa mock</small>
                  <strong>{company.label}</strong>
                </div>
              ))}
            </div>
          ) : (
            <p className="coverage-muted">
              No hay empresas conectadas a esta zona.
            </p>
          )}
        </article>

        <article className="coverage-list-card">
          <h3>Servicios disponibles</h3>

          {services.length > 0 ? (
            <div className="coverage-list">
              {services.map((service) => (
                <div key={service.id} className="coverage-node service">
                  <small>Servicio</small>
                  <strong>{service.label}</strong>
                </div>
              ))}
            </div>
          ) : (
            <p className="coverage-muted">
              No hay servicios disponibles para esta zona.
            </p>
          )}
        </article>
      </div>

      <article className="coverage-adjacency">
        <h3>Lista de adyacencia</h3>

        {adjacency.length > 0 ? (
          <p>
            <strong>{selectedZone.id}</strong> → {adjacency.join(", ")}
          </p>
        ) : (
          <p>No hay nodos adyacentes registrados.</p>
        )}
      </article>
    </section>
  )
}