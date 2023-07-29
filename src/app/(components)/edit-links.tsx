"use client"

import * as React from "react"
import { useEffect, useRef, useState } from "react"
import { usePathname } from "next/navigation"
import autoAnimate from "@formkit/auto-animate"
import { useAutoAnimate } from "@formkit/auto-animate/react"
import { zodResolver } from "@hookform/resolvers/zod"
import { Link } from "@prisma/client"
import {
  AlertTriangle,
  Loader2,
  PanelBottomClose,
  PanelBottomOpen,
  Plus,
  X,
} from "lucide-react"
import { Controller, useForm } from "react-hook-form"
import { z } from "zod"

import { useDataStore } from "@/lib/store/store"
import { getLinkType, urlNormalize } from "@/lib/utils"
import ModifyLinkCard from "@/app/(components)/modify-link-card"
import RecordPage from "@/app/(components)/record"
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/app/(components)/ui/alert"
import { Button } from "@/app/(components)/ui/button"
import { Card } from "@/app/(components)/ui/card"
import { Form, FormField, FormItem } from "@/app/(components)/ui/form"
import { Input } from "@/app/(components)/ui/input"
import { Label } from "@/app/(components)/ui/label"
import { CreateLink } from "@/app/actions/link"
import { getUrlTitle } from "@/app/actions/utils"

export default function EditLinks(): JSX.Element {
  const { links, record, add_link } = useDataStore()
  const pathname = usePathname()
  const [isAddCardOpen, setIsAddCardOpen] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isMobilePreviewOpen, setIsMobilePreviewOpen] = useState<boolean>(false)
  const [isAlertOpen, setIsAlertOpen] = useState<boolean>(!record.enabled)
  const [list] = useAutoAnimate()
  const [card] = useAutoAnimate()
  const mobilePreview = useRef<HTMLDivElement>(null)
  const alert = useRef<HTMLDivElement>(null)

  useEffect(() => {
    alert.current && autoAnimate(alert.current)
  }, [alert])

  useEffect(() => {
    mobilePreview.current && autoAnimate(mobilePreview.current, {})
  }, [mobilePreview])

  const createNewLink = z.object({
    url: z.string().refine(
      (value) => {
        const type = getLinkType({ url: value.trim().toLowerCase() })
        if (!!type) {
          form.setValue("type", type)
        }
        return !!type
      },
      { message: "Invalid URL" }
    ),
    type: z.enum(["URL", "EMAIL", "HEADER", "DOCUMENT", "VIDEO", "CONTACT"]),
  })

  async function onSubmit(value: z.infer<typeof createNewLink>) {
    setIsLoading(true)

    let name = value.url
    let url = value.url

    if (value.type === "URL") {
      url = urlNormalize({ url })
      name = await getUrlTitle({ url })
    }

    if (value.type === "EMAIL") {
      url = `mailto:${url}`
    }

    const res = await CreateLink({
      url: url,
      name: name,
      recordId: record.id,
      order: links.length,
      type: value.type,
    })

    form.reset()
    res.link ? add_link(res.link) : null
    setIsLoading(false)
    setIsAddCardOpen(false)
  }

  //Add warn before close/refresh page
  useEffect(() => {
    const handleBeforeUnload = () => {
      if (isLoading) {
        window?.event?.preventDefault()
      }
    }
    window.addEventListener("beforeunload", handleBeforeUnload)
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload)
    }
  }, [isLoading, pathname])

  const form = useForm<z.infer<typeof createNewLink>>({
    resolver: zodResolver(createNewLink),
    mode: "onSubmit",
    reValidateMode: "onChange",
    defaultValues: {
      url: "",
      type: "URL",
    },
  })

  return (
    <>
      <div ref={alert}>
        {isAlertOpen && (
          <Alert
            className={"me-auto ms-auto w-5/6 sm:w-4/5"}
            variant={"destructive"}>
            <AlertTriangle className="h-8 w-8 pr-2" />
            <AlertTitle
              className={
                "ml-2 flex cursor-pointer flex-row items-center justify-between"
              }>
              <span>Attention!</span>
              <X size={18} onClick={() => setIsAlertOpen(false)} />
            </AlertTitle>
            <AlertDescription className={"ml-2"}>
              <p>
                Your project is disabled and other users don&apos;t see it. You
                can enable it in the dashboard.
              </p>
            </AlertDescription>
          </Alert>
        )}
      </div>

      <div
        className={
          "relative flex w-full flex-row items-start justify-center p-8 pb-0 focus-visible:outline-none min-[100px]:p-2"
        }>
        <div
          className={
            "flex w-full flex-1 flex-wrap items-center justify-center"
          }>
          <div
            className={"flex w-full flex-col items-center gap-5 pb-4 pt-4"}
            ref={card}>
            {!isAddCardOpen && (
              <Button
                variant="secondary"
                className="max-w-xl p-4 min-[100px]:w-[98%]"
                onClick={() => {
                  setIsAddCardOpen(true)
                }}>
                <Plus /> Add new link
              </Button>
            )}
            {isAddCardOpen && (
              <Card
                className={
                  "flex max-w-xl flex-col gap-4 p-4 min-[320px]:w-[95%]"
                }>
                <div
                  className={
                    "flex w-full flex-row items-center justify-between"
                  }>
                  <Label htmlFor={"url"}>Enter URL</Label>
                  <Button
                    disabled={isLoading}
                    variant="ghost"
                    size="icon"
                    autoFocus={false}
                    onClick={(e) => {
                      e.preventDefault()
                      setIsAddCardOpen(false)
                    }}>
                    <X size={18} />
                  </Button>
                </div>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)}>
                    <div className="">
                      <FormField
                        control={form.control}
                        name="url"
                        render={({ field }) => (
                          <FormItem>
                            <div className={"flex flex-row items-center gap-3"}>
                              <Controller
                                name="url"
                                control={form.control}
                                render={({ field: { onChange } }) => (
                                  <>
                                    <Input
                                      {...field}
                                      id="url"
                                      placeholder="URL"
                                      type="text"
                                      autoCapitalize="none"
                                      autoComplete="none"
                                      autoCorrect="off"
                                      spellCheck={"false"}
                                      onChange={onChange}
                                      autoFocus={true}
                                      className={`${isLoading ? "hidden" : ""}`}
                                    />
                                  </>
                                )}
                              />
                              <Button
                                disabled={
                                  !form.formState.isValid ||
                                  !!form.formState.errors.url?.message ||
                                  isLoading
                                }
                                className={isLoading ? "w-full" : ""}
                                type={"submit"}>
                                {isLoading ? (
                                  <Loader2 className={"animate-spin"} />
                                ) : (
                                  "Add"
                                )}
                              </Button>
                            </div>
                          </FormItem>
                        )}
                      />
                      {/*TODO rework prisma scheme to support multiple types*/}
                      {/*<FormField*/}
                      {/*  control={form.control}*/}
                      {/*  name="type"*/}
                      {/*  render={({ field }) => (*/}
                      {/*    <FormItem className={""}>*/}
                      {/*      <div*/}
                      {/*        onClick={() => form.setValue("type", "URL")}*/}
                      {/*        className={*/}
                      {/*          "flex flex-col items-center justify-center p-4 "*/}
                      {/*        }>*/}
                      {/*        <div*/}
                      {/*          id={"URL"}*/}
                      {/*          className={`mb-2 flex h-20 w-20  cursor-pointer flex-row items-center justify-center gap-3 rounded-xl bg-secondary */}
                      {/*          ${*/}
                      {/*            form.getValues("type") === "URL" &&*/}
                      {/*            "scale-95 outline outline-1 outline-offset-4 outline-white"*/}
                      {/*          }`}>*/}
                      {/*          <LinkIcon size={32} />*/}
                      {/*        </div>*/}
                      {/*        <Label*/}
                      {/*          htmlFor={"URL"}*/}
                      {/*          className={"cursor-pointer"}>*/}
                      {/*          URL*/}
                      {/*        </Label>*/}
                      {/*      </div>*/}
                      {/*      <div*/}
                      {/*        onClick={() => form.setValue("type", "HEADER")}*/}
                      {/*        className={*/}
                      {/*          "flex flex-col items-center justify-center p-4 "*/}
                      {/*        }>*/}
                      {/*        <div*/}
                      {/*          id={"HEADER"}*/}
                      {/*          className={`mb-2 flex h-20 w-20  cursor-pointer flex-row items-center justify-center gap-3 rounded-xl bg-secondary */}
                      {/*          ${*/}
                      {/*            form.getValues("type") === "HEADER" &&*/}
                      {/*            "scale-95 outline outline-1 outline-offset-4 outline-white"*/}
                      {/*          }`}>*/}
                      {/*          <Indent size={32} />*/}
                      {/*        </div>*/}
                      {/*        <Label*/}
                      {/*          htmlFor={"HEADER"}*/}
                      {/*          className={"cursor-pointer"}>*/}
                      {/*          HEADER*/}
                      {/*        </Label>*/}
                      {/*      </div>*/}
                      {/*    </FormItem>*/}
                      {/*  )}*/}
                      {/*/>*/}
                    </div>
                  </form>
                </Form>
              </Card>
            )}
            <div
              ref={list}
              className={
                " flex  h-full w-full flex-col items-center justify-center gap-4"
              }>
              {links.map((link: Link, index: number, array: Link[]) => (
                <ModifyLinkCard
                  key={link.id}
                  link={link}
                  index={index}
                  max={array.length - 1}
                />
              ))}
            </div>
          </div>
        </div>
        <div
          className={
            "sticky top-[15%] ml-4 mr-4 hidden h-[620px] w-[320px] min-w-[320px] overflow-hidden rounded-[50px] border-[15px] min-[890px]:block lg:m-16"
          }>
          <div className={"h-full w-full overflow-x-hidden "}>
            <RecordPage
              data={record}
              links={links.filter((l) => l.enabled)}
              isIframe={true}
            />
          </div>
        </div>
        <div ref={mobilePreview} className={" min-[890px]:hidden"}>
          {isMobilePreviewOpen && (
            <>
              <div
                className={
                  "fixed right-[0%] top-[0%] h-screen w-screen bg-background opacity-60"
                }></div>
              <div
                className={
                  "fixed right-[0%] top-[5%] h-[95%] w-full overflow-y-scroll rounded-t-[30px] border-t-[15px] bg-background"
                }>
                <RecordPage
                  isIframe={true}
                  data={record}
                  links={links.filter((l) => l.enabled)}
                />
              </div>
            </>
          )}
        </div>
        <div
          className={
            "fixed bottom-[5%] right-[50%] translate-x-[+50%] opacity-80 min-[890px]:hidden"
          }>
          <Button
            className={"flex w-40 flex-row gap-3 p-8 pb-6 pt-6"}
            onClick={() => setIsMobilePreviewOpen(!isMobilePreviewOpen)}>
            Preview
            {isMobilePreviewOpen ? <PanelBottomClose /> : <PanelBottomOpen />}
          </Button>
        </div>
      </div>
    </>
  )
}
