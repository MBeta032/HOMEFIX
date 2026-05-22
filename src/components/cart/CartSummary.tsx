import { useState } from "react"
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
  const [message, setMessage] = useState<string>("")

  function handleConfirmRequest(): void {
    setMessage("La confirmación de solicitud se implementará en la HU-015.")
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

      {message && <p className="cart-temporary-message">{message}</p>}
    </aside>
  )
}