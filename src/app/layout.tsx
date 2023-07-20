import "./globals.css"

import type { ReactNode } from "react"
import { Metadata } from "next"

import { Toaster } from "@/app/(components)/ui/toaster"

export const metadata: Metadata = {
  title: "Pretty Links | Yours links list",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
}
export default function RootLayout({
  children,
}: {
  children: ReactNode
}): JSX.Element {
  return (
    <html lang="en" className="dark">
      <body>
        <main>{children}</main>
        <Toaster />
      </body>
    </html>
  )
}
