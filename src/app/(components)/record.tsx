"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { Link as LinkType, Record as RecordType } from "@prisma/client"
import {
  ChevronRight,
  ExternalLink,
  Facebook,
  Flag,
  Link as LinkIcon,
  Mail,
  MoreHorizontal,
  RefreshCcw,
  Twitter,
} from "lucide-react"
import { CopyToClipboard } from "react-copy-to-clipboard"

import LinkItem from "@/app/(components)/link"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/app/(components)/ui/alert-dialog"
import { Button } from "@/app/(components)/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/app/(components)/ui/dialog"

type RecordPageProps = {
  data: RecordType & { Link: LinkType[] }
  links: LinkType[]
  isIframe: boolean
}

export default function RecordPage({
  data,
  links = data.Link,
  isIframe = false,
}: RecordPageProps) {
  const router = useRouter()
  const pathname = usePathname()

  const [copy, setCopy] = useState<boolean>(false)
  const [fullUrl, setFullUrl] = useState<string>("")
  const [isInIframe, setIsInIframe] = useState<boolean>(isIframe)
  const [isAdult, setIsAdult] = useState<boolean>(false)

  useEffect(() => {
    setIsAdult(data.adult)
  }, [data.adult])
  useEffect(() => {
    setFullUrl(window?.location?.href)
  }, [pathname])
  const shareOnTwitter = async (): Promise<void> => {
    const url = `https://twitter.com/intent/tweet?text=Check%20out%20this%20link!%20-%20${fullUrl}`
    await router.push(url)
  }

  const shareViaFacebook = async (): Promise<void> => {
    const url = `https://www.facebook.com/sharer.php?u=${fullUrl}`
    await router.push(url)
  }

  const shareViaEmail = async (): Promise<void> => {
    const url = `mailto:?subject=%20Check%20out%20this%20link%20&body=%20Check%20out%20this%20link%20-%20${fullUrl}`
    await router.push(url)
  }

  const shareViaOther = async (): Promise<void> => {
    await window?.navigator?.share({
      title: "Check out this link",
      url: fullUrl,
    })
  }

  useEffect(() => {
    const timerID = setTimeout(() => {
      setCopy(false)
    }, 3000)
    return () => clearTimeout(timerID)
  }, [copy])

  return (
    <>
      <div
        className={`flex h-full min-h-full w-full flex-col items-center bg-background`}
        //style={{ backgroundColor: data.preferences.backgroundColor }}
      >
        {!isIframe && (
          <div
            className={`flex  h-20 w-[78%] min-w-[260px] max-w-[620px] flex-row justify-end`}>
            <div className={"flex flex-row  items-center"}>
              <Dialog>
                <DialogTrigger asChild>
                  <Button
                    disabled={isIframe}
                    className={"rounded-full bg-muted-foreground p-2"}
                    size={"icon"}
                    asChild>
                    <MoreHorizontal size={18} />
                  </Button>
                </DialogTrigger>
                <DialogContent className={`w-full pl-2 pr-2`}>
                  <DialogHeader
                    className={"flex max-w-full items-center gap-2 p-0 "}>
                    <DialogTitle className={"mb-8"}>
                      Share this link
                    </DialogTitle>
                    <Button
                      onClick={shareOnTwitter}
                      variant={"ghost"}
                      className={
                        "flex w-full flex-row justify-between gap-2.5 p-4 pb-7 pt-7"
                      }>
                      <Twitter />
                      <span
                        className={
                          "flex flex-1 flex-grow flex-wrap justify-start"
                        }>
                        Share on Twitter
                      </span>
                      <ChevronRight />
                    </Button>
                    <Button
                      onClick={shareViaFacebook}
                      variant={"ghost"}
                      className={
                        "flex w-full flex-row justify-between gap-2.5 p-4 pb-7 pt-7"
                      }>
                      <Facebook />
                      <span
                        className={
                          "flex flex-1 flex-grow flex-wrap justify-start"
                        }>
                        Share via Facebook
                      </span>
                      <ChevronRight />
                    </Button>
                    <Button
                      onClick={shareViaEmail}
                      variant={"ghost"}
                      className={
                        "flex w-full flex-row justify-between gap-2.5 p-4 pb-7 pt-7"
                      }>
                      <Mail />
                      <span
                        className={
                          "flex flex-1 flex-grow flex-wrap justify-start"
                        }>
                        Share via Email
                      </span>
                      <ChevronRight />
                    </Button>
                    <Button
                      onClick={shareViaOther}
                      variant={"ghost"}
                      className={
                        "flex w-full flex-row justify-between gap-2.5 p-4 pb-7 pt-7"
                      }>
                      <ExternalLink />
                      <span
                        className={
                          "flex flex-1 flex-grow flex-wrap justify-start"
                        }>
                        More options
                      </span>
                      <ChevronRight />
                    </Button>
                    <CopyToClipboard
                      text={fullUrl}
                      onCopy={() => setCopy(true)}>
                      <Button
                        variant={"ghost"}
                        className={
                          "m-4 flex w-[90%] max-w-[90%] flex-row justify-between gap-2.5 border p-4 pb-7 pt-7"
                        }>
                        <LinkIcon />
                        <span
                          className={
                            "flex flex-1 flex-grow flex-wrap justify-start overflow-hidden text-ellipsis whitespace-nowrap"
                          }>
                          {fullUrl}
                        </span>
                        <span className={copy ? "text-green-300" : ""}>
                          {copy ? "Copied" : "Copy"}
                        </span>
                      </Button>
                    </CopyToClipboard>
                    <Button
                      variant={"ghost"}
                      className={
                        "mt-5 flex h-16 w-full flex-row items-center  justify-between gap-2.5 border-b border-t"
                      }
                      asChild>
                      <Link href={`/report?id=${data.id}`} className={"flex"}>
                        <Flag />
                        <span
                          className={
                            "flex flex-1 flex-grow flex-wrap justify-start"
                          }>
                          Report this link
                        </span>
                        <ChevronRight />
                      </Link>
                    </Button>
                    <>
                      <h1 className={"text-xl font-bold"}>
                        Create your own link
                      </h1>
                      <p className={"m-1"}>Share this link with your friends</p>
                      <div className={"flex w-[65%] flex-col gap-2"}>
                        <Button asChild>
                          <Link href={"/login"}>Sign up for free</Link>
                        </Button>
                        <Button variant={"secondary"}>
                          <Link href={"/"}>What&apos;s this</Link>
                        </Button>
                      </div>
                    </>
                  </DialogHeader>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        )}
        <nav className={"flex flex-col items-center p-8"}>
          <div
            className={
              "flex h-20 w-20 select-none items-center justify-center rounded-full bg-muted-foreground text-center text-4xl text-white"
            }>
            {!!data.profilePicture ? (
              <Image
                className={"rounded-full"}
                src={data.profilePicture}
                alt={data.name}
                width={80}
                height={80}
              />
            ) : data.name.charAt(0) === "@" ? (
              data?.name?.charAt(1)?.toUpperCase()
            ) : (
              data?.name?.charAt(0)?.toUpperCase()
            )}
          </div>
          <span className={"mb-1 mt-6 font-bold uppercase"}>{data?.name}</span>
          <p>{data?.description}</p>
        </nav>
        <section
          className={
            "m-0 flex h-auto w-full flex-1 flex-col content-center items-center justify-start gap-4"
          }>
          {links.map((link: LinkType) => (
            <LinkItem key={link.id} link={link} />
          ))}
        </section>
        <div className={"mb-2 mt-12 flex items-center justify-center"}>
          <h1
            className={"flex flex-row items-center justify-center gap-3 p-4 "}>
            <RefreshCcw className={"animate-spin"} strokeWidth={3} />
            <span className={"text-lg font-bold"}>LinkSync</span>
          </h1>
        </div>
      </div>

      {!isInIframe && isAdult && (
        <AlertDialog defaultOpen={isAdult}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Warning: 18+ Content</AlertDialogTitle>
              <AlertDialogDescription>
                This content contains explicit material intended for audiences
                aged 18 years and above only. Proceed only if you are of legal
                age in your jurisdiction and comfortable with adult themes.
                Viewer discretion is advised.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel onClick={() => window.close()}>
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction>Continue</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </>
  )
}
