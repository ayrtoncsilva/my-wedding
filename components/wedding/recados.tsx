"use client"

import { useState } from "react"
import { SectionHeader } from "./section-header"
import { Send } from "lucide-react"

interface Recado {
  name: string
  message: string
  date: string
}

const initialRecados: Recado[] = [
  {
    name: "Maria e Joao",
    message: "Desejamos toda felicidade do mundo para voces! Que esse amor so cresca a cada dia.",
    date: "15 fev. 2026, 10:30",
  },
  {
    name: "Ana Paula",
    message: "Que lindo ver voces juntos! Mal posso esperar para celebrar esse dia especial.",
    date: "10 jan. 2026, 14:00",
  },
]

export function Recados() {
  const [recados, setRecados] = useState<Recado[]>(initialRecados)
  const [name, setName] = useState("")
  const [message, setMessage] = useState("")
  const [submitted, setSubmitted] = useState(false)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!name.trim() || !message.trim()) return

    const now = new Date()
    const day = now.getDate()
    const month = now.toLocaleString("pt-BR", { month: "short" })
    const year = now.getFullYear()
    const time = now.toLocaleTimeString("pt-BR", {
      hour: "2-digit",
      minute: "2-digit",
    })

    setRecados([
      {
        name: name.trim(),
        message: message.trim(),
        date: `${day} ${month}. ${year}, ${time}`,
      },
      ...recados,
    ])
    setName("")
    setMessage("")
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 3000)
  }

  return (
    <section id="recados" className="bg-[#eef1ec] px-6 py-24 md:py-32">
      <SectionHeader
        variant="sage"
        subtitle="Mural de Recados"
        title="Deixe seu Recado"
        description="Compartilhe seus votos de felicidade e carinho para os noivos."
      />

      {/* Message form */}
      <form
        onSubmit={handleSubmit}
        className="mx-auto mb-16 flex max-w-lg flex-col gap-4"
      >
        <input
          type="text"
          placeholder="Seu nome"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="rounded-sm border border-[#c5d0c0] bg-white px-4 py-3.5 text-sm text-[#2a1a14] placeholder:text-[#7d5a4a]/60 focus:border-[#1e3c2a] focus:outline-none focus:ring-1 focus:ring-[#1e3c2a]"
        />
        <textarea
          placeholder="Escreva seu recado para os noivos..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={4}
          required
          className="resize-none rounded-sm border border-[#c5d0c0] bg-white px-4 py-3.5 text-sm text-[#2a1a14] placeholder:text-[#7d5a4a]/60 focus:border-[#1e3c2a] focus:outline-none focus:ring-1 focus:ring-[#1e3c2a]"
        />
        <button
          type="submit"
          className="mx-auto flex items-center gap-2 rounded-sm bg-[#1e3c2a] px-8 py-3.5 text-[10px] font-medium uppercase tracking-[0.2em] text-white transition-all hover:bg-[#2d4a38] focus:outline-none focus:ring-2 focus:ring-[#1e3c2a] focus:ring-offset-2"
        >
          <Send className="h-3.5 w-3.5" />
          Enviar Recado
        </button>
        {submitted && (
          <p className="text-center text-sm text-[#1e3c2a]">
            Recado enviado com carinho!
          </p>
        )}
      </form>

      {/* Messages */}
      <div className="mx-auto grid max-w-3xl gap-6 md:grid-cols-2">
        {recados.map((recado, i) => (
          <div
            key={i}
            className="relative rounded-sm border border-[#c5d0c0] bg-white p-6 shadow-sm"
          >
            <svg className="absolute top-4 right-4 h-6 w-6 text-[#1e3c2a]/40" fill="currentColor" viewBox="0 0 24 24">
              <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
            </svg>
            <p className="mb-5 pr-8 font-serif text-base italic leading-relaxed text-[#2a1a14]">
              {recado.message}
            </p>
            <div className="flex items-center justify-between border-t border-[#c5d0c0] pt-4">
              <p className="text-xs font-medium text-[#2a1a14]">
                {recado.name}
              </p>
              <p className="text-[10px] text-[#7d5a4a]">{recado.date}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
