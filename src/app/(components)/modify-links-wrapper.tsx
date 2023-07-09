"use client";

import { Button } from "@/app/(components)/ui/button";
import { Plus, X } from "lucide-react";
import { Link, Record } from "@prisma/client";
import * as React from "react";
import { useState, useTransition } from "react";
import { Card } from "@/app/(components)/ui/card";
import { Input } from "@/app/(components)/ui/input";
import { Label } from "@/app/(components)/ui/label";
import { z } from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormField, FormItem } from "@/app/(components)/ui/form";
import * as punycode from "punycode";
import CreateLink from "@/app/server/create-link";
import PhoneFrame from "@/app/(components)/phone-frame";

export default function ModifyLinksWrapper({
  record,
}: {
  record: Record & { Link: Link[] };
}) {
  let [isPending, startTransition] = useTransition();
  const [isAddCardOpen, setIsAddCardOpen] = useState<boolean>(false);
  const [url, setUrl] = useState<string>("");

  async function onSubmit(value: z.infer<typeof createNewLink>) {
    const res = await CreateLink({
      url: value.url,
      name: value.url,
      record_id: record.id,
      record_url: record.url,
    });
    setUrl(value.url);
  }

  const createNewLink = z.object({
    url: z.string().refine(
      (value) => {
        const pattern = new RegExp(
          "^(https?:\\/\\/)?" + // protocol
            "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[-*a-z\\d]{2,}|" + // domain name
            "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR IP (v4) address
            "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
            "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
            "(\\#[-a-z\\d_]*)?$", // fragment locator
          "i"
        );
        return pattern.test(punycode.toASCII(value));
      },
      { message: "Invalid URL" }
    ),
  });
  const form = useForm<z.infer<typeof createNewLink>>({
    resolver: zodResolver(createNewLink),
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: {
      url: "",
    },
  });
  return (
    <>
      <div
        className={
          "flex flex-row justify-between items-center content-center p-24"
        }
      >
        <div className={"border  w-[650px]"}>
          <div
            className={
              "flex items-center justify-center flex-col gap-5 pt-4 pb-4"
            }
          >
            {!isAddCardOpen && (
              <Button
                variant="secondary"
                className=" p-4 w-4/5"
                onClick={() => setIsAddCardOpen(true)}
              >
                <Plus /> Add new link
              </Button>
            )}
            {isAddCardOpen && (
              <Card className={"flex flex-col gap-4 p-4 w-4/5"}>
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-8"
                  >
                    <div className="">
                      <FormField
                        control={form.control}
                        name="url"
                        render={({ field }) => (
                          <FormItem>
                            <div
                              className={
                                "flex flex-row items-center justify-between w-full"
                              }
                            >
                              <Label htmlFor={"link"}>Enter URL</Label>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => {
                                  setIsAddCardOpen(false);
                                }}
                              >
                                <X size={18} />
                              </Button>
                            </div>
                            <div className={"flex-row flex gap-3 items-center"}>
                              <Controller
                                name="url"
                                control={form.control}
                                render={({ field: { onChange } }) => (
                                  <>
                                    <Input
                                      {...field}
                                      id="url"
                                      placeholder="Username"
                                      type="text"
                                      autoCapitalize="none"
                                      autoComplete="none"
                                      autoCorrect="off"
                                      spellCheck={"false"}
                                      onChange={onChange}
                                    />
                                  </>
                                )}
                              />
                              <Button
                                disabled={!!form.formState.errors.url?.message}
                                type={"submit"}
                              >
                                Add
                              </Button>
                            </div>
                          </FormItem>
                        )}
                      />
                    </div>
                  </form>
                </Form>
              </Card>
            )}

            {record.Link.map((link: Link, index: number) => {
              return (
                <div className={"border p-5 w-4/5"} key={index}>
                  {link.name}
                </div>
              );
            })}
          </div>
        </div>
        <PhoneFrame id={record.url} url={url} />
      </div>
    </>
  );
}
