"use client"

import { useRouter } from "next/navigation"
import { Link } from "@prisma/client"

type LinkItemProps = { link: Link }

export default function LinkItem({ link }: LinkItemProps): JSX.Element {
  const router = useRouter()

  const redirect = (): void => {
    router.replace(link.url!)
  }

  const sendStatistic = async (): Promise<void> => {
    fetch("/api/stats", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        linkId: link.id,
        recordId: link.recordId,
        shared: null,
      }),
    }).then(() => redirect())
  }

  return (
    <div
      onClick={sendStatistic}
      className={
        "flex h-auto w-[75%] min-w-[260px] max-w-[560px]  cursor-pointer content-center bg-muted p-2.5 pl-5 pr-5 transition-all duration-150 hover:scale-105"
      }>
      <div className={"flex w-full content-center items-center justify-center"}>
        <div className={"flex w-full flex-col flex-wrap items-center"}>
          {link.customImage?.enabled && (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={link.customImage.image!} alt="Link Icon" />
          )}
          <h1
            className={
              " flex flex-wrap break-all text-center font-semibold sm:text-base "
            }>
            {link.name}
          </h1>
        </div>
      </div>
    </div>
  )
}
