import Button from "../shared/Button";

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
      <Button variant="primary" onClick={onAddToCart}>
        Agregar al carrito
      </Button>

      <Button variant="success" onClick={onRequestNow}>
        Solicitar ahora
      </Button>
    </div>
  );
}