import { Loader2 } from "lucide-react"

export default function AbsoluteLoader() {
  return (
    <>
      <div
        className={
          "absolute right-0 top-0 h-full w-full rounded-lg bg-background opacity-60"
        }></div>
      <Loader2
        size={32}
        strokeWidth={3}
        className={"absolute right-[45%] top-[45%] animate-spin"}
      />
    </>
  )
}
