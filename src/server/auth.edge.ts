import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth, { type NextAuthConfig } from "next-auth";

import "next-auth";

import GitHubProvider from "next-auth/providers/github";

import { env } from "~/env.mjs";
import { prisma } from "~/server/db";

// This is a bare minimum auth provider to make it work in the edge with nextjs middlewares  !
// we use the jwt strategy to check if users has been authenticated

export const authOptions: NextAuthConfig = {
  secret: env.NEXTAUTH_SECRET,
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "jwt",
  },
  providers: [GitHubProvider],
};

export const { auth } = NextAuth(authOptions);
