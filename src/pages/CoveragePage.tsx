import type { ChangeEvent } from "react"
import { useState } from "react"
import { CoverageGraphView } from "../components/coverage/CoverageGraphView"
import type { ICoverageNode } from "../interfaces/coverageGraph.interface"
import {
  getAdjacencyByZone,
  getCompaniesByZone,
  getServicesByZone,
  getZones,
} from "../utils/coverageGraph.utils"
import "../styles/Coverage.css"

function CoveragePage() {
  const zones = getZones()
  const [selectedZoneId, setSelectedZoneId] = useState<string>("")

  const selectedZone: ICoverageNode | null =
    zones.find((zone) => zone.id === selectedZoneId) || null

  const companies = selectedZone ? getCompaniesByZone(selectedZone.id) : []
  const services = selectedZone ? getServicesByZone(selectedZone.id) : []
  const adjacency = selectedZone ? getAdjacencyByZone(selectedZone.id) : []

  const handleZoneChange = (event: ChangeEvent<HTMLSelectElement>): void => {
    setSelectedZoneId(event.target.value)
  }

  return (
    <main className="coverage-page">
      <section className="coverage-hero">
        <span className="coverage-kicker">Grafo de cobertura</span>

        <h1>Zonas de cobertura de HomeFix</h1>

        <p>
          Esta vista usa un grafo para representar la relación entre zonas,
          empresas mock y servicios disponibles. Cada elemento es un nodo y
          cada conexión es una arista.
        </p>
      </section>

      <section className="coverage-selector">
        <div>
          <h2>Consultar cobertura</h2>
          <p>Selecciona una zona para ver sus conexiones.</p>
        </div>

        <label htmlFor="coverage-zone">Zona</label>

        <select
          id="coverage-zone"
          value={selectedZoneId}
          onChange={handleZoneChange}
        >
          <option value="">Selecciona una zona</option>

          {zones.map((zone) => (
            <option key={zone.id} value={zone.id}>
              {zone.label}
            </option>
          ))}
        </select>
      </section>

      <CoverageGraphView
        selectedZone={selectedZone}
        companies={companies}
        services={services}
        adjacency={adjacency}
      />
    </main>
  )
}

export default CoveragePage