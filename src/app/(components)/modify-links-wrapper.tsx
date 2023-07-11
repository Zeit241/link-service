"use client"

import * as punycode from "punycode"
import * as React from "react"
import { Suspense, useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { Link, Record } from "@prisma/client"
import { Plus, X } from "lucide-react"
import { Controller, useForm } from "react-hook-form"
import { z } from "zod"

import ModifyLinkCard from "@/app/(components)/modify-link-card"
import RecordPage from "@/app/(components)/record"
import { Button } from "@/app/(components)/ui/button"
import { Card } from "@/app/(components)/ui/card"
import { Form, FormField, FormItem } from "@/app/(components)/ui/form"
import { Input } from "@/app/(components)/ui/input"
import { Label } from "@/app/(components)/ui/label"
import CreateLink from "@/app/server/create-link"

export default function ModifyLinksWrapper({
  record,
}: {
  record: Record & { Link: Link[] }
}) {
  const [isAddCardOpen, setIsAddCardOpen] = useState<boolean>(false)
  const [url, setUrl] = useState<string>("")
  const [num, setNum] = useState<number>(0)
  const [isLoading, setIsLoading] = useState<boolean>(true)

  async function onSubmit(value: z.infer<typeof createNewLink>) {
    const res = await CreateLink({
      url: value.url,
      name: value.url,
      record_id: record.id,
      record_url: record.url,
      order: record.Link.length,
    })
    setIsLoading(true)
    setNum(num + 1)
  }

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
      <div
        className={
          "flex w-full flex-row content-center items-center justify-between p-8 pb-0"
        }
      >
        <div className={"w-[650px]  border"}>
          <div
            className={
              "flex flex-col items-center justify-center gap-5 pb-4 pt-4"
            }
          >
            {!isAddCardOpen && (
              <Button
                variant="secondary"
                className=" w-4/5 p-4"
                onClick={() => setIsAddCardOpen(true)}
              >
                <Plus /> Add new link
              </Button>
            )}
            {isAddCardOpen && (
              <Card className={"flex w-4/5 flex-col gap-4 p-4"}>
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-8"
                  >
                    <div className="">
                      <FormField
                        control={form.control}
                        name="url"
                        render={({ field }) => (
                          <FormItem>
                            <div
                              className={
                                "flex w-full flex-row items-center justify-between"
                              }
                            >
                              <Label htmlFor={"link"}>Enter URL</Label>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => {
                                  setIsAddCardOpen(false)
                                }}
                              >
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
                                      placeholder="Username"
                                      type="text"
                                      autoCapitalize="none"
                                      autoComplete="none"
                                      autoCorrect="off"
                                      spellCheck={"false"}
                                      onChange={onChange}
                                    />
                                  </>
                                )}
                              />
                              <Button
                                disabled={!!form.formState.errors.url?.message}
                                type={"submit"}
                              >
                                Add
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

            {record.Link.map((link: Link, index: number, array: Link[]) => {
              return (
                <div className={"w-4/5 border p-5"} key={index}>
                  <ModifyLinkCard
                    link={link}
                    index={index}
                    max={array.length}
                  />
                </div>
              )
            })}
          </div>
        </div>
        <>
          <div
            className={
              "h-[620px] w-[340px] overflow-hidden rounded-[50px] border-[15px]"
            }
          >
            {/*{isLoading && (*/}
            {/*  <Skeleton*/}
            {/*    className={"w-full h-full flex items-center justify-center"}*/}
            {/*  >*/}
            {/*    <Loader2 size={42} className={"animate-spin"} />*/}
            {/*  </Skeleton>*/}
            {/*)}*/}

            {/*@ts-ignore*/}
            <div className={"h-full w-full overflow-x-hidden"}>
              <Suspense fallback={<div>Loading...</div>}>
                <RecordPage data={record} />
              </Suspense>
            </div>
          </div>
        </>
      </div>
    </>
  )
}
