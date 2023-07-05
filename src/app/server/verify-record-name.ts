"use server";

import { prisma } from "@/lib/database";

interface VerifyRecordNameProps {
  name: string;
}

export default async function VerifyRecordName(
  data: VerifyRecordNameProps
): Promise<{ status: number; message: string }> {
  const is_username_taken = await prisma.record.count({
    where: {
      url: data.name,
    },
  });
  console.log(is_username_taken);
  if (is_username_taken > 0) {
    return { status: 403, message: "Name already taken" };
  }
  return { status: 200, message: "Name is not taken" };
}
