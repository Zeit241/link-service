import "./globals.css"

import type { ReactNode } from "react"
import { Metadata } from "next"

import { Toaster } from "@/app/(components)/ui/toaster"

export const metadata: Metadata = {
  title: "LinkSync | Yours links list",
  description:
    "LinkSync is the ultimate link aggregator platform that allows you to effortlessly collect, organize, and share web links with ease. Create custom link collections and collaborate with others efficiently. Explore a curated world of information with LinkSync.",
  keywords:
    "link aggregator, link collection, web links, content curation, link sharing, URL organizer, online bookmarks, curated content, collaborative link sharing",
  manifest: "/site.webmanifest",
  icons: {
    icon: [
      {
        url: "/apple-touch-icon.png",
        sizes: "180x180",
        rel: "apple-touch-icon",
      },
      {
        url: "/favicon-32x32.png",
        sizes: "32x32",
        rel: "icon",
        type: "image/png",
      },
      {
        url: "/favicon-16x16.png",
        sizes: "16x16",
        rel: "icon",
        type: "image/png",
      },
    ],
  },

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
