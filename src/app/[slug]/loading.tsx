import { Skeleton } from "@/app/(components)/ui/skeleton"

export default function Loading() {
  return (
    <div className={"flex h-full w-full flex-col items-center justify-start"}>
      <div className={"flex flex-col items-center"}>
        <Skeleton className={"mt-28 h-20 w-20 rounded-full"} />
        <Skeleton className={"mt-5 h-8 w-24 rounded-lg"} />
      </div>
      <div
        className={
          "mt-8 flex w-full flex-col items-center justify-center gap-4"
        }>
        <Skeleton
          className={
            "flex h-14 w-[75%] min-w-[260px] max-w-[560px] bg-muted p-2.5 pl-5 pr-5 "
          }
        />
        <Skeleton
          className={
            "flex h-14 w-[75%] min-w-[260px] max-w-[560px] bg-muted p-2.5 pl-5 pr-5 "
          }
        />
        <Skeleton
          className={
            "flex h-14 w-[75%] min-w-[260px] max-w-[560px] bg-muted p-2.5 pl-5 pr-5 "
          }
        />
        <Skeleton
          className={
            "flex h-14 w-[75%] min-w-[260px] max-w-[560px] bg-muted p-2.5 pl-5 pr-5 "
          }
        />
      </div>
    </div>
  )
}
