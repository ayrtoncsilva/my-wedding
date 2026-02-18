import { Navigation } from "@/components/wedding/navigation"
import { Hero } from "@/components/wedding/hero"
import { NossaHistoria } from "@/components/wedding/nossa-historia"
import { Padrinhos } from "@/components/wedding/padrinhos"
import { DamasPajens } from "@/components/wedding/damas-pajens"
import { PaisNoivos } from "@/components/wedding/pais-noivos"
import { SugestaoPresentes } from "@/components/wedding/sugestao-presentes"
import { Recados } from "@/components/wedding/recados"
import { ConfirmarPresenca } from "@/components/wedding/confirmar-presenca"
import { Footer } from "@/components/wedding/footer"

export default function WeddingPage() {
  return (
    <main>
      <Navigation />
      <Hero />
      <NossaHistoria />
      <Padrinhos />
      <DamasPajens />
      <PaisNoivos />
      <SugestaoPresentes />
      {/* <Recados /> */}
      <ConfirmarPresenca />
      <Footer />
    </main>
  )
}
