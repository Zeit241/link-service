import PhoneFrame from "@/app/(components)/phone-frame";
import { GetRecordLinks } from "@/app/server/get-record-links";
import { notFound } from "next/navigation";
import ModifyLinksWrapper from "@/app/(components)/modify-links-wrapper";

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
      <div
        className={
          "flex flex-row justify-between items-center content-center p-24"
        }
      >
        <div className={"border  w-[650px]"}>
          <ModifyLinksWrapper record={record} />
        </div>
        <PhoneFrame id={params.slug}></PhoneFrame>
      </div>
    );
  }
}
