import type { ChangeEvent } from "react"
import { useState } from "react"
import { CoverageGraphView } from "../components/coverage/CoverageGraphView"
import { CoverageMap } from "../components/coverage/CoverageMap"
import type { ICoverageNode } from "../interfaces/coverageGraph.interface"
import {
  getAdjacencyByZone,
  getCompaniesByZone,
  getServicesByZone,
  getZones,
} from "../utils/coverageGraph.utils"
import { showInfoAlert } from "../utils/alerts"
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
    const zoneId = event.target.value
    setSelectedZoneId(zoneId)

    if (!zoneId) {
      return
    }

    const companiesByZone = getCompaniesByZone(zoneId)

    if (companiesByZone.length === 0) {
      showInfoAlert(
        "Sin cobertura",
        "Esta zona todavía no tiene empresas conectadas en el grafo."
      )
    }
  }

  return (
    <main className="coverage-page">
      <section className="coverage-hero">
        <div>
          <span className="coverage-kicker">Grafo de cobertura</span>
          <h1>Zonas de cobertura de HomeFix</h1>
          <p>
            Consulta cómo se conectan las zonas de Cali con empresas mock y
            servicios disponibles. Esta vista ayuda a defender el uso del grafo
            dentro del proyecto.
          </p>
        </div>
      </section>

      <section className="coverage-content">
        <aside className="coverage-selector">
          <h2>Consultar cobertura</h2>
          <p>Selecciona una zona para ver sus conexiones.</p>

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

          <div className="coverage-help">
            <strong>¿Qué representa?</strong>
            <p>
              Zona, empresa y servicio son nodos. Las conexiones entre ellos son
              aristas.
            </p>
          </div>
        </aside>

        <div className="coverage-main">
          <CoverageMap selectedZone={selectedZone} companies={companies} />

          <CoverageGraphView
            selectedZone={selectedZone}
            companies={companies}
            services={services}
            adjacency={adjacency}
          />
        </div>
      </section>
    </main>
  )
}

export default CoveragePage
