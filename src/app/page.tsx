import { Button } from "@/app/(components)/ui/button";
import Link from "next/link";
import { redirect } from "next/navigation";

export default function Home(): JSX.Element {
  redirect("/dashboard");
  return (
    <>
      <h1>Here will be landing soon...</h1>
      <Button variant="link" asChild>
        <Link href={"/dashboard"}>Dashboard</Link>
      </Button>
    </>
  );
}
