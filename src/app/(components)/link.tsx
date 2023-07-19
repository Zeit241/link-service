"use client"

import { useEffect, useState } from "react"
import { usePathname, useRouter } from "next/navigation"
import { Link } from "@prisma/client"

type LinkItemProps = { link: Link }

export default function LinkItem({ link }: LinkItemProps): JSX.Element {
  const [isHovered, setIsHovered] = useState<boolean>(false)
  const [isIframe, setIsIframe] = useState<boolean>(false)
  const router = useRouter()
  const pathname = usePathname()
  const redirect = async (): Promise<void> => {
    await router.push(link.url, {
      replace: true,
    })
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
    }).then(async () => await redirect())
  }

  useEffect(() => {
    setIsIframe(pathname.startsWith("/dashboard"))
  }, [pathname])

  return (
    <div
      onClick={sendStatistic}
      className={
        "flex h-auto w-[75%] min-w-[260px] max-w-[560px]  cursor-pointer content-center bg-muted p-2.5 pl-5 pr-5 transition-all duration-150 hover:scale-105"
      }
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}>
      <div className={"flex w-full content-center items-center justify-center"}>
        <div className={"flex w-full flex-col flex-wrap items-center"}>
          {link.customImage?.enabled && (
            <img src={link.customImage.image!} alt="Link Icon" />
          )}
          <h1
            className={
              "mr-[-30px] flex flex-wrap break-all text-center font-semibold sm:text-base "
            }>
            {link.name}
          </h1>
        </div>
        {/*<div className={`h-[36px] w-[36px]`}>*/}
        {/*  <div className={isHovered ? "" : "hidden"}>*/}
        {/*    <Dialog modal={true}>*/}
        {/*      <DialogTrigger asChild>*/}
        {/*        <Button*/}
        {/*          disabled={isIframe}*/}
        {/*          variant={"ghost"}*/}
        {/*          size={"icon"}*/}
        {/*          className={"rounded-full hover:bg-muted-foreground"}>*/}
        {/*          <MoreHorizontal size={16} />*/}
        {/*        </Button>*/}
        {/*      </DialogTrigger>*/}
        {/*      <DialogContent>*/}
        {/*        <DialogHeader className={"flex items-center"}>*/}
        {/*          <DialogTitle>Share this link</DialogTitle>*/}
        {/*        </DialogHeader>*/}
        {/*      </DialogContent>*/}
        {/*    </Dialog>*/}
        {/*  </div>*/}
        {/*</div>*/}
      </div>
    </div>
  )
}
