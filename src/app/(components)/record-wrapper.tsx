"use client";
import { Record } from "@prisma/client";
import { Card } from "@/app/(components)/ui/card";
import { prisma } from "@/lib/database";
import { getServerSession } from "next-auth";
import { useRouter } from "next/router";
import Link from "next/link";
import RecordCard from "@/app/(components)/record-card";
import { Button } from "@/app/(components)/ui/button";
import { Plus } from "lucide-react";
import { useEffect, useState } from "react";
import * as process from "process";

interface RecordProps {
  id: string;
}

export default function RecordWrapper({ id }: RecordProps) {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch(`${process.env.MAIN_URL}/api/records`, {
      method: "POST",
      body: JSON.stringify({ id }),
    })
      .then((data) => data.json())
      .then((data) => setData(data.result));
  }, [id]);

  return <></>;
}

// export default async function RecordWrapper() {
//   //const session = await getServerSession();
//   const session = {
//     user: {
//       id: "6468f7a915c922690bea7b17",
//       username: "John Doe",
//     },
//   };
//   if (session) {
//     const data = await prisma.record.findMany({
//       where: {
//         userId: session?.user?.id,
//       },
//     });
//     return (
//       <div className={"flex flex-row flex-wrap gap-4"}>
//         {data.map((record: Record) => (
//           <RecordCard key={record.id} record={record} />
//         ))}
//         <Button variant="link" className={"w-[150px] h-[175px] border"}>
//           <Link href={"/dashboard1"} className={"flex flex-col gap-3.5"}>
//             <Plus className="h-8 w-8" />
//             <p>Add new project</p>
//           </Link>
//         </Button>
//       </div>
//     );
//   } else {
//     return <>Not Found</>;
//   }
// }
