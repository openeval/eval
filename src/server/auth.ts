import { PrismaAdapter } from "@next-auth/prisma-adapter";
import {
  CandidateStatus,
  type User as BaseUser,
  type Candidate,
  type UserType,
} from "@prisma/client";
import { type GetServerSidePropsContext } from "next";
import {
  getServerSession,
  type DefaultSession,
  type NextAuthOptions,
} from "next-auth";
import EmailProvider from "next-auth/providers/email";
import GitHubProvider from "next-auth/providers/github";

import { env } from "~/env.mjs";
import { prisma } from "~/server/db";
import { update as updateCandidate } from "~/server/repositories/Candidates";
import { update as updateUser } from "~/server/repositories/User";
import { inviteEmailProvider } from "./invite";

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module "next-auth" {
  interface User extends BaseUser {
    candidate?: Candidate;
  }

  interface Session extends DefaultSession {
    user: User & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
  interface JWT {
    id: string;
    name: string | null;
    email: string | null;
    activeOrgId: string | null;
    type: UserType;
    completedOnboarding: boolean;
    candidate?: Candidate;
  }
}

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
export const authOptions: NextAuthOptions = {
  callbacks: {
    // this function is called before session callback
    jwt: async ({ token, user }) => {
      const dbUser = await prisma.user.findFirst({
        where: {
          email: token.email,
        },
        include: {
          candidate: true,
        },
      });

      if (!dbUser) {
        if (user) {
          token.user = user;
        }
        return token;
      }

      return {
        ...token,
        user: {
          id: dbUser.id,
          name: dbUser.name,
          email: dbUser.email,
          activeOrgId: dbUser.activeOrgId,
          type: dbUser.type,
          completedOnboarding: dbUser.completedOnboarding,
          candidate: dbUser.candidate,
        },
      };
    },
    session: async ({ session, token }) => {
      session.user = {
        ...session.user,
        // @ts-expect-error session type
        ...token.user,
        id: token.sub,
      };
      return session;
    },
  },
  secret: env.NEXTAUTH_SECRET,
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
    newUser: "/onboarding",
  },
  events: {
    async linkAccount({ account, user, profile }) {
      // TODO:add extra validations
      if (account.provider === "github") {
        // candidates need to link their github account to verify their profiles
        // this happens when a candidate is invited (created by organization) and
        // when the candidate is created in the onboarding process
        await updateCandidate(
          { userId: user.id },
          { status: CandidateStatus.VERIFIED, ghUsername: profile.ghUsername },
        );

        await updateUser({ id: user.id }, { completedOnboarding: true });
      }
    },
  },
  providers: [
    /**
     * ...add more providers here.
     *
     * Most other providers require a bit more work than the Discord provider. For example, the
     * GitHub provider requires you to add the `refresh_token_expires_in` field to the Account
     * model. Refer to the NextAuth.js docs for the provider you want to use. Example:
     *
     * @see https://next-auth.js.org/providers/github
     */
    GitHubProvider({
      clientId: env.NEXT_PUBLIC_GITHUB_APP_CLIENT_ID,
      clientSecret: env.GITHUB_APP_CLIENT_SECRET,
      profile(profile) {
        return {
          id: profile.id.toString(),
          name: profile.name || profile.login,
          ghUsername: profile.login,
          email: profile.email,
          image: profile.avatar_url,
        };
      },
      // allowDangerousEmailAccountLinking: true,
    }),
    EmailProvider({
      server: {
        host: env.SMTP_HOST,
        port: Number(env.SMTP_PORT),
        auth: {
          user: env.SMTP_USER,
          pass: env.SMTP_PASSWORD,
        },
      },
      from: env.SMTP_FROM,
    }),
    inviteEmailProvider,
  ],
  // TODO: set the correct theme from tailwind
  theme: {
    colorScheme: "auto",
    logo: "",
    brandColor: "000000",
    buttonText: "ffffff",
  },
};

/**
 * Wrapper for `getServerSession` so that you don't need to import the `authOptions` in every file.
 *
 * @see https://next-auth.js.org/configuration/nextjs
 */
export const getServerAuthSession = (ctx: {
  req: GetServerSidePropsContext["req"];
  res: GetServerSidePropsContext["res"];
}) => {
  return getServerSession(ctx.req, ctx.res, authOptions);
};

export async function getSession() {
  return await getServerSession(authOptions);
}

export async function getCurrentUser() {
  const session = await getSession();

  return session?.user;
}
