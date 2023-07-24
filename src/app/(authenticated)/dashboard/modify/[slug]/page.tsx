import * as React from "react"
import { notFound } from "next/navigation"

import ModifyLinksWrapper from "@/app/(components)/modify-links-wrapper"
import StoreInitializer from "@/app/(components)/store-initalizer"
import { GetRecordLinks } from "@/app/actions/record"

export default async function ModifyPage({
  params,
}: {
  params: { slug: string }
}) {
  const record = await GetRecordLinks({
    url: params.slug,
    linkEnabled: false,
    recordEnabled: false,
  })

  return !record ? (
    notFound()
  ) : (
    <>
      <StoreInitializer record={record} links={record.Link} />
      <ModifyLinksWrapper />
    </>
  )
}
