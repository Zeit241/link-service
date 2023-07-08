"use client";

import { Button } from "@/app/(components)/ui/button";
import { Plus, X } from "lucide-react";
import { Link, Record } from "@prisma/client";
import { useState } from "react";
import { Card } from "@/app/(components)/ui/card";
import { Input } from "@/app/(components)/ui/input";
import { Label } from "@/app/(components)/ui/label";

type customType = Record & { Link: Link[] };

export default function ModifyLinksWrapper({ record }: { record: customType }) {
  const [isAddCardOpen, setIsAddCardOpen] = useState<boolean>(false);
  const [url, setUrl] = useState<string>("");
  console.log(record);
  const add_new_link = () => {
    console.log("add new link");
  };

  //TODO: rework it with form and zod
  function verify(value: string) {
    //Create regex for vailidation url
  }

  return (
    <div
      className={
        "flex items-center justify-center flex-col-reverse gap-5 pt-4 pb-4"
      }
    >
      {isAddCardOpen && (
        <Card className={"flex flex-col gap-4 p-4 w-4/5"}>
          <div className="flex flex-row items-center justify-between">
            <Label htmlFor={"link"}>Enter URL</Label>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => {
                setIsAddCardOpen(false);
                //setUrl("");
              }}
            >
              <X size={18} />
            </Button>
          </div>
          <div className={"flex-row flex gap-3 items-center"}>
            <Input
              id="link"
              placeholder={"URL"}
              onChange={(e) => setUrl(e.target.value)}
            />
            <Button>Add</Button>
          </div>
        </Card>
      )}
      {record.Link.map((link: Link, index: number) => {
        return <>Link #${index}</>;
      })}
      {!isAddCardOpen && (
        <Button
          variant="secondary"
          className=" p-4 w-4/5"
          onClick={() => setIsAddCardOpen(true)}
        >
          <Plus /> Add new link
        </Button>
      )}
    </div>
  );
}
