"use client";
import { Link } from "@prisma/client";
import { Card } from "@/app/(components)/ui/card";
import { Separator } from "@/app/(components)/ui/separator";
import { ChevronDown, ChevronUp } from "lucide-react";

export default function RecordCard({ link }: { link: Link }) {
  return (
    <>
      <Card className={"flex flex-row"}>
        <div className={"flex flex-col"}>
          <ChevronUp />
          <ChevronDown />
        </div>
        <div className={"flex flex-col"}>
          <Separator />
        </div>
      </Card>
    </>
  );
}
