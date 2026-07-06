import Link from "next/link";

const WORDMARK = "SUR STORE";

export function ProductHero() {
  return (
    <section className="relative flex flex-col px-6 pt-[12vh]">
      {/* Full-width wordmark with thick underline */}
      <div className="w-full text-center">
        <span
          className="block select-none whitespace-nowrap font-display font-black leading-[0.8] tracking-[-0.01em]"
          style={{ fontSize: "clamp(3rem, 16.5vw, 30vh)" }}
        >
          {WORDMARK}
          <sup className="align-super text-[0.28em] tracking-normal">®</sup>
        </span>
        <div className="mt-2 h-[4px] w-full bg-ink" />
      </div>

      {/* Brand line: paragraph (left) + website link (right) */}
      <div className="mt-44 flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
        <p
          className="max-w-2xl font-medium leading-[1.25] tracking-tight text-muted"
          style={{ fontSize: "clamp(1.25rem, 2.2vw, 2rem)" }}
        >
          Una colección diseñada por la comunidad de SUR bajo una visión de
          autenticidad absoluta.{" "}
          <span className="text-ink">
            Lo que nos mueve adentro, lo llevamos puesto afuera.
          </span>
        </p>

        <div className="flex shrink-0 flex-col gap-2 md:items-end">
          <Link
            href="https://sur.studio"
            className="text-[11px] tracking-ultra text-ink transition-opacity hover:opacity-60"
          >
            VISIT ++ WEBSITE
          </Link>
          <Link
            href="/shop"
            className="text-[11px] tracking-ultra text-ink transition-opacity hover:opacity-60"
          >
            VIEW ALL PRODUCTS
          </Link>
        </div>
      </div>
    </section>
  );
}
