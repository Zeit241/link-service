"use server";

import { prisma } from "@/lib/database";
import { revalidatePath } from "next/cache";

interface CreateLinkProps {
  record_id: string;
  url: string;
  name: string;
  record_url: string;
}

export default async function CreateLink(
  data: CreateLinkProps
): Promise<{ status: number; message: string }> {
  try {
    const link = await prisma.link.create({
      data: {
        name: data.name,
        url: data.name,
        recordId: data.record_id,
      },
    });
    revalidatePath("/dashboard/modify/" + data.record_url);
    revalidatePath("/" + data.record_url);
    return { status: 200, message: "Done!" };
  } catch (e) {
    console.log(e);
    return { status: 500, message: "Internal server error" };
  }
}
