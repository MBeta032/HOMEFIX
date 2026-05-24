interface SectionTitleProps {
  title: string;
  description?: string;
}

function SectionTitle({ title, description }: SectionTitleProps) {
  return (
    <div className="section-title">
      <h3>{title}</h3>
      {description && <p>{description}</p>}
    </div>
  );
}

export default SectionTitle;