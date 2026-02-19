import { prisma } from "@/lib/prisma"
import { notificarConfirmacaoPresenca } from "./notificacao.service"
import { StatusConfirmacao } from "@prisma/client"

type ConfirmacaoInput = {
  name: string
  email?: string
  phone?: string
  attendance: StatusConfirmacao
  dietary?: string
}

export const confirmacaoService = {
  async create(data: ConfirmacaoInput) {
    const confirmacao = await prisma.confirmacao.create({
      data: {
        nome: data.name.trim(),
        email: data.email?.trim() ?? null,
        telefone: data.phone?.trim() ?? null,
        status: data.attendance,
        restricoes: data.dietary?.trim() ?? null,
      },
    })

    // ⚠️ notificação NÃO pode quebrar a API
    try {
      await notificarConfirmacaoPresenca({
        name: confirmacao.nome,
        email: confirmacao.email ?? undefined,
        phone: confirmacao.telefone ?? undefined,
        attendance: confirmacao.status,
        dietary: confirmacao.restricoes ?? undefined,
      })
    } catch (err) {
      console.error("Erro ao notificar confirmação:", err)
    }

    return confirmacao
  },
}
