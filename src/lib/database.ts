import {PrismaClient} from "@prisma/client"

declare global {
    var cachedPrisma: PrismaClient
}

const options = {
    // log:
    //   process.env.NODE_ENV === "development"
    //     ? ["query", "error", "warn"]
    //     : ["error"],
}

export let prisma: PrismaClient
if (process.env.NODE_ENV === "production") {
    prisma = new PrismaClient(options)
} else {
    if (!global.cachedPrisma) {
        global.cachedPrisma = new PrismaClient(options)
    }
    prisma = global.cachedPrisma
}

export const db = prisma
