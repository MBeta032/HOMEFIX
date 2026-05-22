interface ServiceDetailActionsProps {
  onAddToCart: () => void;
  onRequestNow: () => void;
}

export default function ServiceDetailActions({
  onAddToCart,
  onRequestNow,
}: ServiceDetailActionsProps) {
  return (
    <div className="service-detail-actions">
      <button
        type="button"
        className="service-detail-btn service-detail-btn-secondary"
        onClick={onAddToCart}
      >
        Agregar al carrito
      </button>

      <button
        type="button"
        className="service-detail-btn"
        onClick={onRequestNow}
      >
        Solicitar ahora
      </button>
    </div>
  );
}