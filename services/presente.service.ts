import { prisma } from "@/lib/prisma"

export type PresenteCreateInput = {
  guest_name: string
  present_description: string
}

export const presenteService = {
  async create(data: PresenteCreateInput) {
    return prisma.presente.create({
      data: {
        guest_name: data.guest_name.trim(),
        present_description: data.present_description.trim(),
      },
    })
  },
}
