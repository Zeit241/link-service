import { Metadata } from "next"
import Link from "next/link"
import { Command } from "lucide-react"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/app/(components)/ui/button"
import { UserAuthForm } from "@/app/(components)/user-auth-form"

export const metadata: Metadata = {
  title: "Authentication",
}

export default function AuthenticationPage() {
  return (
    <div className={"h-screen"}>
      <div className="container relative grid h-full max-w-[562px] flex-col items-center justify-center sm:grid md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
        <Link
          href={"/registration"}
          className={cn(
            buttonVariants({ variant: "outline", size: "sm" }),
            "absolute right-4 top-4 md:right-8 md:top-8"
          )}>
          Sing Up
        </Link>
        <div className="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">
          <div
            className="absolute inset-0 bg-cover"
            style={{
              backgroundImage:
                "url(https://images.unsplash.com/photo-1590069261209-f8e9b8642343?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1376&q=80)",
            }}
          />
          <div className="relative z-20 flex items-center text-lg font-medium">
            <Command className="mr-2 h-6 w-6" /> Pretty Links
          </div>
        </div>
        <div className="lg:p-8">
          <div className="mx-auto flex w-[300px] flex-col justify-center space-y-6 sm:w-[350px]">
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tight">Sign In</h1>
              <p className="text-sm text-muted-foreground">
                Enter your username and password below to sign in your account
              </p>
            </div>
            <UserAuthForm type={"signin"} />
            <p className="px-8 text-center text-sm text-muted-foreground">
              By clicking continue, you agree to our{" "}
              <Link
                href={"/terms"}
                className="underline underline-offset-4 hover:text-primary">
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link
                href={"/privacy"}
                className="underline underline-offset-4 hover:text-primary">
                Privacy Policy
              </Link>
              .
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
