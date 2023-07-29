import { z } from "zod"

export const ModifyProjectInfo = z.object({
  name: z.string().min(1, {
    message: "Username must be at least 1 character.",
  }),
  description: z.string().max(80, {
    message: "Description must be at most 80 characters.",
  }),
})
