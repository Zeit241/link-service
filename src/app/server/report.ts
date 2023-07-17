"use server"

import { Prisma, Warns } from "@prisma/client"

import { prisma } from "@/lib/database"

import { BaseReturnType } from "../../../types/custom-types"

import PrismaClientKnownRequestError = Prisma.PrismaClientKnownRequestError

type SendReportProps = Pick<Warns, "recordId" | "text">

export const SendReport = async ({
  recordId,
  text,
}: SendReportProps): Promise<BaseReturnType> => {
  try {
    await prisma.warns.create({
      data: {
        recordId,
        text,
      },
    })
    return {
      status: 200,
      message: "Report created successfully.",
    }
  } catch (e) {
    if (e instanceof PrismaClientKnownRequestError) {
      return {
        status: 500,
        message: "An error occurred during the create operation.",
      }
    }
    return {
      status: 500,
      message: "An unknown error occurred.",
    }
  }
}

type GetReportProps = Pick<Partial<Warns>, "recordId"> | {}

export const GetReport = async (
  props: GetReportProps = {}
): Promise<BaseReturnType & { warns?: Warns[] }> => {
  try {
    const warns = await prisma.warns.findMany({
      where: props,
    })
    return {
      status: 200,
      message: "Report searched successfully.",
      warns: warns,
    }
  } catch (e) {
    if (e instanceof PrismaClientKnownRequestError) {
      return {
        status: 500,
        message: "An error occurred during the create operation.",
      }
    }
    return {
      status: 500,
      message: "An unknown error occurred.",
    }
  }
}
