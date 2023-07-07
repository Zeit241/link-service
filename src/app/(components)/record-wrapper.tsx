import { Record } from "@prisma/client";
import RecordCard from "@/app/(components)/record-card";
import { prisma } from "@/lib/database";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import CreateCardBtn from "@/app/(components)/add-card";
import { redirect } from "next/navigation";

type customType = Record & { Link: { id: string }[] } & {
  Statistic: { id: string }[];
};

export default async function RecordWrapper() {
  const session = await getServerSession(authOptions);
  if (session) {
    const data = await prisma.record.findMany({
      where: {
        userId: session?.user?.id,
      },
      include: {
        Link: {
          include: {
            _count: true,
          },
        },
        Statistic: {
          select: {
            id: true,
          },
        },
      },
    });
    return (
      <div className={"flex flex-row flex-wrap gap-4"}>
        {data.map((record: customType) => (
          <RecordCard key={record.id} record={record} />
        ))}
        <CreateCardBtn id={session?.user?.id} />
      </div>
    );
  } else {
    return redirect("/login");
  }
}
