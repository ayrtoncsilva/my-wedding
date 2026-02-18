import { prisma } from "@/lib/prisma"
import { notificarConfirmacaoPresenca } from "./notificacao.service"
import { StatusConfirmacao } from "@prisma/client"

type ConfirmacaoInput = {
  name: string
  email: string
  phone?: string
  attendance: "sim" | "nao"
  dietary?: string
}

export const confirmacaoService = {
  async create(data: ConfirmacaoInput) {
    const confirmacao = await prisma.confirmacao.create({
      data: {
        nome: data.name.trim(),
        email: data.email.trim(),
        telefone: data.phone?.trim() || null,
        status: data.attendance as StatusConfirmacao,
        restricoes: data.dietary?.trim() || null,
      },
    })

    await notificarConfirmacaoPresenca({
      name: confirmacao.nome,
      email: confirmacao.email,
      phone: confirmacao.telefone,
      attendance: confirmacao.status,
      dietary: confirmacao.restricoes,
    })

    return confirmacao
  },
}
