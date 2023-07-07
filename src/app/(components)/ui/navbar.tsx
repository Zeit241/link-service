"use client";
import Link from "next/link";
import { LogOut, Share2 as ShareIcon, User, Webhook } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/app/(components)/ui/dropdown-menu";
import { Button } from "@/app/(components)/ui/button";
import { signOut, useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import { Skeleton } from "@/app/(components)/ui/skeleton";

const nav_menu = [
  { path: "dashboard", name: "Links" },
  { path: "settings", name: "Settings" },
  { path: "analytics", name: "Analytics" },
];

export default function Navbar(): JSX.Element {
  const pathname = usePathname();
  const session = useSession();
  if (session) {
    return (
      <div
        className={
          "w-screen flex flex-row items-center bg-slate-900 h-14 pl-4 pr-8"
        }
      >
        <div className="logo">
          <Webhook
            width={35}
            height={35}
            className={"mr-4 hover:animate-spin"}
          />
        </div>
        <nav className="list flex flex-row gap-6 flex-1">
          {nav_menu.map((e: { path: string; name: string }) => {
            const is_current_page = pathname.startsWith(`/${e.path}`)
              ? "text-primary"
              : "text-muted-foreground hover:text-primary";
            return (
              <Link
                key={e.path}
                href={`/${e.path}`}
                className={`text-sm font-medium tracking-wider transition-colors  items-center flex flex-row ${is_current_page}`}
              >
                {e.name}
              </Link>
            );
          })}
        </nav>
        <div className="announcements"></div>
        <div className="share-btn">
          <Button size={"sm"}>
            <ShareIcon className={"mr-2 "} />
            Share
          </Button>
        </div>
        <div className="user-info ml-5 text-white">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className={
                  "rounded-full w-11 h-11 font-semibold text-xl bg-gray-600"
                }
              >
                {session.data?.user.username.charAt(0).toUpperCase()}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuGroup>
                <div
                  className={
                    "w-full flex flex-row pt-3 pr-3 pl-1 pr-1 items-center"
                  }
                >
                  <div className="rounded-full w-11 h-11 font-semibold text-xl bg-gray-800 flex items-center justify-center mr-2">
                    {session.data?.user.username.charAt(0).toUpperCase()}
                  </div>
                  <div className="">
                    <h2 className={"font-bold text-lg p-0"}>
                      @{session.data?.user.username}
                    </h2>
                    <span className={"text-gray-400 text-sm"}></span>
                  </div>
                </div>
              </DropdownMenuGroup>
              <DropdownMenuLabel className={"mt-3 mr-1.5 text-[0.95rem]"}>
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
      </div>
    );
  } else {
    return <Skeleton className={"w-full h-14"}></Skeleton>;
  }
}
