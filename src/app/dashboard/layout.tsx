import { Suspense, ReactNode } from "react";
import DashboardLoading from "@/app/dashboard/loading";
import { Metadata } from "next";
export const metadata: Metadata = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};
export default function DashboardLayout({
  children,
}: {
  children: ReactNode;
}): JSX.Element {
  return <Suspense fallback={<DashboardLoading />}>{children}</Suspense>;
}
