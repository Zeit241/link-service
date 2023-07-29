/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
    serverActions: true,
    serverComponentsExternalPackages: ["@prisma/client"],
  },
  images: {
    domains: ["api.qrserver.com", "uploadthing.com"],
  },
}

module.exports = nextConfig
