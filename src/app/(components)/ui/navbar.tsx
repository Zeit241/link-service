"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { LogOut, RefreshCcw, User } from "lucide-react"
import { signOut, useSession } from "next-auth/react"

import NavbarPopover from "@/app/(components)/navbar-popover"
import { Button } from "@/app/(components)/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/app/(components)/ui/dropdown-menu"
import { Skeleton } from "@/app/(components)/ui/skeleton"

const nav_menu = [
  { path: "dashboard", name: "Dashboard" },
  { path: "settings", name: "Settings" },
]

function Logo(): JSX.Element {
  return (
    <Link href={"/"}>
      <RefreshCcw
        width={35}
        height={35}
        className={"mr-4 hover:animate-spin"}
      />
    </Link>
  )
}

function NavbarLoading(): JSX.Element {
  return (
    <Skeleton
      className={"h-14 w-full max-w-[100vw] border-b border-border pl-4 pr-8"}
    />
  )
}

function UnauthenticatedNavbar(): JSX.Element {
  return (
    <header
      className={
        "flex h-14 w-full max-w-[100vw] flex-row items-center justify-between border-b border-border bg-background pl-4 pr-8"
      }>
      <div className="logo">
        <Logo />
      </div>
      <div className={"flex items-end justify-end gap-2.5"}>
        <Button className={"flex gap-2.5"} asChild>
          <Link href={"/registration"}>Sign Up</Link>
        </Button>
        <Button className={"flex gap-2.5"} variant={"secondary"} asChild>
          <Link href={"/login"}>Sign In</Link>
        </Button>
      </div>
    </header>
  )
}

export default function Navbar(): JSX.Element {
  const pathname = usePathname()
  const session = useSession()
  const [shareBtnShow, setShareBtnShow] = useState<boolean>(false)

  useEffect(() => {
    setShareBtnShow(pathname.includes("/modify/"))
  }, [pathname])

  if (session.status === "authenticated") {
    return (
      <header
        className={`flex h-14 w-full  max-w-[100vw] flex-row items-center justify-between border-b border-border bg-background pl-4 pr-8 sm:justify-normal`}>
        <div className="logo">
          <Logo />
        </div>
        <nav className="list hidden flex-1 flex-row gap-3 xs:gap-2 sm:flex sm:gap-4">
          {nav_menu.map((e: { path: string; name: string }) => {
            const is_current_page = pathname.startsWith(`/${e.path}`)
              ? "text-primary"
              : "text-muted-foreground hover:text-primary"
            return (
              <Link
                key={e.path}
                href={`/${e.path}`}
                className={`flex flex-row items-center text-sm font-medium tracking-wider transition-colors sm:text-xs ${is_current_page}`}>
                {e.name}
              </Link>
            )
          })}
          {session.data?.user.role === "ADMIN" && (
            <Link
              className={`flex flex-row items-center text-sm font-medium tracking-wider transition-colors sm:text-xs ${
                pathname.startsWith(`/admin`)
                  ? "text-primary"
                  : "text-muted-foreground hover:text-primary"
              }`}
              href={"/admin"}>
              Admin
            </Link>
          )}
        </nav>
        {shareBtnShow && (
          <div>
            <NavbarPopover />
          </div>
        )}

        <div className="user-info ml-5 text-white">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className={
                  "h-11 w-11 rounded-full bg-gray-600 text-xl font-semibold"
                }>
                {session.data?.user.username.charAt(0).toUpperCase()}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuGroup>
                <div
                  className={
                    "flex w-full flex-row items-center pl-1  pr-3 pt-3"
                  }>
                  <div className="mr-2 flex h-11 w-11 items-center justify-center rounded-full bg-gray-800 text-xl font-semibold">
                    {session.data?.user.username.charAt(0).toUpperCase()}
                  </div>
                  <div className="">
                    <h2 className={"p-0 text-lg font-bold"}>
                      @{session.data?.user.username}
                    </h2>
                    <span className={"text-sm text-gray-400"}></span>
                  </div>
                </div>
              </DropdownMenuGroup>
              <DropdownMenuLabel className={"mr-1.5 mt-3 text-[0.95rem]"}>
                Account
              </DropdownMenuLabel>
              <DropdownMenuGroup>
                <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => signOut()}>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>
    )
  }
  if (session.status === "loading") {
    return <NavbarLoading />
  }
  return <UnauthenticatedNavbar />
}
