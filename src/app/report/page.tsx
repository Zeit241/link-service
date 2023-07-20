"use client"

import { useEffect, useState } from "react"
import { notFound, useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { Loader2 } from "lucide-react"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { useToast } from "@/lib/hooks/use-toast"
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
import { GetRecordCount } from "@/app/actions/record"
import { SendReport } from "@/app/actions/report"

export default function Report({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const { id } = searchParams
  const [valid, setValid] = useState(true)
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    setLoading(true)
    if (!id || !searchParams || typeof id !== "string") return setValid(false)

    GetRecordCount({ id: id as string }).then((data) => {
      if (data.status !== 200 || !data?.record) {
        setValid(false)
      }
      setTimeout(() => {
        setLoading(false)
      }, 10000)
    })
  }, [id, searchParams])
  if (!valid) notFound()
  const { toast } = useToast()
  const router = useRouter()
  const formSchema = z.object({
    message: z.string().min(2, {
      message: "Username must be at least 2 characters.",
    }),
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      message: "Select a reason to report",
    },
  })

  async function onSubmit(data: z.infer<typeof formSchema>) {
    await SendReport({ recordId: id as string, text: data.message })
      .then(() =>
        toast({
          title: "Report send successfully",
          description: "Thanks for your",
        })
      )
      .then(() => router.replace("/"))
  }

  return (
    <>
      <SessionProviderWrapper>
        <Navbar />
      </SessionProviderWrapper>

      {loading ? (
        <div
          className={"flex h-full w-full flex-col items-center justify-center"}>
          <Loader2 className={"animate-spin"} />
        </div>
      ) : (
        <div
          className={"flex h-full w-full flex-col items-center justify-start"}>
          <h1
            className={
              "mt-10  items-center justify-center overflow-hidden text-ellipsis break-all text-center text-4xl font-bold tracking-wider"
            }>
            Report for <p>#{id}</p>
          </h1>
          <p className={"w-full p-5 text-center sm:w-3/5"}>
            We understand that you are having problems with the content on our
            website. We take such situations very seriously and appreciate your
            appeal. Please fill out the form below to describe in detail the
            problem you are facing. We will review your complaint as soon as
            possible and take the necessary actions.
          </p>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex w-5/6 flex-col  justify-end space-y-6 sm:w-3/5">
              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Reason for complaint</FormLabel>
                    <Select onValueChange={field.onChange}>
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
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormDescription></FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className={"w-24"}>
                Submit
              </Button>
            </form>
          </Form>
        </div>
      )}
    </>
  )
}
