"use client"

import { useRouter } from "next/navigation"
import { Link } from "@prisma/client"

type LinkItemProps = {
  Link: Omit<Link, "createdAt" | "updatedAt">
}
export default function LinkItem({ Link }: LinkItemProps) {
  const router = useRouter()
  const updateLinks = async () => {
    //TODO: Собирать статистику по каждой ссылке
    return router.push(Link.url, {})
  }

  return (
    <div
      onClick={updateLinks}
      className={
        "flex h-auto w-[75%] min-w-[260px] max-w-[560px] cursor-pointer content-center bg-muted p-2.5 hover:scale-105 "
      }
    >
      <div className={"flex flex-1 items-center justify-center"}>
        <h1 className={"break-all text-center font-semibold sm:text-base"}>
          {Link.name}
        </h1>
      </div>
    </div>
  )
}
