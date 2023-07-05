"use server";

import { prisma } from "@/lib/database";
import { revalidatePath } from "next/cache";

export const deleteRecord = async (id: string) => {
  const res = await prisma.record.delete({
    where: {
      id: id,
    },
  });
  revalidatePath("/dashboard");
  return res;
};
