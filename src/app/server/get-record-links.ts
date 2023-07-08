"use server";

import { cache } from "react";
import { prisma } from "@/lib/database";
import { Link, Record } from "@prisma/client";

export const GetRecordLinks = cache(
  async (slug: string): Promise<(Record & { Link: Link[] }) | null> => {
    const record = await prisma.record.findUnique({
      where: {
        url: slug,
      },
      include: {
        Link: true,
      },
    });
    if (!record) {
      return null;
    }
    return record;
  }
);
