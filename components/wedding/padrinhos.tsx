import Image from "next/image"
import { SectionHeader } from "./section-header"

type Person = {
  name: string
  role: "Padrinho" | "Madrinha"
  image?: string
}

const PADRINHOS: Person[] = [
  { name: "Denilson Silvestre", role: "Padrinho", image: "/images/denilson.png" },
  { name: "Rychard Fernandes", role: "Padrinho", image: "/images/rychard.png" },
  { name: "Luiz Vaz", role: "Padrinho", image: "/images/luiz.png" },
  { name: "Jenilson Silva", role: "Padrinho", image: "/images/jenilson.png" },
  { name: "Hudson Magalhães", role: "Padrinho", image: "/images/hudson.png" },
]

const MADRINHAS: Person[] = [
  { name: "Sarah Salenio", role: "Madrinha", image: "/images/sarah.png" },
  { name: "Samyra Salenio", role: "Madrinha", image: "/images/samyra.png" },
  { name: "Priscila Machado", role: "Madrinha", image: "/images/priscila.png" },
  { name: "Heloisa Sanches", role: "Madrinha", image: "/images/heloise.png" },
  { name: "Ariadne Sanches", role: "Madrinha", image: "/images/ariadne.png" },
]


function PersonCard({ person }: { person: Person }) {
  return (
    <div className="group flex min-w-[200px] flex-1 flex-col items-center rounded-2xl border border-border bg-card p-8 text-center shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl md:min-w-[240px]">
      
      {/* Círculo com foto */}
      <div className="relative mb-5 h-28 w-28 overflow-hidden rounded-full ring-4 ring-primary/20 transition-all duration-300 group-hover:ring-primary/50">
        
        {person.image ? (
          <Image
            src={person.image}
            alt={person.name}
            fill
            className="object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-primary/15">
            <span className="font-serif text-4xl font-semibold text-primary">
              {person.name.charAt(0)}
            </span>
          </div>
        )}
      </div>

      <p className="font-serif text-xl font-medium text-foreground transition-colors group-hover:text-primary">
        {person.name}
      </p>

      <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.3em] text-muted-foreground">
        {person.role}
      </p>
    </div>
  )
}

export function Padrinhos() {
  return (
    <section id="padrinhos" className="bg-secondary px-6 py-28">
      <SectionHeader
        subtitle="Nossos Padrinhos"
        title="Pessoas Especiais"
        description="Aqueles que caminham ao nosso lado neste dia tão especial."
      />

      <div className="mx-auto mt-16 max-w-6xl space-y-16">
        
        {/* PADRINHOS */}
        <div>
          <p className="mb-8 text-center text-sm font-semibold uppercase tracking-[0.4em] text-primary">
            Padrinhos
          </p>

          <div className="flex flex-wrap justify-center gap-10">
            {PADRINHOS.map((person, i) => (
              <PersonCard key={i} person={person} />
            ))}
          </div>
        </div>

        <div className="mx-auto h-px w-32 bg-border opacity-40" />

        {/* MADRINHAS */}
        <div>
          <p className="mb-8 text-center text-sm font-semibold uppercase tracking-[0.4em] text-primary">
            Madrinhas
          </p>

          <div className="flex flex-wrap justify-center gap-10">
            {MADRINHAS.map((person, i) => (
              <PersonCard key={i} person={person} />
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}
