"use client";

import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { Skeleton } from "@/app/(components)/ui/skeleton";

export default function PhoneFrame({ id }: { id: string }) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  useEffect(() => {}, []);
  return (
    <div
      className={
        "w-[320px] h-[620px] border-[15px] rounded-[50px] m-12 overflow-hidden"
      }
    >
      {!isLoading && (
        <Skeleton className={"w-full h-full flex items-center justify-center"}>
          <Loader2 size={42} className={"animate-spin"} />
        </Skeleton>
      )}

      <iframe
        className={`w-full rounded-3xl h-full ${!isLoading ? "hidden" : ""}`}
        src={`/${id}`}
        onLoad={() => setIsLoading(true)}
      ></iframe>
    </div>
  );
}
