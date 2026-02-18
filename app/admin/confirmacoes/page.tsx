"use client"

import { useState, useEffect } from "react"
import type { ConfirmacaoRow } from "@/services/confirmacao.service"

export default function AdminConfirmacoesPage() {
  const [secret, setSecret] = useState("")
  const [confirmedSecret, setConfirmedSecret] = useState<string | null>(null)
  const [list, setList] = useState<ConfirmacaoRow[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!confirmedSecret) return
    setLoading(true)
    setError(null)
    fetch(`/api/confirmacoes?secret=${encodeURIComponent(confirmedSecret)}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          setError(data.error)
          setList([])
        } else {
          setList(data.confirmacoes ?? [])
        }
      })
      .catch(() => {
        setError("Erro ao carregar.")
        setList([])
      })
      .finally(() => setLoading(false))
  }, [confirmedSecret])

  const handleAccess = (e: React.FormEvent) => {
    e.preventDefault()
    if (secret.trim()) setConfirmedSecret(secret.trim())
  }

  const presentes = list.filter((c) => c.attendance === "sim")
  const totalPessoas = presentes.reduce(
    (acc, c) => acc + Math.max(1, parseInt(c.guests, 10) || 1),
    0
  )

  if (!confirmedSecret) {
    return (
      <main className="min-h-screen bg-background px-6 py-24">
        <div className="mx-auto max-w-sm">
          <h1 className="font-serif text-2xl text-foreground">
            Acesso à lista de confirmações
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Digite a senha de administrador para ver quem confirmou presença.
          </p>
          <form onSubmit={handleAccess} className="mt-6 flex flex-col gap-4">
            <input
              type="password"
              value={secret}
              onChange={(e) => setSecret(e.target.value)}
              placeholder="Senha"
              className="rounded-sm border border-border bg-card px-4 py-3 text-foreground"
              autoFocus
            />
            <button
              type="submit"
              className="rounded-sm bg-primary px-4 py-3 text-sm font-medium text-primary-foreground"
            >
              Entrar
            </button>
          </form>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-background px-6 py-12">
      <div className="mx-auto max-w-4xl">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <h1 className="font-serif text-3xl text-foreground">
            Lista de confirmações
          </h1>
          <button
            type="button"
            onClick={() => setConfirmedSecret(null)}
            className="text-sm text-muted-foreground underline hover:text-foreground"
          >
            Sair
          </button>
        </div>

        {error && (
          <div className="mb-6 rounded-sm border border-destructive/40 bg-destructive/10 px-4 py-3 text-sm text-destructive">
            {error}
          </div>
        )}

        {loading ? (
          <p className="text-muted-foreground">Carregando...</p>
        ) : (
          <>
            <div className="mb-8 flex flex-wrap gap-6 rounded-sm border border-border bg-card p-6">
              <div>
                <p className="text-[10px] uppercase tracking-wider text-muted-foreground">
                  Confirmaram presença
                </p>
                <p className="font-serif text-2xl text-foreground">
                  {presentes.length} {presentes.length === 1 ? "pessoa" : "pessoas"}
                </p>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-wider text-muted-foreground">
                  Total de convidados (com acompanhantes)
                </p>
                <p className="font-serif text-2xl text-foreground">
                  {totalPessoas} {totalPessoas === 1 ? "pessoa" : "pessoas"}
                </p>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-wider text-muted-foreground">
                  Não poderão ir
                </p>
                <p className="font-serif text-2xl text-foreground">
                  {list.filter((c) => c.attendance === "nao").length}{" "}
                  {list.filter((c) => c.attendance === "nao").length === 1
                    ? "pessoa"
                    : "pessoas"}
                </p>
              </div>
            </div>

            <div className="overflow-x-auto rounded-sm border border-border">
              <table className="w-full min-w-[600px] text-left text-sm">
                <thead>
                  <tr className="border-b border-border bg-secondary">
                    <th className="px-4 py-3 font-medium text-foreground">
                      Nome
                    </th>
                    <th className="px-4 py-3 font-medium text-foreground">
                      Presença
                    </th>
                    <th className="px-4 py-3 font-medium text-foreground">
                      Acompanhantes
                    </th>
                    <th className="px-4 py-3 font-medium text-foreground">
                      Contato
                    </th>
                    <th className="px-4 py-3 font-medium text-foreground">
                      Restrições
                    </th>
                    <th className="px-4 py-3 font-medium text-foreground">
                      Data
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {list.map((c) => (
                    <tr
                      key={c.id}
                      className="border-b border-border last:border-0"
                    >
                      <td className="px-4 py-3 text-foreground">{c.name}</td>
                      <td className="px-4 py-3">
                        <span
                          className={
                            c.attendance === "sim"
                              ? "text-primary font-medium"
                              : "text-muted-foreground"
                          }
                        >
                          {c.attendance === "sim" ? "Sim" : "Não"}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-muted-foreground">
                        {c.guests === "1"
                          ? "Somente eu"
                          : `${parseInt(c.guests, 10) - 1} acompanhante(s)`}
                      </td>
                      <td className="px-4 py-3 text-muted-foreground">
                        {[c.email, c.phone].filter(Boolean).join(" · ") || "—"}
                      </td>
                      <td className="px-4 py-3 text-muted-foreground max-w-[200px] truncate">
                        {c.dietary || "—"}
                      </td>
                      <td className="px-4 py-3 text-muted-foreground text-[10px]">
                        {new Date(c.created_at).toLocaleString("pt-BR", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {list.length === 0 && !loading && (
              <p className="mt-8 text-center text-muted-foreground">
                Nenhuma confirmação registrada ainda.
              </p>
            )}
          </>
        )}
      </div>
    </main>
  )
}
