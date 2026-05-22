import { useNavigate } from "react-router-dom"
import { useCart } from "../../hooks/cart/useCart"
import "../../styles/Cart/index.css"

interface CartCounterProps {
  className?: string
}

export default function CartCounter({ className = "" }: CartCounterProps) {
  const navigate = useNavigate()
  const { cartCount } = useCart()

  function handleGoToCart(): void {
    navigate("/dashboard/carrito")
  }

  return (
    <button
      type="button"
      className={`cart-counter ${className}`}
      onClick={handleGoToCart}
    >
      <span className="cart-counter-icon">🛒</span>
      <strong className="cart-counter-text">Carrito ({cartCount})</strong>
    </button>
  )
}