import Navbar from "@/app/(components)/ui/navbar";
import ReactWrapper from "@/app/(components)/record-wrapper";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard",
};

export default function DashboardPage() {
  return (
    <>
      <Navbar />
    </>
  );
}
