"use server"

import { revalidatePath } from "next/cache"

import { prisma } from "@/lib/database"

interface CreateLinkProps {
  record_id: string
  record_name: string
  url: string
  name: string
  order?: number
}

export default async function CreateLink(
  data: CreateLinkProps
): Promise<{ status: number; message: string }> {
  try {
    const link = await prisma.link.create({
      data: {
        name: data.name,
        url: data.name,
        recordId: data.record_id,
        order: data.order || 0,
      },
    })
    revalidatePath("/dashboard/modify/" + data.record_name)
    revalidatePath("/" + data.record_name)
    console.log(link)
    return { status: 200, message: "Done!" }
  } catch (e) {
    console.log(e)
    return { status: 500, message: "Internal server error" }
  }
}
