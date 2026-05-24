interface EmptyStateProps {
  title: string
  description?: string
  actionText?: string
  onAction?: () => void
}

function EmptyState({
  title,
  description,
  actionText,
  onAction,
}: EmptyStateProps) {
  return (
    <div className="empty-state">
      <h4>{title}</h4>

      {description && <p>{description}</p>}

      {actionText && onAction && (
        <button
          type="button"
          className="empty-state-action"
          onClick={onAction}
        >
          {actionText}
        </button>
      )}
    </div>
  )
}

export default EmptyState