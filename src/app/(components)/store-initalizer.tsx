"use client"

import { useRef } from "react"
import { Link, Record } from "@prisma/client"

import { useStore } from "@/lib/store/store"

type StoreInitializerProps = { record: Record & { Link: Link[] } } & {
  links: Link[]
}

function StoreInitializer({ record, links }: StoreInitializerProps) {
  const initialized = useRef(false)
  if (!initialized.current) {
    useStore.setState({ record: record, links: links })

    initialized.current = true
  }
  return null
}

export default StoreInitializer
