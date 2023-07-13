/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        appDir: true,
        serverActions: true,
        serverComponentsExternalPackages: ["@prisma/client"],
    },
}

module.exports = nextConfig
