"use server"

import { revalidatePath } from "next/cache"

import { prisma } from "@/lib/database"

export const deleteRecord = async (id: string) => {
  const res = await prisma.record.delete({
    where: {
      id: id,
    },
  })
  revalidatePath("/dashboard")
  return res
}
