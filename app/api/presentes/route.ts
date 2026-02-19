import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { guest_name, present_description } = body

    if (!guest_name || !present_description) {
      return NextResponse.json(
        { error: "Nome e descrição são obrigatórios." },
        { status: 400 }
      )
    }

    await prisma.presente.create({
      data: {
        guest_name: guest_name.trim(),
        present_description: present_description.trim(),
      },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Erro ao salvar presente:", error)
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    )
  }
}
