"use client"

import { useState } from "react"
import { SectionHeader } from "./section-header"
import { Check, Gift } from "lucide-react"
import Image from "next/image"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

const JA_TEMOS = [
  "Televisão",
  "Máquina de lavar",
  "Fogão",
  "Ferro de passar",
  "Máquina de lavar roupas",
  "Armário de cozinha",
  "Panelas",
  "Talheres",
  "Jogo de pratos",
  "Air fryer",
] as const

const SUGESTOES: Record<string, string[]> = {
  Cozinha: [
    "Geladeira",
    "Micro-ondas",
    "Liquidificador",
    "Sanduicheira",
    "Escorredor de louça",
    "Kit de utensílios",
    "Jogo de panelas",
    "Potes",
    "Panos de cozinha",
    "Vasilhas de vidro",
    "Vasilhas de plástico",
    "Outros",
  ],
  Quarto: [
    "Cama",
    "Jogo de cama",
    "Travesseiros",
    "Tapetes",
    "Cortinas",
    "Espelhos",
    "Outros",
  ],
  Banheiro: [
    "Jogo de toalhas",
    "Espelho",
    "Lixeira",
    "Tapete de banheiro",
    "Outros",
  ],
  Sala: [
    "Mesa de centro",
    "Rack para TV",
    "Cortinas",
    "Tapete",
    "Vasos de plantas",
    "Luminárias",
    "Lâmpadas",
    "Outros",
  ],
}

export function SugestaoPresentes() {
  const [dialogOpen, setDialogOpen] = useState(false)
  const [guestName, setGuestName] = useState("")
  const [presentDescription, setPresentDescription] = useState("")
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleEnviarPresente(e: React.FormEvent) {
    e.preventDefault()

    if (!guestName.trim() || !presentDescription.trim()) return

    setLoading(true)
    setError(null)

    try {
      const res = await fetch("/api/presentes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          guest_name: guestName,
          present_description: presentDescription,
        }),
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data.error ?? "Erro ao enviar.")
        return
      }

      setSent(true)
      setGuestName("")
      setPresentDescription("")

      setTimeout(() => {
        setDialogOpen(false)
        setSent(false)
      }, 2000)
    } catch {
      setError("Erro de conexão.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <section id="presentes" className="bg-[#faf6f2] px-6 py-16 md:py-20">
      <SectionHeader
        subtitle="Sugestão de Presentes"
        title="Lista de Casamento"
        description="Caso queira nos presentear, seguem sugestões."
      />

      {/* Botão */}
      <div className="mx-auto mb-6 flex max-w-2xl justify-center">
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <button className="flex items-center gap-3 rounded-lg bg-[#b85c38] px-6 py-3 text-xs font-medium uppercase tracking-[0.18em] text-white transition-all hover:opacity-90">
              <Gift className="h-4 w-4" />
              Avise o que vai presentear
            </button>
          </DialogTrigger>

          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Avise o que vai presentear</DialogTitle>
            </DialogHeader>

            {sent ? (
              <div className="py-6 text-center">
                <Check className="mx-auto h-8 w-8 text-green-600" />
                <p className="mt-2 text-sm font-medium">
                  Enviado com sucesso!
                </p>
              </div>
            ) : (
              <form
                onSubmit={handleEnviarPresente}
                className="flex flex-col gap-3"
              >
                {error && (
                  <p className="text-sm text-red-600">{error}</p>
                )}

                <input
                  type="text"
                  placeholder="Seu nome"
                  value={guestName}
                  onChange={(e) => setGuestName(e.target.value)}
                  className="rounded-md border px-4 py-2.5 text-sm"
                  required
                />

                <textarea
                  placeholder="O que você vai presentear?"
                  value={presentDescription}
                  onChange={(e) => setPresentDescription(e.target.value)}
                  className="rounded-md border px-4 py-2.5 text-sm"
                  rows={3}
                  required
                />

                <button
                  type="submit"
                  disabled={loading}
                  className="rounded-md bg-[#b85c38] py-2.5 text-xs uppercase tracking-[0.18em] text-white transition-all hover:opacity-90 disabled:opacity-60"
                >
                  {loading ? "Enviando..." : "Enviar"}
                </button>
              </form>
            )}
          </DialogContent>
        </Dialog>
      </div>

      {/* Já temos */}
      <div className="mx-auto mb-12 max-w-3xl space-y-4">
        <div className="flex items-center gap-2">
          <Check className="h-4 w-4 text-[#b85c38]" />
          <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-[#2a1a14]">
            O que ja ganhamos:
          </h3>
        </div>

        <ul className="grid gap-2 sm:grid-cols-2">
          {JA_TEMOS.map((item) => (
            <li
              key={item}
              className="flex items-center gap-2 rounded-md border border-[#e6ded7] bg-[#f7f3ef] px-4 py-2 text-sm text-[#2a1a14]"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-[#b85c38]" />
              {item}
            </li>
          ))}
        </ul>
      </div>


      {/* Lista de sugestões */}
      <div className="mx-auto max-w-3xl space-y-6">
        {Object.entries(SUGESTOES).map(([categoria, itens]) => (
          <div key={categoria} className="space-y-3">
            <h3 className="text-base font-semibold text-[#2a1a14]">
              {categoria}
            </h3>

            <ul className="grid gap-2 sm:grid-cols-2">
              {itens.map((item) => (
                <li
                  key={item}
                  className="rounded-md border border-[#e6ded7] bg-white px-4 py-2 text-sm text-[#2a1a14]"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  )
}
