"use server"

import { Prefences } from "@prisma/client"

import { prisma } from "@/lib/database"

interface UpdateRecordProps {
  enabled?: boolean
  description?: string
  profilePicture?: string
  preferences?: Prefences
}

export default async function UpdateRecord(
  id: string,
  data: UpdateRecordProps
): Promise<{ status: number; message: string }> {
  const record = await prisma.record.update({
    where: {
      id: id,
    },
    data: data,
  })
  console.log(record)
  return { status: 200, message: "Done!" }
}
