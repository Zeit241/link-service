"use client"

import { Link, Record } from "@prisma/client"

import LinkItem from "@/app/(components)/link"

type RecordProps = {
  data: Record & { Link: Link[] }
}

export default function RecordPage({ data }: RecordProps) {
  return (
    <div
      className={`flex min-h-full w-full flex-col bg-background`}
      //style={{ backgroundColor: data.preferences.backgroundColor }}
    >
      <nav className={"flex flex-col items-center p-8"}>
        <div
          className={
            "flex h-20 w-20 select-none items-center justify-center rounded-full bg-muted-foreground text-center text-4xl text-white"
          }
        >
          {data.name.charAt(0).toUpperCase()}
        </div>

        <span className={"mb-1 mt-6 font-bold uppercase"}>{data.name}</span>
        <p>{data.description}</p>
      </nav>
      <section
        className={
          "m-0 flex h-full w-full flex-1 flex-col items-center justify-start gap-4"
        }
        style={{
          margin: "0 auto",
        }}
      >
        {data.Link.map((link: Link) => (
          <LinkItem key={link.id} Link={link} />
        ))}
      </section>
      <div className={"mb-2 mt-12 flex items-center justify-center"}>
        <h1 className={"items-center justify-center"}>PRETTY LINKS</h1>
      </div>
    </div>
  )
}
