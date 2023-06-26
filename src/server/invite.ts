import EmailProvider, { type EmailConfig } from "next-auth/providers/email";
import type { Provider } from "next-auth/providers";
import { env } from "~/env.mjs";
import { createTransport } from "nodemailer";
import { authOptions } from "~/server/auth";
import { type Theme } from "next-auth";
import { absoluteUrl } from "~/lib/utils";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "~/server/db";
import type { Assessment } from "@prisma/client";
import slugify from "slugify";
import { isObject } from "~/lib/utils";
/** Web compatible method to create a hash, using SHA256 */
export async function createHash(message: string) {
  const data = new TextEncoder().encode(message);
  const hash = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(hash))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("")
    .toString();
}

/** Web compatible method to create a random string of a given length */
export function randomString(size: number) {
  const i2hex = (i: number) => ("0" + i.toString(16)).slice(-2);
  const r = (a: string, i: number): string => a + i2hex(i);
  const bytes = crypto.getRandomValues(new Uint8Array(size));
  return Array.from(bytes).reduce(r, "");
}

/** Deep merge two objects */
export function merge(target: unknown, ...sources: unknown[]): unknown {
  if (!sources.length) return target;
  const source = sources.shift();

  if (isObject(target) && isObject(source)) {
    for (const key in source) {
      if (isObject(source[key])) {
        if (!target[key]) Object.assign(target, { [key]: {} });
        merge(target[key], source[key]);
      } else {
        Object.assign(target, { [key]: source[key] });
      }
    }
  }

  return merge(target, ...sources);
}

/**
 * Adds `signinUrl` and `callbackUrl` to each provider
 * and deep merge user-defined options.
 */
export function parseProvider(params: {
  provider: Provider;
  url: URL;
}): EmailConfig {
  const { url } = params;

  const { options: userOptions, ...defaults } = params.provider;

  const id = (userOptions?.id ?? defaults.id) as string;
  const provider = merge(defaults, userOptions, {
    signinUrl: `${url}/signin/${id}`,
    callbackUrl: `${url}/callback/${id}`,
  });

  return provider as EmailConfig;
}

export const inviteEmailProvider = EmailProvider({
  id: "inviteEmailProvider",
  server: {
    host: env.SMTP_HOST,
    port: Number(env.SMTP_PORT),
    auth: {
      user: env.SMTP_USER,
      pass: env.SMTP_PASSWORD,
    },
  },
  from: env.SMTP_FROM,
  sendVerificationRequest,
});

async function sendVerificationRequest(params) {
  const { identifier, url, provider, theme } = params;
  const { host } = new URL(url);
  // NOTE: You are not required to use `nodemailer`, use whatever you want.
  const transport = createTransport(provider.server);
  const result = await transport.sendMail({
    to: identifier,
    from: provider.from,
    subject: `You have a new assessment invitation`,
    text: text({ url, host }),
    html: html({ url, host, theme }),
  });
  const failed = result.rejected.concat(result.pending).filter(Boolean);
  if (failed.length) {
    throw new Error(`Email(s) (${failed.join(", ")}) could not be sent`);
  }
}

/**
 * Email HTML body
 * Insert invisible space into domains from being turned into a hyperlink by email
 * clients like Outlook and Apple mail, as this is confusing because it seems
 * like they are supposed to click on it to sign in.
 *
 * @note We don't add the email address to avoid needing to escape it, if you do, remember to sanitize it!
 */
function html(params: { url: string; host: string; theme: Theme }) {
  const { url, host, theme } = params;
  const escapedHost = host.replace(/\./g, "&#8203;.");

  const brandColor = theme.brandColor || "#346df1";
  const color = {
    background: "#f9f9f9",
    text: "#444",
    mainBackground: "#fff",
    buttonBackground: brandColor,
    buttonBorder: brandColor,
    buttonText: theme.buttonText || "#fff",
  };

  return `
  <body style="background: ${color.background};">
    <table width="100%" border="0" cellspacing="20" cellpadding="0"
      style="background: ${color.mainBackground}; max-width: 600px; margin: auto; border-radius: 10px;">
      <tr>
        <td align="center"
          style="padding: 10px 0px; font-size: 22px; font-family: Helvetica, Arial, sans-serif; color: ${color.text};">
          You have a new invitation to complete an assessment
        </td>
      </tr>
      <tr>
        <td align="center" style="padding: 20px 0;">
          <table border="0" cellspacing="0" cellpadding="0">
            <tr>
              <td align="center" style="border-radius: 5px;" bgcolor="${color.buttonBackground}"><a href="${url}"
                  target="_blank"
                  style="font-size: 18px; font-family: Helvetica, Arial, sans-serif; color: ${color.buttonText}; text-decoration: none; border-radius: 5px; padding: 10px 20px; border: 1px solid ${color.buttonBorder}; display: inline-block; font-weight: bold;">Get started</a></td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
  `;
}

/** Email Text body (fallback for email clients that don't render HTML, e.g. feature phones) */
function text({ url, host }: { url: string; host: string }) {
  return `Sign in to ${host}\n${url}\n\n`;
}

/**
 * Starts an e-mail login flow, by generating a token,
 * and sending it to the user's e-mail (with the help of a DB adapter)
 */
export default async function sendInvitationEmail(
  identifier: string,
  assessment: Assessment
  //   options
): Promise<string> {
  const { theme } = authOptions;

  const adapter = PrismaAdapter(prisma);

  // users are redirected to public assessment
  const callbackUrl = `/a/${assessment.id}/${slugify(assessment.title)}`;

  const url = absoluteUrl("/api/auth");

  const provider = parseProvider({
    provider: inviteEmailProvider,
    url,
  });

  const token =
    (await provider.generateVerificationToken?.()) ?? randomString(32);

  const ONE_DAY_IN_SECONDS = 86400;
  const expires = new Date(
    Date.now() + (provider.maxAge ?? ONE_DAY_IN_SECONDS) * 1000
  );

  // Generate a link with email, unhashed token and callback url
  const params = new URLSearchParams({
    callbackUrl,
    token,
    email: identifier,
    assesmentId: assessment.id,
  });
  const _url = `${url}/callback/${provider.id}?${params}`;

  const secret = provider.secret ?? env.NEXTAUTH_SECRET;

  try {
    await Promise.all([
      provider.sendVerificationRequest({
        identifier,
        token,
        expires,
        url: _url,
        provider,
        // @ts-expect-error we are setting theme
        theme,
      }),

      adapter?.createVerificationToken?.({
        identifier,
        token: await createHash(`${token}${secret}`),
        expires,
      }),
    ]);
  } catch (e) {
    console.log(e);
    console.log("error sending mail");
  }

  return `${url}/verify-request?${new URLSearchParams({
    provider: provider.id,
    type: provider.type,
  })}`;
}
