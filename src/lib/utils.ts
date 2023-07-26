import punycode from "punycode"
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

type LinkType = "URL" | "EMAIL" | false

export function getLinkType({ url }: { url: string }): LinkType {
  const url_regex = new RegExp(
    "^(https?:\\/\\/)?" + // protocol
      "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[-*a-z\\d]{2,}|" + // domain name
      "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR IP (v4) address
      "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
      "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
      "(\\#[-a-z\\d_]*)?$", // fragment locator
    "i"
  )

  if (url_regex.test(punycode.toASCII(url))) {
    return "URL"
  }

  const email_regex =
    /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/
  if (email_regex.test(url)) {
    return "EMAIL"
  }
  return false
}

export function urlNormalize({ url }: { url: string }): string {
  if (url.startsWith("http://") || url.startsWith("https://")) {
    return url
  }
  return `https://${url}`
}

// export async function getUrlIcon({
//   url,
// }: {
//   url: string
// }): Promise<string | false> {
//   const response = await fetch(
//     `https://www.google.com/s2/favicons?domain=${url}&sz=256`
//   )
//   if (response.status === 200) {
//     return await response.text()
//   }
//   return false
// }

export function isWordNotAllowed(word: string): boolean {
  return (
    service_words.includes(word.trim().toLowerCase()) ||
    service_words.includes(word.trim().toUpperCase())
  )
}

export const service_words = [
  "admin",
  "user",
  "add",
  "edit",
  "delete",
  "create",
  "update",
  "remove",
  "manage",
  "settings",
  "dashboard",
  "profile",
  "login",
  "logout",
  "register",
  "password",
  "email",
  "api",
  "public",
  "private",
  "authorize",
  "authenticate",
  "permission",
  "role",
  "system",
  "report",
  "analytics",
  "debug",
  "maintenance",
  "backup",
  "restore",
  "log",
  "audit",
  "error",
  "notification",
  "message",
  "support",
  "feedback",
  "terms",
  "policy",
  "documentation",
  "faq",
  "help",
  "about",
  "contact",
  "home",
  "search",
  "result",
  "page",
  "news",
  "blog",
  "article",
  "tutorial",
  "demo",
  "download",
  "upload",
  "image",
  "video",
  "audio",
  "file",
  "document",
  "product",
  "service",
  "pricing",
  "subscribe",
  "unsubscribe",
  "checkout",
  "payment",
  "order",
  "cart",
  "wishlist",
  "shipping",
  "return",
  "refund",
  "confirm",
  "complete",
  "success",
  "error",
  "notification",
  "message",
  "warning",
  "info",
  "alert",
  "confirm",
  "prompt",
]
