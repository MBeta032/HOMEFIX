interface ServiceDetailListProps {
  title: string;
  items: string[];
}

export default function ServiceDetailList({
  title,
  items,
}: ServiceDetailListProps) {
  return (
    <section className="service-detail-card">
      <h2>{title}</h2>

      <ul className="service-detail-list">
        {items.map((item: string) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </section>
  );
}