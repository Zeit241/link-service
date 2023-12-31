"use server"

import { cache } from "react"
import { revalidatePath } from "next/cache"
import { Link, Prisma, Record } from "@prisma/client"

import { prisma } from "@/lib/database"

import { BaseReturnType, Prettify } from "../../../types/custom-types"

import PrismaClientKnownRequestError = Prisma.PrismaClientKnownRequestError

type CreateRecordProps = Pick<Record, "name" | "id">

export const CreateRecord = async (
  data: CreateRecordProps
): Promise<BaseReturnType & { record?: Record }> => {
  try {
    const CreatedRecord = await prisma.record.create({
      data: {
        userId: data.id,
        name: data.name,
        url: data.name,
        profilePicture: "",
        preferences: {},
      },
    })
    return {
      status: 200,
      message: "Record created successfully.",
      record: CreatedRecord,
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

type UpdateRecordProps = Pick<Record, "id"> &
  Partial<Omit<Record, "id" | "createdAt" | "updatedAt" | "userId">>

export const UpdateRecord = async ({
  id,
  ...data
}: UpdateRecordProps): Promise<BaseReturnType> => {
  try {
    await prisma.record.update({
      where: {
        id,
      },
      data,
    })
    return { status: 200, message: "Record updated successfully." }
  } catch (e) {
    if (e instanceof PrismaClientKnownRequestError) {
      return {
        status: 500,
        message: "An error occurred during the update operation.",
      }
    }
    return {
      status: 500,
      message: "An unknown error occurred.",
    }
  }
}

type DeleteRecordProps = Pick<Record, "id">

export const DeleteRecord = async ({
  id,
}: DeleteRecordProps): Promise<BaseReturnType> => {
  try {
    await prisma.record.delete({
      where: {
        id: id,
      },
    })
    revalidatePath("/dashboard")
    return { status: 200, message: "Record deleted successfully." }
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

type VerifyRecordNameProps = Pick<Record, "url">

export const VerifyRecordName = async ({
  url,
}: VerifyRecordNameProps): Promise<BaseReturnType> => {
  try {
    const PossibleRecord = await prisma.record.count({
      where: {
        url,
      },
    })
    return PossibleRecord > 0
      ? { status: 403, message: "Name already taken" }
      : { status: 200, message: "Name is not taken" }
  } catch (e) {
    if (e instanceof PrismaClientKnownRequestError) {
      return {
        status: 500,
        message: "An error occurred during the count operation.",
      }
    }
    return {
      status: 500,
      message: "An unknown error occurred.",
    }
  }
}

type GetRecordLinksProps = {
  linkEnabled: boolean
  recordEnabled: boolean
  url: string
}
type GetRecordLinksResult = (Record & { Link: Link[] }) | null

export const GetRecordLinks = cache(
  async (
    data: Prettify<GetRecordLinksProps>
  ): Promise<GetRecordLinksResult> => {
    const { recordEnabled, linkEnabled, url } = data
    const record = await prisma.record.findUnique({
      where: {
        url: url,
        enabled: recordEnabled ? true : undefined,
      },
      include: {
        Link: {
          where: linkEnabled ? { enabled: true } : undefined,
          orderBy: {
            order: "desc",
          },
        },
      },
    })
    return record ? record : null
  }
)

type GetRecordCountProps = Pick<Record, "id">
export const GetRecordCount = async ({
  id,
}: GetRecordCountProps): Promise<BaseReturnType & { record?: number }> => {
  try {
    const record = await prisma.record.count({
      where: {
        id,
      },
    })
    return {
      status: 200,
      message: "Record fetched successfully.",
      record: record,
    }
  } catch (e) {
    if (e instanceof PrismaClientKnownRequestError) {
      return {
        status: 500,
        message: "An error occurred during the fetch operation.",
      }
    }
    return {
      status: 500,
      message: "An unknown error occurred.",
    }
  }
}

type getLinkAndStatisticCountProps = Pick<Record, "id">

export const getLinkAndStatisticCount = async ({
  id,
}: getLinkAndStatisticCountProps) => {
  try {
    const data = await prisma.record.findMany({
      where: {
        userId: id,
      },
      include: {
        _count: {
          select: {
            Link: true,
            Statistic: true,
          },
        },
      },
    })
    return {
      status: 200,
      message: "Record fetched successfully.",
      data: data,
    }
  } catch (e) {
    if (e instanceof PrismaClientKnownRequestError) {
      return {
        status: 500,
        message: "An error occurred during the fetch operation.",
      }
    }
    return {
      status: 500,
      message: "An unknown error occurred.",
    }
  }
}
