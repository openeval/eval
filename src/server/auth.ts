import { PrismaAdapter } from "@next-auth/prisma-adapter";
import {
  CandidateStatus,
  type User as BaseUser,
  type Candidate,
  type Membership,
  type Organization,
  type UserType,
} from "@prisma/client";
import { type GetServerSidePropsContext } from "next";
import {
  getServerSession,
  type DefaultSession,
  type NextAuthOptions,
  type User,
} from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import EmailProvider from "next-auth/providers/email";
import GitHubProvider from "next-auth/providers/github";
import nodemailer from "nodemailer";

import { env } from "~/env.mjs";
import { absoluteUrl, createHash, randomString } from "~/lib/utils";
import { prisma } from "~/server/db";
import { update as updateCandidate } from "~/server/repositories/Candidates";
import { update as updateUser } from "~/server/repositories/User";

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module "next-auth" {
  interface User extends BaseUser {
    memberships: Membership;
    candidate?: Candidate;
    activeOrg: Organization;
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
export const authOptions: NextAuthOptions = {
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
  providers,
  // TODO: set the correct theme from tailwind
  theme: {
    colorScheme: "auto",
    logo: "",
    brandColor: "000000",
    buttonText: "ffffff",
  },
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
    text: text({ url, host }),
    html: html({ url, host, email }),
  });
}

// Email HTML body
function html({ url, host, email }: Record<"url" | "host" | "email", string>) {
  // Insert invisible space into domains and email address to prevent both the
  // email address and the domain from being turned into a hyperlink by email
  // clients like Outlook and Apple mail, as this is confusing because it seems
  // like they are supposed to click on their email address to sign in.
  const escapedEmail = `${email.replace(/\./g, "&#8203;.")}`;
  const escapedHost = `${host.replace(/\./g, "&#8203;.")}`;

  // Some simple styling options
  const backgroundColor = "#f9f9f9";
  const textColor = "#444444";
  const mainBackgroundColor = "#ffffff";
  const buttonBackgroundColor = "#346df1";
  const buttonBorderColor = "#346df1";
  const buttonTextColor = "#ffffff";

  return `
<body style="background: ${backgroundColor};">
  <table width="100%" border="0" cellspacing="0" cellpadding="0">
    <tr>
      <td align="center" style="padding: 10px 0px 20px 0px; font-size: 22px; font-family: Helvetica, Arial, sans-serif; color: ${textColor};">
        <strong>${escapedHost}</strong>
      </td>
    </tr>
  </table>
  <table width="100%" border="0" cellspacing="20" cellpadding="0" style="background: ${mainBackgroundColor}; max-width: 600px; margin: auto; border-radius: 10px;">
    <tr>
      <td align="center" style="padding: 10px 0px 0px 0px; font-size: 18px; font-family: Helvetica, Arial, sans-serif; color: ${textColor};">
        Sign in as <strong>${escapedEmail}</strong>
      </td>
    </tr>
    <tr>
      <td align="center" style="padding: 20px 0;">
        <table border="0" cellspacing="0" cellpadding="0">
          <tr>
            <td align="center" style="border-radius: 5px;" bgcolor="${buttonBackgroundColor}"><a id="magic-link" href="${url}" target="_blank" style="font-size: 18px; font-family: Helvetica, Arial, sans-serif; color: ${buttonTextColor}; text-decoration: none; border-radius: 5px; padding: 10px 20px; border: 1px solid ${buttonBorderColor}; display: inline-block; font-weight: bold;">Sign in</a></td>
          </tr>
        </table>
      </td>
    </tr>
    <tr>
      <td align="center" style="padding: 0px 0px 10px 0px; font-size: 16px; line-height: 22px; font-family: Helvetica, Arial, sans-serif; color: ${textColor};">
        If you did not request this email you can safely ignore it.
      </td>
    </tr>
  </table>
</body>
`;
}

// Email Text body (fallback for email clients that don't render HTML, e.g. feature phones)
function text({ url, host }: Record<"url" | "host", string>) {
  return `Sign in to ${host}\n${url}\n\n`;
}

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

export async function getCurrentUser(): Promise<User | undefined> {
  const session = await getSession();

  return session?.user;
}

type AuthLinkOpts = {
  provider?: string;
  maxAge?: number;
  callbackUrl?: string;
  urlSearchParams?: Record<string, string | null>;
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
  const { callbackUrl, urlSearchParams } = opts;

  // Generate a link with email, unhashed token and callback url
  const params = new URLSearchParams({
    ...(opts.callbackUrl && { callbackUrl }),
    token,
    email: toEmail,
    ...urlSearchParams,
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
