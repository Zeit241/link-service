import { GetRecordLinks } from "@/app/server/get-record-links";
import { notFound } from "next/navigation";
import ModifyLinksWrapper from "@/app/(components)/modify-links-wrapper";
import * as React from "react";

export default async function ModifyPage({
  params,
}: {
  params: { slug: string };
}) {
  const record = await GetRecordLinks(params.slug);
  if (!record) {
    return notFound();
  } else {
    return (
      <>
        <ModifyLinksWrapper record={record} />
      </>
    );
  }
}
