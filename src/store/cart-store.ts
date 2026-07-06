import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Product, Size } from "@/types/product";

// A single line in the cart: a product locked to a chosen size + quantity.
export interface CartItem {
  /** Unique per product+size combination. */
  lineId: string;
  productId: string;
  name: string;
  price: number;
  currency: string;
  size: Size;
  imageUrl?: string;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  addItem: (product: Product, size: Size, quantity?: number) => void;
  removeItem: (lineId: string) => void;
  updateQuantity: (lineId: string, quantity: number) => void;
  clearCart: () => void;
}

function makeLineId(productId: string, size: Size): string {
  return `${productId}__${size}`;
}

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      items: [],

      addItem: (product, size, quantity = 1) =>
        set((state) => {
          const lineId = makeLineId(product.id, size);
          const existing = state.items.find((item) => item.lineId === lineId);

          if (existing) {
            return {
              items: state.items.map((item) =>
                item.lineId === lineId
                  ? { ...item, quantity: item.quantity + quantity }
                  : item
              ),
            };
          }

          const newItem: CartItem = {
            lineId,
            productId: product.id,
            name: product.name,
            price: product.price,
            currency: product.currency,
            size,
            imageUrl: product.imageUrl,
            quantity,
          };
          return { items: [...state.items, newItem] };
        }),

      removeItem: (lineId) =>
        set((state) => ({
          items: state.items.filter((item) => item.lineId !== lineId),
        })),

      updateQuantity: (lineId, quantity) =>
        set((state) => ({
          items:
            quantity <= 0
              ? state.items.filter((item) => item.lineId !== lineId)
              : state.items.map((item) =>
                  item.lineId === lineId ? { ...item, quantity } : item
                ),
        })),

      clearCart: () => set({ items: [] }),
    }),
    { name: "surcycle-cart" }
  )
);

// Derived selectors — keep components free of reduce logic.
export const selectTotalCount = (state: CartState): number =>
  state.items.reduce((sum, item) => sum + item.quantity, 0);

export const selectSubtotal = (state: CartState): number =>
  state.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
