"use client"

import * as punycode from "punycode"
import * as React from "react"
import { useEffect, useRef, useState } from "react"
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

import { useStore } from "@/lib/store/store"
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

const createNewLink = z.object({
  url: z.string().refine(
    (value) => {
      const pattern = new RegExp(
        "^(https?:\\/\\/)?" + // protocol
          "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[-*a-z\\d]{2,}|" + // domain name
          "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR IP (v4) address
          "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
          "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
          "(\\#[-a-z\\d_]*)?$", // fragment locator
        "i"
      )
      return pattern.test(punycode.toASCII(value))
    },
    { message: "Invalid URL" }
  ),
})
export default function EditLinks(): JSX.Element {
  const { links, record, add_link } = useStore()
  const [isAddCardOpen, setIsAddCardOpen] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isMobilePreviewOpen, setIsMobilePreviewOpen] = useState<boolean>(false)
  const [isAlertOpen, setIsAlertOpen] = useState<boolean>(!record.enabled)
  const [list] = useAutoAnimate()
  const [card] = useAutoAnimate()
  const mobilePreview = useRef<HTMLDivElement>(null)
  const alert = useRef(null)

  useEffect(() => {
    alert.current && autoAnimate(alert.current)
  }, [alert])

  useEffect(() => {
    mobilePreview.current && autoAnimate(mobilePreview.current, {})
  }, [mobilePreview])

  const getSiteTitle = async (url: string) => {
    console.log(url)
    let title
    fetch(url)
      .then((response) => response.text())
      .then((str) => {
        title = str.split("<title>")[1].split("</title>")[0]
        console.log(title)
      })
    return title
  }

  async function onSubmit(value: z.infer<typeof createNewLink>) {
    setIsLoading(true)
    const res = await CreateLink({
      url: value.url,
      name: value.url,
      recordId: record.id,
      order: links.length,
    })
    await getSiteTitle(value.url)
    form.reset()
    res.link ? add_link(res.link) : null
    setIsLoading(false)
    setIsAddCardOpen(false)
  }

  const form = useForm<z.infer<typeof createNewLink>>({
    resolver: zodResolver(createNewLink),
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: {
      url: "",
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
          "relative flex w-full flex-row items-start justify-center p-8 pb-0 min-[100px]:p-2"
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
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-8">
                    <div className="">
                      <FormField
                        control={form.control}
                        name="url"
                        render={({ field }) => (
                          <FormItem>
                            <div
                              className={
                                "flex w-full flex-row items-center justify-between"
                              }>
                              <Label htmlFor={"url"}>Enter URL</Label>
                              <Button
                                disabled={isLoading}
                                variant="ghost"
                                size="icon"
                                onClick={(e) => {
                                  e.preventDefault()
                                  setIsAddCardOpen(false)
                                }}>
                                <X size={18} />
                              </Button>
                            </div>
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
                                      className={`${isLoading ? "hidden" : ""}`}
                                    />
                                  </>
                                )}
                              />
                              <Button
                                disabled={
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
            "sticky top-[28%] ml-4 mr-4 hidden h-[620px] w-[320px] min-w-[320px] overflow-hidden rounded-[50px] border-[15px] min-[890px]:block lg:m-16"
          }>
          <div className={"h-full w-full overflow-x-hidden "}>
            <RecordPage data={record} links={links.filter((l) => l.enabled)} />
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
