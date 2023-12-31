"use server"

import { Link, Prisma } from "@prisma/client"

import { prisma } from "@/lib/database"

import { BaseReturnType } from "../../../types/custom-types"

import PrismaClientKnownRequestError = Prisma.PrismaClientKnownRequestError

type CreateLinkProps = Pick<
  Link,
  "recordId" | "name" | "url" | "order" | "type"
>
export const CreateLink = async (
  data: CreateLinkProps
): Promise<BaseReturnType & { link?: Link }> => {
  try {
    const CreatedLink = await prisma.link.create({
      data,
    })
    return {
      status: 200,
      message: "Link created successfully.",
      link: CreatedLink,
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

type UpdateLinkProps = Pick<Link, "id"> &
  Partial<Omit<Link, "id" | "createdAt" | "updatedAt" | "recordId">>

export const UpdateLink = async ({
  id,
  ...data
}: UpdateLinkProps): Promise<BaseReturnType> => {
  try {
    await prisma.link.update({
      where: {
        id,
      },
      data,
    })
    return { status: 200, message: "Link updated successfully." }
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

type DeleteLinkProps = Pick<Link, "id">

export const DeleteLink = async ({
  id,
}: DeleteLinkProps): Promise<BaseReturnType> => {
  try {
    await prisma.link.delete({
      where: {
        id,
      },
    })
    return { status: 200, message: "Link deleted successfully." }
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
