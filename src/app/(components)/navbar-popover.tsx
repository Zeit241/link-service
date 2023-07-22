"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { saveAs } from "file-saver"
import {
  ArrowLeft,
  ArrowUpRight,
  ChevronRight,
  FileDown,
  Image as ImageIcon,
  Link as LinkIcon,
  QrCode,
  Share2 as ShareIcon,
} from "lucide-react"
import { CopyToClipboard } from "react-copy-to-clipboard"

import { Button } from "@/app/(components)/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/app/(components)/ui/popover"

export default function NavbarPopover(): JSX.Element {
  const pathname = usePathname()
  const [isPopoverOpen, setIsPopoverOpen] = useState<boolean>(false)
  const [showMainSage, setShowMainSage] = useState<boolean>(true)
  const [showQrCode, setShowQrCode] = useState<boolean>(false)
  const [showProjectPicture, setShowProjectPicture] = useState<boolean>(false)
  const [isCopied, setIsCopied] = useState<boolean>(false)
  const [url, setUrl] = useState<string>("")

  useEffect(() => {
    const host = window?.location?.host
    const protocol = window?.location?.protocol
    const path = pathname.split("/")[3]
    setUrl(protocol + "//" + host + "/" + path)
  }, [pathname])

  useEffect(() => {
    const timerID = setTimeout(() => {
      setIsCopied(false)
    }, 3000)
    return () => clearTimeout(timerID)
  }, [isCopied])

  return (
    <Popover
      onOpenChange={() => {
        setShowMainSage(true)
        setShowQrCode(false)
        setShowProjectPicture(false)
      }}>
      <PopoverTrigger asChild>
        <Button size={"sm"} onClick={() => setIsPopoverOpen(!isPopoverOpen)}>
          <ShareIcon className={"mr-2 "} size={17} />
          Share
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        {showMainSage && (
          <div className={"flex flex-col items-center justify-center"}>
            <span className={"p-4 text-lg font-bold"}>Share your Link</span>
            <div className={"flex w-full flex-col gap-3"}>
              <Button
                onClick={() => {
                  setShowMainSage(false)
                  setShowQrCode(true)
                }}
                variant={"ghost"}
                className={
                  "flex w-full flex-row justify-between gap-2.5 p-4 pb-7 pt-7"
                }>
                <QrCode />
                <span
                  className={"flex flex-1 flex-grow flex-wrap justify-start"}>
                  QR code
                </span>
                <ChevronRight />
              </Button>
              <Button
                onClick={() => {
                  setShowMainSage(false)
                  setShowProjectPicture(true)
                }}
                variant={"ghost"}
                className={
                  "flex w-full flex-row justify-between gap-2.5 p-4 pb-7 pt-7"
                }>
                <ImageIcon />
                <span
                  className={"flex flex-1 flex-grow flex-wrap justify-start"}>
                  Share project picture
                </span>
                <ChevronRight />
              </Button>
              <Link
                href={url}
                className={
                  "flex w-full flex-row items-center justify-between gap-2.5 rounded p-4 hover:bg-muted"
                }>
                <ArrowUpRight />
                <span
                  className={
                    "flex flex-1 flex-grow flex-wrap justify-start text-sm font-medium"
                  }>
                  Open in browser
                </span>
                <ChevronRight />
              </Link>
            </div>
            <CopyToClipboard text={url} onCopy={() => setIsCopied(true)}>
              <Button
                variant={"ghost"}
                className={
                  "m-4 flex w-[90%] max-w-[90%] flex-row justify-between gap-2.5 border p-4 pb-7 pt-7"
                }>
                <LinkIcon size={16} />
                <span
                  className={
                    "flex w-[90%] flex-1 flex-grow flex-wrap justify-start overflow-hidden text-ellipsis whitespace-nowrap text-sm font-medium"
                  }>
                  {url}
                </span>
                <span className={isCopied ? "text-green-300" : ""}>
                  {isCopied ? "Copied" : "Copy"}
                </span>
              </Button>
            </CopyToClipboard>
          </div>
        )}
        {showQrCode && (
          <div className={"flex flex-col items-center justify-center"}>
            <div className={"flex w-full flex-row items-center justify-center"}>
              <div
                onClick={() => {
                  setShowMainSage(true)
                  setShowQrCode(false)
                }}
                className={
                  "cursor-pointer justify-start rounded-full p-1.5 hover:bg-muted"
                }>
                <ArrowLeft size={18} />
              </div>
              <div
                className={
                  "ml-[-18px] flex  flex-grow flex-row justify-center text-center"
                }>
                <span className={"text-lg font-bold"}>QR code</span>
              </div>
            </div>
            <div
              className={
                "mt-6 flex w-full flex-col items-center justify-center gap-2"
              }>
              <div
                className={
                  "flex h-[220px] w-[220px] flex-col items-center justify-center rounded-md bg-white"
                }>
                <Image
                  src={`https://api.qrserver.com/v1/create-qr-code/?size=500x500&data=${url}`}
                  alt={"1"}
                  width={200}
                  height={200}
                  onLoad={() => console.log(1)}
                />
              </div>
              <div
                className={"flex w-full flex-col items-center justify-center"}>
                <Button
                  onClick={() =>
                    saveAs(
                      `https://api.qrserver.com/v1/create-qr-code/?size=500x500&data=${url}`,
                      "qr-code.png"
                    )
                  }
                  variant={"ghost"}
                  className={
                    "mt-4 flex w-full flex-row items-center justify-center p-8 pl-4 pr-4"
                  }>
                  <div className={"flex flex-grow flex-col items-start"}>
                    <span className={"text-md font-bold"}>Download</span>
                    <span className={"text-sm text-muted-foreground"}>
                      High quality image
                    </span>
                  </div>
                  <div className={"flex items-center gap-1.5"}>
                    <span
                      className={"text-md font-semibold text-muted-foreground"}>
                      .PNG
                    </span>
                    <FileDown size={20} />
                  </div>
                </Button>
              </div>
            </div>
          </div>
        )}
        {/*
          https://www.npmjs.com/package/html-to-image
          https://app.haikei.app/
        */}
        {showProjectPicture && <></>}
      </PopoverContent>
    </Popover>
  )
}
