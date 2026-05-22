import { createContext, useEffect, useState } from "react"
import type { ReactNode } from "react"
import type { ServiceMock } from "../../interfaces/InterfaceServices"

export type AddToCartResult = "added" | "exists"

export interface CartContextType {
  cartItems: ServiceMock[]
  cartCount: number
  addToCart: (service: ServiceMock) => AddToCartResult
  clearCart: () => void
}

interface CartProviderProps {
  children: ReactNode
}

export const CartContext = createContext<CartContextType | undefined>(
  undefined
)

const CART_STORAGE_KEY = "homefix-cart"

function isValidService(service: unknown): service is ServiceMock {
  if (typeof service !== "object" || service === null) {
    return false
  }

  const possibleService = service as Partial<ServiceMock>

  return (
    typeof possibleService.id === "string" &&
    typeof possibleService.name === "string" &&
    typeof possibleService.category === "string" &&
    typeof possibleService.price === "number"
  )
}

function getCartFromStorage(): ServiceMock[] {
  if (typeof window === "undefined") {
    return []
  }

  const savedCart = localStorage.getItem(CART_STORAGE_KEY)

  if (!savedCart) {
    return []
  }

  try {
    const parsedCart = JSON.parse(savedCart) as unknown

    if (!Array.isArray(parsedCart)) {
      return []
    }

    return parsedCart.filter(isValidService)
  } catch {
    return []
  }
}

export function CartProvider({ children }: CartProviderProps) {
  const [cartItems, setCartItems] = useState<ServiceMock[]>(getCartFromStorage)

  const cartCount = cartItems.length

  useEffect(() => {
    if (cartItems.length === 0) {
      localStorage.removeItem(CART_STORAGE_KEY)
      return
    }

    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems))
  }, [cartItems])

  function addToCart(service: ServiceMock): AddToCartResult {
    const serviceAlreadyExists = cartItems.some(
      (cartItem) => cartItem.id === service.id
    )

    if (serviceAlreadyExists) {
      return "exists"
    }

    setCartItems([...cartItems, service])
    return "added"
  }

  function clearCart(): void {
    setCartItems([])
  }

  return (
    <CartContext.Provider
      value={{
        cartItems,
        cartCount,
        addToCart,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}