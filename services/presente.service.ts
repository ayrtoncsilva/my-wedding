import { prisma } from "@/lib/prisma"
import { randomUUID } from "crypto"

export type PresenteCreateInput = {
  guest_name: string
  present_description: string
}

export const presenteService = {
  async create(data: PresenteCreateInput) {
    const id = randomUUID()
    await prisma.presente.create({
      data: {
        id,
        guestName: data.guest_name.trim(),
        presentDescription: data.present_description.trim(),
      },
    })
    return { id }
  },
}
