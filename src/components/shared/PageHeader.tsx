import Button from "./Button";

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  showBackButton?: boolean;
  onBack?: () => void;
}

export default function PageHeader({
  title,
  subtitle,
  showBackButton = false,
  onBack,
}: PageHeaderProps) {
  return (
    <header className="page-header">
      {showBackButton && (
        <Button variant="secondary" onClick={onBack}>
          ← Volver
        </Button>
      )}

      <div className="page-header-content">
        <h1>{title}</h1>

        {subtitle && <p>{subtitle}</p>}
      </div>
    </header>
  );
}