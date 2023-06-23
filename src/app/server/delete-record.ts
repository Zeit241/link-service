"use server";

import { prisma } from "@/lib/database";

export const deleteRecord = async (id: string) => {
  const res = await prisma.record.delete({
    where: {
      id: id,
    },
  });
  return res;
};
