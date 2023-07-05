import { Record } from "@prisma/client";
import RecordCard from "@/app/(components)/record-card";
import { prisma } from "@/lib/database";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import CreateCardBtn from "@/app/(components)/add-card";
import { redirect } from "next/navigation";

export default async function RecordWrapper() {
  const session = await getServerSession(authOptions);
  if (session) {
    const data = await prisma.record.findMany({
      where: {
        userId: session?.user?.id,
      },
    });
    return (
      <div className={"flex flex-row flex-wrap gap-4"}>
        {data.map((record: Record) => (
          <RecordCard key={record.id} record={record} />
        ))}
        <CreateCardBtn id={session?.user?.id} />
      </div>
    );
  } else {
    return redirect("/login");
  }
}
