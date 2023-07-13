import {ReactNode} from "react"

import SessionProviderWrapper from "@/app/(components)/session-provider"
import Navbar from "@/app/(components)/ui/navbar"

export default function DashboardLayout({
                                            children,
                                        }: {
    children: ReactNode
}): JSX.Element {
    return (
        <>
            <SessionProviderWrapper>
                <Navbar/>
            </SessionProviderWrapper>
            <>{children}</>
        </>
    )
}
