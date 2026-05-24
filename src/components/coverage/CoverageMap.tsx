import "leaflet/dist/leaflet.css"
import { CircleMarker, MapContainer, Polyline, Popup, TileLayer } from "react-leaflet"
import type { ICoverageNode } from "../../interfaces/coverageGraph.interface"

interface CoverageMapProps {
  selectedZone: ICoverageNode | null
  companies: ICoverageNode[]
}

const caliCenter: [number, number] = [3.4516, -76.532]

function getPosition(node: ICoverageNode): [number, number] | null {
  if (!node.position) {
    return null
  }

  return [node.position.lat, node.position.lng]
}

export function CoverageMap({ selectedZone, companies }: CoverageMapProps) {
  const selectedZonePosition = selectedZone ? getPosition(selectedZone) : null

  const lines = companies
    .map((company) => {
      const companyPosition = getPosition(company)

      if (!selectedZonePosition || !companyPosition) {
        return null
      }

      return [selectedZonePosition, companyPosition] as [[number, number], [number, number]]
    })
    .filter((line): line is [[number, number], [number, number]] => line !== null)

  return (
    <section className="coverage-map-card">
      <div className="coverage-map-info">
        <div>
          <span>Mapa de cobertura</span>
          <h3>Relación zona → empresa</h3>
        </div>

        <p>
          El mapa muestra visualmente las conexiones principales del grafo.
        </p>
      </div>

      <MapContainer
        center={selectedZonePosition || caliCenter}
        zoom={12}
        scrollWheelZoom={false}
        className="coverage-map"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {selectedZonePosition && selectedZone && (
          <CircleMarker
            center={selectedZonePosition}
            radius={12}
            pathOptions={{
              color: "#0f3c68",
              fillColor: "#1b75bb",
              fillOpacity: 0.9,
            }}
          >
            <Popup>
              <strong>{selectedZone.label}</strong>
              <br />
              {selectedZone.description}
            </Popup>
          </CircleMarker>
        )}

        {companies.map((company) => {
          const position = getPosition(company)

          if (!position) {
            return null
          }

          return (
            <CircleMarker
              key={company.id}
              center={position}
              radius={9}
              pathOptions={{
                color: "#0f7a5f",
                fillColor: "#25b487",
                fillOpacity: 0.9,
              }}
            >
              <Popup>
                <strong>{company.label}</strong>
                <br />
                {company.description}
              </Popup>
            </CircleMarker>
          )
        })}

        {lines.map((line, index) => (
          <Polyline
            key={`coverage-line-${index}`}
            positions={line}
            pathOptions={{
              color: "#1b75bb",
              weight: 3,
              opacity: 0.65,
            }}
          />
        ))}
      </MapContainer>
    </section>
  )
}