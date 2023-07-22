"use client"

import * as React from "react"

import CheckAnalytics from "@/app/(components)/check-analytics"
import EditAppearance from "@/app/(components)/edit-appearance"
import EditLinks from "@/app/(components)/edit-links"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/app/(components)/ui/tabs"

export default function ModifyLinksWrapper() {
  return (
    <div
      className={
        "flex w-full flex-row items-start justify-center p-2 pb-0 sm:p-8"
      }>
      <Tabs defaultValue="links" className="w-full gap-3">
        <TabsList className={" h-12 w-full"}>
          <TabsTrigger value="links" className={"w-[35%] p-3"}>
            Links
          </TabsTrigger>
          <TabsTrigger value="appearance" className={"w-[35%] p-3"}>
            Appearance
          </TabsTrigger>
          <TabsTrigger value="analytics" className={"w-[35%] p-3"}>
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
