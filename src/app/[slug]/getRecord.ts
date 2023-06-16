"use server";

import { cache } from "react";
import { prisma } from "@/lib/database";

export const GetRecord = cache(async (slug: string) => {
  cache(() => {});
  return prisma.record.findUnique({
    where: {
      url: slug,
    },
    include: {
      Link: true,
    },
  });
});
