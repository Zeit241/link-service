"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { Undo2 } from "lucide-react"

import { Button } from "@/app/(components)/ui/button"

export default function NotFound() {
  const router = useRouter()

  const returnBack = () => {
    router.replace("/")
  }

  return (
    <>
      {/*
        No support for metadata in not-found.tsx yet
        https://github.com/vercel/next.js/pull/47328#issuecomment-1488891093
      */}
      <title>Not Found</title>
      <div
        className={"flex h-full w-full flex-col items-center justify-center"}>
        <h1 className={"p-12 text-9xl"}>404</h1>
        <Button onClick={returnBack} className={"m-6"}>
          <Undo2 className={"mr-3"} />
          Go back
        </Button>
        <h2 className={"text-xl"}>
          The page you’re looking for doesn’t exist.
        </h2>
        <p>
          <span className={"p-2"}>Want to take it url?</span>
          <Link href={"/login"} className={"underline"}>
            Create free account
          </Link>
          .
        </p>
      </div>
    </>
  )
}
