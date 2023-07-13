import {PrismaAdapter} from "@next-auth/prisma-adapter"
import {NextAuthOptions} from "next-auth"
import CredentialProvider from "next-auth/providers/credentials"

import {prisma} from "@/lib/database"

import {UserSession} from "../../types/custom-types"

export const authOptions: NextAuthOptions = {
    adapter: PrismaAdapter(prisma),
    providers: [
        CredentialProvider({
            type: "credentials",
            name: "credentials",
            credentials: {
                username: {type: "text"},
                password: {type: "password"},
            },
            async authorize(credentials) {
                if (!credentials?.username || !credentials?.password) return null
                const {username, password} = credentials
                let user = await prisma?.user.findUnique({
                    where: {
                        username: username,
                    },
                    select: {
                        id: true,
                        username: true,
                        password: true,
                        role: true,
                    },
                })

                if (!user) return null

                //const isPassportValid = await bcrypt.compare(password, user.password);
                //if (!isPassportValid) return null;
                return user
            },
        }),
    ],
    session: {
        strategy: "jwt",
        maxAge: 60 * 60 * 24,
    },
    callbacks: {
        async signIn({user}) {
            return !!user
        },
        jwt: async ({token, user}) => {
            user ? (token.user = <UserSession>user) : null
            return token
        },
        session: async ({session, token}) => {
            if (token) {
                session.user = token.user
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
