import Link from "next/link";
import { SurLogo } from "@/components/brand/SurLogo";

const SITE_INDEX = [
  { label: "SHOP NOW", href: "/shop" },
  { label: "HOME", href: "/" },
  { label: "ABOUT US", href: "/about" },
  { label: "CONTACT US", href: "/contact" },
];

const SOCIAL = [
  { label: "INSTAGRAM", href: "https://www.instagram.com/surcycle.mx" },
];

const LEGAL = [
  { label: "PRIVACY POLICY", href: "/legal/privacy" },
  { label: "REFUNDS", href: "/legal/refunds" },
  { label: "SHIPPING", href: "/legal/shipping" },
  { label: "TERMS OF SERVICE", href: "/legal/terms" },
];

function ColumnLink({ label, href }: { label: string; href: string }) {
  return (
    <li>
      <Link href={href} className="text-muted transition-colors hover:text-ink">
        {label}
      </Link>
    </li>
  );
}

export function Footer() {
  return (
    <footer className="mt-24 text-[11px] tracking-ultra">
      {/* ── Upper band: manifesto + crest ─────────────────────── */}
      <div className="px-6 py-20 text-center">
        <p className="font-display text-base tracking-normal text-muted">
          SUR©2025
        </p>
        <p className="font-display text-base tracking-normal text-muted">
          DESIGNED AND MADE LOCALLY
        </p>

        <div className="mt-14 grid grid-cols-1 items-center gap-6 md:grid-cols-3">
          <span className="font-semibold text-muted md:text-left">
            CHIAPAS
          </span>
          <p className="mx-auto max-w-md font-semibold leading-relaxed text-muted">
            ENTRENAMOS ADENTRO, VIVIMOS AFUERA. LO QUE NOS MUEVE EN EL ESTUDIO LO
            LLEVAMOS PUESTO TODO EL DÍA. HECHO PARA NOSOTROS. POR NOSOTROS.
          </p>
          <span className="font-semibold text-muted md:text-right">
            MÉXICO
          </span>
        </div>

        <SurLogo className="mx-auto mt-14 w-12 text-ink" />
      </div>

      {/* ── Lower band: link columns ──────────────────────────── */}
      <div className="px-6 pb-10 pt-14">
        <div className="grid grid-cols-2 gap-10 md:grid-cols-4">
          <div>
            <p className="mb-4 border-b border-line pb-3 font-semibold text-ink">
              SITE INDEX
            </p>
            <ul className="space-y-1.5">
              {SITE_INDEX.map((l) => (
                <ColumnLink key={l.href} {...l} />
              ))}
            </ul>
          </div>

          <div>
            <p className="mb-4 border-b border-line pb-3 font-semibold text-ink">
              SOCIAL
            </p>
            <ul className="space-y-1.5">
              {SOCIAL.map((l) => (
                <ColumnLink key={l.href} {...l} />
              ))}
            </ul>
          </div>

          <div>
            <p className="mb-4 border-b border-line pb-3 font-semibold text-ink">
              GET IN TOUCH
            </p>
            <ul className="space-y-1.5 text-muted">
              <li>
                <a
                  href="mailto:contacto@surcycle.mx"
                  className="transition-colors hover:text-ink"
                >
                  CONTACTO@SURCYCLE.MX
                </a>
              </li>
            </ul>
          </div>

          <div>
            <p className="mb-4 border-b border-line pb-3 font-semibold text-ink">
              LEGAL
            </p>
            <ul className="space-y-1.5">
              {LEGAL.map((l) => (
                <ColumnLink key={l.href} {...l} />
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-20 flex items-center justify-between">
          <span className="font-semibold text-ink">
            ALL RIGHTS RESERVED _ SUR©2025
          </span>
          <span className="text-line">SUR STORE</span>
        </div>
      </div>
    </footer>
  );
}
