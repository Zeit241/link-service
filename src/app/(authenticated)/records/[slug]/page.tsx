import { Button } from "@/app/(components)/ui/button";
import Link from "next/link";
import { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  return {
    title: `@${params.slug} | Pretty Links`,
  };
}

export default function EditRecord({
  params,
}: {
  params: { slug: string };
}): JSX.Element {
  return (
    <>
      <h1>You are editiong a record #{params.slug}</h1>
      <Button variant="link" asChild>
        <Link href={"/dashboard"}>Dashboard</Link>
      </Button>
    </>
  );
}
