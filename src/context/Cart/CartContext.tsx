import { createContext, useEffect, useState } from "react"
import type { ReactNode } from "react"
import type { ServiceMock } from "../../interfaces/InterfaceServices"

export type AddToCartResult = "added" | "exists"

export interface CartContextType {
  cartItems: ServiceMock[]
  cartCount: number
  cartTotal: number
  addToCart: (service: ServiceMock) => AddToCartResult
  removeFromCart: (id: string) => void
  clearCart: () => void
}

interface CartProviderProps {
  children: ReactNode
  uid: string
}

// eslint-disable-next-line react-refresh/only-export-components
export const CartContext = createContext<CartContextType | undefined>(
  undefined
)

const getStorageKey = (uid: string) => {
 return uid ?  `homefix-cart-${uid}`: "homefix-cart-guest"
}

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

function getCartFromStorage(uid: string): ServiceMock[] {
  if (typeof window === "undefined") {
    return []
  }

  const savedCart = localStorage.getItem(getStorageKey(uid))

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

export function CartProvider({ children, uid }: CartProviderProps) {
  const [cartItems, setCartItems] = useState<ServiceMock[]>(() =>{
    return getCartFromStorage(uid)
  })

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setCartItems(getCartFromStorage(uid))
  }, [uid])

  const cartCount = cartItems.length

  const cartTotal = cartItems.reduce(
    (total, service) => total + service.price,
    0
  )

  useEffect(() => {
    if (cartItems.length === 0) {
      localStorage.removeItem(getStorageKey(uid))
      return
    }

    localStorage.setItem(getStorageKey(uid), JSON.stringify(cartItems))
  }, [cartItems, uid])

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

  function removeFromCart(id: string): void {
    setCartItems((currentItems) =>
      currentItems.filter((cartItem) => cartItem.id !== id)
    )
  }

  function clearCart(): void {
    setCartItems([])
  }

  return (
    <CartContext.Provider
      value={{
        cartItems,
        cartCount,
        cartTotal,
        addToCart,
        removeFromCart,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}