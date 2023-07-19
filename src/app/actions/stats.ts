"use server"

import { BaseReturnType, Prettify } from "@/../types/custom-types"
import { Prisma, Statistic } from "@prisma/client"

import { prisma } from "@/lib/database"

import PrismaClientKnownRequestError = Prisma.PrismaClientKnownRequestError

type CreateStatisticProps = Omit<Statistic, "id" | "createdAt">

export const CreateStatistic = async (
  data: Prettify<CreateStatisticProps>
): Promise<BaseReturnType> => {
  try {
    await prisma.statistic.create({
      data,
    })
    return {
      status: 200,
      message: "Statistic created successfully.",
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

type GetStatisticProps =
  | Pick<Statistic, "id">
  | Pick<Statistic, "linkId">
  | Pick<Statistic, "recordId">

export const GetStatistic = async (
  data: GetStatisticProps
): Promise<BaseReturnType & { statistic?: Statistic[] }> => {
  try {
    const statistic = await prisma.statistic.findMany({
      where: data,
    })
    return {
      status: 200,
      message: "Statistic found successfully.",
      statistic: statistic,
    }
  } catch (e) {
    if (e instanceof PrismaClientKnownRequestError) {
      return {
        status: 500,
        message: "An error occurred during the find operation.",
      }
    }
    return {
      status: 500,
      message: "An unknown error occurred.",
    }
  }
}

type DeleteStatisticProps =
  | Pick<Statistic, "id">
  | Pick<Statistic, "linkId">
  | Pick<Statistic, "recordId">

export const DeleteStatistic = async (
  data: DeleteStatisticProps
): Promise<BaseReturnType> => {
  try {
    await prisma.statistic.deleteMany({
      where: data,
    })
    return {
      status: 200,
      message: "Statistic deleted successfully.",
    }
  } catch (e) {
    if (e instanceof PrismaClientKnownRequestError) {
      return {
        status: 500,
        message: "An error occurred during the delete operation.",
      }
    }
    return {
      status: 500,
      message: "An unknown error occurred.",
    }
  }
}
