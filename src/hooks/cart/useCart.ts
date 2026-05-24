import { useContext } from "react";
import {
  CartContext,
  type CartContextType,
} from "../../context/Cart/CartContext";

export function useCart(): CartContextType {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart debe usarse dentro de CartProvider");
  }

  return context;
}