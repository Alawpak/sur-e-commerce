"use client";

import Link from "next/link";
import { useCartStore, selectTotalCount } from "@/store/cart-store";
import { useHasMounted } from "@/hooks/useHasMounted";

export function Header() {
  const hasMounted = useHasMounted();
  const totalCount = useCartStore(selectTotalCount);

  // Avoid hydration mismatch: the persisted count is only known on the client.
  const bagCount = hasMounted ? totalCount : 0;

  return (
    <header className="fixed inset-x-0 top-0 z-50 flex items-center justify-between px-6 py-5 text-[11px] tracking-ultra text-ink">
      <Link href="/" className="font-semibold">
        SUR
      </Link>

      <div className="flex items-center gap-6">
        <Link href="/shop" className="hover:opacity-60">
          SHOP
        </Link>
        <Link href="/cart" className="hover:opacity-60">
          BAG [{bagCount}]
        </Link>
      </div>
    </header>
  );
}
