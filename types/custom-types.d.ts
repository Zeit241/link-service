import { User } from "@prisma/client"

export type UserSession = Pick<User, "id" | "username" | "role" | "name">

export type BaseReturnType = { status: number; message: string }

export type Prettify<T> = {
  [K in keyof T]: T[K]
} & {}
