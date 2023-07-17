"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { LogOut, Share2 as ShareIcon, User, Webhook } from "lucide-react"
import { signOut, useSession } from "next-auth/react"

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

const nav_menu = [
  { path: "dashboard", name: "Links" },
  { path: "settings", name: "Settings" },
  { path: "analytics", name: "Analytics" },
]

export default function Navbar(): JSX.Element {
  const pathname = usePathname()
  const session = useSession()
  console.log(session)
  return (
    <div
      className={`flex h-14 w-full flex-row items-center border-b border-border bg-background pl-4 pr-8 ${
        !session.data && "justify-between"
      }`}>
      <div className="logo">
        <Webhook width={35} height={35} className={"mr-4 hover:animate-spin"} />
      </div>
      {session.data && (
        <nav className="list flex flex-1 flex-row gap-3 xs:gap-2 sm:gap-4">
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
        </nav>
      )}

      <div className="announcements"></div>
      {session.data && (
        <div className="share-btn hidden md:flex lg:flex xl:flex ">
          <Button size={"sm"}>
            <ShareIcon className={"mr-2 "} />
            Share
          </Button>
        </div>
      )}
      {session.data ? (
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
      ) : (
        <div className={"flex items-end justify-end"}>
          <Button className={"flex gap-2.5"} asChild>
            <Link href={"/login"}>Sign in</Link>
          </Button>
        </div>
      )}
    </div>
  )
}
