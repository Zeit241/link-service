import type { ReactNode } from "react"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "LinkSync | Authentication",
}
export default async function AuthLayout({
  children,
}: {
  children: ReactNode
}) {
  return <div className={"h-full"}>{children}</div>
}
