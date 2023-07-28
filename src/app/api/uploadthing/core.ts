import { createUploadthing, type FileRouter } from "uploadthing/next"

const f = createUploadthing()

const auth = async (req: Request) => ({ id: "fakeId" })
//TODO: add auth
export const baseFileRouter = {
  imageUploader: f({ image: { maxFileSize: "4MB", maxFileCount: 1 } })
    .middleware(async ({ req }) => {
      const user = await auth(req)
      if (!user) throw new Error("Unauthorized")

      return { userId: user.id }
    })
    .onUploadComplete(async ({ metadata, file }) => {}),
  pdfUploader: f({
    pdf: {
      maxFileSize: "4MB",
      maxFileCount: 1,
    },
  })
    .middleware(async ({ req }) => {
      const user = await auth(req)
      if (!user) throw new Error("Unauthorized")
      return { userId: user.id }
    })
    .onUploadComplete(async ({ metadata, file }) => {}),
} satisfies FileRouter

export type BaseFileRouter = typeof baseFileRouter
