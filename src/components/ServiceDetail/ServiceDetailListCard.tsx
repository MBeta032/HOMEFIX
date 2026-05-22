interface ServiceDetailListCardProps {
  title: string
  items: string[]
}

export default function ServiceDetailListCard({
  title,
  items,
}: ServiceDetailListCardProps) {
  return (
    <article className="service-detail-card">
      <h2>{title}</h2>

      <ul className="service-detail-list">
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </article>
  )
}