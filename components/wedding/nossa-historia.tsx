import Image from "next/image"

export function NossaHistoria() {
  return (
    <section id="nossa-historia" className="bg-background px-6 py-24 md:py-32">
      <div className="mx-auto max-w-5xl">
        <div className="grid items-center gap-12 md:grid-cols-2 md:gap-16">
          {/* Foto nossa história */}
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-sm md:aspect-[3/4]">
            <Image
              src="/images/nossahistoria.jpeg"
              alt="Nossa história - mãos dadas"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
          </div>

          {/* Text content */}
          <div className="flex flex-col items-start">
            <h2 className="mt-3 font-serif text-4xl font-light text-foreground md:text-5xl text-balance leading-tight">
              Um Amor que Cresce a Cada Dia
            </h2>
            <div className="mt-6 h-px w-12 bg-primary/40" />
            <p className="mt-6 text-sm leading-relaxed text-muted-foreground">
              Cada momento juntos nos trouxe ate aqui. Agora, estamos prontos para dar o proximo 
              passo e compartilhar essa alegria com as pessoas que mais amamos.
            </p>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              Sera um dia repleto de amor, emocao e celebracao. Contamos com a presenca de cada 
              um de voces para tornar este momento ainda mais inesquecivel.
            </p>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
            “Assim, eles já não são dois, mas sim uma só carne. Portanto, o que Deus uniu, ninguém o separe.” - Mateus 19:6
            </p>
            <div className="mt-8 flex items-center gap-4">
              <span className="h-px w-8 bg-border" />
              <p className="font-serif text-lg italic text-primary">
                {"29.08.2026"}
              </p>
              <span className="h-px w-8 bg-border" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
