"use client";
import * as React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/app/(components)/ui/button";
import { Input } from "@/app/(components)/ui/input";
import { Label } from "@/app/(components)/ui/label";
import { Loader2, Github } from "lucide-react";
import SingUp from "@/app/auth/server";
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

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {
  type: "signin" | "signup";
}
export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [formType, setFormType] = React.useState<
    typeof SignUpSchema | typeof SingInSchema
  >(props.type === "signup" ? SignUpSchema : SingInSchema);
  useEffect(() => {
    setFormType(props.type === "signup" ? SignUpSchema : SingInSchema);
  }, [props.type]);
  const formSchema = formType;
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });
  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setTimeout(() => {
      toast({
        title: "Scheduled: Catch up",
        description: "Friday, February 10, 2023 at 5:57 PM",
      });
      setIsLoading(false);
    }, 3000);
    if (props.type === "signup") {
      //Register
    } else {
      //Login
    }
    console.log(values);
  }
  // async function onSubmit(data: FormData) {
  //   setIsLoading(true);
  //   if (props.type === "signup") {
  //     const response = await SingUp({
  //       username: data.get("username") as string,
  //       password: data.get("password") as string,
  //     });
  //
  //     if (response.status === 200) {
  //       setIsLoading(false);
  //     }
  //   }
  //
  //
  // }
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
                        defaultValue={" "}
                        id="username"
                        placeholder="Username"
                        type="text"
                        autoCapitalize="none"
                        autoComplete="username"
                        autoCorrect="off"
                        //disabled={isLoading}
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
                    <FormControl>
                      <Input
                        {...field}
                        defaultValue={" "}
                        id="username"
                        placeholder="Password"
                        type="password"
                        autoCapitalize="none"
                        autoComplete={
                          props.type === "signup" ? "new-password" : "password"
                        }
                        autoCorrect="off"
                        disabled={isLoading}
                      />
                    </FormControl>
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
                          defaultValue={" "}
                          id="repeat-password"
                          placeholder="Repeat Password"
                          type="password"
                          autoCapitalize="none"
                          autoComplete="new-password"
                          autoCorrect="off"
                          // disabled={isLoading}
                        />
                      </FormControl>
                      <FormDescription></FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
            </div>
            <Button
            //disabled={isLoading}
            >
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
        )}{" "}
        Github
      </Button>
    </div>
  );
  // return (
  //   <div className={cn("grid gap-6", className)} {...props}>
  //     <form action={onSubmit}>
  //       <div className="grid gap-2">
  //         <div className="grid gap-1">
  //           <div className="mb-2">
  //             <Label htmlFor="username">Username</Label>
  //             <Input
  //               id="username"
  //               placeholder="Username"
  //               type="text"
  //               autoCapitalize="none"
  //               autoComplete="username"
  //               autoCorrect="off"
  //               disabled={isLoading}
  //             />
  //           </div>
  //           <div className="mb-2">
  //             <Label htmlFor="password">Password</Label>
  //             <Input
  //               id="password"
  //               placeholder="Password"
  //               type="password"
  //               autoCapitalize="none"
  //               autoComplete={
  //                 props.type === "signup" ? "new-password" : "password"
  //               }
  //               autoCorrect="off"
  //               disabled={isLoading}
  //             />
  //           </div>
  //           {props.type === "signup" && (
  //             <div className="mb-2">
  //               <Label htmlFor="password2">Repeat password</Label>
  //               <Input
  //                 id="password2"
  //                 placeholder="Repeat password"
  //                 type="password"
  //                 autoCapitalize="none"
  //                 autoComplete="new-password"
  //                 autoCorrect="off"
  //                 disabled={isLoading}
  //               />
  //             </div>
  //           )}
  //         </div>
  //         <Button disabled={isLoading}>
  //           {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
  //           {props.type === "signup" ? "Sign Up" : "Sign In"}
  //         </Button>
  //       </div>
  //     </form>
  //     <div className="relative">
  //       <div className="absolute inset-0 flex items-center">
  //         <span className="w-full border-t" />
  //       </div>
  //       <div className="relative flex justify-center text-xs uppercase">
  //         <span className="bg-background px-2 text-muted-foreground">
  //           Or continue with
  //         </span>
  //       </div>
  //     </div>
  //     <Button variant="outline" type="button" disabled={isLoading}>
  //       {isLoading ? (
  //         <Loader2 className="mr-2 h-4 w-4 animate-spin" />
  //       ) : (
  //         <Github className="mr-2 h-4 w-4" />
  //       )}{" "}
  //       Github
  //     </Button>
  //   </div>
  // );
}
