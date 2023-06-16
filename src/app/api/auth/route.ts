import { NextRequest, NextResponse } from "next/server";

export async function POST(
  request: NextRequest,
  response: NextResponse
): Promise<NextResponse> {
  //Registration logic
  return NextResponse.json({ result: true });
}
