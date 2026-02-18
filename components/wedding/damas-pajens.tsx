import Image from "next/image"
import { SectionHeader } from "./section-header"

type Pessoa = {
  name: string
  role: "Dama" | "Pajem"
  image?: string
}

const damasPajens: Pessoa[] = [
  { name: "Valentina Cardoso", role: "Dama", image: "/images/valentina.png" },
  { name: "Noah Salenio", role: "Pajem", image: "/images/noah.png" },
]


function PessoaCard({ pessoa }: { pessoa: Pessoa }) {
  return (
    <div className="group flex min-w-[220px] flex-1 flex-col items-center rounded-2xl border border-border/70 bg-card px-8 py-10 text-center shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl md:min-w-[260px]">

      <div className="relative mb-6 h-28 w-28 overflow-hidden rounded-full ring-4 ring-primary/20 transition-all duration-300 group-hover:ring-primary/50">
        {pessoa.image ? (
          <Image
            src={pessoa.image}
            alt={pessoa.name}
            fill
            className="object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-primary/10">
            <span className="font-serif text-4xl text-primary">
              {pessoa.name.charAt(0)}
            </span>
          </div>
        )}
      </div>

      <p className="font-serif text-2xl font-light text-foreground">
        {pessoa.name}
      </p>

      <p className="mt-3 text-xs font-semibold uppercase tracking-[0.35em] text-muted-foreground">
        {pessoa.role}
      </p>
    </div>
  )
}

export function DamasPajens() {
  return (
    <section id="damas-pajens" className="bg-background px-6 py-28 md:py-36">
      <SectionHeader
        subtitle="Pequenos Anjos"
        title="Damas & Pajens"
        description="As crianças que encantarão a cerimônia com sua alegria e inocência."
      />

      <div className="mx-auto mt-16 flex max-w-3xl flex-wrap justify-center gap-12">
        {damasPajens.map((pessoa, i) => (
          <PessoaCard key={i} pessoa={pessoa} />
        ))}
      </div>
    </section>
  )
}
