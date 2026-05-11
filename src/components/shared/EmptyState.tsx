import Button from "./Button";

interface EmptyStateProps {
  title: string;
  message: string;
  actionText: string;
  onAction: () => void;
}

export default function EmptyState({
  title,
  message,
  actionText,
  onAction,
}: EmptyStateProps) {
  return (
    <section className="empty-state">
      <h2>{title}</h2>

      <p>{message}</p>

      <Button variant="primary" onClick={onAction}>
        {actionText}
      </Button>
    </section>
  );
}