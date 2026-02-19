"use client"

import { useState } from "react"
import { SectionHeader } from "./section-header"

export function ConfirmarPresenca() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    guests: "1",
    attendance: "",
    dietary: "",
  })

  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  function formatPhone(value: string) {
    const numbers = value.replace(/\D/g, "").slice(0, 11)

    if (numbers.length <= 10) {
      return numbers
        .replace(/^(\d{2})(\d)/g, "($1) $2")
        .replace(/(\d{4})(\d)/, "$1-$2")
    }

    return numbers
      .replace(/^(\d{2})(\d)/g, "($1) $2")
      .replace(/(\d{5})(\d)/, "$1-$2")
  }

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) {
    const { name, value } = e.target

    if (name === "phone") {
      setFormData({ ...formData, phone: formatPhone(value) })
    } else {
      setFormData({ ...formData, [name]: value })
    }

    setError(null)
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    if (!formData.name || !formData.attendance) {
      setError("Por favor, preencha o nome e confirme sua presença.")
      return
    }

    setLoading(true)
    setError(null)

    try {
      const res = await fetch("/api/confirmar-presenca", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email || null,
          phone: formData.phone.replace(/\D/g, "") || null,
          attendance: formData.attendance,
          dietary: formData.dietary || null,
        }),        
      })

      const data = await res.json().catch(() => ({}))

      if (!res.ok) {
        setError(data.error ?? "Não foi possível enviar. Tente novamente.")
        return
      }

      setSubmitted(true)
    } catch {
      setError("Erro de conexão. Verifique sua internet e tente novamente.")
    } finally {
      setLoading(false)
    }
  }

  if (submitted) {
    return (
      <section id="presenca" className="bg-secondary px-6 py-28 md:py-36">
        <div className="mx-auto flex max-w-lg flex-col items-center text-center">

          <div className="mb-8 flex h-24 w-24 items-center justify-center rounded-full bg-primary/10 ring-4 ring-primary/10">
            <svg
              className="h-12 w-12 text-primary"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4.5 12.75l6 6 9-13.5"
              />
            </svg>
          </div>

          <h3 className="font-serif text-4xl font-light text-foreground">
            Obrigado!
          </h3>

          <p className="mt-6 max-w-md text-sm leading-relaxed text-muted-foreground">
            {formData.attendance === "sim"
              ? "Estamos muito felizes em saber que você estará conosco neste dia tão especial!"
              : "Sentiremos sua falta, mas agradecemos por nos avisar. Você estará em nossos corações!"}
          </p>
        </div>
      </section>
    )
  }

  return (
    <section id="presenca" className="relative bg-secondary px-6 py-28 md:py-36">

      {/* Fundo decorativo sutil */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `
            radial-gradient(circle at 20% 80%, var(--primary) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, var(--accent) 0%, transparent 40%)
          `,
        }}
      />

      <div className="relative">
        <SectionHeader
          subtitle="Confirme sua Presença"
          title="Estaremos Esperando Você"
          description="Por favor, confirme sua presença até 29 de julho de 2026."
        />

        {error && (
          <div className="mx-auto mt-8 mb-6 max-w-lg rounded-xl border border-destructive/40 bg-destructive/10 px-5 py-4 text-sm text-destructive">
            {error}
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="mx-auto mt-12 flex max-w-lg flex-col gap-6"
        >
          {/* Nome */}
          <div className="flex flex-col gap-2">
            <label className="text-xs font-medium uppercase tracking-[0.25em] text-muted-foreground">
              Nome Completo *
            </label>
            <input
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              required
              className="rounded-xl border border-border bg-card px-4 py-3.5 text-sm transition-all focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none"
              placeholder="Seu nome completo"
            />
          </div>

          {/* Email + Telefone */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <input
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              className="rounded-xl border border-border bg-card px-4 py-3.5 text-sm transition-all focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none"
              placeholder="seu@email.com"
            />

            <input
              name="phone"
              type="tel"
              inputMode="numeric"
              maxLength={15}
              value={formData.phone}
              onChange={handleChange}
              className="rounded-xl border border-border bg-card px-4 py-3.5 text-sm transition-all focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none"
              placeholder="(99) 99999-9999"
            />
          </div>

          {/* Radios elegantes */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {[
              { label: "Sim, estarei presente", value: "sim" },
              { label: "Não poderei comparecer", value: "nao" },
            ].map((option) => (
              <label
                key={option.value}
                className={`group flex cursor-pointer items-center justify-center rounded-xl border px-6 py-4 text-sm font-medium transition-all
                  ${
                    formData.attendance === option.value
                      ? "border-primary bg-primary/10"
                      : "border-border bg-card hover:border-primary/40"
                  }`}
              >
                <input
                  type="radio"
                  name="attendance"
                  value={option.value}
                  checked={formData.attendance === option.value}
                  onChange={handleChange}
                  className="sr-only"
                />
                {option.label}
              </label>
            ))}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="mx-auto mt-6 rounded-full bg-primary px-14 py-4 text-xs uppercase tracking-[0.3em] text-primary-foreground transition-all hover:scale-105 disabled:opacity-70"
          >
            {loading ? "Enviando..." : "Confirmar Presença"}
          </button>
        </form>
      </div>
    </section>
  )
}
