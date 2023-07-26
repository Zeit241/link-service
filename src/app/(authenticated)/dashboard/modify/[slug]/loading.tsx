import { Loader2 } from "lucide-react"

export default function Loading() {
  return (
    <div className={"flex h-full w-full items-center justify-center"}>
      <Loader2 size={60} className={"animate-spin"} />
    </div>
  )
}
