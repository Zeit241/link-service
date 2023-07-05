"use server";

import { prisma } from "@/lib/database";

interface CreateRecordProps {
  name: string;
  id: string;
}

export default async function CreateRecord(
  data: CreateRecordProps
): Promise<{ status: number; message: string }> {
  const is_username_taken = await prisma.record.create({
    data: {
      name: data.name,
      url: data.name,
      profilePicture: "",
      preferences: {},
      userId: data.id,
    },
  });
  console.log(is_username_taken);
  return { status: 200, message: "Done!" };
}
