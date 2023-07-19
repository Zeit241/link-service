import { Suspense } from "react"
import { Metadata } from "next"
import { notFound } from "next/navigation"

import RecordPage from "@/app/(components)/record"
import Loading from "@/app/[slug]/loading"
import { GetRecordLinks } from "@/app/actions/record"

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
  const data = await GetRecordLinks({ url: params.slug, enabled: true })
  return !data || data?.Link.length < 1 || !data?.enabled ? (
    notFound()
  ) : (
    <div className={"h-full overflow-x-hidden"}>
      <Suspense fallback={<Loading />}>
        <RecordPage data={data} links={data.Link} />
      </Suspense>
    </div>
  )
}
