"use client";

import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { Skeleton } from "@/app/(components)/ui/skeleton";

export default function PhoneFrame({ id, url }: { id: string; url: string }) {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  useEffect(() => {
    setIsLoading(true);
  }, [id, url]);
  return (
    <div
      className={
        "w-[320px] h-[620px] border-[15px] rounded-[50px] overflow-hidden"
      }
    >
      {isLoading && (
        <Skeleton
          className={"w-full h-full flex items-center justify-center blur-lg"}
        >
          <Loader2 size={42} className={"animate-spin"} />
        </Skeleton>
      )}

      <iframe
        key={url}
        className={`w-full rounded-3xl h-full ${isLoading ? "hidden" : ""}`}
        src={`/${id}`}
        onLoad={() => setIsLoading(false)}
      />
    </div>
  );
}
