import { redirect } from "next/navigation"
import { Record } from "@prisma/client"
import { getServerSession } from "next-auth"

import { authOptions } from "@/lib/auth"
import CreateCardBtn from "@/app/(components)/add-card"
import RecordCard from "@/app/(components)/record-card"
import { getLinkAndStatisticCount } from "@/app/actions/record"

type customType = Record & { _count: { Link: number; Statistic: number } }

export default async function RecordWrapper(): Promise<Awaited<JSX.Element>> {
  const session = await getServerSession(authOptions)
  if (session) {
    const { data } = await getLinkAndStatisticCount({ id: session?.user?.id })
    return (
      <div className={"flex flex-row flex-wrap gap-4"}>
        {data?.map((record: customType) => (
          <RecordCard key={record.id} record={record} />
        ))}
        <CreateCardBtn id={session?.user?.id} />
      </div>
    )
  } else {
    return redirect("/login")
  }
}
