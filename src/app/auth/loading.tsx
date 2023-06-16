import { Skeleton } from "@/app/(components)/ui/skeleton";

export default function AuthLoading() {
  return (
    <>
      <div>
        <Skeleton className={"w-[350px] h-[350px]"} />
      </div>
    </>
  );
}
