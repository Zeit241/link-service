"use server";

import { prisma } from "@/lib/database";
import { Prisma } from ".prisma/client";

interface UserAuthFormProps {
  username: string;
  password: string;
}

export default async function SingUp(
  data: UserAuthFormProps
): Promise<{ status: number; message: string }> {
  try {
    await prisma.user.create({
      data: {
        username: data.username,
        password: data.password,
        role: "USER",
      },
    });
    return { status: 200, message: "User created" };
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        return {
          status: 403,
          message:
            "There is a unique constraint violation, a new user cannot be created with this email",
        };
      }
    }
  }
  return { status: 500, message: "Internal server error" };
}
