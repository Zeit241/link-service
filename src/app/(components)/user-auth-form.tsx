"use client";
import * as React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/app/(components)/ui/button";
import { Input } from "@/app/(components)/ui/input";
import { Label } from "@/app/(components)/ui/label";
import { Loader2, Github, EyeOff, Eye } from "lucide-react";
import SingUp from "@/app/(auth)/server";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/app/(components)/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { SignUpSchema, SingInSchema } from "@/lib/schema/auth";
import { useEffect } from "react";
import { useToast } from "@/lib/hooks/use-toast";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {
  type: "signin" | "signup";
}

type FormType = typeof SignUpSchema | typeof SingInSchema;

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
  const type = props.type === "signup" ? SignUpSchema : SingInSchema;

  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [showPassword, setShowPassword] = React.useState<boolean>(false);
  const [isUsernameInUrl, setIsUsernameInUrl] = React.useState<null | string>(
    null
  );
  const [formType, setFormType] = React.useState<FormType>(type);
  useEffect(() => {
    setFormType(type);

    if (window.location.href.includes("username=")) {
      const url = new URL(window.location.href);
      setIsUsernameInUrl(url.searchParams.get("username"));
    }
  }, [props.type]);

  const { toast } = useToast();
  const router = useRouter();

  const form = useForm<z.infer<typeof formType>>({
    resolver: zodResolver(formType),
    defaultValues: {
      username: isUsernameInUrl ?? "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formType>) {
    setIsLoading(true);

    if (props.type === "signup") {
      const response = await SingUp({
        username: values.username,
        password: values.password,
      });

      if (response.status === 200) {
        setIsLoading(false);
        setTimeout(() => {
          toast({
            variant: "default",
            title: "Success",
            description: "Account created successfully",
          });
          router.push("/login?username=" + values.username);
        }, 2000);
      }
    } else {
      const response = await signIn("credentials", {
        username: values.username,
        password: values.password,
        redirect: false,
      });

      if (!response?.error) {
        setIsLoading(false);
        router.push("/dashboard");
      } else {
        setIsLoading(false);
        toast({
          variant: "destructive",
          title: "Error",
          description: "Username or password is incorrect",
        });
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
                          className={"border-r-0 rounded-r-none shadow-none"}
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
                          "bg-transparent border-l-0 rounded-l-none hover:bg-transparent"
                        }
                        type="button"
                        variant="outline"
                        onClick={() => setShowPassword(!showPassword)}
                      >
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
      <Button variant="outline" type="button" disabled={isLoading}>
        {isLoading ? (
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <Github className="mr-2 h-4 w-4" />
        )}
        Github
      </Button>
    </div>
  );
}
