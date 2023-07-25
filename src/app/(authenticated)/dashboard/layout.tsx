import { ReactNode, Suspense } from "react"
import { Metadata } from "next"

import DashboardLoading from "@/app/(authenticated)/dashboard/loading"

export const metadata: Metadata = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
}
export default function DashboardLayout({
  children,
}: {
  children: ReactNode
}): JSX.Element {
  return <Suspense fallback={<DashboardLoading />}>{children}</Suspense>
}
