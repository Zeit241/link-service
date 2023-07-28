import { generateComponents } from "@uploadthing/react"
import { generateReactHelpers } from "@uploadthing/react/hooks"

import type { BaseFileRouter } from "@/app/api/uploadthing/core"

export const { UploadButton, UploadDropzone, Uploader } =
  generateComponents<BaseFileRouter>()

export const { useUploadThing } = generateReactHelpers<BaseFileRouter>()
