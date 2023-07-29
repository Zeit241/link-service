"use server"

import { utapi } from "uploadthing/server"

//TODO: add try/catch
export const deleteFile = async (id: string) => {
  await utapi.deleteFiles(id)
}
