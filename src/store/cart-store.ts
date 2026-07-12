import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Product, Size } from "@/types/product";

// A single line in the cart: a product locked to a chosen size + quantity.
export interface CartItem {
  /** Unique per product+size+color combination. */
  lineId: string;
  productId: string;
  name: string;
  price: number;
  currency: string;
  size: Size;
  /** Selected colorway name, if the product has one (see ProductView). */
  color?: string;
  imageUrl?: string;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  addItem: (product: Product, size: Size, quantity?: number) => void;
  removeItem: (lineId: string) => void;
  updateQuantity: (lineId: string, quantity: number) => void;
  clearCart: () => void;
  /** Drives the cart sidebar (see CartDrawer) — not persisted, always closed on load. */
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
}

function makeLineId(productId: string, size: Size, color?: string): string {
  // Include color so the same product+size in a different colorway gets its
  // own line instead of silently merging quantities with a different color.
  return `${productId}__${size}__${color ?? "default"}`;
}

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      items: [],

      addItem: (product, size, quantity = 1) =>
        set((state) => {
          const lineId = makeLineId(product.id, size, product.color);
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
            color: product.color,
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

      isOpen: false,
      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),
      toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),
    }),
    {
      name: "surcycle-cart",
      // Only persist cart contents — the drawer should always start closed.
      partialize: (state) => ({ items: state.items }),
    }
  )
);

// Derived selectors — keep components free of reduce logic.
export const selectTotalCount = (state: CartState): number =>
  state.items.reduce((sum, item) => sum + item.quantity, 0);

export const selectSubtotal = (state: CartState): number =>
  state.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
