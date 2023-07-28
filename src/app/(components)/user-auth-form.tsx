"use client"

import * as React from "react"
import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { Eye, EyeOff, Github, Loader2 } from "lucide-react"
import { signIn } from "next-auth/react"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { useToast } from "@/lib/hooks/use-toast"
import { SignUpSchema, SingInSchema } from "@/lib/schema/auth"
import { cn } from "@/lib/utils"
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
import { Input } from "@/app/(components)/ui/input"
import { SingUp } from "@/app/actions/auth"

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {
  type: "signin" | "signup"
}

type FormType = typeof SignUpSchema | typeof SingInSchema

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
  const type = props.type === "signup" ? SignUpSchema : SingInSchema

  const [isLoading, setIsLoading] = React.useState<boolean>(false)
  const [showPassword, setShowPassword] = React.useState<boolean>(false)
  const [isUsernameInUrl, setIsUsernameInUrl] = React.useState<null | string>(
    null
  )
  const [formType, setFormType] = React.useState<FormType>(type)
  useEffect(() => {
    setFormType(type)

    if (window.location.href.includes("username=")) {
      const url = new URL(window.location.href)
      setIsUsernameInUrl(url.searchParams.get("username"))
    }
  }, [props.type, type])

  const { toast } = useToast()
  const router = useRouter()

  const form = useForm<z.infer<typeof formType>>({
    resolver: zodResolver(formType),
    defaultValues: {
      username: isUsernameInUrl ?? "",
      password: "",
      confirmPassword: "",
    },
  })

  async function onSubmit(values: z.infer<typeof formType>) {
    setIsLoading(true)

    if (props.type === "signup") {
      const response = await SingUp({
        username: values.username,
        password: values.password,
      })

      if (response.status === 200) {
        setIsLoading(false)
        setTimeout(() => {
          toast({
            variant: "default",
            title: "Success",
            description: "Account created successfully",
          })
          router.push("/login?username=" + values.username)
        }, 2000)
      }
    } else {
      const response = await signIn("credentials", {
        username: values.username,
        password: values.password,
        redirect: false,
      })

      if (!response?.error) {
        setIsLoading(false)
        router.push("/dashboard")
      } else {
        setIsLoading(false)
        toast({
          variant: "destructive",
          title: "Error",
          description: "Username or password is incorrect",
        })
      }
    }
  }

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="grid gap-2">
            <div className={"grid gap-1"}>
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        id="username"
                        placeholder="Username"
                        type="text"
                        autoCapitalize="none"
                        autoComplete="username"
                        autoCorrect="off"
                        disabled={isLoading}
                      />
                    </FormControl>
                    <FormDescription>
                      This is your public display name.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <div className={"flex flex-row "}>
                      <FormControl>
                        <Input
                          {...field}
                          className={"rounded-r-none border-r-0 shadow-none"}
                          id="password"
                          placeholder="Password"
                          type={showPassword ? "text" : "password"}
                          autoCapitalize="none"
                          autoComplete={
                            props.type === "signup"
                              ? "new-password"
                              : "password"
                          }
                          autoCorrect="off"
                          disabled={isLoading}
                        />
                      </FormControl>
                      <Button
                        className={
                          "h-10 rounded-l-none border-l-0 bg-transparent hover:bg-transparent"
                        }
                        type="button"
                        variant="outline"
                        onClick={() => setShowPassword(!showPassword)}>
                        {showPassword ? (
                          <EyeOff size={15} />
                        ) : (
                          <Eye size={15} />
                        )}
                      </Button>
                    </div>

                    <FormDescription></FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {props.type === "signup" && (
                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Repeat Password</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          id="repeat-password"
                          placeholder="Repeat Password"
                          type="password"
                          autoCapitalize="none"
                          autoComplete="new-password"
                          autoCorrect="off"
                          disabled={isLoading}
                        />
                      </FormControl>
                      <FormDescription></FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
            </div>
            <Button disabled={isLoading}>
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {props.type === "signup" ? "Sign Up" : "Sign In"}
            </Button>
          </div>
        </form>
      </Form>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>
      <Button
        variant="outline"
        type="button"
        disabled={isLoading}
        onClick={() => {
          setIsLoading(true)
          return signIn("github")
        }}>
        {isLoading ? (
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <Github className="mr-2 h-4 w-4" />
        )}
        Github
      </Button>
      <Button
        variant="outline"
        type="button"
        disabled={isLoading}
        onClick={() => {
          setIsLoading(true)
          return signIn("google")
        }}>
        {isLoading ? (
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <>
            <svg
              className={"mr-2"}
              xmlns="http://www.w3.org/2000/svg"
              width="0.98em"
              height="1em"
              viewBox="0 0 256 262">
              <path
                fill="#4285F4"
                d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622l38.755 30.023l2.685.268c24.659-22.774 38.875-56.282 38.875-96.027"></path>
              <path
                fill="#34A853"
                d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055c-34.523 0-63.824-22.773-74.269-54.25l-1.531.13l-40.298 31.187l-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1"></path>
              <path
                fill="#FBBC05"
                d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82c0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602l42.356-32.782"></path>
              <path
                fill="#EB4335"
                d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0C79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251"></path>
            </svg>
          </>
        )}
        Google
      </Button>
    </div>
  )
}
