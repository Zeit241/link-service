"use client";
import { Link } from "@prisma/client";
import linkIcon from "@/../public/img/standart-link.svg";
import Image from "next/image";
import { useRouter } from "next/navigation";

type LinkItemProps = {
  Link: Omit<Link, "createdAt" | "updatedAt">;
};
export default function LinkItem({ Link }: LinkItemProps) {
  const router = useRouter();
  const updateLinks = async () => {
    //TODO: Собирать статистику по каждой ссылке
    return router.push(Link.url, {});
  };

  return (
    <div
      onClick={updateLinks}
      className={
        "w-[75%] min-w-[280px] max-w-[560px] h-20 flex rounded-xl bg-amber-500 cursor-pointer"
      }
    >
      <Image
        src={linkIcon}
        alt={"Link icon"}
        width={50}
        className={"ml-4 mr-4"}
      />
      <div className={"flex-1"}>
        <h1 className={"font-semibold sm:text-base"}>{Link.name}</h1>
        <p>Some description</p>
      </div>
    </div>
  );
}
