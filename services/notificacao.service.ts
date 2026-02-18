import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

const NOIVOS_EMAIL = process.env.NOIVOS_EMAIL
const FROM = process.env.NOTIFICATION_FROM_EMAIL ?? "Casamento <onboarding@resend.dev>"

type DadosConfirmacao = {
  name: string
  email: string | null
  phone: string | null
  attendance: string
  dietary: string | null
}

export async function notificarConfirmacaoPresenca(
  dados: DadosConfirmacao
): Promise<void> {
  if (!NOIVOS_EMAIL) return

  const presenca = dados.attendance === "sim" ? "Sim" : "Não"

  const html = `
    <h2>Nova confirmação de presença</h2>
    <p><strong>Nome:</strong> ${escapeHtml(dados.name)}</p>
    <p><strong>Presença:</strong> ${presenca}</p>
    ${dados.email ? `<p><strong>E-mail:</strong> ${escapeHtml(dados.email)}</p>` : ""}
    ${dados.phone ? `<p><strong>Telefone:</strong> ${escapeHtml(dados.phone)}</p>` : ""}
    ${dados.dietary ? `<p><strong>Restrições:</strong> ${escapeHtml(dados.dietary)}</p>` : ""}
    <p style="color:#666;font-size:12px">Site do casamento</p>
  `

  await resend.emails.send({
    from: FROM,
    to: [NOIVOS_EMAIL],
    subject: "Nova confirmação de presença 💍",
    html,
  })
}

function escapeHtml(text: string) {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
}
