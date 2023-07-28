import * as z from "zod"

export const createRecordSchema = z.object({
  name: z
    .string()
    .min(5, {
      message: "Name must be at least 5 characters",
    })
    .max(20, {
      message: "Name must be less than 20 characters",
    })
    .regex(/^[a-zA-Z0-9\-._#[\]@!$=]*$/g, {
      message: "Invalid characters.",
    }),
})
