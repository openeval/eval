import { PrismaAdapter } from "@auth/prisma-adapter";
import {
  CandidateStatus,
  UserType,
  type User as BaseUser,
  type Candidate,
  type Membership,
  type Organization,
} from "@prisma/client";
import { render } from "@react-email/render";
import NextAuth, {
  type DefaultSession,
  type NextAuthConfig,
  type User,
} from "next-auth";

import { PostHogClient } from "~/server/telemetry";

import "next-auth";

import CredentialsProvider from "next-auth/providers/credentials";
import EmailProvider from "next-auth/providers/email";
import GitHubProvider from "next-auth/providers/github";
import nodemailer from "nodemailer";

import { LoginEmail } from "~/emails/LoginEmail";
import { env } from "~/env.mjs";
import { absoluteUrl, createHash, randomString } from "~/lib/utils";
import { prisma } from "~/server/db";
import { update as updateCandidate } from "~/server/services/Candidates";
import { update as updateUser } from "~/server/services/User";

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module "next-auth" {
  interface User extends BaseUser {
    membership: Membership;
    candidate?: Candidate;
    activeOrg: Organization;
  }

  interface Session extends DefaultSession {
    user: User & DefaultSession["user"];
  }

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

// We use this provider only in CI
const credentialsProvider = CredentialsProvider({
  name: "Credentials",
  credentials: {
    email: { label: "Email", type: "email", placeholder: "jsmith" },
    password: { label: "Password", type: "password" },
  },
  // @ts-expect-error this run on test mode only
  async authorize(credentials) {
    const user = await prisma.user.findFirst({
      where: {
        email: credentials?.email as string,
      },
      include: {
        candidate: true,
        memberships: true,
        activeOrg: true,
      },
    });

    if (user) {
      // TODO: verify password
      return user;
    }

    return null;
  },
});

const providers = [
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
    // @ts-expect-error augmented profile
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
    server:
      env.CI === "true"
        ? { port: 4025 }
        : {
            host: env.SMTP_HOST,
            port: Number(env.SMTP_PORT),
            auth: {
              user: env.SMTP_USER,
              pass: env.SMTP_PASSWORD,
            },
          },
    from: env.SMTP_FROM,
    sendVerificationRequest,
  }),
];

// @ts-expect-error no error here
env.CI && providers.push(credentialsProvider);

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
export const authOptions: NextAuthConfig = {
  secret: env.NEXTAUTH_SECRET,
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
    newUser: "/onboarding",
  },
  callbacks: {
    // this function is called before session callback
    jwt: async ({ token, user }) => {
      const dbUser = await prisma.user.findFirst({
        where: {
          email: token.email as string,
        },
        include: {
          candidate: true,
          memberships: true,
          activeOrg: true,
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
          activeOrg: dbUser.activeOrg,
          type: dbUser.type,
          completedOnboarding: dbUser.completedOnboarding,
          candidate: dbUser.candidate,
          membership: dbUser.memberships.find(
            (item) => item.organizationId === dbUser.activeOrgId,
          ),
        },
      };
    },
    // @ts-expect-error authjs token
    session: async ({ session, token }) => {
      session.user = {
        ...session.user,
        ...token.user,
        id: token.sub,
      };
      return session;
    },
  },
  events: {
    async signIn({ user }) {
      const posthog = PostHogClient();
      // @ts-expect-error types issue
      posthog.identify(user?.id);
    },
    async linkAccount({ account, user, profile }) {
      if (account.provider === "github" && user.type === UserType.CANDIDATE) {
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
  providers,
};

async function sendVerificationRequest({
  identifier: email,
  url,
  provider: { server, from },
}) {
  const { host } = new URL(url);
  const transport = nodemailer.createTransport(server);
  await transport.sendMail({
    to: email,
    from,
    subject: `Sign in to ${host}`,
    text: render(<LoginEmail url={url} />, {
      plainText: true,
    }),
    html: render(<LoginEmail url={url} />),
  });
}

export async function getSession() {
  return await auth();
}

// wrapper to simplify migration to auth.js v5
export async function getServerSession() {
  return await auth();
}

export async function getCurrentUser(): Promise<User | undefined> {
  const session = await getSession();

  return session?.user;
}

type AuthLinkOpts = {
  provider?: string;
  maxAge?: number;
  callbackUrl?: string;
};

/**
 * Generate a one time link to login the user
 * @param toEmail
 * @param opts
 * @returns
 */
export async function generateAuthLink(
  toEmail: string,
  opts: AuthLinkOpts = {},
) {
  const adapter = PrismaAdapter(prisma);
  const url = absoluteUrl("/api/auth");

  const token = randomString(32);

  const ONE_DAY_IN_SECONDS = 86400;
  const expires = new Date(
    Date.now() + (opts.maxAge ?? ONE_DAY_IN_SECONDS) * 1000,
  );
  const { callbackUrl } = opts;

  // Generate a link with email, unhashed token and callback url
  const params = new URLSearchParams({
    ...(opts.callbackUrl && { callbackUrl }),
    token,
    email: toEmail,
  });

  const secret = env.NEXTAUTH_SECRET;

  await adapter.createVerificationToken?.({
    identifier: toEmail,
    token: await createHash(`${token}${secret}`),
    expires,
  });

  const _url = `${url}/callback/${opts.provider || "email"}?${params}`;

  return _url;
}

export const { handlers, auth, signIn, signOut } = NextAuth(authOptions);
