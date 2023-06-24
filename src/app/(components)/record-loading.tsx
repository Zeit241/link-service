import { Skeleton } from "@/app/(components)/ui/skeleton";

export default function RecordLoading() {
  return (
    <>
      <div>
        <Skeleton className={"w-[350px] h-[200px]"} />
      </div>
    </>
  );
}
