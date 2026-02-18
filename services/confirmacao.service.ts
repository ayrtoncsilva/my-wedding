import { NextResponse } from "next/server"
import { Resend } from "resend"
import { db } from "@/lib/db"

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: Request) {
  try {
    const body = await req.json()

    const { name, email, phone, attendance, dietary } = body

    // 🔎 Validação básica
    if (!name || !attendance || !email) {
      return NextResponse.json(
        { error: "Nome, e-mail e confirmação são obrigatórios." },
        { status: 400 }
      )
    }

    // 💾 Salvar no banco (Turso / libsql)
    await db.execute({
      sql: `
        INSERT INTO confirmations (name, email, phone, attendance, dietary)
        VALUES (?, ?, ?, ?, ?)
      `,
      args: [
        name,
        email,
        phone ?? "",
        attendance,
        dietary ?? ""
      ],
    })

    // 📧 Enviar e-mail
    const { data, error } = await resend.emails.send({
      from: process.env.NOTIFICATION_FROM_EMAIL || "Casamento <onboarding@resend.dev>",
      to: process.env.NOIVOS_EMAIL || "seuemail@gmail.com",
      subject: "Nova confirmação de presença 💍",
      html: `
        <h2>Nova confirmação de presença</h2>
        <p><strong>Nome:</strong> ${escapeHtml(name)}</p>
        <p><strong>E-mail:</strong> ${escapeHtml(email)}</p>
        ${phone ? `<p><strong>Telefone:</strong> ${escapeHtml(phone)}</p>` : ""}
        <p><strong>Presença:</strong> ${attendance === "sim" ? "Sim" : "Não"}</p>
        ${dietary ? `<p><strong>Restrições alimentares:</strong> ${escapeHtml(dietary)}</p>` : ""}
        <p style="color:#666;font-size:12px;margin-top:24px;">
          Enviado pelo site do casamento.
        </p>
      `,
    })

    if (error) {
      console.error("Erro ao enviar email:", error)
      return NextResponse.json(
        { error: "Erro ao enviar email." },
        { status: 500 }
      )
    }

    console.log("Confirmação salva e e-mail enviado:", data?.id)

    return NextResponse.json({ success: true })

  } catch (err) {
    console.error("Erro geral:", err)
    return NextResponse.json(
      { error: "Erro interno do servidor." },
      { status: 500 }
    )
  }
}

// 🔐 Proteção básica contra HTML injection
function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
}
