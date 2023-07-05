"use client";
import { Record } from "@prisma/client";
import { Card } from "@/app/(components)/ui/card";
import { useRouter } from "next/navigation";
import { Trash } from "lucide-react";
import { useRef } from "react";
import { deleteRecord } from "@/app/server/delete-record";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/app/(components)/ui/alert-dialog";

export default function RecordCard({ record }: { record: Record }) {
  const router = useRouter();
  const navigateToPage = (event: React.MouseEvent) => {
    if (event.target === event.currentTarget) {
      return router.push(`/records/${record.id}`);
    }
  };

  const delete_btn = useRef<HTMLButtonElement>(null);
  return (
    <>
      <Card
        onClick={(e) => navigateToPage(e)}
        className={"flex flex-col p-5 cursor-pointer min-h-[175px]"}
      >
        <div className={"flex flex-row items-center justify-between mb-1"}>
          <h1 className={"text-2xl font-bold uppercase"}>{record.name}</h1>
          <div>
            <AlertDialog>
              <AlertDialogTrigger>
                <div className={"p-1 pr-3 pl-3"}>
                  <Trash className="h-4 w-4" />
                </div>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete
                    your project and remove your data from our servers.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={async () => await deleteRecord(record.id)}
                  >
                    Continue
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>
        <small>{record.description}</small>
      </Card>
    </>
  );
}
