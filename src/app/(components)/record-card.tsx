"use client";
import { Record } from "@prisma/client";
import { Card } from "@/app/(components)/ui/card";
import { useRouter } from "next/navigation";
import { Badge } from "@/app/(components)/ui/badge";
import { Separator } from "@/app/(components)/ui/separator";
import { useRef } from "react";

type customType = Record & { Link: { id: string }[] } & {
  Statistic: { id: string }[];
};
export default function RecordCard({ record }: { record: customType }) {
  const delete_btn = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const navigateToPage = (event: React.MouseEvent) => {
    // if (
    //   event.currentTarget.id !== delete_btn?.current?.id ||
    //   event.currentTarget.parentElement?.id !== delete_btn?.current?.id
    // ) {
    //   console.log("REDIRECT");
    return router.push(`dashboard/modify/${record.url}`);
    // }
  };
  console.log(record);
  return (
    <>
      <Card
        onClick={(e) => navigateToPage(e)}
        className={
          "flex flex-col p-5 cursor-pointer min-h-[175px] hover:bg-accent"
        }
      >
        <div className={"flex flex-row items-center justify-between mb-1"}>
          <h1 className={"text-2xl font-bold uppercase flex flex-wrap"}>
            {record.name}
          </h1>
          <div>
            {/*<AlertDialog>*/}
            {/*  <AlertDialogTrigger>*/}
            {/*    <div*/}
            {/*      className={"p-1 pr-3 pl-3 pt-3"}*/}
            {/*      ref={delete_btn}*/}
            {/*      id={"delete_btn"}*/}
            {/*    >*/}
            {/*      <Trash className="h-4 w-4" />*/}
            {/*    </div>*/}
            {/*  </AlertDialogTrigger>*/}
            {/*  <AlertDialogContent>*/}
            {/*    <AlertDialogHeader>*/}
            {/*      <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>*/}
            {/*      <AlertDialogDescription>*/}
            {/*        This action cannot be undone. This will permanently delete*/}
            {/*        your project and remove your data from our servers.*/}
            {/*      </AlertDialogDescription>*/}
            {/*    </AlertDialogHeader>*/}
            {/*    <AlertDialogFooter>*/}
            {/*      <AlertDialogCancel>Cancel</AlertDialogCancel>*/}
            {/*      <AlertDialogAction*/}
            {/*        onClick={async () => await deleteRecord(record.id)}*/}
            {/*      >*/}
            {/*        Continue*/}
            {/*      </AlertDialogAction>*/}
            {/*    </AlertDialogFooter>*/}
            {/*  </AlertDialogContent>*/}
            {/*</AlertDialog>*/}
          </div>
        </div>
        <span className={"text-sm text-foreground "}>
          {record.description || "May be you can add a description"}
        </span>
        <Separator className={"m-2.5"} orientation="horizontal" />
        <>
          <div className={"flex flex-row items-center gap-3"}>
            <Badge variant={record.enabled ? "secondary" : "destructive"}>
              {record.enabled ? "Enabled" : "Disabled"}
            </Badge>
            <Badge
              variant={record.Link.length > 0 ? "secondary" : "destructive"}
            >
              {record.Link.length + " links"}
            </Badge>
            <Badge
              variant={
                record.Statistic.length > 0 ? "secondary" : "destructive"
              }
            >
              {record.Link.length + " clicks"}
            </Badge>
          </div>
        </>
      </Card>
    </>
  );
}
