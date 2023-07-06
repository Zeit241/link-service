import ReactWrapper from "@/app/(components)/record-wrapper";
import { Metadata } from "next";
import { Suspense } from "react";
import RecordLoading from "@/app/(components)/record-loading";

export const metadata: Metadata = {
  title: "Dashboard",
};

export default function DashboardPage() {
  return (
    <>
      <div className={"p-8"}>
        <h1 className={"text-2xl mb-4"}>Your projects</h1>
        <Suspense fallback={<RecordLoading />}>
          {/* @ts-expect-error Async Server Component */}
          <ReactWrapper />
        </Suspense>
      </div>
    </>
  );
}
