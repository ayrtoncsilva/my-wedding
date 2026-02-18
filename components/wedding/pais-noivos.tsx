import { SectionHeader } from "./section-header"

const familias = [
  {
    title: "Pais da Noiva",
    pai: "Salvador Rodrigues Gomes",
    mae: "Walquiria Salenio da Silva",
  },
  {
    title: "Pais do Noivo",
    pai: "João Cardoso da Silva",
    mae: "Elaine Espindola Rocha",
  },
] as const

export function PaisNoivos() {
  return (
    <section id="pais" className="bg-secondary px-6 py-28 md:py-36">
      <SectionHeader
        subtitle="Nossas Famílias"
        title="Pais dos Noivos"
        description="Com a bênção e o amor de nossos pais, unimos nossas histórias."
      />

      <div className="mx-auto mt-16 grid max-w-5xl grid-cols-1 gap-14 md:grid-cols-2 md:gap-20">
        {familias.map((familia) => (
          <div
            key={familia.title}
            className="group flex flex-col items-center rounded-2xl border border-border/60 bg-card px-10 py-12 text-center shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
          >
          

            <p className="mb-6 text-xs font-semibold uppercase tracking-[0.4em] text-primary">
              {familia.title}
            </p>

            <p className="font-serif text-2xl font-light text-foreground">
              {familia.pai}
            </p>

            <span className="my-3 text-lg text-accent">&</span>

            <p className="font-serif text-2xl font-light text-foreground">
              {familia.mae}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}
