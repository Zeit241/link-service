"use client";
import Link from "next/link";
import Image from "next/image";
import Icon from "@/../public/img/icon.svg";
import { Share2 as ShareIcon, LogOut, User } from "lucide-react";

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
import { signOut } from "next-auth/react";
type NavbarProps = {
  username: string;
  main_url: string;
};

export default function Navbar(props: NavbarProps): JSX.Element {
  return (
    <div
      className={
        "w-screen flex flex-row items-center bg-slate-900 h-16 pl-4 pr-8"
      }
    >
      <div className="logo">
        <Image
          src={Icon}
          alt={Icon}
          width={45}
          height={45}
          className={"mr-4"}
        />
      </div>
      <nav className="list flex flex-row gap-6 flex-1">
        <Link
          href="/dashboard"
          className={
            "text-neutral-500 font-semibold items-center flex flex-row current "
          }
        >
          Links
        </Link>
        <Link
          href="/appearance"
          className={
            "text-neutral-500 items-center flex flex-row font-semibold"
          }
        >
          Appearance
        </Link>
        <Link
          href="/analitics"
          className={
            "text-neutral-500 items-center flex flex-row font-semibold"
          }
        >
          Analitics
        </Link>
        <Link
          href="/settings"
          className={
            "text-neutral-500 items-center flex flex-row font-semibold"
          }
        >
          Settings
        </Link>
      </nav>
      <div className="announcements"></div>
      <div className="share-btn">
        <Button>
          <ShareIcon className={"mr-2"} />
          Share
        </Button>
      </div>
      <div className="user-info ml-5 text-white">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              className={
                "rounded-full w-12 h-12 font-semibold text-xl bg-gray-600"
              }
            >
              {props.username.charAt(0).toUpperCase()}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuGroup>
              <div
                className={
                  "w-full flex flex-row pt-3 pr-3 pl-1 pr-1 items-center"
                }
              >
                <div className="rounded-full w-12 h-12 font-semibold text-xl bg-gray-800 flex items-center justify-center mr-2">
                  {props.username.charAt(0).toUpperCase()}
                </div>
                <div className="">
                  <h2 className={"font-bold text-lg p-0"}>@{props.username}</h2>
                  <span className={"text-gray-400 text-sm"}>
                    {props.main_url}/{props.username}
                  </span>
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
}
