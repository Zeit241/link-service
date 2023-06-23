import { z } from "zod";

const SignUpSchema = z
  .object({
    username: z.string().min(5, {
      message: "Username must be at least 5 characters.",
    }),
    password: z.string().min(8, {
      message: "Password must be at least 8 characters.",
    }),
    confirmPassword: z.string().min(8, {
      message: "Password must be at least 8 characters.",
    }),
  })
  .refine((data) => data?.password === data?.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"], // path of error
  });

const SingInSchema = z.object({
  username: z.string().min(1, {
    message: "You must enter a username.",
  }),
  password: z.string().min(1, {
    message: "You must enter a password.",
  }),
});

export { SignUpSchema, SingInSchema };
