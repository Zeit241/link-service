import { PrismaAdapter } from "@next-auth/prisma-adapter"
import bcrypt from "bcrypt"
import { NextAuthOptions } from "next-auth"
import CredentialProvider from "next-auth/providers/credentials"
import GitHubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google"

import { prisma } from "@/lib/database"
import { SignIn } from "@/app/actions/auth"

import { UserSession } from "../../types/custom-types"

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialProvider({
      type: "credentials",
      name: "credentials",
      credentials: {
        username: { type: "text" },
        password: { type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.username || !credentials?.password) return null
        const { username, password } = credentials
        const user = await SignIn({ username })
        if (!user) return null

        const isPassportValid = await bcrypt.compare(password, user.password!)
        if (!isPassportValid) return null
        return {
          id: user.id,
          username: user.username,
          role: user.role,
        }
      },
    }),
    GitHubProvider({
      clientId: process.env?.GITHUB_CLIENT_ID!,
      clientSecret: process.env?.GITHUB_CLIENT_SECRET!,
      name: "GitHub",
      profile(profile) {
        return {
          id: profile.id,
          email: profile.email,
          image: profile.avatar_url,
          name: profile.login,
          status: "ACTIVE",
          verified: false,
          role: "USER",
        }
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      profile(profile) {
        console.log("profile", profile)
        return {
          id: profile.sub,
          email: profile.email,
          emailVerified: profile.email_verified,
          image: profile.picture,
          name: profile.name,
          username: profile.email.split("@")[0],
          status: "ACTIVE",
          verified: false,
          role: "USER",
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 60 * 60 * 24,
  },
  callbacks: {
    async signIn({ user }) {
      return !!user
    },
    jwt: async ({ token, user }) => {
      user ? (token.user = <UserSession>user) : null
      return token
    },
    session: async ({ session, token }) => {
      if (token) {
        session.user = {
          ...token.user,
          username: token.user?.username || token.user?.name || "John Doe",
        }
      }
      return session
    },
  },
  debug: process.env.NODE_ENV === "production",
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/login",
  },
}
