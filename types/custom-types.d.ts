export interface UserSession {
  id: string
  username: string
  role: "USER" | "ADMIN"
}

export type Prettify<T> = {
  [K in keyof T]: T[K]
} & {}
