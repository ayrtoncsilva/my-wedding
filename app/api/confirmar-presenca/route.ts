import { NextResponse } from "next/server"
import { confirmacaoService } from "@/services/confirmacao.service"
import { StatusConfirmacao } from "@prisma/client"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

export async function POST(req: Request) {
  try {
    const body = await req.json()

    const { name, email, phone, attendance, dietary } = body

    if (!name || !attendance) {
      return NextResponse.json(
        { error: "Nome e confirmação são obrigatórios." },
        { status: 400 }
      )
    }

    const status =
      attendance === "sim"
        ? StatusConfirmacao.sim
        : StatusConfirmacao.nao

    await confirmacaoService.create({
      name,
      email: email ?? undefined,
      phone: phone ?? undefined,
      attendance: status,
      dietary: dietary ?? undefined,
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Erro confirmar presença:", error)
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    )
  }
}
