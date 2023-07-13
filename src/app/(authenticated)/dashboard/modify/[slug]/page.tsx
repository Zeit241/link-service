import * as React from "react"
import {notFound} from "next/navigation"

import {useStore, useStoreTest} from "@/lib/storage/storage"
import ModifyLinksWrapper from "@/app/(components)/modify-links-wrapper"
import StoreInitializer from "@/app/(components)/store-initalizer"
import {GetRecordLinks} from "@/app/server/get-record-links"

export default async function ModifyPage({
                                             params,
                                         }: {
    params: { slug: string }
}) {
    const record = await GetRecordLinks(params.slug)

    if (!record) {
        return notFound()
    } else {
        useStore.setState({record: record, links: record.Link})
        console.log(useStoreTest.getState())
        return (
            <>
                <StoreInitializer data={record}/>
                <ModifyLinksWrapper record={record}/>
            </>
        )
    }
}
