export interface UserSession {
    id: string
    username: string
    role: "USER" | "ADMIN"
}
