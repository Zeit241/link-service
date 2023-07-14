"use server"

import { Link } from "@prisma/client"

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
): Promise<{ status: number; message: string; link?: Link }> {
  try {
    const link = await prisma.link.create({
      data: {
        name: data.name,
        url: data.name,
        recordId: data.record_id,
        order: data.order || 0,
      },
    })
    return { status: 200, message: "Done!", link: link }
  } catch (e) {
    console.log(e)
    return { status: 500, message: "Internal server error" }
  }
}
