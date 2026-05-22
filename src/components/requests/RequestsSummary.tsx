interface RequestsSummaryProps {
  requestCount: number
}

export default function RequestsSummary({ requestCount }: RequestsSummaryProps) {
  return (
    <section className="requests-summary-card">
      <div>
        <p>Total de solicitudes</p>
        <strong>{requestCount}</strong>
      </div>

      <span>
        Las solicitudes se muestran de la más reciente a la más antigua.
      </span>
    </section>
  )
}