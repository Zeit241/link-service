import Navbar from "@/app/(components)/ui/navbar";
import ReactWrapper from "@/app/(components)/record-wrapper";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard",
};

export default function DashboardPage() {
  return (
    <>
      <Navbar username="John Doe" main_url={process.env.MAIN_URL!.toString()} />
      <div className={"p-8"}>
        <h1 className={"text-2xl mb-4"}>Your projects</h1>
        {/* @ts-expect-error Server Component */}
        <ReactWrapper />
      </div>
    </>
  );
}
