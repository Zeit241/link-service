import { Link, Record } from "@prisma/client"
import { create } from "zustand"

interface State {
  record: Record & { Link: Link[] }
  links: Link[]
  modify: (links: Link[]) => void
}

export const useStore = create<State>()((set) => ({
  record: {} as Record & { Link: Link[] },
  links: [],
  modify: (new_links) => set((state) => ({ links: new_links })),
}))
