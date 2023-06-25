"use client";
import { Button } from "@/app/(components)/ui/button";
import { Loader2, Plus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/app/(components)/ui/dialog";
import { Input } from "@/app/(components)/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/app/(components)/ui/form";
import { Card } from "@/app/(components)/ui/card";
import * as React from "react";
import { useState } from "react";

const createRecordSchema = z.object({
  name: z
    .string()
    .min(5, {
      message: "Name must be at least 5 characters",
    })
    .max(20, {
      message: "Name must be less than 20 characters",
    })
    .regex(/[A-Za-z0-9-._~:/?#\[\]@!$&'()*+,;%=]+/g, {
      message: "Invalid characters.",
    }),
});
export default function CreateCardBtn() {
  const [isNameChecked, setIsNameChecked] = useState<boolean>(false);
  const [name, setName] = useState<string>("");
  const [nameError, setNameError] = useState<boolean>(false);
  const form = useForm<z.infer<typeof createRecordSchema>>({
    resolver: zodResolver(createRecordSchema),
    defaultValues: {
      name: "",
    },
  });

  async function verifyName() {
    setTimeout(() => {
      setIsNameChecked(true);
    }, 1500);
  }

  function onSubmit(values: z.infer<typeof createRecordSchema>) {
    console.log(values);
  }

  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="ghost" className={"w-[150px] h-[175px] border"}>
            <div className={"flex flex-col gap-3.5 items-center"}>
              <Plus className="h-8 w-8" />
              <p>Add new project</p>
            </div>
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>New project</DialogTitle>
            <DialogDescription>
              Create new project with your links inside.
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <div className={"flex flex-row items-center "}>
                      <Card
                        className={
                          "border-r-0 w-[120px] items-center flex py-2 px-3 rounded-r-none text-sm h-10 pr-0 leading-none"
                        }
                      >
                        {"prettylinks.com/"}
                      </Card>
                      <FormControl>
                        <Input
                          {...field}
                          autoComplete={"off"}
                          className={"border-l-0 rounded-l-none pl-0 "}
                          placeholder="name"
                          spellCheck={"false"}
                          type="text"
                          //onChange={(e) => console.log(e.target.value)}
                        />
                      </FormControl>
                    </div>
                    <FormDescription>
                      This is your public display name. It can be changed later.
                    </FormDescription>
                  </FormItem>
                )}
              />
              <DialogFooter>
                <Button
                  type="submit"
                  disabled={name === "" || !isNameChecked || nameError}
                >
                  {name === "" ? null : isNameChecked ? null : (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  Create
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  );
}
