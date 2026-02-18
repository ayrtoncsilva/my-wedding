"use client"

import Image from "next/image"
import { Countdown } from "./countdown"

export function Hero() {
  return (
    <section
      id="inicio"
      className="relative min-h-screen overflow-hidden bg-foreground"
    >
      {/* Background: uma imagem principal em destaque com leve desfoque nas bordas */}
      <div className="absolute inset-0">
        <Image
          src="/images/imagem.jpeg"
          alt=""
          fill
          className="object-cover scale-105"
          priority
          sizes="100vw"
        />
        {/* Máscara suave nas bordas para foco no centro */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 80% 70% at 50% 50%, transparent 0%, rgba(42,26,20,0.4) 70%, rgba(42,26,20,0.85) 100%)",
          }}
        />
      </div>

      {/* Overlay terracota para legibilidade e clima */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#2a1a14]/60 via-[#2a1a14]/35 to-[#2a1a14]/75" />


      {/* Conteúdo */}
      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6">
        <div className="flex flex-col items-center gap-8 text-center">
          {/* Linha "Save the date" com entrada suave */}
          <p
            className="animate-fade-in-up text-[10px] font-medium uppercase tracking-[0.35em] text-white/60"
            style={{ animationDelay: "0.1s", animationFillMode: "backwards" }}
          >
            Save the date
          </p>

          <h1
            className="animate-fade-in-up font-serif text-5xl font-light leading-[1.1] text-white sm:text-6xl md:text-7xl lg:text-8xl xl:text-8xl"
            style={{ animationDelay: "0.2s", animationFillMode: "backwards" }}
          >
            <span className="block tracking-tight">Samara Salenio</span>
            <span
              className="my-2 block font-light text-[#e8a090] md:my-3"
              style={{ fontSize: "clamp(1.25rem, 3vw, 2rem)" }}
            >
              &
            </span>
            <span className="block tracking-tight">Ayrton Cardoso</span>
          </h1>

          <div
            className="flex animate-fade-in-up items-center gap-5"
            style={{ animationDelay: "0.4s", animationFillMode: "backwards" }}
          >
            <span className="h-px w-12 bg-[#c67b5c]/50 sm:w-20" />
            <p className="text-[11px] font-medium uppercase tracking-[0.28em] text-white/80">
              29 de Agosto de 2026
            </p>
            <span className="h-px w-12 bg-[#c67b5c]/50 sm:w-20" />
          </div>

          <div
            className="animate-fade-in-up"
            style={{ animationDelay: "0.5s", animationFillMode: "backwards" }}
          >
            <Countdown targetDate="2026-08-29T16:00:00" />
          </div>
        </div>

        {/* Scroll indicator com animação de respiro */}
        <div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-fade-in"
          style={{ animationDelay: "0.8s", animationFillMode: "backwards" }}
        >
          <a
            href="#nossa-historia"
            className="flex flex-col items-center gap-2 transition-opacity hover:opacity-90"
          >
            <span className="text-[9px] uppercase tracking-[0.3em] text-white/50">
              Role para baixo
            </span>
            <span className="flex h-9 w-6 items-start justify-center rounded-full border-2 border-white/30">
              <span className="mt-1.5 h-1.5 w-1.5 animate-scroll-dot rounded-full bg-white/60" />
            </span>
          </a>
        </div>
      </div>
    </section>
  )
}
