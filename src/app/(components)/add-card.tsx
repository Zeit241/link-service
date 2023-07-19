"use client"

import * as React from "react"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { Loader2, Plus } from "lucide-react"
import { Controller, useForm } from "react-hook-form"
import * as z from "zod"

import { isWordNotAllowed } from "@/lib/utils"
import { Button } from "@/app/(components)/ui/button"
import { Card } from "@/app/(components)/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/app/(components)/ui/dialog"
import {
  Form,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/app/(components)/ui/form"
import { Input } from "@/app/(components)/ui/input"
import { CreateRecord, VerifyRecordName } from "@/app/actions/record"

//TODO: Fix regex, it's not really working
const createRecordSchema = z.object({
  name: z
    .string()
    .min(5, {
      message: "Name must be at least 5 characters",
    })
    .max(20, {
      message: "Name must be less than 20 characters",
    })
    .regex(/[A-Za-z0-9-/\\._~:?#\[\]@!$&'()*+,;%=`]/g, {
      message: "Invalid characters.",
    }),
})
export default function CreateCardBtn({ id }: { id: string }) {
  const router = useRouter()
  const [isNameChecked, setIsNameChecked] = useState<boolean>(false)
  const [name, setName] = useState<string>("")
  const [nameError, setNameError] = useState<boolean>(false)
  const form = useForm<z.infer<typeof createRecordSchema>>({
    mode: "onChange",
    reValidateMode: "onChange",
    resolver: zodResolver(createRecordSchema),
    defaultValues: {
      name: "",
    },
  })

  useEffect(() => {
    if (name.length > 0) {
      setIsNameChecked(false)
      const timeOutId = setTimeout(() => verifyName(name), 500)
      return () => clearTimeout(timeOutId)
    }
  }, [name])

  async function verifyName(name: string): Promise<void> {
    console.log(isWordNotAllowed(name))
    if (!isWordNotAllowed(name)) {
      const is_name_taken = await VerifyRecordName({ url: name })
      if (is_name_taken.status === 403) {
        setNameError(true)
        form.setError("name", { message: "Name already taken" })
      } else {
        setNameError(false)
        setIsNameChecked(true)
      }
    } else {
      setNameError(true)
      form.setError("name", { message: "Name is not allowed" })
    }
  }

  async function onSubmit() {
    setIsNameChecked(false)
    const res = await CreateRecord({ name, id })
    if (res.status == 200) {
      router.push(`dashboard/modify/${name}`, {})
    }
  }

  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button
            variant="ghost"
            className={
              "h-[175px] w-[150px] border border-dashed hover:bg-muted"
            }>
            <div className={"flex flex-col items-center gap-3.5"}>
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
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              onChange={() => setName(form.getValues().name)}
              className="space-y-8">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <div className={"flex flex-row items-center "}>
                      <Controller
                        name="name"
                        control={form.control}
                        render={({
                          field: { onChange },
                          fieldState: { error },
                        }) => (
                          <div className={"flex w-[95%] flex-col"}>
                            <div className={"flex flex-row"}>
                              <Card
                                className={`flex w-[120px] items-center rounded-r-none border-r-0 px-3 py-2 pr-0 text-sm leading-none ${
                                  error
                                    ? "border-red-500"
                                    : isNameChecked
                                    ? "border-green-500"
                                    : ""
                                }`}>
                                {"prettylinks.com/"}
                              </Card>
                              <Input
                                {...field}
                                autoComplete={"off"}
                                className={`input_without_border rounded-l-none border-l-0 pl-0 ${
                                  error
                                    ? "border-red-500"
                                    : isNameChecked
                                    ? "border-green-500"
                                    : ""
                                }`}
                                onChange={onChange}
                                placeholder="name"
                                spellCheck={"false"}
                                type="text"
                              />
                            </div>
                            <span className={"flex flex-col text-red-500"}>
                              {error?.message}
                            </span>
                          </div>
                        )}
                      />
                    </div>
                    <FormDescription>
                      This is your public display name. It can be changed later.
                    </FormDescription>
                  </FormItem>
                )}
              />
              <DialogFooter>
                <Button
                  className={"select-none"}
                  type="submit"
                  disabled={!isNameChecked || nameError || name.length < 5}>
                  {isNameChecked || nameError || name.length < 5 ? null : (
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
  )
}
