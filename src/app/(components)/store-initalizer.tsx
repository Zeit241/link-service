"use client"

import { useRef } from "react"

import { useStore } from "@/lib/storage/storage"

function StoreInitializer(data: any) {
  const initialized = useRef(false)
  if (!initialized.current) {
    useStore.setState({ record: data.data, links: data.data.Link })
    initialized.current = true
  }
  return null
}

export default StoreInitializer
