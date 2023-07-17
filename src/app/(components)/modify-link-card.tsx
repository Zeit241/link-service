"use client"

import { useEffect, useRef, useState } from "react"
import { Link } from "@prisma/client"
import { ChevronDown, ChevronUp, Pencil } from "lucide-react"

import { Card } from "@/app/(components)/ui/card"
import { Input } from "@/app/(components)/ui/input"
import { Switch } from "@/app/(components)/ui/switch"
import { UpdateLink } from "@/app/server/link"

type ModifyLinkCardProps = {
  link: Link
  index: number
  max: number
}

export default function ModifyLinkCard({
  link,
  index,
  max,
}: ModifyLinkCardProps) {
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [isEnabled, setIsEnabled] = useState<boolean>(link.enabled)
  const [isNameEditing, setIsNameEditing] = useState<boolean>(false)
  const [isUrlEditing, setIsUrlEditing] = useState<boolean>(false)
  const [nameValue, setNameValue] = useState<string>(link.name)
  const [urlValue, setUrlValue] = useState<string>(link.url)
  const name = useRef<HTMLInputElement | null>(null)
  const url = useRef<HTMLInputElement | null>(null)

  //Set cursor position at the end of the value
  useEffect(() => {
    if (isNameEditing) {
      name?.current?.focus()
      name?.current?.setSelectionRange(
        name?.current?.value.length,
        name?.current?.value.length
      )
    }
  }, [isNameEditing])
  useEffect(() => {
    if (isUrlEditing) {
      url?.current?.focus()
      url?.current?.setSelectionRange(
        url.current?.value.length,
        url.current?.value.length
      )
    }
  }, [isUrlEditing])

  const updateName = async (): Promise<void> => {
    setIsNameEditing(false)
    setIsLoading(true)
    await UpdateLink({ id: link.id, name: nameValue })
    setIsLoading(false)
  }

  const updateUrl = async (): Promise<void> => {
    setIsUrlEditing(false)
    setIsLoading(true)
    await UpdateLink({ id: link.id, url: urlValue })
    setIsLoading(false)
  }

  const decrease_link_index = async (): Promise<void> => {
    //change_links_order!(link.id, "up")
    setIsLoading(true)
    //await UpdateLink(link.id, { order: index - 1 })
    setIsLoading(false)
  }
  const increase_link_index = async (): Promise<void> => {
    //change_links_order!(link.id, "down")
    setIsLoading(true)
    //await UpdateLink(link.id, { order: index + 1 })
    setIsLoading(false)
  }
  return (
    <>
      <Card className={"flex w-full flex-row border p-3"}>
        <div className={"mr-4 flex flex-col gap-0.5"}>
          <ChevronUp
            className={` ${
              index > 0
                ? "cursor-pointer hover:scale-125"
                : "cursor-not-allowed "
            }`}
            onClick={index > 0 ? decrease_link_index : () => {}}
          />
          <span>#{index}</span>
          <ChevronDown
            className={"cursor-pointer hover:scale-125"}
            onClick={index < max ? increase_link_index : () => {}}
          />
        </div>
        <div
          className={
            "flex w-full  flex-row items-center justify-between gap-6 pl-1 pr-3"
          }>
          <div className={"flex w-full flex-col overflow-x-hidden"}>
            <div className={"flex flex-row items-center justify-between "}>
              <div className={"flex flex-row items-center gap-2 "}>
                {!isNameEditing && (
                  <>
                    <span className={"text-ellipsis text-lg font-semibold"}>
                      {nameValue}
                    </span>
                    <Pencil
                      size={14}
                      className={"cursor-pointer hover:scale-110"}
                      onClick={() => {
                        setIsNameEditing(true)
                      }}
                    />
                  </>
                )}
              </div>
              <Input
                className={`input_without_border h-fit rounded-none border-0 border-b border-muted p-0 text-base text-lg font-semibold ${
                  isNameEditing ? "" : "hidden"
                }`}
                spellCheck={false}
                defaultValue={nameValue}
                onBlur={updateName}
                onChange={(e) => setNameValue(e.target.value)}
                ref={name}
              />
            </div>
            <div className={"flex flex-row items-center justify-between "}>
              <div
                className={
                  "flex w-fit max-w-[75%] flex-row items-center gap-2 "
                }>
                {!isUrlEditing && (
                  <>
                    <span
                      className={
                        "w-full overflow-hidden text-ellipsis whitespace-nowrap text-base text-muted-foreground"
                      }>
                      {urlValue}
                    </span>
                    <Pencil
                      size={18}
                      className={"cursor-pointer hover:scale-110"}
                      onClick={() => {
                        setIsUrlEditing(true)
                      }}
                    />
                  </>
                )}
              </div>
              <Input
                className={`input_without_border h-fit rounded-none border-0  border-b border-muted p-0 text-base text-muted-foreground ${
                  isUrlEditing ? "" : "hidden"
                }`}
                spellCheck={false}
                defaultValue={urlValue}
                onBlur={updateUrl}
                onChange={(e) => setUrlValue(e.target.value)}
                ref={url}
              />
            </div>
          </div>
          <div>
            <Switch
              checked={isEnabled}
              onCheckedChange={async () => {
                setIsLoading(true)
                setIsEnabled(!isEnabled)
                await UpdateLink({ id: link.id, enabled: !link.enabled })
                setIsLoading(false)
              }}
            />
          </div>
        </div>
      </Card>
    </>
  )
}
