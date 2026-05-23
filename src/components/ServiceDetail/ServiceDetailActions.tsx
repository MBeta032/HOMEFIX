interface ServiceDetailActionsProps {
  onAddToCart: () => void;
  onRequestNow: () => void;
  availability: "Disponible" | "No disponible"
}

export default function ServiceDetailActions({
  onAddToCart,
  onRequestNow,
  availability 
}: ServiceDetailActionsProps) {
  
  const isAvailable = availability === "Disponible"

  return (
    <div className="service-detail-actions">
      <button
        type="button"
        className="service-detail-btn service-detail-btn-secondary"
        onClick={onAddToCart}
      >
        {isAvailable ? "Agregar al carrito" : "No disponible"}
      </button>

      <button
        type="button"
        className="service-detail-btn"
        onClick={onRequestNow}
      >
        {isAvailable ? "Solicitar ahora" : "Servicio no disponible"}
      </button>
    </div>
  );
}