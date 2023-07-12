"use client"

import { useEffect, useRef, useState } from "react"
import { Link } from "@prisma/client"
import { ChevronDown, ChevronUp, Pencil } from "lucide-react"

import useOutsideClick from "@/lib/hooks/use-outside-click"
import { Card } from "@/app/(components)/ui/card"
import { Input } from "@/app/(components)/ui/input"
import { Switch } from "@/app/(components)/ui/switch"
import UpdateLink from "@/app/server/update-link"

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

  const [name_value, setNameValue] = useState<string>(link.name)
  const [url_value, setUrlValue] = useState<string>(link.url)

  const name = useRef<any>()
  const url = useRef<any>()

  useEffect(() => {
    name.current.focus()
    name.current.setSelectionRange(name_value.length, name_value.length)
  }, [isNameEditing])
  useEffect(() => {
    url.current.focus()
    url.current.setSelectionRange(name_value.length, name_value.length)
  }, [isUrlEditing])

  useOutsideClick(name, async () => {
    setIsLoading(true)
    setIsNameEditing(false)
    await UpdateLink(link.id, { name: name_value })
    setIsLoading(false)
  })
  useOutsideClick(url, async () => {
    setIsUrlEditing(false)
    await UpdateLink(link.id, { url: url_value })
    setIsLoading(false)
  })
  const decrease_link_index = async (): Promise<void> => {
    setIsLoading(true)
    await UpdateLink(link.id, { order: index - 1 })
    setIsLoading(false)
  }
  const increase_link_index = async (): Promise<void> => {
    setIsLoading(true)
    await UpdateLink(link.id, { order: index + 1 })
    setIsLoading(false)
  }
  return (
    <>
      <Card className={"flex w-full flex-row border p-3"}>
        <div className={"mr-4 flex flex-col gap-0.5"}>
          <ChevronUp
            className={"cursor-pointer hover:scale-125"}
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
            "flex w-full  flex-row items-center justify-between pl-1 pr-3"
          }
        >
          <div className={"flex w-full flex-col overflow-x-hidden"}>
            <div className={"flex flex-row items-center justify-between "}>
              <div className={"flex flex-row items-center gap-2 "}>
                {!isNameEditing && (
                  <>
                    <span className={"text-ellipsis text-lg font-semibold"}>
                      {name_value}
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
                className={`input_without_border h-fit rounded-none border-0 p-0 text-base text-lg font-semibold ${
                  isNameEditing ? "" : "hidden"
                }`}
                spellCheck={false}
                defaultValue={name_value}
                onChange={(e) => setNameValue(e.target.value)}
                ref={name}
              />
            </div>
            <div className={"flex flex-row items-center justify-between "}>
              <div
                className={
                  "flex w-fit max-w-[75%] flex-row items-center gap-2 "
                }
              >
                {!isUrlEditing && (
                  <>
                    <span
                      className={
                        "w-full overflow-hidden text-ellipsis whitespace-nowrap text-base text-muted-foreground"
                      }
                    >
                      {link.url}
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
                className={`input_without_border h-fit rounded-none border-0 p-0 text-base text-muted-foreground ${
                  isUrlEditing ? "" : "hidden"
                }`}
                spellCheck={false}
                defaultValue={url_value}
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
                await UpdateLink(link.id, { enabled: !link.enabled })
                setIsLoading(false)
              }}
            />
          </div>
        </div>
      </Card>
    </>
  )
}
