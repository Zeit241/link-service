"use server"

export async function getUrlTitle({ url }: { url: string }): Promise<string> {
  try {
    const response = await fetch(url, {
      method: "GET",
    })
    if (response.status === 200) {
      const str = await response.text()
      return str.split("<title>")[1].split("</title>")[0]
    } else {
      return new URL(url).hostname
    }
  } catch (e) {
    return new URL(url).hostname
  }
}
