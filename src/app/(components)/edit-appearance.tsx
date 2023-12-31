"use client"

import * as React from "react"
import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import {
  Contact,
  Contrast,
  Hand,
  Loader2,
  StretchHorizontal,
} from "lucide-react"
import { Controller, useForm } from "react-hook-form"
import { z } from "zod"

import { ModifyProjectInfo } from "@/lib/schema/project"
import { useDataStore } from "@/lib/store/store"
import PictureLoader from "@/app/(components)/picture-loader"
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/app/(components)/ui/avatar"
import { Button } from "@/app/(components)/ui/button"
import { Card } from "@/app/(components)/ui/card"
import {
  Form,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/app/(components)/ui/form"
import { Input } from "@/app/(components)/ui/input"
import { Label } from "@/app/(components)/ui/label"
import { Separator } from "@/app/(components)/ui/separator"
import { Switch } from "@/app/(components)/ui/switch"
import { Textarea } from "@/app/(components)/ui/textarea"
import { UpdateRecord } from "@/app/actions/record"

export function Icon({
  icon,
  username,
}: {
  icon: string
  username: string
}): JSX.Element {
  if (!!icon) {
    return (
      <Avatar
        className={"h-24 w-24 min-w-[6rem] max-w-[6rem] overflow-x-hidden"}>
        <AvatarImage src={icon} alt={username} />
        <AvatarFallback className={"text-4xl font-bold"}>
          {username?.charAt(0).toUpperCase()}
        </AvatarFallback>
      </Avatar>
    )
  }
  return (
    <div
      className={
        "flex h-24 w-24 min-w-[6rem] select-none items-center justify-center rounded-full bg-secondary"
      }>
      <span className={"text-4xl font-bold"}>
        {username?.charAt(0).toUpperCase()}
      </span>
    </div>
  )
}

export default function EditAppearance(): JSX.Element {
  const { record, modify_record } = useDataStore()

  const [isAgeRestrictionLoading, setIsAgeRestrictionLoading] =
    useState<boolean>(false)

  const form = useForm<z.infer<typeof ModifyProjectInfo>>({
    resolver: zodResolver(ModifyProjectInfo),
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: {
      name: record.name === record.url ? "@" + record.name : record.name,
      description: record.description || "",
    },
  })

  const onInfoSubmit = async (value: z.infer<typeof ModifyProjectInfo>) => {
    const { name, description } = value
    await UpdateRecord({
      id: record.id,
      name,
      description,
    }).then(() => modify_record({ name, description }))
  }

  return (
    <>
      <div className={"flex h-full w-full flex-col items-center gap-6"}>
        <div className={"flex w-full flex-col items-center"}>
          <div
            className={
              "flex w-full flex-row items-center justify-start gap-3 sm:w-3/5"
            }>
            <Contact />
            <h1 className={"py-2 text-xl font-bold"} id={"info"}>
              Project
            </h1>
          </div>

          <Card className={"w-full p-8 sm:w-3/5"}>
            <PictureLoader />
            <Separator className={"my-8"} />
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onInfoSubmit)}
                className=" flex w-full flex-col justify-end space-y-2">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Project title</FormLabel>
                      <Input
                        {...field}
                        placeholder={"Project title"}
                        disabled={form.formState.isSubmitting}
                      />
                      <FormDescription></FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Project description</FormLabel>
                      <Controller
                        name="description"
                        control={form.control}
                        render={({
                          field: { onChange },
                          fieldState: { error },
                        }) => (
                          <>
                            <Textarea
                              {...field}
                              disabled={form.formState.isSubmitting}
                              placeholder={"Your BIO"}
                              maxLength={80}
                              onChange={onChange}
                            />
                            <FormDescription
                              className={`text-right ${
                                form.getValues("description").length === 80
                                  ? "text-red-700"
                                  : "text-green-300"
                              }`}>
                              {form.getValues("description").length} / 80
                            </FormDescription>
                          </>
                        )}
                      />
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className={"flex w-full justify-end"}>
                  <Button
                    type="submit"
                    className={"w-32 "}
                    disabled={form.formState.isSubmitting}>
                    {form.formState.isSubmitting ? (
                      <Loader2 className={"animate-spin"} />
                    ) : (
                      "Save"
                    )}
                  </Button>
                </div>
              </form>
            </Form>
          </Card>
        </div>
        <div className={"flex w-full flex-col items-center"}>
          <div
            className={
              "flex w-full flex-row items-center justify-start gap-3 sm:w-3/5"
            }>
            <Hand />
            <h1 className={"py-2 text-xl font-bold"} id={"info"}>
              Restrictions
            </h1>
          </div>
          <Card className={"flex w-full flex-col gap-4 p-8 sm:w-3/5"}>
            <Card
              className={
                "flex flex-row items-center justify-between gap-2 p-4"
              }>
              <div className={"flex w-full flex-col"}>
                <Label
                  className={"text-lg font-semibold"}
                  htmlFor={"age-restriction"}>
                  Adult content
                </Label>
                <span className={"text-md text-muted-foreground"}>
                  Users who have not reached a certain age (usually 18+ or 21+)
                  may be restricted access to links with adult content.
                </span>
              </div>
              <Switch
                disabled={isAgeRestrictionLoading}
                id={"age-restriction"}
                defaultChecked={record.adult}
                onCheckedChange={async () => {
                  setIsAgeRestrictionLoading(true)
                  await UpdateRecord({
                    id: record.id,
                    adult: !record.adult,
                  }).then(() => modify_record({ adult: !record.adult }))
                  setIsAgeRestrictionLoading(false)
                }}
              />
            </Card>
            <Card
              className={
                "flex flex-row items-center justify-between gap-2 p-4"
              }>
              <div className={"flex w-full flex-col"}>
                <Label
                  className={"text-lg font-semibold"}
                  //htmlFor={"age-restriction"}
                >
                  Geographical restrictions
                </Label>
                <span className={"text-md text-muted-foreground"}>
                  The ability to access links may be limited depending on the
                  geographical location of the user.
                </span>
              </div>
              <Card className={"p-3"}>Soon...</Card>
            </Card>
          </Card>
        </div>
        <div className={"flex w-full flex-col items-center"}>
          <div
            className={
              "flex w-full flex-row items-center justify-start gap-3 sm:w-3/5"
            }>
            <Contrast />
            <h1 className={"py-2 text-xl font-bold"} id={"info"}>
              Backgrounds
            </h1>
          </div>
          <Card className={"flex w-full flex-col gap-4 p-8 sm:w-3/5"}>
            Chose your background
          </Card>
        </div>
        <div className={"mb-8 flex w-full flex-col items-center"}>
          <div
            className={
              "flex w-full flex-row items-center justify-start gap-3 sm:w-3/5"
            }>
            <StretchHorizontal />
            <h1 className={"py-2 text-xl font-bold"} id={"info"}>
              Buttons
            </h1>
          </div>
          <Card className={"flex w-full flex-col gap-4 p-8 sm:w-3/5"}>
            Chose your buttons style
          </Card>
        </div>
      </div>
    </>
  )
}
