"use server";

import { prisma } from "@/lib/database";

interface UpdateLinkProps {
  id: string;
  url?: string;
  name?: string;
  order?: number;
  enabled?: boolean;
}

export default async function UpdateLink(
  data: UpdateLinkProps
): Promise<{ status: number; message: string }> {
  const link = await prisma.link.update({
    where: {
      id: data.id,
    },
    data: {},
  });

  return { status: 200, message: "Done!" };
}
