"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Record } from "@prisma/client"
import { AlertDialog, AlertDialogTrigger } from "@radix-ui/react-alert-dialog"
import { Trash } from "lucide-react"

import AbsoluteLoader from "@/app/(components)/ui/absolute-loader"
import {
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/app/(components)/ui/alert-dialog"
import { Badge } from "@/app/(components)/ui/badge"
import { Card } from "@/app/(components)/ui/card"
import { Separator } from "@/app/(components)/ui/separator"
import { Switch } from "@/app/(components)/ui/switch"
import { DeleteRecord, UpdateRecord } from "@/app/actions/record"

type unionRecordType = Record & { Link: { id: string }[] } & {
  Statistic: { id: string }[]
}
export default function RecordCard({ record }: { record: unionRecordType }) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [recordEnabled, setRecordEnabled] = useState<boolean>(record.enabled)

  const updateEnabledState = async (): Promise<void> => {
    setIsLoading(true)
    await UpdateRecord({ id: record.id, enabled: !recordEnabled }).then(() => {
      setRecordEnabled(!recordEnabled)
      setIsLoading(false)
    })
  }

  const navigateToPage = () => {
    return router.push(`dashboard/modify/${record.url}`)
  }

  return (
    <>
      <Card
        className={"relative flex min-h-[175px] flex-col p-5 hover:bg-muted"}>
        {isLoading && <AbsoluteLoader />}
        <div
          className={"flex w-full cursor-pointer flex-col"}
          onClick={navigateToPage}>
          <div className={"mb-1 flex flex-row items-center justify-between"}>
            <h1 className={"flex flex-wrap text-2xl font-bold uppercase"}>
              {record.name}
            </h1>
            <div></div>
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
                variant={record.Link.length > 0 ? "secondary" : "destructive"}>
                {record.Link.length + " links"}
              </Badge>
              <Badge
                variant={
                  record.Statistic.length > 0 ? "secondary" : "destructive"
                }>
                {record.Statistic.length + " clicks"}
              </Badge>
            </div>
          </>
        </div>
        <div className={"mt-4 flex flex-row items-center justify-between"}>
          <Switch
            id="record-enabled"
            checked={recordEnabled}
            onCheckedChange={updateEnabledState}
          />
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Trash size={18} className={" cursor-pointer"} />
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will{" "}
                  <span className={"text-red-700"}>
                    permanently delete your
                  </span>{" "}
                  {record.url.toUpperCase() + " "} project and remove your data
                  (inc. links, stats, etc.) from our servers.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={async () => {
                    setIsLoading(true)
                    await DeleteRecord({ id: record.id })
                  }}>
                  Continue
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </Card>
    </>
  )
}
