"use client";

import { useCartStore, selectSubtotal, type CartItem } from "@/store/cart-store";
import { useHasMounted } from "@/hooks/useHasMounted";

// WhatsApp number that receives orders — country code + number, no "+" or spaces.
const WHATSAPP_NUMBER = "525578308481";

function formatPrice(price: number, currency: string): string {
  const symbol = currency === "EUR" ? "€" : `${currency} `;
  return `${symbol}${price.toFixed(0)}`;
}

function buildWhatsAppMessage(items: CartItem[], subtotal: number): string {
  const currency = items[0]?.currency ?? "EUR";
  const lines = items.map(
    (item) =>
      `- ${item.name} (Talla ${item.size}) x${item.quantity} — ${formatPrice(
        item.price * item.quantity,
        item.currency,
      )}`,
  );

  return [
    "Hola! Quiero hacer este pedido:",
    "",
    ...lines,
    "",
    `Subtotal: ${formatPrice(subtotal, currency)}`,
  ].join("\n");
}

// Right-side cart sidebar — not a route. Lives once in the root layout and
// is opened/closed via the cart store (see Header's bag icon / "CARRITO"
// link, and AddToCartButton after a successful add).
export function CartDrawer() {
  const hasMounted = useHasMounted();
  const isOpen = useCartStore((state) => state.isOpen);
  const closeCart = useCartStore((state) => state.closeCart);
  const items = useCartStore((state) => state.items);
  const removeItem = useCartStore((state) => state.removeItem);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const subtotal = useCartStore(selectSubtotal);

  // Avoid hydration mismatch: persisted cart contents are only known once mounted.
  const cartItems = hasMounted ? items : [];
  const cartSubtotal = hasMounted ? subtotal : 0;
  const currency = cartItems[0]?.currency ?? "EUR";

  function handleCheckout() {
    if (cartItems.length === 0) return;
    const message = buildWhatsAppMessage(cartItems, cartSubtotal);
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank", "noopener,noreferrer");
  }

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={closeCart}
        aria-hidden
        className={`fixed inset-0 z-[60] bg-black/30 transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />

      {/* Panel */}
      <aside
        className={`fixed inset-y-0 right-0 z-[70] flex h-full w-full max-w-sm flex-col bg-paper text-ink shadow-xl transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
        aria-hidden={!isOpen}
      >
        <div className="flex items-center justify-between border-b border-line px-6 py-5 text-[11px] tracking-ultra">
          <span className="font-display text-sm font-black">MY CART</span>
          <button
            type="button"
            onClick={closeCart}
            className="hover:opacity-60"
          >
            CLOSE
          </button>
        </div>

        <div className="flex-1 overflow-y-auto">
          {cartItems.length === 0 ? (
            <p className="px-6 py-10 text-sm text-muted">
              Tu carrito está vacío.
            </p>
          ) : (
            cartItems.map((item) => (
              <div
                key={item.lineId}
                className="flex gap-4 border-b border-line px-6 py-6"
              >
                <div className="h-24 w-20 flex-shrink-0 overflow-hidden bg-white">
                  {item.imageUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={item.imageUrl}
                      alt={item.name}
                      className="h-full w-full object-cover"
                    />
                  ) : null}
                </div>

                <div className="flex flex-1 flex-col gap-1">
                  <p className="text-sm font-semibold leading-snug">
                    {item.name}
                  </p>
                  <p className="text-sm font-semibold">
                    {formatPrice(item.price, item.currency)}
                  </p>
                  <p className="text-[12px] text-muted">Size: {item.size}</p>
                  <button
                    type="button"
                    onClick={() => removeItem(item.lineId)}
                    className="mt-1 text-left text-[12px] text-muted hover:underline"
                  >
                    Remove Item
                  </button>
                </div>

                <input
                  type="number"
                  min={1}
                  value={item.quantity}
                  onChange={(e) =>
                    updateQuantity(item.lineId, Number(e.target.value))
                  }
                  className="h-9 w-12 self-start border border-line text-center text-sm"
                />
              </div>
            ))
          )}
        </div>

        <div className="border-t border-line px-6 py-6">
          <div className="mb-4 flex items-center justify-between text-sm">
            <span className="text-muted">Subtotal</span>
            <span className="font-semibold">
              {formatPrice(cartSubtotal, currency)}
            </span>
          </div>
          <button
            type="button"
            onClick={handleCheckout}
            disabled={cartItems.length === 0}
            className="w-full bg-ink py-4 text-center text-[11px] tracking-ultra text-paper transition-opacity disabled:opacity-40"
          >
            CHECKOUT
          </button>
        </div>
      </aside>
    </>
  );
}
