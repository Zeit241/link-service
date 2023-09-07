"use client"

import "react-image-crop/dist/ReactCrop.css"

import * as React from "react"
import { useRef, useState } from "react"
import { Loader2 } from "lucide-react"
import ReactCrop, { centerCrop, Crop, makeAspectCrop } from "react-image-crop"

import { useDataStore } from "@/lib/store/store"
import { useUploadThing } from "@/lib/uploadthing"
import { Button } from "@/app/(components)/ui/button"
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/app/(components)/ui/dialog"
import { deleteFile } from "@/app/actions/files"
import { UpdateRecord } from "@/app/actions/record"

import { Icon } from "./edit-appearance"

export default function PictureLoader(): JSX.Element {
  const { record, modify_record } = useDataStore()
  const [isImageRemoving, setIsImageRemoving] = useState<boolean>(false)
  const [imgSrc, setImgSrc] = useState<string>()
  const [crop, setCrop] = useState<Crop>()
  const imgRef = useRef<HTMLImageElement>(null)
  const [cropConfig, setCropConfig] = useState({})

  function centerAspectCrop(
    mediaWidth: number,
    mediaHeight: number,
    aspect: number
  ) {
    return centerCrop(
      makeAspectCrop(
        {
          unit: "px",
          width: 150,
          height: 150,
        },
        1,

        150,
        150
      ),

      150,
      150
    )
  }

  function onImageLoad(e: React.SyntheticEvent<HTMLImageElement>) {
    setCrop(centerAspectCrop(150, 150, 1))
  }

  const { isUploading, startUpload } = useUploadThing("imageUploader", {
    async onClientUploadComplete(res) {
      if (res) {
        const { fileUrl, fileKey } = res[0]
        await updateData({
          fileUrl,
          fileKey,
          remove: false,
        })
      }
    },
    onUploadError(error: Error) {
      alert(`ERROR! ${error.message}`)
    },
  })
  const updateData = async ({
    fileUrl,
    fileKey,
    remove,
  }: {
    fileUrl: string
    fileKey: string
    remove: boolean
  }) => {
    if (record.pictureKey || remove) {
      await deleteFile(record.pictureKey!)
    }
    await UpdateRecord({
      id: record?.id,
      profilePicture: fileUrl,
      pictureKey: fileKey,
    }).then(() =>
      modify_record({
        profilePicture: fileUrl,
        pictureKey: fileKey,
      })
    )
  }

  function getCroppedImage(
    sourceImage: HTMLImageElement,
    cropConfig: Crop
  ): Promise<Blob> {
    const canvas = document.createElement("canvas")
    const scaleX = sourceImage.naturalWidth / sourceImage.width
    const scaleY = sourceImage.naturalHeight / sourceImage.height
    canvas.width = cropConfig.width
    canvas.height = cropConfig.height
    const ctx = canvas.getContext("2d")

    ctx?.drawImage(
      sourceImage,
      cropConfig.x * scaleX,
      cropConfig.y * scaleY,
      cropConfig.width * scaleX,
      cropConfig.height * scaleY,
      0,
      0,
      cropConfig.width,
      cropConfig.height
    )

    return new Promise((resolve, reject) => {
      canvas.toBlob((blob) => {
        // returning an error
        if (!blob) {
          reject(new Error("Canvas is empty"))
          return
        }
        resolve(blob)
      }, "image/jpeg")
    })
  }

  return (
    <div className={"flex flex-col items-center gap-5 sm:flex-row"}>
      <Icon icon={record?.profilePicture} username={record?.url} />
      <div className={"flex w-full flex-col gap-2"}>
        <Dialog open={!!imgSrc}>
          <DialogTrigger>
            <label
              htmlFor={"imageUploader"}
              className={`flex h-10 w-full cursor-pointer items-center justify-center rounded-md bg-primary p-3 text-center text-black hover:bg-primary/90 ${
                (isUploading || isImageRemoving) &&
                "cursor-wait opacity-50 hover:bg-primary"
              }`}>
              {isUploading ? <Loader2 className={"animate-spin"} /> : "Upload"}
              <input
                disabled={isUploading || isImageRemoving}
                id={"imageUploader"}
                type={"file"}
                className={"hidden"}
                accept={"image/*"}
                onChange={(e) => {
                  if (!e.target.files) return
                  setImgSrc(URL.createObjectURL(e.target.files[0]))
                }}
              />
            </label>
          </DialogTrigger>
          <DialogContent className={"flex flex-col items-center gap-6 p-4"}>
            <DialogTitle>Crop image as you like</DialogTitle>
            {!!imgSrc && (
              <>
                <ReactCrop
                  crop={crop}
                  onChange={(_, percentCrop) => setCrop(percentCrop)}
                  onComplete={(cropConfig) => setCropConfig(cropConfig)}
                  circularCrop={true}
                  aspect={1}
                  minWidth={150}
                  minHeight={150}>
                  <img
                    ref={imgRef}
                    alt="Crop me"
                    src={imgSrc}
                    onLoad={onImageLoad}
                  />
                </ReactCrop>
                <Button
                  className={"w-3/5"}
                  onClick={async () => {
                    const croppedImage = await getCroppedImage(
                      imgRef.current!,
                      // @ts-ignore
                      cropConfig
                    )
                    const file = new File([croppedImage], record.id + ".jpg", {
                      type: "image/jpeg",
                      lastModified: Date.now(),
                    })
                    void startUpload([file])
                    setImgSrc("")
                  }}>
                  Save
                </Button>
              </>
            )}
          </DialogContent>
        </Dialog>
        <Button
          disabled={isUploading || isImageRemoving}
          variant={"secondary"}
          onClick={async () => {
            setIsImageRemoving(true)
            await updateData({
              fileUrl: "",
              fileKey: "",
              remove: true,
            }).then(() => setIsImageRemoving(false))
          }}>
          {isImageRemoving ? <Loader2 className={"animate-spin"} /> : "Remove"}
        </Button>
      </div>
    </div>
  )
}
