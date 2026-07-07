"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useCartStore, selectTotalCount } from "@/store/cart-store";
import { useHasMounted } from "@/hooks/useHasMounted";

// How far down the page you have to be before the header is allowed to
// hide on scroll-down — avoids it flickering from tiny scroll jitter right
// at the top.
const HIDE_THRESHOLD = 80;

export function Header() {
  const hasMounted = useHasMounted();
  const totalCount = useCartStore(selectTotalCount);

  // Avoid hydration mismatch: the persisted count is only known on the client.
  const bagCount = hasMounted ? totalCount : 0;

  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const current = window.scrollY;
      setScrolled(current > 4);

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
    <header
      className={`fixed inset-x-0 top-0 z-50 flex items-center justify-between px-6 py-5 text-[11px] tracking-ultra text-ink transition-[transform,background-color] duration-300 ${
        hidden ? "-translate-y-full" : "translate-y-0"
      } ${scrolled ? "bg-paper/70 backdrop-blur-sm" : "bg-transparent"}`}
    >
      <Link
        href="/"
        className="font-display text-base font-black tracking-tight"
      >
        SUR STORE
      </Link>

      <div className="flex items-center gap-6">
        <Link href="/shop" className="hover:opacity-60">
          TIENDA
        </Link>
        <Link href="/cart" className="hover:opacity-60">
          CARRITO [{bagCount}]
        </Link>
        <Link href="/about" className="hover:opacity-60">
          LA MARCA
        </Link>
      </div>
    </header>
  );
}
