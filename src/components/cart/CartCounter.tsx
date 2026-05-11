import { useCart } from "../../hooks/cart/useCart";
import "../../styles/Cart/index.css";

interface CartCounterProps {
  className?: string;
}

export default function CartCounter({ className = "" }: CartCounterProps) {
  const { cartCount } = useCart();

  return (
    <div className={`cart-counter ${className}`}>
      <span className="cart-counter-icon">🛒</span>
      <strong className="cart-counter-text">Carrito ({cartCount})</strong>
    </div>
  );
}