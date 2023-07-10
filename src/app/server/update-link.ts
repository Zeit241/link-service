"use server";

import { prisma } from "@/lib/database";

interface UpdateLinkProps {
  url?: string;
  name?: string;
  order?: number;
  enabled?: boolean;
}

export default async function UpdateLink(
    id:string,
  data: UpdateLinkProps
): Promise<{ status: number; message: string }> {
  const link = await prisma.link.update({
    where: {
      id: id,
    },
    data: data,
  });

  return { status: 200, message: "Done!" };
}
