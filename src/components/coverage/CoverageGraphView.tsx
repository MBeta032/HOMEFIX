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
          Elige una zona de Cali para ver qué empresas y servicios están
          conectados en el grafo de cobertura.
        </p>
      </section>
    )
  }

  return (
    <section className="coverage-result">
      <article className="coverage-zone-card">
        <span className="coverage-node-type">Nodo tipo zona</span>
        <h2>{selectedZone.label}</h2>
        <p>{selectedZone.description}</p>
      </article>

      <div className="coverage-graph-layout">
        <div className="coverage-column">
          <h3>Empresas conectadas</h3>

          {companies.length > 0 ? (
            companies.map((company) => (
              <div key={company.id} className="coverage-node-card company">
                <span>Empresa mock</span>
                <strong>{company.label}</strong>
              </div>
            ))
          ) : (
            <p className="coverage-muted">
              No hay empresas conectadas a esta zona.
            </p>
          )}
        </div>

        <div className="coverage-column">
          <h3>Servicios disponibles</h3>

          {services.length > 0 ? (
            services.map((service) => (
              <div key={service.id} className="coverage-node-card service">
                <span>Servicio</span>
                <strong>{service.label}</strong>
              </div>
            ))
          ) : (
            <p className="coverage-muted">
              No hay servicios disponibles para esta zona.
            </p>
          )}
        </div>
      </div>

      <article className="coverage-adjacency-card">
        <h3>Lista de adyacencia de la zona</h3>

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