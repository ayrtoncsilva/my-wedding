import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

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

    const attendanceValue = attendance === "sim" ? "sim" : "nao"

    await prisma.confirmacao.create({
      data: {
        nome: name.trim(),
        email: email?.trim() || null,
        telefone: phone?.trim() || null,
        status: attendanceValue,
        restricoes: dietary?.trim() || null,
      },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Erro ao salvar no banco:", error)

    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    )
  }
}
