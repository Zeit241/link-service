import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home!!!",
  description: "Welcome to Next.js",
};

export default function Page() {
  return (
    <>
      <h2>The page you’re looking for doesn’t exist. !!!!!</h2>
      <p>
        Want this to be your username?{" "}
        <Link href={"/signup"}>Create free account</Link>.
      </p>
    </>
  );
}
