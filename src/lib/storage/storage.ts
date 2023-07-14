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
  modify: (links: Link[]) => void
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
    const l = links.map((link, index, array) => {
      if (link.id === id) {
        const order = link.order
        link.order = link.order = type === "down" ? index++ : index--
        array[index + 1].order = order
      }
      return link
    })
    l.sort((a: Link, b: Link) => a?.order! - b?.order!)
    set({
      links: l,
    })
  },
  modify: (new_links) => set((state) => ({ links: new_links })),
}))
