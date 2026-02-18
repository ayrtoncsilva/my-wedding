import { NextResponse } from "next/server"
import { confirmacaoService } from "@/services/confirmacao.service"

export const runtime = "nodejs"

export async function POST(req: Request) {
  try {
    const body = await req.json()

    const { name, email, phone, attendance, dietary } = body

    if (!name || !attendance || !email) {
      return NextResponse.json(
        { error: "Nome, e-mail e confirmação são obrigatórios." },
        { status: 400 }
      )
    }

    await confirmacaoService.create({
      name,
      email,
      phone,
      attendance,
      dietary,
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    )
  }
}
