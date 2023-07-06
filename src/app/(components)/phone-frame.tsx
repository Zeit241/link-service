"use client";

export default function PhoneFrame({ id }: { id: string }) {
  return (
    <div className={"w-[320px] h-[620px] border-[15px] rounded-2xl m-12"}>
      <iframe className={"w-full h-full"} src={`/${id}`}></iframe>
    </div>
  );
}
