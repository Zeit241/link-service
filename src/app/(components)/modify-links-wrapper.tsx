"use client"

import * as React from "react"
import { useEffect, useState } from "react"

import { useLocationStore } from "@/lib/store/store"
import Loading from "@/app/(authenticated)/dashboard/modify/[slug]/loading"
import CheckAnalytics from "@/app/(components)/check-analytics"
import EditAppearance from "@/app/(components)/edit-appearance"
import EditLinks from "@/app/(components)/edit-links"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/app/(components)/ui/tabs"

type location = "links" | "appearance" | "analytics"
export default function ModifyLinksWrapper() {
  const [currentTab, setCurrentTab] = useState<location>()
  const { location, setLocation } = useLocationStore()
  useEffect(() => {
    setCurrentTab(location as location)
  }, [location])

  if (!currentTab) {
    return <Loading />
  }
  return (
    <div
      className={
        "flex w-full flex-row items-start justify-center p-2 pb-0 sm:p-8"
      }>
      <Tabs value={currentTab} className="w-full gap-3">
        <TabsList className={" h-12 w-full"}>
          <TabsTrigger
            value="links"
            className={"w-[35%] p-3"}
            onClick={() => setLocation("links")}>
            Links
          </TabsTrigger>
          <TabsTrigger
            value="appearance"
            className={"w-[35%] p-3"}
            onClick={() => setLocation("appearance")}>
            Appearance
          </TabsTrigger>
          <TabsTrigger
            value="analytics"
            className={"w-[35%] p-3"}
            onClick={() => setLocation("analytics")}>
            Analytics
          </TabsTrigger>
        </TabsList>
        <TabsContent value="links">
          <EditLinks />
        </TabsContent>
        <TabsContent value="appearance">
          <EditAppearance />
        </TabsContent>
        <TabsContent value="analytics">
          <CheckAnalytics />
        </TabsContent>
      </Tabs>
    </div>
  )
}
