import { NextRequest, NextResponse } from "next/server"
import { Prettify } from "@/../types/custom-types"
import { Statistic } from "@prisma/client"

import { CreateStatistic } from "@/app/actions/stats"

//TODO: REFER IS NOT WORKING
type DataType = Prettify<Pick<Statistic, "linkId" | "recordId" | "shared">>

export async function POST(request: NextRequest, response: NextResponse) {
  const data: DataType = await request.json()
  if (!data) return NextResponse.json({ status: 400, message: "Missing data" })
  await CreateStatistic({
    linkId: data?.linkId,
    recordId: data?.recordId,
    ip: request.ip || "unknown",
    country: request.geo?.country || "unknown",
    platform: request?.headers?.get("sec-ch-ua-platform") || "unknown",
    from: request.referrer || "unknown",
    shared: data.shared,
  })

  return NextResponse.json({
    status: 200,
    message: "Statistic created successfully.",
  })
}
