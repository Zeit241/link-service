"use server"

import bcrypt from "bcrypt"

import { prisma } from "@/lib/database"

import { BaseReturnType } from "../../../types/custom-types"
import { Prisma, User } from ".prisma/client"

type UserAuthFormProps = Pick<User, "username" | "password">

export const SingUp = async (
  data: UserAuthFormProps
): Promise<BaseReturnType> => {
  try {
    await prisma.user.create({
      data: {
        ...data,
        password: bcrypt.hashSync(data.password!, 10),
        role: "USER",
      },
    })
    return { status: 200, message: "User successfully created!" }
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        return {
          status: 403,
          message:
            "There is a unique constraint violation, a new user cannot be created with this username.",
        }
      }
    }
  }
  return { status: 500, message: "An unknown error occurred." }
}

type UserSignInProps = Pick<User, "username">
type UserSignInResult = Pick<User, "id" | "username" | "password" | "role">

//TODO: Find a way to throw error to the client

export const SignIn = async (
  data: UserSignInProps
): Promise<UserSignInResult | null> => {
  //try {
  const user = await prisma.user.findUnique({
    //@ts-ignore
    where: data,
    select: {
      id: true,
      username: true,
      password: true,
      role: true,
    },
  })
  return user ? user : null
  // } catch (e) {}
}
