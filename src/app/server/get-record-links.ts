"use server"

import { cache } from "react"
import { Link, Record } from "@prisma/client"

import { prisma } from "@/lib/database"

export const GetRecordLinks = cache(
  async (slug: string): Promise<(Record & { Link: Link[] }) | null> => {
    const record = await prisma.record.findUnique({
      where: {
        url: slug,
      },
      include: {
        Link: {
          orderBy: {
            order: "asc",
          },
        },
      },
    })
    if (!record) {
      return null
    }
    return record
  }
)
