import { StatusConfirmacao } from "@prisma/client"

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
  // noop por enquanto — evita erro em build e runtime
  console.log("Confirmação recebida:", {
    name: dados.name,
    attendance: dados.attendance,
    email: dados.email,
    phone: dados.phone,
    dietary: dados.dietary,
  })
}
