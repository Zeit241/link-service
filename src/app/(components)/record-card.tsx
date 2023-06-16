"use client";
import { Record } from "@prisma/client";
import { Card } from "@/app/(components)/ui/card";
import { useRouter } from "next/navigation";
import { Button } from "@/app/(components)/ui/button";
import { Trash } from "lucide-react";
import { useRef } from "react";
export default function RecordCard({ record }: { record: Record }) {
  const router = useRouter();
  const navigateToPage = (e) => {
    if (e.target.tagName !== "button") {
      return router.push(`/records/${record.id}`);
    }
  };

  const delete_btn = useRef<HTMLButtonElement>(null);
  return (
    <Card
      onClick={(e) => navigateToPage(e)}
      className={"flex flex-col p-5 cursor-pointer min-h-[175px]"}
    >
      <div className={"flex flex-row items-center justify-between mb-1"}>
        <h1 className={"text-2xl font-bold uppercase"}>{record.name}</h1>
        <div>
          <Button
            ref={delete_btn}
            variant="ghost"
            className={"p-1 pr-3 pl-3"}
            onClick={(e) => alert("delete")}
          >
            <Trash className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <small>{record.description}</small>
    </Card>
  );
}
