"use client"

import { useRef, useState } from "react"
import { saveAs } from "file-saver"
import { toPng } from "html-to-image"
import { FileDown, RefreshCcw } from "lucide-react"

import { Button } from "@/app/(components)/ui/button"
import { Input } from "@/app/(components)/ui/input"
import { ScrollArea, ScrollBar } from "@/app/(components)/ui/scroll-area"

export default function NavbarPopoverCarousel({
  name,
  prettyUrl,
}: {
  name: string
  prettyUrl: string
}): JSX.Element {
  let backgrounds: string[] = ["bg-waves", "bg-blob", "bg-points", "bg-blur"]
  const cards = useRef<HTMLDivElement[]>([])
  cards.current = []
  const [projectPictureId, setProjectPictureId] = useState<number>(0)
  const addToRef = (el: HTMLDivElement): void => {
    if (!cards.current.includes(el) && el) {
      cards.current.push(el)
    }
  }

  return (
    <div className={"overflow-x-hidden"}>
      <ScrollArea className={""}>
        <ScrollBar orientation="horizontal" />
        <div className={" flex space-x-6 pb-8"}>
          {backgrounds.map((e, i) => {
            return (
              <div
                onClick={() => setProjectPictureId(i)}
                ref={addToRef}
                key={i}
                className={`mt-2 flex h-[410px] w-[220px] select-none flex-col items-center justify-center rounded-md  bg-cover ${e} ${
                  i === projectPictureId &&
                  " scale-[98%] outline outline-1 outline-offset-4 outline-white"
                }`}>
                <div
                  className={`flex flex-grow items-center justify-center shadow-card`}>
                  <div
                    className={`flex h-fit w-[175px] select-none flex-col items-center justify-center rounded-xl bg-white sm:w-[98%]`}>
                    <div
                      className={
                        "mt-[-25px] flex h-16 w-16 items-center justify-center rounded-full bg-muted-foreground text-2xl font-extrabold"
                      }>
                      {name.charAt(0).toUpperCase()}
                    </div>
                    <span className={"p-4 text-lg font-bold text-black"}>
                      {name}
                    </span>
                    <Input
                      value={prettyUrl}
                      className={
                        "mb-4 w-[90%] select-none rounded-full border border-muted-foreground text-center text-xs text-black"
                      }
                    />
                  </div>
                </div>
                <span
                  className={
                    "text-md flex flex-row items-center gap-2 p-2 font-semibold text-black"
                  }>
                  <RefreshCcw size={20} />
                  LyncSync
                </span>
              </div>
            )
          })}
        </div>
      </ScrollArea>
      <Button
        disabled={projectPictureId === undefined}
        variant={"ghost"}
        className={
          "mt-2 flex w-full flex-row items-center justify-center p-8 pl-4 pr-4"
        }
        onClick={() =>
          toPng(cards.current[projectPictureId!], {
            cacheBust: true,
            height: 620,
            width: 300,
            style: {
              scale: "1",
              outline: "none",
              borderRadius: "1rem",
            },
            quality: 1,
          }).then((data) => {
            saveAs(data, "project-picture.png")
          })
        }>
        <div className={"flex flex-grow flex-col items-start"}>
          <span className={"text-md font-bold"}>Download</span>
          <span className={"text-sm text-muted-foreground"}>
            High quality image
          </span>
        </div>
        <div className={"flex items-center gap-1.5"}>
          <span className={"text-md font-semibold text-muted-foreground"}>
            .PNG
          </span>
          <FileDown size={20} />
        </div>
      </Button>
    </div>
  )
}
