//TODO: Currently not working because of next 13 beta

import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Home",
  description: "Welcome to Next.js",
}

export default function NotFound() {
  //redirect("/404");
  return (
    <>
      {/*<h1>If u can see it something goes wrong</h1>*/}
      <h2>The page you’re looking for doesn’t exist.</h2>
      <p>
        Want this to be your username?{" "}
        <Link href={"/signup"}>Create free account</Link>.
      </p>
    </>
  )
}
