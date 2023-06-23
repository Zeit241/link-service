import { CustomTypes } from "@/types/custom-types";
import { User } from "@prisma/client";

declare module "next-auth/jwt" {
  interface JWT {
    user: User;
  }
}
declare module "next-auth" {
  interface Session {
    user: User & DefaultSession["user"];
  }
  interface User extends CustomTypes {}
}
