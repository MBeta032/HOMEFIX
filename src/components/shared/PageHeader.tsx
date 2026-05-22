import type { PageHeaderProps } from "../../interfaces/Interfacecomponents"

export default function PageHeader({
  title,
  subtitle,
  showBackButton = false,
  onBack,
}: PageHeaderProps) {
  return (
    <div className="page-header">
      <div className="page-header-content">
        <h1>{title}</h1>
        {subtitle && <p>{subtitle}</p>}
      </div>

      {showBackButton && onBack && (
        <button
          type="button"
          className="page-header-back-button"
          onClick={onBack}
        >
          ← Volver
        </button>
      )}
    </div>
  )
}