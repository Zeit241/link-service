import * as React from "react"
import { notFound } from "next/navigation"

import ModifyLinksWrapper from "@/app/(components)/modify-links-wrapper"
import StoreInitializer from "@/app/(components)/store-initalizer"
import { GetRecordLinks } from "@/app/server/record"

export default async function ModifyPage({
  params,
}: {
  params: { slug: string }
}) {
  const record = await GetRecordLinks({ url: params.slug })
  if (!record) {
    return notFound()
  } else {
    return (
      <>
        <StoreInitializer data={record} />
        <ModifyLinksWrapper record1={record} />
      </>
    )
  }
}
