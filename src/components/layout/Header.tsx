"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useCartStore, selectTotalCount } from "@/store/cart-store";
import { useHasMounted } from "@/hooks/useHasMounted";

// How far down the page you have to be before the header is allowed to
// hide on scroll-down — avoids it flickering from tiny scroll jitter right
// at the top.
const HIDE_THRESHOLD = 80;

// Same look everywhere: always transparent, always "ink" (blue) text —
// matches the homepage hero's header exactly, on every page.

function HamburgerIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path
        d="M2.5 5.5H17.5M2.5 10H17.5M2.5 14.5H17.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path
        d="M4 4L16 16M16 4L4 16"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function BagIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path
        d="M5.5 7H14.5L15 17.5H5L5.5 7Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path
        d="M7.25 7V6C7.25 4.48 8.48 3.25 10 3.25C11.52 3.25 12.75 4.48 12.75 6V7"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Header() {
  const hasMounted = useHasMounted();
  const totalCount = useCartStore(selectTotalCount);
  const openCart = useCartStore((state) => state.openCart);

  // Avoid hydration mismatch: the persisted count is only known on the client.
  const bagCount = hasMounted ? totalCount : 0;

  const [hidden, setHidden] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const current = window.scrollY;

      if (current > lastScrollY.current && current > HIDE_THRESHOLD) {
        setHidden(true); // scrolling down, past the threshold — hide
      } else if (current < lastScrollY.current) {
        setHidden(false); // scrolling up — reveal
      }
      lastScrollY.current = current;
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 grid grid-cols-3 items-center px-6 py-5 text-[11px] tracking-ultra bg-transparent text-ink transition-transform duration-300 lg:flex lg:justify-between ${
          hidden ? "-translate-y-full" : "translate-y-0"
        }`}
      >
        {/* Mobile/tablet: hamburger, far left */}
        <button
          type="button"
          onClick={() => setMenuOpen((open) => !open)}
          className="justify-self-start lg:hidden"
          aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={menuOpen}
        >
          {menuOpen ? <CloseIcon /> : <HamburgerIcon />}
        </button>

        <Link
          href="/"
          className="justify-self-center font-display text-base font-black tracking-tight lg:justify-self-auto"
          onClick={() => setMenuOpen(false)}
        >
          SUR STORE
        </Link>

        {/* Mobile/tablet: shopping bag, far right */}
        <button
          type="button"
          onClick={() => {
            setMenuOpen(false);
            openCart();
          }}
          className="relative justify-self-end lg:hidden"
          aria-label={`Carrito (${bagCount})`}
        >
          <BagIcon />
          {bagCount > 0 ? (
            <span className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-ink text-[9px] text-paper">
              {bagCount}
            </span>
          ) : null}
        </button>

        {/* Desktop: text nav */}
        <div className="hidden items-center gap-6 lg:flex">
          <Link href="/shop" className="hover:opacity-60">
            TIENDA
          </Link>
          <button type="button" onClick={openCart} className="hover:opacity-60">
            CARRITO [{bagCount}]
          </button>
        </div>
      </header>

      {/* Mobile/tablet: menu panel */}
      {menuOpen ? (
        <div className="fixed inset-x-0 top-[64px] z-40 flex flex-col gap-4 border-t border-line bg-paper px-6 py-6 text-[11px] tracking-ultra text-ink lg:hidden">
          <Link
            href="/shop"
            className="hover:opacity-60"
            onClick={() => setMenuOpen(false)}
          >
            TIENDA
          </Link>
        </div>
      ) : null}
    </>
  );
}
