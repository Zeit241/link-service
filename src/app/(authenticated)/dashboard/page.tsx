import Navbar from "@/app/(components)/ui/navbar";
import ReactWrapper from "@/app/(components)/record-wrapper";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Dashboard",
};

export default function DashboardPage() {
  return (
    <>
      <Navbar username="John Doe" main_url={process.env.MAIN_URL!.toString()} />
      <div className={"p-8"}>
        <h1 className={"text-2xl mb-4"}>Your projects</h1>
        <Suspense fallback={<div>Loading...</div>}>
          {/* @ts-expect-error Async Server Component */}
          <ReactWrapper />
        </Suspense>
      </div>
    </>
  );
}
