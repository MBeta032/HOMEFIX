import type { PageHeaderProps } from "../../interfaces/Interfacecomponents";


export default function PageHeader({
  title,
  subtitle,
}: PageHeaderProps) {
  return (
    <div className="page-header">
      <h1>{title}</h1>
      {subtitle && <p>{subtitle}</p>}
    </div>
  );
}