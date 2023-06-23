import { Button } from "@/app/(components)/ui/button";
import Link from "next/link";
export default function Home(): JSX.Element {
  return (
    <>
      <h1>Here will be landing soon...</h1>
      <Button variant="link" asChild>
        <Link href={"/dashboard"}>Dashboard</Link>
      </Button>
    </>
  );
}
