import {Suspense} from "react"
import {Metadata} from "next"

import RecordLoading from "@/app/(components)/record-loading"
import ReactWrapper from "@/app/(components)/record-wrapper"

export const metadata: Metadata = {
    title: "Dashboard",
}

export default function DashboardPage() {
    return (
        <>
            <div className={"p-8"}>
                <h1 className={"mb-4 text-2xl"}>Your projects</h1>
                <Suspense fallback={<RecordLoading/>}>
                    {/* @ts-expect-error Async Server Component */}
                    <ReactWrapper/>
                </Suspense>
            </div>
        </>
    )
}
