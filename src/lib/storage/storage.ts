import { Link, Record } from "@prisma/client"
import { create } from "zustand"

interface ModifyLinkProps {
  order?: number
  url?: string
  name?: string
  enabled?: boolean
}

interface State {
  record: Record & { Link: Link[] }
  links: Link[]
  modify_link_data: (id: string, data: ModifyLinkProps) => void
  add_new_link: (link: Link) => void
  change_links_order?: (id: string, type: "up" | "down") => void
  links_order_changed: [
    { id: string; order: number },
    { id: string; order: number }
  ]
}

export const useStore = create<State>((set, get) => ({
  record: {} as Record & { Link: Link[] },
  links: [],
  modify_link_data: (id, data) => {
    const { links } = get()
    links.sort((a, b) => a?.order! - b?.order!)
    set({
      links: links.map((link, index) => {
        return link.id === id ? { ...link, ...data } : link
      }),
    })
  },
  add_new_link: (link) => {
    const { links } = get()
    set({
      links: [...links, link],
    })
  },
  change_links_order: (id, type) => {
    const { links } = get()
    let link_1
    const updated_links = links.map((link, index, array) => {
      if (link.id === id) {
        const order = link.order
        link.order = type === "down" ? ++link.order! : --link.order!
        array[type === "down" ? ++index : --index].order = order
        link_1 = [
          { id: link.id, order: link.order },
          {
            id: array[type === "down" ? ++index : --index].id,
            order: array[type === "down" ? ++index : --index].order,
          },
        ]
      }
      return link
    })
    updated_links.sort((a: Link, b: Link) => a?.order! - b?.order!)
    set({
      links: updated_links,
      links_order_changed: link_1,
    })
  },
  links_order_changed: [{}, {}] as [
    { id: string; order: number },
    { id: string; order: number }
  ],
}))
