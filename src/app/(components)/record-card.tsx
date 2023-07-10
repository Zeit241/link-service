"use client";
import { Record } from "@prisma/client";
import { Card } from "@/app/(components)/ui/card";
import { useRouter } from "next/navigation";
import { Badge } from "@/app/(components)/ui/badge";
import { Separator } from "@/app/(components)/ui/separator";
import {Switch} from "@/app/(components)/ui/switch";
import {Trash} from "lucide-react";
import {useState} from "react";
import UpdateRecord from "@/app/server/update-record";
import {deleteRecord} from "@/app/server/delete-record";
import {AlertDialog, AlertDialogTrigger} from "@radix-ui/react-alert-dialog";
import {
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from "@/app/(components)/ui/alert-dialog";

type unionRecordType = Record & { Link: { id: string }[] } & {
  Statistic: { id: string }[];
};
export default function RecordCard({ record }: { record: unionRecordType }) {
  const router = useRouter();
  const [recordEnabled, setRecordEnabled] = useState<boolean>(record.enabled)
  const navigateToPage = (event: React.MouseEvent) => {
    return router.push(`dashboard/modify/${record.url}`);
  };

  return (
    <>
      <Card

        className={
          "flex flex-col p-5 min-h-[175px] hover:bg-slate-900"
        }
      >
        <div
            className={"flex flex-col w-full cursor-pointer"}
            onClick={(e) => navigateToPage(e)}
        >
          <div className={"flex flex-row items-center justify-between mb-1"}>
            <h1 className={"text-2xl font-bold uppercase flex flex-wrap"}>
              {record.name}
            </h1>
            <div>
            </div>
          </div>
          <span className={"text-sm text-foreground "}>
          {record.description || "May be you can add a description"}
        </span>
          <Separator className={"m-2.5"} orientation="horizontal" />
          <>
            <div className={"flex flex-row items-center gap-2"}>
              <Badge variant={recordEnabled ? "secondary" : "destructive"}>
                {recordEnabled ? "Enabled" : "Disabled"}
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
                {record.Statistic.length + " clicks"}
              </Badge>
            </div>
          </>
        </div>
        <div className={"flex flex-row justify-between items-center mt-2"}>
          <Switch id="record-enabled" checked={recordEnabled} onCheckedChange={async ()=> {
            await UpdateRecord( record.id, { enabled: !recordEnabled})
            setRecordEnabled(!recordEnabled)
          }}/>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Trash size={18} className={" cursor-pointer"}/>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will <span className={"text-red-700"}>delete your</span> {record.url}
                   project and remove your data from our servers.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction  onClick={async ()=> await deleteRecord(record.id)}>Continue</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>

        </div>
      </Card>
    </>
  );
}
