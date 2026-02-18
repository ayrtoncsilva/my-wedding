export const dynamic = "force-dynamic"
export const runtime = "nodejs"

import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function GET() {
  try {
    const recados = await prisma.recado.findMany({
      orderBy: {
        createdAt: "desc",
      },
    })

    return NextResponse.json(recados)
  } catch (error) {
    return NextResponse.json({ error: "Erro ao buscar recados" }, { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json()

    if (!body.name || !body.message) {
      return NextResponse.json(
        { error: "Dados inválidos" },
        { status: 400 }
      )
    }

    const recado = await prisma.recado.create({
      data: {
        name: body.name,
        message: body.message,
      },
    })

    return NextResponse.json(recado)
  } catch (error) {
    return NextResponse.json({ error: "Erro ao salvar recado" }, { status: 500 })
  }
}
