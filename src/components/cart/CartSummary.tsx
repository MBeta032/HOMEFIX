import { useNavigate } from "react-router-dom"
import Button from "../shared/Button"

interface CartSummaryProps {
  cartCount: number
  cartTotal: number
}

function formatPrice(price: number): string {
  return price.toLocaleString("es-CO", {
    style: "currency",
    currency: "COP",
    maximumFractionDigits: 0,
  })
}

export default function CartSummary({
  cartCount,
  cartTotal,
}: CartSummaryProps) {
  const navigate = useNavigate()

  function handleConfirmRequest(): void {
    navigate("/dashboard/checkout")
  }

  return (
    <aside className="cart-summary-card">
      <h2>Resumen del carrito</h2>

      <div className="cart-summary-row">
        <span>Servicios agregados:</span>
        <strong>{cartCount}</strong>
      </div>

      <div className="cart-summary-row">
        <span>Total aproximado:</span>
        <strong>{formatPrice(cartTotal)}</strong>
      </div>

      <p className="cart-summary-note">
        Los precios son aproximados y pueden variar según la revisión del
        servicio.
      </p>

      <Button variant="primary" onClick={handleConfirmRequest}>
        Confirmar solicitud
      </Button>
    </aside>
  )
}