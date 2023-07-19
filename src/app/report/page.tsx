"use client"

import { notFound } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import SessionProviderWrapper from "@/app/(components)/session-provider"
import { Button } from "@/app/(components)/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/app/(components)/ui/form"
import Navbar from "@/app/(components)/ui/navbar"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/(components)/ui/select"
import { SendReport } from "@/app/actions/report"

//TODO: fix width for form
export default function Report({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const { id } = searchParams

  const formSchema = z.object({
    message: z.string().min(2, {
      message: "Username must be at least 2 characters.",
    }),
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      message: "",
    },
  })

  if (!id || !searchParams || typeof id !== "string") return notFound()

  async function onSubmit(data: z.infer<typeof formSchema>) {
    await SendReport({ recordId: id as string, text: data.message })
  }

  console.log(searchParams)
  return (
    <>
      <SessionProviderWrapper>
        <Navbar />
      </SessionProviderWrapper>
      <div className={"flex h-full w-full flex-col items-center justify-start"}>
        <h1
          className={
            "mt-10 items-center justify-center text-center text-4xl font-bold"
          }>
          Report for #{id}
        </h1>
        <p className={"w-3/5 p-5 text-center"}>
          We understand that you are having problems with the content on our
          website. We take such situations very seriously and appreciate your
          appeal. Please fill out the form below to describe in detail the
          problem you are facing. We will review your complaint as soon as
          possible and take the necessary actions.
        </p>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-2/5 space-y-6">
            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a reason to report" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="copyright">
                        Copyright infringement
                      </SelectItem>
                      <SelectItem value="spam">
                        Spam or deceptive practices
                      </SelectItem>
                      <SelectItem value="harmful">
                        Malicious or harmful content
                      </SelectItem>
                      <SelectItem value="harmful">
                        Malicious or harmful content
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <FormDescription></FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Submit</Button>
          </form>
        </Form>
      </div>
    </>
  )
}
