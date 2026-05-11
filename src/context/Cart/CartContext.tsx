import { createContext, useEffect, useState } from "react";
import type { ReactNode } from "react";
import CartQueue from "../../algorithms/CartQueue";
import type { IService } from "../../interfaces/ServiceDetail/service.interface";

export type AddToCartResult = "added" | "exists";

export interface CartContextType {
  cartItems: IService[];
  cartCount: number;
  cartTotal: number;
  addToCart: (service: IService) => AddToCartResult;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
}

interface CartProviderProps {
  children: ReactNode;
}

export const CartContext = createContext<CartContextType | undefined>(
  undefined
);

const CART_STORAGE_KEY = "homefix-cart";

function isValidService(service: unknown): service is IService {
  if (typeof service !== "object" || service === null) {
    return false;
  }

  const possibleService = service as Partial<IService>;

  return (
    typeof possibleService.id === "string" &&
    typeof possibleService.name === "string" &&
    typeof possibleService.category === "string" &&
    typeof possibleService.image === "string" &&
    typeof possibleService.description === "string" &&
    typeof possibleService.price === "number" &&
    typeof possibleService.duration === "string" &&
    typeof possibleService.rating === "number" &&
    typeof possibleService.company === "string" &&
    typeof possibleService.zone === "string" &&
    typeof possibleService.availability === "string" &&
    Array.isArray(possibleService.includes) &&
    Array.isArray(possibleService.excludes) &&
    Array.isArray(possibleService.recommendations)
  );
}

function getCartFromStorage(): IService[] {
  const savedCart = localStorage.getItem(CART_STORAGE_KEY);

  if (!savedCart) {
    return [];
  }

  try {
    const parsedCart = JSON.parse(savedCart) as unknown;

    if (!Array.isArray(parsedCart)) {
      return [];
    }

    return parsedCart.filter(isValidService);
  } catch {
    return [];
  }
}

export function CartProvider({ children }: CartProviderProps) {
  const [cartItems, setCartItems] = useState<IService[]>(() =>
    getCartFromStorage()
  );

  const cartQueue = new CartQueue(cartItems);

  const cartCount: number = cartQueue.size();

  const cartTotal: number = cartQueue.getTotal();

  useEffect(() => {
    if (cartItems.length === 0) {
      localStorage.removeItem(CART_STORAGE_KEY);
      return;
    }

    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
  }, [cartItems]);

  function addToCart(service: IService): AddToCartResult {
    const queue = new CartQueue(cartItems);

    if (queue.contains(service.id)) {
      return "exists";
    }

    queue.enqueue(service);
    setCartItems(queue.getItems());

    return "added";
  }

  function removeFromCart(id: string): void {
    const queue = new CartQueue(cartItems);

    queue.removeById(id);

    setCartItems(queue.getItems());
  }

  function clearCart(): void {
    const queue = new CartQueue(cartItems);

    queue.clear();

    setCartItems(queue.getItems());
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
  );
}