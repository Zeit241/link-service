"use client";
import { Link, Record } from "@prisma/client";
import LinkItem from "@/app/(components)/link";

type RecordProps = {
  data: Record & { Link: Link[] };
};

export default function RecordPage({ data }: RecordProps) {
  return (
    <div
      className={`w-full min-h-full flex flex-col`}
      style={{ backgroundColor: data.preferences.backgroundColor }}
    >
      <nav className={"flex items-center flex-col p-8"}>
        <div
          className={
            "w-20 h-20 rounded-full bg-black text-center text-white text-4xl flex items-center justify-center select-none"
          }
        >
          {data.name.charAt(0).toUpperCase()}
        </div>

        <span className={"mb-1 mt-6 font-bold uppercase"}>{data.name}</span>
        <p>{data.description}</p>
      </nav>
      <section
        className={
          "flex items-center m-0 flex-col justify-start flex-1 h-full w-full gap-6"
        }
        style={{
          margin: "0 auto",
        }}
      >
        {data.Link.map((link: Link) => (
          <LinkItem key={link.id} Link={link} />
        ))}
      </section>
      <div className={"mt-12 mb-2 justify-center items-center flex"}>
        <h1 className={"justify-center items-center"}>PRETTY LINKS</h1>
      </div>
    </div>
  );
}
