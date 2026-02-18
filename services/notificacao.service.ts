import { Resend } from "resend"
import { StatusConfirmacao } from "@prisma/client"

const resend = new Resend(process.env.RESEND_API_KEY)

const NOIVOS_EMAIL = process.env.NOIVOS_EMAIL
const FROM =
  process.env.NOTIFICATION_FROM_EMAIL ??
  "Casamento <onboarding@resend.dev>"

type DadosConfirmacao = {
  name: string
  email?: string
  phone?: string
  attendance: StatusConfirmacao
  dietary?: string
}

export async function notificarConfirmacaoPresenca(
  dados: DadosConfirmacao
): Promise<void> {
  if (!NOIVOS_EMAIL) {
    console.warn("NOIVOS_EMAIL não configurado, e-mail não enviado.")
    return
  }

  if (!process.env.RESEND_API_KEY) {
    console.warn("RESEND_API_KEY não configurada, e-mail não enviado.")
    return
  }

  const presenca =
    dados.attendance === StatusConfirmacao.sim ? "Sim" : "Não"

  const html = `
    <h2>Nova confirmação de presença</h2>
    <p><strong>Nome:</strong> ${escapeHtml(dados.name)}</p>
    <p><strong>Presença:</strong> ${presenca}</p>
    ${dados.email ? `<p><strong>E-mail:</strong> ${escapeHtml(dados.email)}</p>` : ""}
    ${dados.phone ? `<p><strong>Telefone:</strong> ${escapeHtml(dados.phone)}</p>` : ""}
    ${dados.dietary ? `<p><strong>Restrições:</strong> ${escapeHtml(dados.dietary)}</p>` : ""}
    <hr />
    <p style="color:#666;font-size:12px">Site do casamento</p>
  `

  try {
    await resend.emails.send({
      from: FROM,
      to: [NOIVOS_EMAIL],
      subject: "Nova confirmação de presença 💍",
      html,
    })
  } catch (error) {
    console.error("Erro ao enviar e-mail de confirmação:", error)
  }
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;")
}
