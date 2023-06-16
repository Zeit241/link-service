import { redirect } from "next/navigation";
import { Metadata } from "next";
import RecordPage from "@/app/(components)/record";
import { Suspense } from "react";
import { GetRecord } from "@/app/[slug]/getRecord";

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  return {
    title: `@${params.slug} | Pretty Links`,
  };
}

export default async function Home({ params }: { params: { slug: string } }) {
  const data = await GetRecord(params.slug);

  if (!data) {
    redirect("/404");
  }

  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <RecordPage data={data} />
      </Suspense>
    </>
  );
}
