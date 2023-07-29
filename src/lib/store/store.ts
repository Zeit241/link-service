import { Link, Record } from "@prisma/client"
import { create } from "zustand"
import { persist } from "zustand/middleware"

type ModifyLinkProps = Partial<
  Pick<Link, "order" | "url" | "name" | "enabled" | "animated">
>

type ModifyRecordProps = Partial<
  Omit<Record, "id" | "createdAt" | "updatedAt" | "url">
>

interface dataStoreType {
  record: Record & { Link: Link[] }
  modify_record: (data: ModifyRecordProps) => void
  links: Link[]
  new_order: [{ id: string; order: number }, { id: string; order: number }]
  modify_link: (id: string, data: ModifyLinkProps) => void
  remove_link: (id: string) => void
  add_link: (link: Link) => void
  change_order: (id: string, type: "up" | "down") => void
}

export const useDataStore = create<dataStoreType>((set, get) => ({
  record: {} as Record & { Link: Link[] },
  modify_record: (data) => {
    const { record } = get()
    set({
      record: {
        ...record,
        ...data,
      },
    })
  },
  links: [],
  modify_link: (id, data) => {
    const { links } = get()
    set({
      links: links.map((link) => {
        return link.id === id ? { ...link, ...data } : link
      }),
    })
  },
  remove_link: (id) => {
    const { links } = get()
    set({
      links: links.filter((link) => link.id !== id),
    })
  },
  add_link: (link) => {
    const { links } = get()
    set({
      links: [link, ...links],
    })
  },
  new_order: [{}, {}] as [
    { id: string; order: number },
    { id: string; order: number }
  ],
  // I DON UNDERSTAND HOW ITS WORKING, BUT I WROTE IT SOMEHOW
  change_order: (id, type) => {
    const { links } = get()
    // Link obj that returns
    let links_obj
    const updated_links = links.map((link, index, array) => {
      // Search for the link
      if (link.id === id) {
        // Write old order
        const old_order = link.order
        const new_order = type === "down" ? ++link.order : --link.order
        const new_index = type === "down" ? ++index : --index

        // Change orders
        link.order = old_order
        array[new_index].order = new_order

        // Return data
        links_obj = [
          { id: link.id, order: link.order },
          {
            id: array[new_index].id,
            order: array[new_index].order,
          },
        ]
      }
      return link
    })
    updated_links.sort((a: Link, b: Link) => b.order - a.order)
    set({
      links: updated_links,
      new_order: links_obj,
    })
  },
}))

type locationStoreType = {
  location: string
  setLocation: (location: string) => void
}
export const useLocationStore = create<locationStoreType>()(
  persist(
    (set, get) => ({
      location: "links",
      setLocation: (location: string) => set({ location }),
    }),
    {
      name: "location",
    }
  )
)
