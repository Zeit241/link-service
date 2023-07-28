import { createNextRouteHandler } from "uploadthing/next"

import { baseFileRouter } from "./core"

// Export routes for Next App Router
export const { GET, POST } = createNextRouteHandler({
  router: baseFileRouter,
})
