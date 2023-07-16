import { Suspense } from "react"
import { Metadata } from "next"
import { notFound } from "next/navigation"

import RecordPage from "@/app/(components)/record"
import { GetRecordLinks } from "@/app/server/get-record-links"

export async function generateMetadata({
  params,
}: {
  params: { slug: string }
}): Promise<Metadata> {
  return {
    title: `@${params.slug} | Pretty Links`,
  }
}

export default async function RecordsPage({
  params,
}: {
  params: { slug: string }
}) {
  const data = await GetRecordLinks(params.slug)

  return !data || data?.Link.length < 1 || !data?.enabled ? (
    notFound()
  ) : (
    <div className={"h-full overflow-x-hidden"}>
      <Suspense fallback={<div>Loading...</div>}>
        <RecordPage data={data} links={data.Link} />
      </Suspense>
    </div>
  )
}
