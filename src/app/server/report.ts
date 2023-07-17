"use server"

import { Warns } from "@prisma/client"

import { prisma } from "@/lib/database"

type SendReportProps = Pick<Warns, "recordId" | "text">

export const SendReport = async ({
  recordId,
  text,
}: SendReportProps): Promise<void> => {
  await prisma.warns.create({
    data: {
      recordId,
      text,
    },
  })
}

type GetReportProps = Pick<Partial<Warns>, "recordId"> | {}

export const GetReport = async (
  props: GetReportProps = {}
): Promise<Warns[]> => {
  return prisma.warns.findMany({
    where: props,
  })
}
