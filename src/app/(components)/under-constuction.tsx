import { Construction } from "lucide-react"

export default function UnderConstruction(): JSX.Element {
  return (
    <div
      className={"flex h-full w-full flex-col items-center justify-center p-8"}>
      <h1 className={"text-4xl font-bold "}>Sorry, but this page is</h1>
      <div className={"flex flex-row items-center gap-3"}>
        <Construction size={64} />
        <h1 className={"text-4xl  font-bold"}>Under Construction</h1>
      </div>
    </div>
  )
}
