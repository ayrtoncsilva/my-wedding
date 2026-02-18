"use client"

import { useEffect, useState } from "react"
import { SectionHeader } from "./section-header"
import { Send } from "lucide-react"

interface Recado {
  id: string
  name: string
  message: string
  createdAt: string
}

export function Recados() {
  const [recados, setRecados] = useState<Recado[]>([])
  const [name, setName] = useState("")
  const [message, setMessage] = useState("")
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchRecados()
  }, [])

  async function fetchRecados() {
    try {
      const res = await fetch("/api/recados")
  
      if (!res.ok) {
        console.error("Erro ao buscar recados:", res.status)
        setRecados([])
        return
      }
  
      const data = await res.json()
  
      if (Array.isArray(data)) {
        setRecados(data)
      } else {
        console.error("Resposta inesperada da API:", data)
        setRecados([])
      }
    } catch (err) {
      console.error("Erro de rede:", err)
      setRecados([])
    } finally {
      setLoading(false)
    }
  }
  

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!name.trim() || !message.trim()) return

    await fetch("/api/recados", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name.trim(),
        message: message.trim(),
      }),
    })

    setName("")
    setMessage("")
    setSubmitted(true)
    fetchRecados()
    setTimeout(() => setSubmitted(false), 3000)
  }

  function formatDate(dateString: string) {
    const date = new Date(dateString)
    return date.toLocaleString("pt-BR", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  return (
    <section id="recados" className="bg-[#eef1ec] px-6 py-24 md:py-32">
      <SectionHeader
        variant="sage"
        subtitle="Mural de Recados"
        title="Deixe seu Recado"
        description="Compartilhe seus votos de felicidade e carinho para os noivos."
      />

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
          className="rounded-sm border border-[#c5d0c0] bg-white px-4 py-3.5 text-sm"
        />
        <textarea
          placeholder="Escreva seu recado para os noivos..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={4}
          required
          className="resize-none rounded-sm border border-[#c5d0c0] bg-white px-4 py-3.5 text-sm"
        />
        <button
          type="submit"
          className="mx-auto flex items-center gap-2 rounded-sm bg-[#1e3c2a] px-8 py-3.5 text-[10px] font-medium uppercase tracking-[0.2em] text-white"
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

      <div className="mx-auto grid max-w-3xl gap-6 md:grid-cols-2">
        {loading && <p>Carregando recados...</p>}

        {!loading &&
          recados.map((recado) => (
            <div
              key={recado.id}
              className="relative rounded-sm border border-[#c5d0c0] bg-white p-6 shadow-sm"
            >
              <p className="mb-5 font-serif text-base italic leading-relaxed text-[#2a1a14]">
                {recado.message}
              </p>

              <div className="flex items-center justify-between border-t border-[#c5d0c0] pt-4">
                <p className="text-xs font-medium text-[#2a1a14]">
                  {recado.name}
                </p>
                <p className="text-[10px] text-[#7d5a4a]">
                  {formatDate(recado.createdAt)}
                </p>
              </div>
            </div>
          ))}
      </div>
    </section>
  )
}
