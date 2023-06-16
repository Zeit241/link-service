import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/database";

export async function POST(
  request: NextRequest,
  response: NextResponse
): Promise<NextResponse> {
  const records = await prisma.record.findMany({
    where: {
      userId: "6468f7a915c922690bea7b17",
    },
  });

  return NextResponse.json({ result: records });
}
