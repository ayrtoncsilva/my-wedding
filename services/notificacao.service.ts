/**
 * Notificação aos noivos quando alguém confirma presença.
 * E-mail via Resend. Opcionalmente WhatsApp no futuro (Twilio/etc).
 */

export type DadosConfirmacao = {
  name: string
  email: string | null
  phone: string | null
  guests: string
  attendance: string
  dietary: string | null
}

const NOIVOS_EMAIL = process.env.NOIVOS_EMAIL
const RESEND_API_KEY = process.env.RESEND_API_KEY
const NOTIFICATION_FROM = process.env.NOTIFICATION_FROM_EMAIL ?? "Casamento <onboarding@resend.dev>"

export async function notificarConfirmacaoPresenca(dados: DadosConfirmacao): Promise<{ ok: boolean; error?: string }> {
  if (!NOIVOS_EMAIL?.trim()) {
    return { ok: false, error: "NOIVOS_EMAIL não configurado" }
  }

  // E-mail via Resend
  if (RESEND_API_KEY?.trim()) {
    const emailOk = await enviarEmailConfirmacao(dados)
    if (!emailOk.ok) {
      console.error("[notificacao] Falha ao enviar e-mail:", emailOk.error)
      return { ok: false, error: emailOk.error }
    }
  }

  // Futuro: WhatsApp (Twilio) se TWILIO_* estiver configurado
  // await enviarWhatsAppConfirmacao(dados)

  return { ok: true }
}

async function enviarEmailConfirmacao(dados: DadosConfirmacao): Promise<{ ok: boolean; error?: string }> {
  try {
    const { Resend } = await import("resend")
    const resend = new Resend(RESEND_API_KEY)

    const presenca = dados.attendance === "sim" ? "Sim, estará presente" : "Não poderá ir"
    const acompanhantes =
      dados.guests === "1"
        ? "Somente ele(a)"
        : `${Number(dados.guests) - 1} acompanhante(s)`

    const html = `
      <h2>Nova confirmação de presença</h2>
      <p><strong>Nome:</strong> ${escapeHtml(dados.name)}</p>
      <p><strong>Presença:</strong> ${presenca}</p>
      <p><strong>Acompanhantes:</strong> ${acompanhantes}</p>
      ${dados.email ? `<p><strong>E-mail:</strong> ${escapeHtml(dados.email)}</p>` : ""}
      ${dados.phone ? `<p><strong>Telefone:</strong> ${escapeHtml(dados.phone)}</p>` : ""}
      ${dados.dietary ? `<p><strong>Restrições alimentares:</strong> ${escapeHtml(dados.dietary)}</p>` : ""}
      <p style="color:#666;font-size:12px;margin-top:24px;">Enviado pelo site do casamento.</p>
    `

    const { error } = await resend.emails.send({
      from: NOTIFICATION_FROM,
      to: [NOIVOS_EMAIL.trim()],
      subject: `[Casamento] Confirmação de presença: ${dados.name}`,
      html,
    })

    if (error) {
      return { ok: false, error: error.message }
    }
    return { ok: true }
  } catch (e) {
    const msg = e instanceof Error ? e.message : "Erro ao enviar e-mail"
    return { ok: false, error: msg }
  }
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
}
