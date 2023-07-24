"use client"

import { useEffect, useRef, useState } from "react"
import { Link } from "@prisma/client"
import { ChevronDown, ChevronUp, Pencil, Trash } from "lucide-react"

import { useStore } from "@/lib/store/store"
import { Button } from "@/app/(components)/ui/button"
import { Card } from "@/app/(components)/ui/card"
import { Input } from "@/app/(components)/ui/input"
import { Switch } from "@/app/(components)/ui/switch"
import { DeleteLink, UpdateLink } from "@/app/actions/link"

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
  const { change_order, new_order, remove_link, modify_link } = useStore()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isEnabled, setIsEnabled] = useState<boolean>(link.enabled)
  const [isNameEditing, setIsNameEditing] = useState<boolean>(false)
  const [isUrlEditing, setIsUrlEditing] = useState<boolean>(false)
  const [nameValue, setNameValue] = useState<string>(link.name)
  const [urlValue, setUrlValue] = useState<string>(link.url)
  const name = useRef<HTMLInputElement | null>(null)
  const url = useRef<HTMLInputElement | null>(null)
  //TODO: add validation for edited links
  //TODO: add typing of links like url, email, address, text, etc
  //Set cursor position at the end of the input value
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

  function UpdateLinkOrderOnServer() {
    const [order_1, order_2] = new_order
    const promise1 = new Promise((resolve) =>
      UpdateLink({ id: order_1.id, order: order_1.order }).then(resolve)
    )
    const promise2 = new Promise((resolve) =>
      UpdateLink({ id: order_2.id, order: order_2.order }).then(resolve)
    )
    Promise.allSettled([promise1, promise2]).then(() => setIsLoading(false))
  }

  const updateName = async (): Promise<void> => {
    setIsNameEditing(false)
    setIsLoading(true)
    modify_link(link.id, { name: nameValue })
    await UpdateLink({ id: link.id, name: nameValue }).then(() =>
      setIsLoading(false)
    )
  }

  const updateUrl = async (): Promise<void> => {
    setIsUrlEditing(false)
    setIsLoading(true)
    modify_link(link.id, { url: urlValue })
    await UpdateLink({ id: link.id, url: urlValue }).then(() =>
      setIsLoading(false)
    )
  }

  const decrease_link_index = async (): Promise<void> => {
    setIsLoading(true)
    change_order(link.id, "up")
    await UpdateLinkOrderOnServer()
  }

  const increase_link_index = async (): Promise<void> => {
    setIsLoading(true)
    change_order(link.id, "down")
    await UpdateLinkOrderOnServer()
  }

  return (
    <>
      {/*{isLoading && <AbsoluteLoader />}*/}
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
          <span>#{index + 1}</span>
          <ChevronDown
            className={"cursor-pointer hover:scale-125"}
            onClick={index < max ? increase_link_index : () => {}}
          />
        </div>
        <div
          className={
            "flex w-full flex-row items-center justify-between overflow-hidden"
          }>
          <div className={"flex w-[70%] flex-grow flex-col"}>
            <div className={"flex flex-row"}>
              <div className={"flex max-w-[85%] flex-row items-center gap-2 "}>
                {!isNameEditing && (
                  <>
                    <span
                      className={
                        " w-full overflow-hidden text-ellipsis whitespace-nowrap text-lg font-semibold"
                      }>
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
                className={`input_without_border h-fit rounded-none border-0 border-b border-muted p-0 text-lg font-semibold ${
                  isNameEditing ? "" : "hidden"
                }`}
                autoFocus={isNameEditing}
                spellCheck={false}
                defaultValue={nameValue}
                onBlur={updateName}
                onChange={(e) => setNameValue(e.target.value)}
                ref={name}
              />
            </div>
            <div className={"flex flex-row "}>
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
          <div className={"flex flex-col items-center gap-3"}>
            <Switch
              disabled={isLoading}
              checked={isEnabled}
              onCheckedChange={async () => {
                setIsLoading(true)
                setIsEnabled(!isEnabled)
                modify_link(link.id, { enabled: !isEnabled })
                await UpdateLink({ id: link.id, enabled: !link.enabled })
                setIsLoading(false)
              }}
            />
            <Button
              className={""}
              disabled={isLoading}
              variant={"ghost"}
              onClick={async () => {
                setIsLoading(true)
                remove_link(link.id)
                await DeleteLink({ id: link.id }).then(() =>
                  setIsLoading(false)
                )
              }}
              size={"sm"}>
              <Trash size={16} />
            </Button>
          </div>
        </div>
      </Card>
    </>
  )
}
