import { Button } from "@/app/(components)/ui/button";
import Link from "next/link";
export default function Home(): JSX.Element {
  return (
    <>
      <h1>Something goes wrong!</h1>
      <Button variant="link" asChild>
        <Link href={"/dashboard"}> go to dashboard</Link>
      </Button>
    </>
  );
}
