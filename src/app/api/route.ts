import { NextRequest, NextResponse } from "next/server";

export async function POST(
  request: NextRequest,
  response: NextResponse
): Promise<NextResponse> {
  return NextResponse.json({ result: true });
}
