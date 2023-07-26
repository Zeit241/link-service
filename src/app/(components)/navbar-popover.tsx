"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { saveAs } from "file-saver"
import { toPng } from "html-to-image"
import {
  ArrowLeft,
  ArrowUpRight,
  ChevronRight,
  FileDown,
  Image as ImageIcon,
  Link as LinkIcon,
  Loader2,
  QrCode,
  RefreshCcw,
  Share2 as ShareIcon,
} from "lucide-react"
import { CopyToClipboard } from "react-copy-to-clipboard"

import NavbarPopoverCarousel from "@/app/(components)/navbar-popover-carousel"
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
  const [prettyUrl, setPrettyUrl] = useState<string>("")
  const [imageLoading, setImageLoading] = useState<boolean>(true)
  const QR = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const host = window?.location?.host
    const protocol = window?.location?.protocol
    const path = pathname.split("/")[3]
    setPrettyUrl(host + "/" + path)
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
        <Button onClick={() => setIsPopoverOpen(!isPopoverOpen)}>
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
                target="_blank"
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
                <LinkIcon size={18} />
                <span
                  className={
                    "flex w-[85%] flex-grow flex-wrap justify-start overflow-hidden text-ellipsis whitespace-nowrap"
                  }>
                  {prettyUrl}
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
                  " flex  flex-grow flex-row justify-center text-center"
                }>
                <span className={"text-lg font-bold"}>QR code</span>
              </div>
            </div>

            <div
              className={
                "mt-2.5 flex w-full flex-col items-center justify-center gap-2"
              }>
              <p className={"mb-2 text-center text-sm text-muted-foreground"}>
                Here is your unique LinkSync QR code that will direct people to
                your project when scanned.
              </p>
              <div
                ref={QR}
                className={
                  "flex h-auto w-[220px] flex-col items-center justify-center rounded-md bg-white"
                }>
                {imageLoading && <Loader2 className={"animate-spin"} />}

                <Image
                  className={"m-4"}
                  src={`https://api.qrserver.com/v1/create-qr-code/?size=500x500&data=${url}`}
                  alt={"1"}
                  width={150}
                  height={150}
                  onLoad={() => setImageLoading(false)}
                />
                <span
                  className={
                    "text-md flex flex-row items-center gap-1.5 overflow-x-hidden break-all p-2 pt-0 text-center font-semibold text-black"
                  }>
                  <RefreshCcw size={20} />
                  {prettyUrl}
                </span>
              </div>
              <div
                className={"flex w-full flex-col items-center justify-center"}>
                <Button
                  onClick={() => {
                    toPng(QR.current!, { cacheBust: true }).then((data) => {
                      saveAs(data, "qr-code.png")
                    })
                  }}
                  variant={"ghost"}
                  className={
                    "mt-2 flex w-full flex-row items-center justify-center p-8 pl-4 pr-4"
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
        {showProjectPicture && (
          <>
            <div
              className={
                "mb-3 flex w-full flex-row items-center justify-center"
              }>
              <div
                onClick={() => {
                  setShowMainSage(true)
                  setShowProjectPicture(false)
                }}
                className={
                  "cursor-pointer justify-start rounded-full p-2 hover:bg-muted"
                }>
                <ArrowLeft size={18} />
              </div>
              <div
                className={
                  " flex  flex-grow flex-row justify-center text-center"
                }>
                <span className={"text-lg font-bold"}>
                  Share project picture
                </span>
              </div>
            </div>
            <NavbarPopoverCarousel
              name={pathname.split("/")[3]}
              prettyUrl={prettyUrl}
            />
          </>
        )}
      </PopoverContent>
    </Popover>
  )
}
