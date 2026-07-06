import { SurLogo } from "@/components/brand/SurLogo";

export function BrandIntro() {
  return (
    <section className="px-6 py-16">
      <div className="flex flex-col gap-12 md:flex-row md:items-start md:justify-between">
        {/* SUR isotype */}
        <SurLogo className="w-20 shrink-0 text-ink md:w-24" />

        {/* Brand paragraph */}
        <p
          className="max-w-2xl font-medium leading-[1.25] tracking-tight md:text-right"
          style={{ fontSize: "clamp(1.5rem, 2.6vw, 2.5rem)" }}
        >
          Una colección diseñada por la comunidad de SUR bajo una visión de
          autenticidad absoluta. Lo que nos mueve adentro, lo llevamos puesto
          afuera.
        </p>
      </div>
    </section>
  );
}
