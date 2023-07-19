import { headers } from "next/headers"
import { getServerSession } from "next-auth"

import { authOptions } from "@/lib/auth"
import { Toaster } from "@/app/(components)/ui/toaster"

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession(authOptions)
  if (session) {
    const headersList = headers()
    const referer = headersList.get("referer")
    console.log(session)
    //return redirect("/dashboard");
  }
  return (
    <div className={"h-full"}>
      {children}
      <Toaster />
    </div>
  )
}
