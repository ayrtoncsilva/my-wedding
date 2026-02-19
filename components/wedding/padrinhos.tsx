import Image from "next/image"
import { SectionHeader } from "./section-header"

type Person = {
  name: string
  role: "Padrinho" | "Madrinha"
  image: string
}

const PADRINHOS: Person[] = [
  { name: "Denilson Silvestre", role: "Padrinho", image: "/images/denilson.png" },
  { name: "Rychard Fernandes", role: "Padrinho", image: "/images/rychard.png" },
  { name: "Luiz Vaz", role: "Padrinho", image: "/images/luiz.png" },
  { name: "Jenilson Silva", role: "Padrinho", image: "/images/jenilson.png" },
  { name: "Hudson Magalhães", role: "Padrinho", image: "/images/hudson.png" },
  { name: "Rodrigo Antunes", role: "Padrinho", image: "/images/rodrigo.jpeg" },
]

const MADRINHAS: Person[] = [
  { name: "Sarah Salenio", role: "Madrinha", image: "/images/sarah.jpeg" },
  { name: "Samyra Salenio", role: "Madrinha", image: "/images/samyra.jpeg" },
  { name: "Priscila Machado", role: "Madrinha", image: "/images/priscila.jpeg" },
  { name: "Heloisa Sanches", role: "Madrinha", image: "/images/heloisa.jpeg" },
  { name: "Ariadne Sanches", role: "Madrinha", image: "/images/ariadne.jpeg" },
  { name: "Layane", role: "Madrinha", image: "/images/layane.jpeg" },
]

function PersonCard({ person }: { person: Person }) {
  return (
    <div className="group flex min-w-[200px] flex-1 flex-col items-center rounded-2xl border border-border bg-card p-8 text-center shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl md:min-w-[240px]">

      {/* Foto */}
      <div className="mb-5 h-28 w-28 overflow-hidden rounded-full ring-4 ring-primary/20 transition-all duration-300 group-hover:ring-primary/50">
        <Image
          src={person.image}
          alt={person.name}
          width={112}
          height={112}
          className="h-full w-full object-cover"
        />
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

        <p className="mx-auto mt-8 max-w-3xl text-center font-serif text-lg leading-relaxed text-muted-foreground">
          “O amigo ama em todos os momentos; é um irmão na adversidade.”
          <span className="mt-2 block text-xs font-semibold uppercase tracking-[0.3em] text-primary">
            Provérbios 17:17
          </span>
        </p>


      </div>
    </section>
  )
}
